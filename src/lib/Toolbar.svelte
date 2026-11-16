<script>
  import { editor } from '../lib/store.svelte.js';
  import { HISTORY_LIMIT } from '../lib/history.js';
  import { exportMapSVG, exportCoordinateTable } from '../lib/export.js';

  let showClosure = $state(false);
  let closureRows = $state([]);
  let closureBadCount = $state(0);

  const tools = [
    { key: 'select', label: '选择/节点编辑', icon: '✥' },
    { key: 'box', label: '框选宗海', icon: '⬚' }
  ];
  const ops = [
    { key: 'split-line', label: '直线切割', icon: '✂' },
    { key: 'split-coast', label: '沿岸线切割', icon: '〰' },
    { key: 'split-fairway', label: '沿航道切割', icon: '⇄' },
    { key: 'subtract-anchorage', label: '扣锚地(孔洞)', icon: '◔' },
    { key: 'subtract-fairway', label: '扣航道(孔洞)', icon: '⊝' }
  ];

  let hState = $state({ undo: 0, redo: 0, undoLabel: '', redoLabel: '' });
  const unsub = $effect.root(() => {
    $effect(() => {
      void editor.parcels;
      hState = {
        undo: editor.history.sizes().undo,
        redo: editor.history.sizes().redo,
        undoLabel: editor.history.undoLabel(),
        redoLabel: editor.history.redoLabel()
      };
    });
  });

  function mergeBoxed() {
    editor.mergeSelected();
  }

  function runExportCheck() {
    closureRows = editor.closureReport();
    closureBadCount = closureRows.filter((r) => r.exceed).length;
    showClosure = true;
  }

  function confirmExport() {
    const badIds = closureRows.filter((r) => r.exceed).map((r) => r.id);
    exportMapSVG(editor.parcels, badIds);
    exportCoordinateTable(editor.parcels);
    editor.notify('ok', '已导出 1:5000 SVG 宗海图与界址点坐标表 CSV');
    showClosure = false;
  }
</script>

