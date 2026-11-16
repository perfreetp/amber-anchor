<script>
  import { onMount, onDestroy } from 'svelte';
  import { TileRenderer } from '../lib/renderer.js';
  import { SpatialIndex } from '../lib/spatial.js';
  import { state as qcState, registerRenderer, getFeature, findLinkedExits } from '../lib/store.svelte.js';

  let wrapEl, canvasEl, renderer;
  let tip = $state({ visible: false, x: 0, y: 0, rows: [] });

  const getState = () => ({ layers: qcState.layers, floorFilter: qcState.floorFilter, scale: renderer?.scale ?? 1 });

  onMount(() => {
    renderer = new TileRenderer(canvasEl, new SpatialIndex([]), getState);
    registerRenderer(renderer);
    // store 完成 loadBatch 后发事件，画布适配数据范围
    const fit = () => {
      const idx = renderer.index;
      if (idx?.bounds && idx.features.length) {
        const b = idx.bounds;
        renderer.cx = (b.minX + b.maxX) / 2;
        renderer.cy = (b.minY + b.maxY) / 2;
        const vw = wrapEl.clientWidth, vh = wrapEl.clientHeight;
        renderer.scale = Math.min(vw / (b.maxX - b.minX), vh / (b.maxY - b.minY)) * 0.9;
      }
    };
    window.addEventListener('qc:data-loaded', fit);

    // ---- 平移 ----
    let dragging = false, moved = false, lastX = 0, lastY = 0;
    const down = (e) => {
      dragging = true; moved = false;
      lastX = e.clientX; lastY = e.clientY;
      canvasEl.setPointerCapture(e.pointerId);
    };
    const move = (e) => {
      const rect = canvasEl.getBoundingClientRect();
      const sx = e.clientX - rect.left, sy = e.clientY - rect.top;
      if (dragging) {
        const dx = e.clientX - lastX, dy = e.clientY - lastY;
        if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
        renderer.cx -= dx / renderer.scale;
        renderer.cy -= dy / renderer.scale;
        lastX = e.clientX; lastY = e.clientY;
        return;
      }
      // 悬停命中
      const hits = renderer.pick(sx, sy);
      renderer.hover = hits[0] || null;
      if (hits[0]) {
        tip = { visible: true, x: sx + 14, y: sy + 14, rows: buildAttrs(hits[0]) };
      } else {
        tip.visible = false;
      }
    };
    const up = (e) => {
      if (!dragging) return;
      dragging = false;
      if (!moved) handleClick(e);
    };
    const leave = () => { renderer.hover = null; tip.visible = false; };

    // ---- 滚轮缩放（以鼠标为锚点）----
    const wheel = (e) => {
      e.preventDefault();
      const rect = canvasEl.getBoundingClientRect();
      const sx = e.clientX - rect.left, sy = e.clientY - rect.top;
      const [wxBefore, wyBefore] = renderer.screenToWorld(sx, sy);
      const factor = Math.exp(-e.deltaY * 0.0015);
      renderer.scale = Math.min(64, Math.max(0.08, renderer.scale * factor));
      const [wxAfter, wyAfter] = renderer.screenToWorld(sx, sy);
      renderer.cx += wxBefore - wxAfter;
      renderer.cy += wyBefore - wyAfter;
    };

    const dblclick = (e) => {
      const rect = canvasEl.getBoundingClientRect();
      const sx = e.clientX - rect.left, sy = e.clientY - rect.top;
      const [wx, wy] = renderer.screenToWorld(sx, sy);
      renderer.scale = Math.min(64, renderer.scale * 2);
      renderer.cx = wx - (sx - canvasEl.clientWidth / 2) / renderer.scale;
      renderer.cy = wy - (sy - canvasEl.clientHeight / 2) / renderer.scale;
    };

    // ---- 点选：Shift 多选，普通单击替换；多选用包围框 + 关联出口 ----
    const handleClick = (e) => {
      const rect = canvasEl.getBoundingClientRect();
      const sx = e.clientX - rect.left, sy = e.clientY - rect.top;
      const hits = renderer.pick(sx, sy);
      if (!hits.length) {
        renderer.selected.clear();
        renderer.linkedExits = [];
        qcState.selection = { ids: [], linkedExits: [] };
        return;
      }
      if (e.shiftKey && renderer.selected.size) {
        for (const h of hits) renderer.selected.add(h.id);
      } else {
        renderer.selected = new Set(hits.map((h) => h.id));
      }
      const selFeats = [...renderer.selected].map(getFeature).filter(Boolean);
      const linked = findLinkedExits(selFeats);
      renderer.linkedExits = linked.filter((f) => !renderer.selected.has(f.id));
      qcState.selection = { ids: [...renderer.selected], linkedExits: renderer.linkedExits.map((f) => f.id) };
    };

    canvasEl.addEventListener('pointerdown', down);
    canvasEl.addEventListener('pointermove', move);
    canvasEl.addEventListener('pointerup', up);
    canvasEl.addEventListener('pointerleave', leave);
    canvasEl.addEventListener('wheel', wheel, { passive: false });
    canvasEl.addEventListener('dblclick', dblclick);

    // FPS / 统计上报
    const statTimer = setInterval(() => {
      qcState.stats = {
        ...renderer.visibleStats,
        fps: Math.round(renderer.fps)
      };
    }, 500);

    return () => {
      clearInterval(statTimer);
      window.removeEventListener('qc:data-loaded', fit);
      canvasEl.removeEventListener('pointerdown', down);
      canvasEl.removeEventListener('pointermove', move);
      canvasEl.removeEventListener('pointerup', up);
      canvasEl.removeEventListener('pointerleave', leave);
      canvasEl.removeEventListener('wheel', wheel);
      canvasEl.removeEventListener('dblclick', dblclick);
      renderer.destroy();
    };
  });

  function buildAttrs(f) {
    const rows = [
      ['类型', ({ building: '建筑轮廓', room: '房间', stair: '楼梯', exit: '出口', extinguisher: '灭火器', camera: '监控', fireLane: '消防通道' })[f.type]],
      ['ID', f.id],
      ['楼栋/楼层', `${f.buildingId || '—'} / ${f.floor || '—'}`]
    ];
    if (f.roomNo) rows.push(['房间编号', f.roomNo]);
    if (f.name) rows.push(['名称', f.name]);
    if (f.exitNo) rows.push(['出口编号', f.exitNo]);
    if (f.width != null && f.type === 'exit') rows.push(['宽度', f.width + ' m']);
    if (f.code) rows.push(['器材编码', f.code]);
    if (f.capacity != null) rows.push(['容量', f.capacity + ' kg']);
    if (f.camNo) rows.push(['监控编号', f.camNo]);
    if (f.stairNo) rows.push(['楼梯编号', f.stairNo]);
    if (f.laneNo) rows.push(['通道编号', f.laneNo]);
    if (f.width != null && f.type === 'fireLane') rows.push(['通道宽度', f.width + ' m']);
    if (f.area != null) rows.push(['面积', f.area + ' ㎡']);
    const b = f._bounds;
    if (b) rows.push(['尺寸', `${(b.maxX - b.minX).toFixed(1)} × ${(b.maxY - b.minY).toFixed(1)} m`]);
    return rows;
  }

  const zoomBy = (factor) => {
    if (!renderer) return;
    const [wx, wy] = renderer.screenToWorld(wrapEl.clientWidth / 2, wrapEl.clientHeight / 2);
    renderer.scale = Math.min(64, Math.max(0.08, renderer.scale * factor));
    renderer.cx = wx;
    renderer.cy = wy;
  };
