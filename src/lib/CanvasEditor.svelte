<script>
  import { onMount, onDestroy } from 'svelte';
  import { editor } from '../lib/store.svelte.js';
  import * as G from '../lib/geometry.js';
  import { seaTypeColor, seaTypeName } from '../lib/sample-data.js';

  let canvas;
  let wrap;
  let ctx;
  let dpr = 1;
  const cam = { x: 0, y: 0, scale: 1 }; // world→screen: sx=(wx-cam.x)*scale
  let raf = 0;
  let needRender = true;

  const interaction = $state({
    mode: 'idle', // idle | pan | drag-vertex | drag-edge | box | split-drawing
    parcelId: null,
    ringIndex: 0,
    vertexIndex: -1,
    edgeIndex: -1,
    startScreen: null,
    startWorld: null,
    lastWorld: null,
    moved: false,
    splitPts: [],
    splitAwaiting: false,
    cursor: 'default',
    hoverSnap: null,
    hoverWorld: null
  });

  function requestRender() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      render();
    });
  }

  function toScreen(p) {
    return { x: (p.x - cam.x) * cam.scale, y: (p.y - cam.y) * cam.scale };
  }
  function toWorld(s) {
    return { x: s.x / cam.scale + cam.x, y: s.y / cam.scale + cam.y };
  }

  function fitView() {
    const box = G.bbox(editor.parcels.map((p) => ({ rings: p.rings })));
    const rect = wrap.getBoundingClientRect();
    const sx = rect.width / (box.w + 800);
    const sy = rect.height / (box.h + 800);
    cam.scale = Math.min(sx, sy);
    cam.x = (box.minX + box.maxX) / 2 - rect.width / 2 / cam.scale;
    cam.y = (box.minY + box.maxY) / 2 - rect.height / 2 / cam.scale;
    editor.viewScale = cam.scale;
    requestRender();
  }

  function resize() {
    const rect = wrap.getBoundingClientRect();
    dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    requestRender();
  }

  // ---------- 命中检测 ----------
  function hitVertex(world) {
    const tol = 8 / cam.scale;
    const p = editor.selectedParcel;
    if (!p) return null;
    for (let ri = 0; ri < p.rings.length; ri++) {
      const ring = p.rings[ri];
      for (let i = 0; i < ring.length; i++) {
        if (G.dist(world, ring[i]) <= tol) return { parcelId: p.id, ringIndex: ri, vertexIndex: i };
      }
    }
    return null;
  }

  function hitEdge(world) {
    const tol = 7 / cam.scale;
    const p = editor.selectedParcel;
    if (!p) return null;
    for (let ri = 0; ri < p.rings.length; ri++) {
      const ring = p.rings[ri];
      for (let i = 0; i < ring.length; i++) {
        const r = G.pointSegDistance(world, ring[i], ring[(i + 1) % ring.length]);
        if (r.dist <= tol) return { parcelId: p.id, ringIndex: ri, edgeIndex: i, point: r.point };
      }
    }
    return null;
  }

  function hitParcel(world) {
    // 后绘制的在上层，倒序检测
    for (let k = editor.parcels.length - 1; k >= 0; k--) {
      const p = editor.parcels[k];
      if (G.pointInPolygon(world, { rings: p.rings })) return p;
    }
    return null;
  }

  function hitAnchorage(world) {
    for (const a of editor.baseData.anchorages) {
      if (G.pointInRing(world, a.ring)) return a;
    }
    return null;
  }

  // ---------- 指针事件 ----------
  function pointerPos(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function onPointerDown(e) {
    canvas.setPointerCapture(e.pointerId);
    const sp = pointerPos(e);
    const wp = toWorld(sp);
    interaction.startScreen = sp;
    interaction.startWorld = wp;
    interaction.lastWorld = wp;
    interaction.moved = false;

    if (e.button === 1 || (e.button === 0 && e.altKey) || (e.button === 2 && editor.tool === 'select')) {
      interaction.mode = 'pan';
      return;
    }

    if (e.button !== 0) return;

    if (editor.tool === 'select') {
      const v = hitVertex(wp);
      if (v) {
        editor.begin('拖动界址点');
        interaction.mode = 'drag-vertex';
        Object.assign(interaction, v);
        return;
      }
      const edge = hitEdge(wp);
      if (edge) {
        editor.begin('拖动边线');
        interaction.mode = 'drag-edge';
        interaction.parcelId = edge.parcelId;
        interaction.ringIndex = edge.ringIndex;
        interaction.edgeIndex = edge.edgeIndex;
        return;
      }
      const parcel = hitParcel(wp);
      if (parcel) editor.selectParcel(parcel.id);
    } else if (editor.tool === 'box') {
      interaction.mode = 'box';
    } else if (editor.tool === 'split-line') {
      interaction.mode = 'split-drawing';
      interaction.splitPts = [];
      interaction.splitAwaiting = true; // 等待第一次单击落点
    } else if (editor.tool === 'split-fairway') {
      editor.splitAlongFairway();
      editor.setTool('select');
    } else if (editor.tool === 'split-coast') {
      editor.splitAlongCoastline();
      editor.setTool('select');
    } else if (editor.tool === 'subtract-anchorage') {
      const anc = hitAnchorage(wp);
      if (anc) editor.subtractAnchorage(anc.id);
      else editor.notify('warn', '请点击一个锚地面');
      editor.setTool('select');
    } else if (editor.tool === 'subtract-fairway') {
      editor.subtractFairway();
      editor.setTool('select');
    }
  }

  function onPointerMove(e) {
    const sp = pointerPos(e);
    const wp = toWorld(sp);
    interaction.hoverWorld = wp;

    if (interaction.mode === 'pan') {
      cam.x -= (sp.x - interaction.startScreen.x) / cam.scale;
      cam.y -= (sp.y - interaction.startScreen.y) / cam.scale;
      interaction.startScreen = sp;
      requestRender();
      return;
    }
    if (interaction.mode === 'drag-vertex') {
      interaction.moved = true;
      const before = editor.parcels
        .find((p) => p.id === interaction.parcelId)
        ?.rings[interaction.ringIndex][interaction.vertexIndex];
      editor.moveVertex(interaction.parcelId, interaction.ringIndex, interaction.vertexIndex, wp);
      const after = editor.parcels.find((p) => p.id === interaction.parcelId)
        ?.rings[interaction.ringIndex][interaction.vertexIndex];
      interaction.hoverSnap = after && G.dist(after, wp) > 1e-6
        ? { point: after, source: editor.snapEnabled ? '已吸附' : null }
        : null;
      requestRender();
      return;
    }
    if (interaction.mode === 'drag-edge') {
      interaction.moved = true;
      const dx = wp.x - interaction.lastWorld.x;
      const dy = wp.y - interaction.lastWorld.y;
      editor.moveEdge(interaction.parcelId, interaction.ringIndex, interaction.edgeIndex, dx, dy);
      interaction.lastWorld = wp;
      requestRender();
      return;
    }
    if (interaction.mode === 'box') {
      interaction.moved = true;
      requestRender();
      return;
    }
    if (interaction.mode === 'split-drawing') {
      requestRender();
      return;
    }

    // 光标提示
    if (editor.tool === 'select') {
      const v = hitVertex(wp);
      const edge = v ? null : hitEdge(wp);
      interaction.cursor = v ? 'grab' : edge ? 'move' : hitParcel(wp) ? 'pointer' : 'default';
    } else if (editor.tool === 'box') {
      interaction.cursor = 'crosshair';
    } else {
      interaction.cursor = 'crosshair';
    }
    canvas.style.cursor = interaction.cursor;
  }

  function onPointerUp(e) {
    const sp = pointerPos(e);
    const wp = toWorld(sp);

    if (interaction.mode === 'box') {
      const a = toWorld(interaction.startScreen);
      const rect = {
        minX: Math.min(a.x, wp.x),
        maxX: Math.max(a.x, wp.x),
        minY: Math.min(a.y, wp.y),
        maxY: Math.max(a.y, wp.y)
      };
      if (G.dist(a, wp) > 5 / cam.scale) editor.boxSelect(rect);
      requestRender();
    } else if (interaction.mode === 'split-drawing') {
      if (interaction.splitAwaiting) {
        // 第一次单击：记录起点
        interaction.splitPts = [interaction.startWorld];
        interaction.splitAwaiting = false;
      } else {
        // 第二次单击：记录终点并执行切割
        interaction.splitPts.push(wp);
        const [a, b] = interaction.splitPts;
        if (G.dist(a, b) > 5 / cam.scale) editor.splitWithLine(a, b);
        else editor.notify('warn', '切割线过短，请重新选择终点');
        interaction.splitPts = [];
        interaction.splitAwaiting = false;
        editor.setTool('select');
      }
    } else if (interaction.mode === 'drag-vertex' || interaction.mode === 'drag-edge') {
      if (!interaction.moved) {
        // 纯点击不产生历史
        editor.history.undoStack.pop();
      }
      interaction.hoverSnap = null;
    }
    interaction.mode = 'idle';
    interaction.parcelId = null;
    interaction.vertexIndex = -1;
    interaction.edgeIndex = -1;
    requestRender();
  }

  function onDblClick(e) {
    if (editor.tool !== 'select') return;
    const wp = toWorld(pointerPos(e));
    const edge = hitEdge(wp);
    if (edge) {
      editor.insertVertex(edge.parcelId, edge.ringIndex, edge.edgeIndex, edge.point);
      requestRender();
    }
  }

  function onContextMenu(e) {
    e.preventDefault();
    if (editor.tool !== 'select') return;
    const wp = toWorld(pointerPos(e));
    const edge = hitEdge(wp);
    if (edge) {
      editor.insertVertex(edge.parcelId, edge.ringIndex, edge.edgeIndex, edge.point);
      requestRender();
    }
  }

  function onWheel(e) {
    e.preventDefault();
    const sp = pointerPos(e);
    const before = toWorld(sp);
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    cam.scale = Math.min(8, Math.max(0.05, cam.scale * factor));
    cam.x = before.x - sp.x / cam.scale;
    cam.y = before.y - sp.y / cam.scale;
    editor.viewScale = cam.scale;
    requestRender();
  }

  function onKey(e) {
    if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
      e.preventDefault();
      editor.undo();
      requestRender();
    } else if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'y' || (e.shiftKey && e.key.toLowerCase() === 'z'))) {
      e.preventDefault();
      editor.redo();
      requestRender();
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      if (interaction.vertexIndex >= 0 && interaction.parcelId) {
        editor.deleteVertex(interaction.parcelId, interaction.ringIndex, interaction.vertexIndex);
        interaction.vertexIndex = -1;
        requestRender();
      }
    } else if (e.key === 'Escape') {
      interaction.splitPts = [];
      interaction.splitAwaiting = false;
      editor.clearBox();
      editor.setTool('select');
      requestRender();
    }
  }

  // 自动重绘订阅
  let unsubscribe = $effect.root(() => {
    $effect(() => {
      // 依赖编辑器状态变化
      void editor.parcels;
      void editor.selectedParcelId;
      void editor.layers;
      void editor.tool;
      void editor.snapEnabled;
      void editor.boxSelectedIds;
      void editor.validation;
      requestRender();
    });
  });

  onMount(() => {
    ctx = canvas.getContext('2d');
    resize();
    fitView();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    window.addEventListener('keydown', onKey);
    onDestroy(() => {
      ro.disconnect();
      window.removeEventListener('keydown', onKey);
      unsubscribe();
      if (raf) cancelAnimationFrame(raf);
    });
  });

  // ---------- 渲染 ----------
  function drawRing(ring, fill, stroke, width = 1.6, dash = null) {
    ctx.beginPath();
    ring.forEach((v, i) => {
      const s = toScreen(v);
      if (i === 0) ctx.moveTo(s.x, s.y);
      else ctx.lineTo(s.x, s.y);
    });
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = width;
      ctx.setLineDash(dash ?? []);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  function render() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#eef3f7';
    ctx.fillRect(0, 0, w, h);
    drawGrid(w, h);

    const L = editor.layers;
    // 养殖区
    if (L.aquaculture) {
      for (const z of editor.baseData.aquacultureZones) {
        drawRing(z.ring, 'rgba(76, 145, 96, 0.12)', '#4c9160', 1.2, [6, 4]);
        const c = toScreen(G.centroid(z.ring));
        label(c.x, c.y, z.name, '#356644', 11);
      }
    }
    // 锚地
    if (L.anchorages) {
      for (const a of editor.baseData.anchorages) {
        drawRing(a.ring, 'rgba(154, 61, 61, 0.14)', '#9a3d3d', 1.4, [4, 3]);
        const c = toScreen(G.centroid(a.ring));
        label(c.x, c.y, `⚓${a.name}`, '#7d2f2f', 11);
      }
    }
    // 航道
    if (L.fairway) {
      const fw = editor.baseData.fairway;
      const corridor = G.bufferPolyline(fw.centerline, fw.width / 2);
      drawRing(corridor, 'rgba(47, 111, 176, 0.08)', 'rgba(47,111,176,0.55)', 1, [8, 5]);
      drawPolyline(fw.centerline, '#2f6fb0', 1.4, [10, 5]);
      const mid = toScreen(fw.centerline[Math.floor(fw.centerline.length / 2)]);
      label(mid.x, mid.y - 10, `${fw.name}（宽${fw.width}m）`, '#245a91', 11);
    }
    // 海岸线
    if (L.coastline) {
      drawPolyline(editor.baseData.coastline, '#6b5a3a', 2.4);
      editor.baseData.coastline.forEach((v) => {
        const s = toScreen(v);
        ctx.beginPath();
        ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#6b5a3a';
        ctx.fill();
      });
      const tip = toScreen(editor.baseData.coastline[2]);
      label(tip.x, tip.y - 14, '海岸线', '#5a4a2e', 12, 'bold');
    }

    // 宗海面
    if (L.parcels) {
      editor.parcels.forEach((p) => {
        const selected = p.id === editor.selectedParcelId;
        const boxed = editor.boxSelectedIds.includes(p.id);
        const issues = editor.issuesOf(p.id);
        const selfHit = issues.some((i) => i.type === '自相交');
        const color = seaTypeColor(p.seaType);
        p.rings.forEach((ring, ri) => {
          if (ri === 0) {
            drawRing(ring, hexA(color, L.seaTypes ? 0.26 : 0.12), selfHit ? '#d12b2b' : selected ? '#0d47a1' : boxed ? '#1565c0' : '#33475b', selected ? 2.4 : 1.6);
          } else {
            drawRing(ring, 'rgba(238,243,247,0.92)', '#7a3b1d', 1.4, [5, 3]);
          }
        });
        const c = toScreen(G.centroid(p.rings[0]));
        label(c.x, c.y, p.id, '#102a43', 12, 'bold');
        if (L.seaTypes) label(c.x, c.y + 14, seaTypeName(p.seaType), color, 11);
        label(c.x, c.y + 28, `${G.polygonArea({ rings: p.rings }).toFixed(1)} m²`, '#51637a', 10);
        if (selfHit) {
          for (const iss of issues.filter((i) => i.type === '自相交')) {
            const s = toScreen(iss.point);
            ctx.beginPath();
            ctx.arc(s.x, s.y, 7, 0, Math.PI * 2);
            ctx.strokeStyle = '#d12b2b';
            ctx.lineWidth = 2.5;
            ctx.stroke();
          }
          label(c.x, c.y - 16, '⚠ 自相交·禁止提交', '#d12b2b', 11, 'bold');
        }
      });
    }

    // 界址点
    if (L.vertices) {
      editor.parcels.forEach((p) => {
        const selected = p.id === editor.selectedParcelId;
        p.rings.forEach((ring, ri) => {
          ring.forEach((v, i) => {
            const s = toScreen(v);
            ctx.beginPath();
            ctx.arc(s.x, s.y, selected ? 4.5 : 3, 0, Math.PI * 2);
            ctx.fillStyle = selected ? '#0d47a1' : '#33475b';
            ctx.fill();
            if (selected) {
              ctx.strokeStyle = '#ffffff';
              ctx.lineWidth = 1.2;
              ctx.stroke();
              label(s.x + 7, s.y - 7, ri === 0 ? `J${i + 1}` : `K${ri}-${i + 1}`, '#0d47a1', 10);
            }
          });
        });
      });
    }

    // 框选矩形
    if (interaction.mode === 'box' && interaction.startScreen) {
      const a = interaction.startScreen;
      const b = pointerPos(lastEvent);
      ctx.strokeStyle = '#1565c0';
      ctx.fillStyle = 'rgba(21,101,192,0.10)';
      ctx.lineWidth = 1.4;
      ctx.fillRect(a.x, a.y, b.x - a.x, b.y - a.y);
      ctx.strokeRect(a.x, a.y, b.x - a.x, b.y - a.y);
    }

    // 切割预览线
    if (interaction.mode === 'split-drawing' && !interaction.splitAwaiting && interaction.splitPts.length) {
      const pts = [...interaction.splitPts, interaction.hoverWorld].filter(Boolean);
      drawPolyline(pts, '#e65100', 2, [7, 4]);
      pts.forEach((pt) => {
        const s = toScreen(pt);
        ctx.beginPath();
        ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#e65100';
        ctx.fill();
      });
    }

    // 吸附标记
    if (interaction.hoverSnap?.point) {
      const s = toScreen(interaction.hoverSnap.point);
      ctx.strokeStyle = '#00897b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 9, 0, Math.PI * 2);
      ctx.stroke();
      label(s.x + 12, s.y - 10, `吸附 ${interaction.hoverSnap.source ?? ''}`, '#00695c', 10, 'bold');
    }
  }

  let lastEvent = { clientX: 0, clientY: 0 };
  function trackEvent(e) {
    lastEvent = e;
  }

  function drawGrid(w, h) {
    const step = 100 * cam.scale;
    if (step < 14) return;
    const ox = -cam.x * cam.scale;
    const oy = -cam.y * cam.scale;
    ctx.strokeStyle = 'rgba(100,125,150,0.14)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = ox % step; x < w; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (let y = oy % step; y < h; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();
  }

  function drawPolyline(line, color, width, dash = null) {
    if (line.length < 2) return;
    ctx.beginPath();
    line.forEach((v, i) => {
      const s = toScreen(v);
      if (i === 0) ctx.moveTo(s.x, s.y);
      else ctx.lineTo(s.x, s.y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.setLineDash(dash ?? []);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function label(x, y, text, color, size = 11, weight = 'normal') {
    ctx.font = `${weight} ${size}px "Microsoft YaHei", sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
  }

  function hexA(hex, alpha) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
  }
</script>

<div class="canvas-wrap" bind:this={wrap}>
  <canvas
    bind:this={canvas}
    onpointerdown={onPointerDown}
    onpointermove={(e) => { trackEvent(e); onPointerMove(e); }}
    onpointerup={onPointerUp}
    ondblclick={onDblClick}
    oncontextmenu={onContextMenu}
    onwheel={onWheel}
  ></canvas>
  <div class="map-tools">
    <button onclick={fitView} title="复位视图">⤢ 复位</button>
    <button onclick={() => { cam.scale *= 1.2; editor.viewScale = cam.scale; requestRender(); }}>＋</button>
    <button onclick={() => { cam.scale /= 1.2; editor.viewScale = cam.scale; requestRender(); }}>－</button>
    <span class="scale-tag">{(cam.scale * 100).toFixed(0)}%</span>
  </div>
  <div class="map-hint">
    {#if editor.tool === 'select'}
      滚轮缩放 · Alt/右键拖动平移 · 拖动界址点/边线编辑 · 双击边线加点 · 右键边线加点 · Del 删点
    {:else if editor.tool === 'box'}
      按住鼠标拖出矩形框选相邻宗海，松开后点工具栏「合并框选宗海」
    {:else if editor.tool === 'split-line'}
      两次单击分别确定切割线起点与终点（Esc 取消）
    {:else if editor.tool === 'subtract-anchorage'}
      单击要扣除的锚地面
    {:else}
      操作完成后自动返回选择模式，Esc 可取消
    {/if}
  </div>
</div>

<style>
  .canvas-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #eef3f7;
  }
  canvas {
    display: block;
    touch-action: none;
  }
  .map-hint {
    position: absolute;
    left: 12px;
    bottom: 10px;
    background: rgba(13, 37, 63, 0.82);
    color: #e8f1fa;
    font-size: 12px;
    padding: 6px 10px;
    border-radius: 6px;
    pointer-events: none;
    max-width: 70%;
  }
  .map-tools {
    position: absolute;
    right: 12px;
    top: 10px;
    display: flex;
    gap: 5px;
    align-items: center;
    background: rgba(255, 255, 255, 0.92);
    border-radius: 6px;
    padding: 4px 6px;
    box-shadow: 0 1px 5px rgba(10, 30, 50, 0.18);
  }
  .map-tools button {
    width: 28px;
    height: 26px;
    border: 1px solid #c2cedb;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    color: #33475b;
  }
  .map-tools button:hover {
    background: #eaf3ff;
  }
  .scale-tag {
    font-size: 11px;
    color: #51637a;
    padding: 0 4px;
    min-width: 42px;
    text-align: center;
  }
</style>
