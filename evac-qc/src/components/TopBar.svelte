<script>
  import { state } from '../lib/store.svelte.js';

  const statusClass = $derived({
    checking: 'st-checking', reviewing: 'st-reviewing',
    hold: 'st-hold', released: 'st-released'
  }[state.batchStatus] || 'st-empty');
</script>

<header class="topbar">
  <div class="brand">
    <span class="logo">🧯</span>
    <div>
      <div class="title">校园疏散指示图 · 分层渲染与批次质检</div>
      <div class="subtitle">Svelte 5 + Canvas2D + OffscreenCanvas 瓦片预渲染</div>
    </div>
  </div>
  <div class="batch-state">
    <span class="state-dot {statusClass}"></span>
    <span class="state-text">{state.statusText}</span>
  </div>
</header>

<style>
  .topbar {
    height: 54px; min-height: 54px; display: flex; align-items: center;
    justify-content: space-between; padding: 0 18px;
    background: #141b26; border-bottom: 1px solid #232c38;
  }
  .brand { display: flex; align-items: center; gap: 10px; }
  .logo { font-size: 22px; }
  .title { font-size: 15px; font-weight: 700; color: #eaf0f8; }
  .subtitle { font-size: 11px; color: #6d7c91; margin-top: 1px; }
  .batch-state { display: flex; align-items: center; gap: 8px; max-width: 46%; }
  .state-text { font-size: 12.5px; color: #b6c2d2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .state-dot { width: 9px; height: 9px; border-radius: 50%; flex: none; }
  .st-empty { background: #647186; }
  .st-checking { background: #4da3ff; animation: pulse 1s infinite; }
  .st-reviewing { background: #ffcc00; }
  .st-hold { background: #ff453a; }
  .st-released { background: #33d17a; }
  @keyframes pulse { 50% { opacity: 0.3; } }
</style>
