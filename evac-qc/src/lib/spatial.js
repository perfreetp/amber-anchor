// 统一网格空间索引：单层要素上万时，视口裁剪与点命中都只查所在格子
// 世界坐标单位为米，网格 cell = TILE_WORLD，与瓦片对齐

import { TILE_WORLD, POINT_TYPES } from './constants.js';

export class SpatialIndex {
  constructor(features) {
    this.cell = TILE_WORLD;
    this.map = new Map();      // "cx,cy" -> feature[]
    this.features = features;  // 原始数组（非响应式）
    this.byId = new Map();     // id -> feature，供闪烁/高亮 O(1) 定位
    this.bounds = null;
    for (const f of features) {
      this.byId.set(f.id, f);
      this.insert(f);
    }
  }

  key(cx, cy) { return cx + ',' + cy; }

  insert(f) {
    const b = featureBounds(f);
    if (!this.bounds) this.bounds = { ...b };
    else {
      this.bounds.minX = Math.min(this.bounds.minX, b.minX);
      this.bounds.minY = Math.min(this.bounds.minY, b.minY);
      this.bounds.maxX = Math.max(this.bounds.maxX, b.maxX);
      this.bounds.maxY = Math.max(this.bounds.maxY, b.maxY);
    }
    const x0 = Math.floor(b.minX / this.cell), y0 = Math.floor(b.minY / this.cell);
    const x1 = Math.floor(b.maxX / this.cell), y1 = Math.floor(b.maxY / this.cell);
    for (let cx = x0; cx <= x1; cx++) {
      for (let cy = y0; cy <= y1; cy++) {
        const k = this.key(cx, cy);
        let arr = this.map.get(k);
        if (!arr) this.map.set(k, (arr = []));
        arr.push(f);
      }
    }
  }

  // 视口矩形查询（世界坐标）
  queryRect(x0, y0, x1, y1) {
    const out = [];
    const seen = new Set();
    const cxa = Math.floor(x0 / this.cell), cxb = Math.floor(x1 / this.cell);
    const cya = Math.floor(y0 / this.cell), cyb = Math.floor(y1 / this.cell);
    for (let cx = cxa; cx <= cxb; cx++) {
      for (let cy = cya; cy <= cyb; cy++) {
        const arr = this.map.get(this.key(cx, cy));
        if (!arr) continue;
        for (const f of arr) {
          if (seen.has(f.id)) continue;
          const b = f._bounds;
          if (b.maxX < x0 || b.minX > x1 || b.maxY < y0 || b.minY > y1) continue;
          seen.add(f.id);
          out.push(f);
        }
      }
    }
    return out;
  }

  // 点命中：返回距离/面积排序后的候选（渲染层再做精确判定）
  queryPoint(wx, wy, radius) {
    const out = [];
    const cxa = Math.floor((wx - radius) / this.cell), cxb = Math.floor((wx + radius) / this.cell);
    const cya = Math.floor((wy - radius) / this.cell), cyb = Math.floor((wy + radius) / this.cell);
    const seen = new Set();
    for (let cx = cxa; cx <= cxb; cx++) {
      for (let cy = cya; cy <= cyb; cy++) {
        const arr = this.map.get(this.key(cx, cy));
        if (!arr) continue;
        for (const f of arr) {
          if (seen.has(f.id)) continue;
          seen.add(f.id);
          out.push(f);
        }
      }
    }
    return out;
  }

  // 最近邻（供质检规则使用，predicate 过滤；按环螺旋扩张直到下界超过当前最优）
  nearest(wx, wy, predicate, maxDist = Infinity) {
    let best = null, bestD = maxDist * maxDist;
    const ccx = Math.floor(wx / this.cell), ccy = Math.floor(wy / this.cell);
    const match = (f) => (typeof predicate === 'string' ? f.type === predicate : predicate ? predicate(f) : true);
    for (let ring = 0; ring < 256; ring++) {
      // 当前环内任一点到查询点的最小距离下界；下界已不优于当前解即可停止
      if (best) {
        const ringMin = (ring - 1) * this.cell;
        if (ringMin * ringMin >= bestD) break;
      }
      if (ring * this.cell > maxDist && best) break;
      for (let cx = ccx - ring; cx <= ccx + ring; cx++) {
        for (let cy = ccy - ring; cy <= ccy + ring; cy++) {
          if (Math.max(Math.abs(cx - ccx), Math.abs(cy - ccy)) !== ring) continue;
          const arr = this.map.get(this.key(cx, cy));
          if (!arr) continue;
          for (const f of arr) {
            if (!match(f)) continue;
            const p = anchorOf(f);
            const d = (p.x - wx) ** 2 + (p.y - wy) ** 2;
            if (d < bestD) { bestD = d; best = f; }
          }
        }
      }
    }
    return best;
  }
}