</script>

<div class="map-wrap" bind:this={wrapEl}>
  <canvas bind:this={canvasEl} class="map-canvas"></canvas>

  <div class="zoom-bar">
    <button onclick={() => zoomBy(1.4)} title="放大">＋</button>
    <button onclick={() => zoomBy(1 / 1.4)} title="缩小">－</button>
  </div>

  <div class="scale-hint">
    缩放 {renderer ? renderer.scale.toFixed(2) : '1.00'}×
    {#if renderer && renderer.scale < 2}<span class="lod">简化 LOD · 色块+数量</span>{:else}<span class="lod detail">房间级 · 编号+尺寸</span>{/if}
  </div>

  {#if tip.visible}
    <div class="tooltip" style="left:{Math.min(tip.x, wrapEl?.clientWidth - 240 || tip.x)}px;top:{tip.y}px">
      {#each tip.rows as [k, v]}
        <div class="tt-row"><span class="tt-k">{k}</span><span class="tt-v">{v}</span></div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .map-wrap { position: relative; width: 100%; height: 100%; overflow: hidden; background: #10141b; }
  .map-canvas { display: block; width: 100%; height: 100%; cursor: grab; touch-action: none; }
  .map-canvas:active { cursor: grabbing; }
  .zoom-bar {
    position: absolute; right: 12px; bottom: 12px; display: flex; flex-direction: column; gap: 4px;
  }
  .zoom-bar button {
    width: 34px; height: 34px; border-radius: 6px; border: 1px solid #2c3542;
    background: rgba(22,28,38,0.92); color: #dce4f0; font-size: 18px; cursor: pointer;
  }
  .zoom-bar button:hover { border-color: #4da3ff; color: #4da3ff; }
  .scale-hint {
    position: absolute; left: 12px; bottom: 12px; font-size: 12px; color: #93a1b5;
    background: rgba(22,28,38,0.85); padding: 5px 10px; border-radius: 6px; display: flex; gap: 8px; align-items: center;
  }
  .lod { color: #ffcc00; }
  .lod.detail { color: #33d17a; }
  .tooltip {
    position: absolute; z-index: 20; min-width: 180px; max-width: 240px;
    background: rgba(16,20,27,0.96); border: 1px solid #33404f; border-radius: 8px;
    padding: 8px 10px; font-size: 12px; pointer-events: none; box-shadow: 0 6px 20px rgba(0,0,0,0.45);
  }
  .tt-row { display: flex; justify-content: space-between; gap: 12px; padding: 1.5px 0; }
  .tt-k { color: #8292a8; white-space: nowrap; }
  .tt-v { color: #e6ecf5; text-align: right; word-break: break-all; }
</style>
