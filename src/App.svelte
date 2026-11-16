<script>
  import { onMount } from 'svelte';
  import Toolbar from './lib/Toolbar.svelte';
  import LeftPanel from './lib/LeftPanel.svelte';
  import RightPanel from './lib/RightPanel.svelte';
  import WorkflowPanel from './lib/WorkflowPanel.svelte';
  import CanvasEditor from './lib/CanvasEditor.svelte';
  import NoticeToast from './lib/NoticeToast.svelte';
  import { editor } from './lib/store.svelte.js';

  onMount(() => {
    editor.notify('ok', '系统就绪：示例含 3 宗宗海、海岸线、主航道与 2 处锚地');
  });
</script>

<div class="app-shell">
  <Toolbar />
  <div class="workspace">
    <LeftPanel />
    <main class="map-area">
      <CanvasEditor />
    </main>
    <RightPanel />
  </div>
  <WorkflowPanel />
  <NoticeToast />
</div>

<style>
  .app-shell {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }
  .workspace {
    flex: 1;
    min-height: 0;
    display: flex;
  }
  .map-area {
    flex: 1;
    min-width: 0;
    position: relative;
  }
</style>