// 点要素专用均匀网格：质检规则对出口/灭火器做上万次最近邻查询，
// 小格子 + 环扩张可把每次查询限制在常数个格子内。
export class PointGrid {
  constructor(pointFeatures, cell = 8) {
    this.cell = cell;
    this.map = new Map();
    this.features = pointFeatures;
    for (const f of pointFeatures) this.insert(f);
  }
  key(cx, cy) { return cx + ',' + cy; }
  insert(f) {
    const cx = Math.floor(f.x / this.cell), cy = Math.floor(f.y / this.cell);
    const k = this.key(cx, cy);
    let arr = this.map.get(k);
    if (!arr) this.map.set(k, (arr = []));
    arr.push(f);
  }
  // 环扩张最近邻；环的距离下界超过当前最优即停止
  nearest(wx, wy, predicate = null, maxDist = Infinity) {
    let best = null, bestD = maxDist * maxDist;
    const ccx = Math.floor(wx / this.cell), ccy = Math.floor(wy / this.cell);
    for (let ring = 0; ring < 64; ring++) {
      if (best) {
        const ringMin = (ring - 1) * this.cell;
        if (ringMin * ringMin >= bestD) break;
      }
      for (let cx = ccx - ring; cx <= ccx + ring; cx++) {
        for (let cy = ccy - ring; cy <= ccy + ring; cy++) {
          if (Math.max(Math.abs(cx - ccx), Math.abs(cy - ccy)) !== ring) continue;
          const arr = this.map.get(this.key(cx, cy));
          if (!arr) continue;
          for (const f of arr) {
            if (predicate && !predicate(f)) continue;
            const d = (f.x - wx) ** 2 + (f.y - wy) ** 2;
            if (d < bestD) { bestD = d; best = f; }
          }
        }
      }
    }
    return best;
  }
  // 有界半径最近邻：只扫描半径覆盖到的格子，无环扩张空扫
  nearestWithin(wx, wy, maxDist, predicate = null) {
    let best = null, bestD = maxDist * maxDist;
    const cxa = Math.floor((wx - maxDist) / this.cell), cxb = Math.floor((wx + maxDist) / this.cell);
    const cya = Math.floor((wy - maxDist) / this.cell), cyb = Math.floor((wy + maxDist) / this.cell);
    for (let cx = cxa; cx <= cxb; cx++) {
      for (let cy = cya; cy <= cyb; cy++) {
        const arr = this.map.get(this.key(cx, cy));
        if (!arr) continue;
        for (const f of arr) {
          if (predicate && !predicate(f)) continue;
          const d = (f.x - wx) ** 2 + (f.y - wy) ** 2;
          if (d < bestD) { bestD = d; best = f; }
        }
      }
    }
    return best;
  }
  // 半径内全部点（供重复摆放检测）
  within(wx, wy, radius, predicate = null) {
    const out = [];
    const cxa = Math.floor((wx - radius) / this.cell), cxb = Math.floor((wx + radius) / this.cell);
    const cya = Math.floor((wy - radius) / this.cell), cyb = Math.floor((wy + radius) / this.cell);
    const r2 = radius * radius;
    for (let cx = cxa; cx <= cxb; cx++) {
      for (let cy = cya; cy <= cyb; cy++) {
        const arr = this.map.get(this.key(cx, cy));
        if (!arr) continue;
        for (const f of arr) {
          if (predicate && !predicate(f)) continue;
          if ((f.x - wx) ** 2 + (f.y - wy) ** 2 <= r2) out.push(f);
        }
      }
    }
    return out;
  }
}

export function featureBounds(f) {
  if (f._bounds) return f._bounds;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const eat = (x, y) => {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  };
  if (f.type === 'building' || f.type === 'room' || f.type === 'fireLane') {
    for (const [x, y] of f.polygon) eat(x, y);
  } else if (f.type === 'stair') {
    eat(f.x - f.w / 2, f.y - f.d / 2);
    eat(f.x + f.w / 2, f.y + f.d / 2);
  } else {
    eat(f.x, f.y);
  }
  f._bounds = { minX, minY, maxX, maxY };
  return f._bounds;
}

export function anchorOf(f) {
  if (POINT_TYPES.has(f.type) || f.type === 'stair') return { x: f.x, y: f.y };
  const b = featureBounds(f);
  return { x: (b.minX + b.maxX) / 2, y: (b.minY + b.maxY) / 2 };
}

// 点是否在多边形内（射线法）
export function pointInPolygon(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

// 点命中判定（world 坐标，radius 为世界距离容差）
export function hitTest(f, wx, wy, radius) {
  const b = featureBounds(f);
  if (wx < b.minX - radius || wx > b.maxX + radius || wy < b.minY - radius || wy > b.maxY + radius) return false;
  if (POINT_TYPES.has(f.type)) {
    return Math.hypot(f.x - wx, f.y - wy) <= radius;
  }
  if (f.type === 'stair') {
    return Math.abs(f.x - wx) <= f.w / 2 + radius && Math.abs(f.y - wy) <= f.d / 2 + radius;
  }
  return pointInPolygon(wx, wy, f.polygon);
}
