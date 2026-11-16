// 瓦片化 Canvas 渲染器
// - 按 zoom 分桶做 LOD；每桶以固定基准缩放把瓦片预渲染到 OffscreenCanvas
// - 主画布每帧只 drawImage 视口内瓦片 + 动态叠加（悬停/选中/闪烁）
// - 低 LOD 只画简化色块与每格数量标注；房间级 LOD 才画编号、尺寸
// - LRU 控制内存，图层开关/楼层切换时按需失效重建

import { LAYER_COLOR, TILE_WORLD, TILE_PX, MAX_TILE_CACHE, DETAIL_ZOOM, POINT_TYPES } from './constants.js';
import { SpatialIndex, featureBounds, hitTest, anchorOf } from './spatial.js';

const PAINT_ORDER = ['fireLane', 'building', 'room', 'stair', 'extinguisher', 'camera', 'exit'];

function makeCanvas(w, h) {
  if (typeof OffscreenCanvas !== 'undefined') return new OffscreenCanvas(w, h);
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

// 连续缩放按 2 的幂分桶：桶内直接缩放 drawImage，跨桶重建瓦片
export function zoomBucket(scale) {
  return Math.max(0, Math.floor(Math.log2(scale)));
}

export class TileRenderer {
  constructor(canvas, index, getState) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.index = index;                 // SpatialIndex
    this.getState = getState;           // () => { layers, floorFilter, scale, ... }
    // 缓存键: `${bucket}:${floorKey}:${layerBit}:${tx}:${ty}`
    this.cache = new Map();
    this.lru = [];
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    // 视图（世界坐标中心 + 缩放）
    this.cx = 0; this.cy = 0; this.scale = 1;
    this.hover = null;
    this.selected = new Set();          // feature id
    this.linkedExits = [];              // 同编号关联出口
    this.flashIds = new Map();          // id -> 开始时间
    this.flashColor = '#ff3b30';
    this.needsRedraw = true;
    this.visibleStats = { tiles: 0, features: 0, cacheSize: 0 };
    this._raf = null;
    this._lastFrame = performance.now();
    this.fps = 60;
    this._boundLoop = this.loop.bind(this);
    this._raf = requestAnimationFrame(this._boundLoop);
  }

  setIndex(index) {
    this.index = index;
    this.invalidate();
    this.needsRedraw = true;
  }

  invalidate() {
    this.cache.clear();
    this.lru.length = 0;
    this.needsRedraw = true;
  }

  // ---- 坐标变换 ----
  worldToScreen(wx, wy) {
    const w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    return [(wx - this.cx) * this.scale + w / 2, (wy - this.cy) * this.scale + h / 2];
  }
  screenToWorld(sx, sy) {
    const w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    return [(sx - w / 2) / this.scale + this.cx, (sy - h / 2) / this.scale + this.cy];
  }

  viewBounds() {
    const w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    const [x0, y0] = this.screenToWorld(0, 0);
    const [x1, y1] = this.screenToWorld(w, h);
    return { x0, y0, x1, y1 };
  }

  // ---- 瓦片获取（含 LRU）----
  baseScale(bucket) { return 2 ** bucket; }

  tileKey(tx, ty, bucket, floorKey, layerBit) {
    return `${bucket}:${floorKey}:${layerBit}:${tx}:${ty}`;
  }

  getTile(tx, ty, bucket, floorKey, layerBit, visible) {
    const key = this.tileKey(tx, ty, bucket, floorKey, layerBit);
    let tile = this.cache.get(key);
    if (tile) {
      // LRU 提升
      const li = this.lru.indexOf(key);
      if (li > -1) this.lru.splice(li, 1);
      this.lru.push(key);
      return tile;
    }
    tile = this.renderTile(tx, ty, bucket, visible);
    this.cache.set(key, tile);
    this.lru.push(key);
    while (this.lru.length > MAX_TILE_CACHE) {
      const old = this.lru.shift();
      this.cache.delete(old);
    }
    return tile;
  }

  featureVisible(f, floorKey, layers) {
    if (!layers[f.type]) return false;
    if (floorKey !== 'ALL' && f.floor !== floorKey) {
      // 建筑轮廓属于 F01 占位，在单层视图下跟随该楼层显示
      if (!(f.type === 'building' && floorKey === 'F01')) return false;
    }
    return true;
  }

  renderTile(tx, ty, bucket, layers) {
    const base = this.baseScale(bucket);
    const tile = makeCanvas(TILE_PX, TILE_PX);
    const ctx = tile.getContext('2d');
    ctx.scale((TILE_PX / TILE_WORLD) * base, (TILE_PX / TILE_WORLD) * base);
    ctx.translate(-tx * TILE_WORLD, -ty * TILE_WORLD);
    ctx.lineWidth = 1 / base;

    const st = this.getState();
    const floorKey = st.floorFilter;
    const wx0 = tx * TILE_WORLD, wy0 = ty * TILE_WORLD;
    const feats = this.index.queryRect(wx0, wy0, wx0 + TILE_WORLD, wy0 + TILE_WORLD)
      .filter((f) => this.featureVisible(f, floorKey, layers));

    const byType = new Map();
    for (const f of feats) {
      if (!byType.has(f.type)) byType.set(f.type, []);
      byType.get(f.type).push(f);
    }

    const detailed = base >= DETAIL_ZOOM;
    for (const type of PAINT_ORDER) {
      const arr = byType.get(type);
      if (!arr) continue;
      if (!detailed && POINT_TYPES.has(type)) {
        this.drawAggregatedDots(ctx, type, arr, base);
      } else {
        for (const f of arr) this.drawFeature(ctx, f, type, base, detailed);
      }
    }

    // 简化 LOD：房间/建筑只染色块并标注该瓦内点要素数量
    if (!detailed) {
      const counts = {};
      for (const f of feats) {
        if (POINT_TYPES.has(f.type)) counts[f.type] = (counts[f.type] || 0) + 1;
      }
      const labels = [];
      if (counts.exit) labels.push(`出${counts.exit}`);
      if (counts.extinguisher) labels.push(`灭${counts.extinguisher}`);
      if (counts.camera) labels.push(`监${counts.camera}`);
      if (labels.length) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.font = '11px system-ui, sans-serif';
        ctx.textBaseline = 'top';
        const text = labels.join(' ');
        const tw = ctx.measureText(text).width;
        ctx.fillStyle = 'rgba(20,24,30,0.72)';
        ctx.fillRect(4, 4, tw + 8, 16);
        ctx.fillStyle = '#e8ecf3';
        ctx.fillText(text, 8, 6);
        ctx.restore();
      }
    }
    return tile;
  }

  drawAggregatedDots(ctx, type, arr, base) {
    ctx.save();
    ctx.fillStyle = LAYER_COLOR[type];
    ctx.globalAlpha = 0.85;
    const r = 1.6 / base;
    for (const f of arr) {
      ctx.beginPath();
      ctx.arc(f.x, f.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  drawFeature(ctx, f, type, base, detailed) {
    const color = LAYER_COLOR[type];
    ctx.save();
    switch (type) {
      case 'building':
      case 'room': {
        ctx.beginPath();
        f.polygon.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
        ctx.closePath();
        ctx.fillStyle = type === 'building' ? 'rgba(143,163,191,0.16)' : 'rgba(107,122,144,0.10)';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = (type === 'building' ? 1.6 : 0.7) / base;
        ctx.stroke();
        if (detailed && type === 'room' && f.roomNo) {
          const b = featureBounds(f);
          ctx.fillStyle = 'rgba(220,228,240,0.9)';
          ctx.font = `${Math.min(11 / base, 2.2 / base)}px system-ui`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(f.roomNo, (b.minX + b.maxX) / 2, (b.minY + b.maxY) / 2);
          // 尺寸标注（米）
          ctx.font = `${Math.min(9 / base, 1.8 / base)}px system-ui`;
          ctx.fillStyle = 'rgba(180,196,216,0.85)';
          ctx.fillText(`${(b.maxX - b.minX).toFixed(1)}×${(b.maxY - b.minY).toFixed(1)}m`,
            (b.minX + b.maxX) / 2, (b.minY + b.maxY) / 2 + 2.4 / base);
        }
        break;
      }
      case 'fireLane': {
        ctx.beginPath();
        f.polygon.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,212,59,0.14)';
        ctx.fill();
        ctx.setLineDash([3 / base, 2 / base]);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1 / base;
        ctx.stroke();
        ctx.setLineDash([]);
        if (detailed) {
          const c = anchorOf(f);
          ctx.fillStyle = color;
          ctx.font = `${2.4 / base}px system-ui`;
          ctx.textAlign = 'center';
          ctx.fillText(`通道${f.laneNo} ${f.width}m`, c.x, c.y);
        }
        break;
      }
      case 'stair': {
        ctx.fillStyle = 'rgba(77,163,255,0.25)';
        ctx.strokeStyle = color;
        ctx.fillRect(f.x - f.w / 2, f.y - f.d / 2, f.w, f.d);
        ctx.strokeRect(f.x - f.w / 2, f.y - f.d / 2, f.w, f.d);
        // 踏步线
        ctx.beginPath();
        const steps = 5;
        for (let i = 1; i < steps; i++) {
          const yy = f.y - f.d / 2 + (f.d / steps) * i;
          ctx.moveTo(f.x - f.w / 2, yy);
          ctx.lineTo(f.x + f.w / 2, yy);
        }
        ctx.stroke();
        if (detailed) {
          ctx.fillStyle = '#cfe6ff';
          ctx.font = `${1.8 / base}px system-ui`;
          ctx.textAlign = 'center';
          ctx.fillText(f.stairNo, f.x, f.y - f.d / 2 - 1 / base);
        }
        break;
      }
      case 'exit': {
        const r = 1.8 / base;
        ctx.beginPath();
        ctx.arc(f.x, f.y, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 0.8 / base;
        ctx.strokeStyle = '#0b3d1f';
        ctx.stroke();
        if (detailed) {
          ctx.fillStyle = '#b8f5cf';
          ctx.font = `${1.9 / base}px system-ui`;
          ctx.textAlign = 'left';
          ctx.fillText(f.exitNo, f.x + r + 0.6 / base, f.y + 0.6 / base);
        }
        break;
      }
      case 'extinguisher': {
        const r = 1.1 / base;
        ctx.fillStyle = f.capacity > 0 ? color : '#5a2415';
        ctx.fillRect(f.x - r, f.y - r, r * 2, r * 2);
        ctx.strokeStyle = '#ffd8c9';
        ctx.lineWidth = 0.5 / base;
        ctx.strokeRect(f.x - r, f.y - r, r * 2, r * 2);
        if (f.capacity <= 0) {
          ctx.strokeStyle = '#ff3b30';
          ctx.beginPath();
          ctx.moveTo(f.x - r * 1.4, f.y - r * 1.4);
          ctx.lineTo(f.x + r * 1.4, f.y + r * 1.4);
          ctx.stroke();
        }
        break;
      }
      case 'camera': {
        const r = 1.3 / base;
        ctx.beginPath();
        ctx.arc(f.x, f.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.8 / base;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(f.x, f.y, r * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        break;
      }
    }
    ctx.restore();
  }

  // ---- 命中检测（屏幕坐标）----
  pick(sx, sy) {
    const [wx, wy] = this.screenToWorld(sx, sy);
    const radius = 8 / this.scale; // 8px 容差换算到世界
    const st = this.getState();
    const candidates = this.index.queryPoint(wx, wy, radius * 1.5)
      .filter((f) => this.featureVisible(f, st.floorFilter, st.layers));
    const hits = candidates
      .filter((f) => hitTest(f, wx, wy, radius))
      .sort((a, b) => {
        // 点要素优先，其次按面积从小到大（更容易点中的小要素排前）
        const pa = POINT_TYPES.has(a.type) ? 0 : 1;
        const pb = POINT_TYPES.has(b.type) ? 0 : 1;
        if (pa !== pb) return pa - pb;
        const ba = featureBounds(a), bb = featureBounds(b);
        return (ba.maxX - ba.minX) * (ba.maxY - ba.minY) - (bb.maxX - bb.minX) * (bb.maxY - bb.minY);
      });
    return hits;
  }

  startFlash(ids, color = '#ff3b30') {
    const now = performance.now();
    for (const id of ids) this.flashIds.set(id, now);
    this.flashColor = color;
  }

  // ---- 主循环 ----
  loop(now) {
    const dt = now - this._lastFrame;
    this._lastFrame = now;
    if (dt > 0 && dt < 250) this.fps = this.fps * 0.92 + (1000 / dt) * 0.08;
    const st = this.getState();
    // 闪烁进行中必须持续重绘（1.8s 三次亮灭）
    const flashing = this.flashIds.size > 0;
    const layerBit = PAINT_ORDER.map((t) => (st.layers[t] ? '1' : '0')).join('');
    const sig = [
      this.cx.toFixed(2), this.cy.toFixed(2), this.scale.toFixed(4),
      st.floorFilter, layerBit,
      this.hover?.id || '', [...this.selected].join(','),
      this.linkedExits.map((f) => f.id).join(','),
      this.canvas.clientWidth, this.canvas.clientHeight,
      flashing
    ].join('|');
    if (sig !== this._sig || this.needsRedraw) {
      this._sig = sig;
      this.needsRedraw = false;
      this._frameCount = (this._frameCount || 0) + 1;
      this.render(now);
    }
    this._raf = requestAnimationFrame(this._boundLoop);
  }

  render(now) {
    const ctx = this.ctx;
    const st = this.getState();
    const w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    if (this.canvas.width !== Math.round(w * this.dpr) || this.canvas.height !== Math.round(h * this.dpr)) {
      this.canvas.width = Math.round(w * this.dpr);
      this.canvas.height = Math.round(h * this.dpr);
      this.invalidate();
    }
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#10141b';
    ctx.fillRect(0, 0, w, h);

    const bucket = zoomBucket(this.scale);
    const base = this.baseScale(bucket);
    const drawScale = this.scale / base;
    const vb = this.viewBounds();
    const txa = Math.floor(vb.x0 / TILE_WORLD) - 1, txb = Math.floor(vb.x1 / TILE_WORLD) + 1;
    const tya = Math.floor(vb.y0 / TILE_WORLD) - 1, tyb = Math.floor(vb.y1 / TILE_WORLD) + 1;

    const layerBit = PAINT_ORDER.map((t) => (st.layers[t] ? '1' : '0')).join('');
    let tileCount = 0;
    const toScreenX = (wx) => (wx - this.cx) * this.scale + w / 2;
    const toScreenY = (wy) => (wy - this.cy) * this.scale + h / 2;

    for (let tx = txa; tx <= txb; tx++) {
      for (let ty = tya; ty <= tyb; ty++) {
        const tile = this.getTile(tx, ty, bucket, st.floorFilter, layerBit, st.layers);
        const dx = toScreenX(tx * TILE_WORLD);
        const dy = toScreenY(ty * TILE_WORLD);
        const size = TILE_WORLD * this.scale;
        ctx.imageSmoothingEnabled = drawScale < 0.85;
        ctx.drawImage(tile, dx, dy, size + 0.5, size + 0.5);
        tileCount++;
      }
    }
    // 视口要素统计每 12 帧算一次，避免每帧全量网格查询
    let featureEstimate = this.visibleStats.features;
    if (this._frameCount % 12 === 0) {
      featureEstimate = this.index.queryRect(vb.x0, vb.y0, vb.x1, vb.y1)
        .filter((f) => this.featureVisible(f, st.floorFilter, st.layers)).length;
    }

    this.drawOverlays(ctx, st, now);
    this.visibleStats = { tiles: tileCount, features: featureEstimate, cacheSize: this.cache.size };
  }

  drawOverlays(ctx, st, now) {
    const w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    const toScreen = (f) => {
      const p = anchorOf(f);
      return this.worldToScreen(p.x, p.y);
    };

    // 闪烁（三次）：600ms 一个周期，共 1800ms
    for (const [id, start] of [...this.flashIds]) {
      const elapsed = now - start;
      if (elapsed > 1800) { this.flashIds.delete(id); continue; }
      const f = this.index.byId.get(id);
      if (!f) continue;
      const phase = (elapsed / 600) | 0;
      const on = phase % 2 === 0;
      if (!on) continue;
      this.highlightFeature(ctx, f, this.flashColor, 3, true);
    }

    // 选中集合：包围框 + 同编号关联出口
    if (this.selected.size) {
      const sel = [...this.selected].map((id) => this.index.byId.get(id)).filter(Boolean);
      if (sel.length) {
        let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        for (const f of sel) {
          const b = featureBounds(f);
          x0 = Math.min(x0, b.minX); y0 = Math.min(y0, b.minY);
          x1 = Math.max(x1, b.maxX); y1 = Math.max(y1, b.maxY);
        }
        const [sx0, sy0] = this.worldToScreen(x0, y0);
        const [sx1, sy1] = this.worldToScreen(x1, y1);
        ctx.save();
        ctx.strokeStyle = '#40c4ff';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        const pad = 6;
        ctx.strokeRect(sx0 - pad, sy0 - pad, sx1 - sx0 + pad * 2, sy1 - sy0 + pad * 2);
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(64,196,255,0.9)';
        ctx.font = '12px system-ui';
        ctx.textBaseline = 'bottom';
        ctx.fillText(`已选 ${sel.length} 个要素`, sx0 - pad, sy0 - pad - 4);
        ctx.restore();
        for (const f of sel) this.highlightFeature(ctx, f, '#40c4ff', 2, false);
      }
      for (const e of this.linkedExits) this.highlightFeature(ctx, e, '#ffd60a', 2.5, true);
    }

    // 悬停高亮
    if (this.hover) this.highlightFeature(ctx, this.hover, '#ffffff', 1.5, true);
  }

  highlightFeature(ctx, f, color, lw, glow) {
    const b = featureBounds(f);
    const [x0, y0] = this.worldToScreen(b.minX, b.minY);
    const [x1, y1] = this.worldToScreen(b.maxX, b.maxY);
    const pad = POINT_TYPES.has(f.type) ? 6 : 3;
    ctx.save();
    if (glow) { ctx.shadowColor = color; ctx.shadowBlur = 8; }
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.strokeRect(x0 - pad, y0 - pad, x1 - x0 + pad * 2, y1 - y0 + pad * 2);
    ctx.restore();
  }

  destroy() {
    cancelAnimationFrame(this._raf);
  }
}
