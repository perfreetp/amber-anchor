<script>
  import { state, toggleLayer, setFloor, LAYER_META } from '../lib/store.svelte.js';
</script>

<aside class="layer-panel">
  <h3>图层树</h3>
  <ul class="layer-list">
    {#each LAYER_META as layer (layer.key)}
      <li class="layer-item" class:off={!state.layers[layer.key]}>
        <label>
          <input type="checkbox" checked={state.layers[layer.key]} onchange={() => toggleLayer(layer.key)} />
          <span class="dot" style="background:{layer.color}"></span>
          <span class="lname">{layer.name}</span>
        </label>
      </li>
    {/each}
  </ul>

  <h3>楼层</h3>
  <div class="floor-list">
    <button class:active={state.floorFilter === 'ALL'} onclick={() => setFloor('ALL')}>全部楼层</button>
    {#each state.floors as fl (fl)}
      <button class:active={state.floorFilter === fl} onclick={() => setFloor(fl)}>{fl}</button>
    {/each}
  </div>

  <h3>渲染状态</h3>
  <div class="perf">
    <div class="perf-row"><span>FPS</span>
      <b class:good={state.stats.fps >= 30} class:bad={state.stats.fps < 30}>{state.stats.fps}</b>
    </div>
    <div class="perf-row"><span>视口要素</span><b>{state.stats.features}</b></div>
    <div class="perf-row"><span>可见瓦片</span><b>{state.stats.tiles}</b></div>
    <div class="perf-row"><span>瓦片缓存</span><b>{state.stats.cacheSize}</b></div>
  </div>
  <p class="perf-tip">瓦片按缩放分桶预渲染到 OffscreenCanvas，交互帧仅 drawImage 视口内瓦片。</p>
</aside>

<style>
  .layer-panel {
    width: 230px; min-width: 230px; height: 100%; overflow-y: auto;
    background: #141a23; border-left: 1px solid #232c38; padding: 14px;
    display: flex; flex-direction: column; gap: 6px;
  }
  h3 {
    margin: 12px 0 6px; font-size: 12px; font-weight: 600; color: #7f8ea3;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  h3:first-child { margin-top: 0; }
  .layer-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
  .layer-item label {
    display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 6px;
    cursor: pointer; font-size: 13px; color: #d7e0ec;
  }
  .layer-item label:hover { background: #1c2531; }
  .layer-item.off .lname { color: #647186; text-decoration: line-through; }
  .dot { width: 10px; height: 10px; border-radius: 3px; flex: none; }
  input[type='checkbox'] { accent-color: #4da3ff; }
  .lname { flex: 1; }
  .floor-list { display: flex; flex-wrap: wrap; gap: 6px; }
  .floor-list button {
    padding: 4px 10px; border-radius: 5px; border: 1px solid #2c3542;
    background: #18202c; color: #aebccd; font-size: 12px; cursor: pointer;
  }
  .floor-list button.active { border-color: #4da3ff; color: #4da3ff; background: rgba(77,163,255,0.12); }
  .perf { background: #10161e; border: 1px solid #232c38; border-radius: 8px; padding: 8px 10px; }
  .perf-row { display: flex; justify-content: space-between; font-size: 12px; padding: 2px 0; color: #93a1b5; }
  .perf-row b { color: #e6ecf5; font-weight: 600; }
  .perf-row b.good { color: #33d17a; }
  .perf-row b.bad { color: #ff453a; }
  .perf-tip { font-size: 11px; color: #5e6c80; line-height: 1.5; margin: 6px 0 0; }
</style>