<header class="toolbar">
  <div class="brand">
    <span class="logo">海</span>
    <div>
      <strong>宗海图矢量编辑与出图系统</strong>
      <small>县自然资源和规划局 · 用海审核平台</small>
    </div>
  </div>

  <div class="group">
    {#each tools as t (t.key)}
      <button class="tool" class:active={editor.tool === t.key} title={t.label} onclick={() => editor.setTool(t.key)}>
        <span class="ic">{t.icon}</span>{t.label}
      </button>
    {/each}
    <button class="tool" disabled={editor.boxSelectedIds.length < 2} onclick={mergeBoxed} title="框选至少两宗相邻宗海">
      <span class="ic">⊕</span>合并框选宗海
      {#if editor.boxSelectedIds.length}<em class="pill">{editor.boxSelectedIds.length}</em>{/if}
    </button>
  </div>

  <div class="group">
    {#each ops as op (op.key)}
      <button
        class="tool"
        class:active={editor.tool === op.key}
        class:danger={op.key.startsWith('subtract')}
        title={op.label}
        onclick={() => editor.setTool(op.key === editor.tool ? 'select' : op.key)}
      >
        <span class="ic">{op.icon}</span>{op.label}
      </button>
    {/each}
  </div>

  <div class="group">
    <button class="tool" disabled={!hState.undo} title={`撤销 ${hState.undoLabel}（Ctrl+Z）`} onclick={() => editor.undo()}>
      <span class="ic">↶</span>撤销
      <em class="pill">{hState.undo}/{HISTORY_LIMIT}</em>
    </button>
    <button class="tool" disabled={!hState.redo} title={`重做 ${hState.redoLabel}（Ctrl+Y）`} onclick={() => editor.redo()}>
      <span class="ic">↷</span>重做
      <em class="pill">{hState.redo}</em>
    </button>
    <label class="snap-switch">
      <input type="checkbox" bind:checked={editor.snapEnabled} />
      吸附 {editor.snapEnabled ? '开' : '关'}
    </label>
  </div>

  <div class="group">
    <button class="tool export" onclick={runExportCheck}>
      <span class="ic">⤓</span>出图 1:5000（SVG+坐标表）
    </button>
  </div>
</header>

{#if showClosure}
  <div class="modal-mask" onclick={() => (showClosure = false)}>
    <div class="modal" onclick={(e) => e.stopPropagation()}>
      <h3>导出前检查：面积闭合差（阈值 1 m²）</h3>
      <p class="sub">
        共 {closureRows.length} 宗，超差 <strong class:bad={closureBadCount > 0}>{closureBadCount}</strong> 宗。
        超差宗海将在 SVG 中以红色轮廓单独标出，坐标表仍包含全部界址点。
      </p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>宗海编号</th><th>申请人</th><th>线性闭合差(m)</th><th>面积闭合差(m²)</th><th>结论</th></tr>
          </thead>
          <tbody>
            {#each closureRows as r (r.id)}
              <tr class:badrow={r.exceed}>
                <td>{r.id}</td>
                <td>{r.applicant}</td>
                <td>{r.linear.toFixed(3)}</td>
                <td>{r.area.toFixed(3)}</td>
                <td>{#if r.exceed}<span class="bad">⚠ 超 1 m²，单独列出</span>{:else}<span class="ok">合格</span>{/if}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div class="modal-actions">
        <button class="btn-ghost" onclick={() => (showClosure = false)}>取消</button>
        <button class="btn-primary" onclick={confirmExport}>确认导出 SVG 与坐标表</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .toolbar {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 8px 14px;
    background: linear-gradient(180deg, #103a63, #0d2c4d);
    color: #e8f1fa;
    flex-wrap: wrap;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-right: 6px;
  }
  .brand .logo {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: #1e7cc1;
    display: grid;
    place-items: center;
    font-size: 18px;
    font-weight: 800;
  }
  .brand strong {
    display: block;
    font-size: 14px;
  }
  .brand small {
    display: block;
    font-size: 10.5px;
    color: #a9c6e2;
  }
  .group {
    display: flex;
    gap: 5px;
    align-items: center;
    padding-left: 12px;
    border-left: 1px solid rgba(255, 255, 255, 0.16);
  }
  button.tool {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: #dbe9f7;
    font-size: 12px;
    padding: 5px 9px;
    border-radius: 6px;
    cursor: pointer;
    white-space: nowrap;
  }
  button.tool:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.18);
  }
  button.tool:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  button.tool.active {
    background: #1e7cc1;
    border-color: #7cc0f2;
  }
  button.tool.danger.active {
    background: #b3472d;
    border-color: #e08a72;
  }
  button.tool.export {
    background: #1b7a4b;
    border-color: #35a06b;
    font-weight: 700;
  }
  .ic {
    font-size: 13px;
  }
  .pill {
    font-style: normal;
    background: rgba(255, 255, 255, 0.18);
    border-radius: 9px;
    padding: 0 6px;
    font-size: 10.5px;
  }
  .snap-switch {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 4px;
    cursor: pointer;
  }
  .modal-mask {
    position: fixed;
    inset: 0;
    background: rgba(8, 22, 38, 0.55);
    display: grid;
    place-items: center;
    z-index: 50;
  }
  .modal {
    background: #fff;
    border-radius: 10px;
    width: min(760px, 92vw);
    max-height: 82vh;
    display: flex;
    flex-direction: column;
    padding: 18px 20px;
    color: #102a43;
  }
  .modal h3 {
    margin: 0 0 6px;
  }
  .sub {
    font-size: 12.5px;
    color: #51637a;
    margin: 0 0 10px;
  }
  .bad {
    color: #c62828;
    font-weight: 700;
  }
  .ok {
    color: #2e7d32;
  }
  .table-wrap {
    overflow: auto;
    border: 1px solid #dde5ee;
    border-radius: 6px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12.5px;
  }
  th,
  td {
    padding: 7px 10px;
    border-bottom: 1px solid #e7edf3;
    text-align: left;
  }
  th {
    background: #f0f4f8;
    position: sticky;
    top: 0;
  }
  tr.badrow {
    background: #fdecea;
  }
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 14px;
  }
  .btn-ghost,
  .btn-primary {
    padding: 7px 16px;
    border-radius: 6px;
    font-size: 13px;
    cursor: pointer;
  }
  .btn-ghost {
    background: #fff;
    border: 1px solid #b8c6d4;
    color: #33475b;
  }
  .btn-primary {
    background: #1565c0;
    border: 1px solid #0d47a1;
    color: #fff;
  }
</style>
