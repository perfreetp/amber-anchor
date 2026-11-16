<script>
  import TopBar from './components/TopBar.svelte';
  import QcPanel from './components/QcPanel.svelte';
  import MapCanvas from './components/MapCanvas.svelte';
  import LayerTree from './components/LayerTree.svelte';
  import { state } from './lib/store.svelte.js';
</script>

<div class="app">
  <TopBar />
  <main class="workspace">
    <QcPanel />
    <section class="map-area">
      <MapCanvas />
      {#if state.selection.ids.length}
        <div class="sel-banner">
          已框选 {state.selection.ids.length} 个要素
          {#if state.selection.linkedExits.length}
            · 关联同编号出口 {state.selection.linkedExits.length} 处（黄色高亮）
          {/if}
        </div>
      {/if}
    </section>
    <LayerTree />
  </main>
</div>

<style>
  .app { display: flex; flex-direction: column; height: 100vh; width: 100vw; overflow: hidden; }
  .workspace { flex: 1; display: flex; min-height: 0; }
  .map-area { flex: 1; position: relative; min-width: 0; }
  .sel-banner {
    position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
    background: rgba(16,20,27,0.9); border: 1px solid #40c4ff; color: #9fddff;
    font-size: 12px; padding: 6px 14px; border-radius: 20px; pointer-events: none; z-index: 10;
  }
</style>
