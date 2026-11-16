<script>
  import { editor } from '../lib/store.svelte.js';
  import { SEA_USE_TYPES } from '../lib/sample-data.js';
  import * as G from '../lib/geometry.js';
  import ThreePreview from './ThreePreview.svelte';

  let tab = $state('props'); // props | vertices | 3d
  let ringTab = $state(0);

  const p = $derived(editor.selectedParcel);
  const closure = $derived(p ? G.closureErrors(p.rings[0]) : null);
  $effect(() => {
    if (p && ringTab >= p.rings.length) ringTab = 0;
  });
</script>

<aside class="right-panel">
  <div class="tabs">
    <button class:on={tab === 'props'} onclick={() => (tab = 'props')}>宗海属性</button>
    <button class:on={tab === 'vertices'} onclick={() => (tab = 'vertices')}>界址点表</button>
    <button class:on={tab === '3d'} onclick={() => (tab = '3d')}>斜视预览</button>
  </div>

  {#if !p}
    <div class="empty">未选择宗海，请在左侧列表或画布中点选</div>
  {:else if tab === 'props'}
    <div class="body">
      {#each editor.issuesOf(p.id) as issue (issue.detail)}
        <div class="issue issue-{issue.type === '自相交' ? 'err' : 'warn'}">
          ⚠ {issue.type}：{issue.detail}
          {#if issue.type === '自相交'}<div>该宗海已被系统阻止提交质检，请先拖动节点修正。</div>{/if}
        </div>
      {/each}

      <label class="field">
        <span>宗海编号</span>
        <input value={p.id} readonly />
      </label>
      <label class="field">
        <span>申请人 / 项目</span>
        <input value={p.applicant} onchange={(e) => editor.updateParcelProps(p.id, { applicant: e.target.value })} />
      </label>
      <label class="field">
        <span>用海类型</span>
        <select value={p.seaType} onchange={(e) => editor.updateParcelProps(p.id, { seaType: e.target.value })}>
          {#each SEA_USE_TYPES as t (t.code)}
            <option value={t.code}>{t.code} {t.name}</option>
          {/each}
        </select>
      </label>
      <label class="field">
        <span>用海高程（m，三维拉伸）</span>
        <input
          type="number"
          min="1"
          max="200"
          value={p.elevation}
          onchange={(e) => editor.updateParcelProps(p.id, { elevation: Number(e.target.value) || 10 })}
        />
      </label>

      <div class="stat-grid">
        <div><small>净面积</small><strong>{G.polygonArea({ rings: p.rings }).toFixed(2)}</strong><em>m²</em></div>
        <div><small>外轮廓周长</small><strong>{G.ringLength(p.rings[0]).toFixed(2)}</strong><em>m</em></div>
        <div><small>界址点</small><strong>{p.rings.reduce((s, r) => s + r.length, 0)}</strong><em>个</em></div>
        <div><small>孔洞</small><strong>{p.rings.length - 1}</strong><em>处</em></div>
      </div>

      {#if p.rings.length > 1}
        <div class="holes">
          <h4>孔洞（航道/锚地扣减）</h4>
          {#each p.rings.slice(1) as hole, hi (hi)}
            <div class="hole-row">
              孔洞{hi + 1}：{hole.length} 点 · {G.ringArea(hole).toFixed(2)} m²
            </div>
          {/each}
        </div>
      {/if}

      <button class="danger-btn" onclick={() => editor.deleteParcel(p.id)}>删除该宗海</button>
    </div>
  {:else if tab === 'vertices'}
    <div class="body">
      <div class="ring-switch">
        <button class:on={ringTab === 0} onclick={() => (ringTab = 0)}>外轮廓（{p.rings[0].length}点）</button>
        {#each p.rings.slice(1) as ring, ri (ri)}
          <button class:on={ringTab === ri + 1} onclick={() => (ringTab = ri + 1)}>孔洞{ri + 1}（{ring.length}点）</button>
        {/each}
      </div>
      <div class="coord-table">
        <table>
          <thead><tr><th>点号</th><th>X (m)</th><th>Y (m)</th><th>操作</th></tr></thead>
          <tbody>
            {#each p.rings[ringTab] as v, i (i)}
              <tr>
                <td>{ringTab === 0 ? `J${i + 1}` : `K${ringTab}-${i + 1}`}</td>
                <td>
                  <input
                    type="number"
                    value={v.x.toFixed(3)}
                    onchange={(e) => {
                      editor.begin('坐标输入修改界址点');
                      v.x = Number(e.target.value);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={v.y.toFixed(3)}
                    onchange={(e) => {
                      editor.begin('坐标输入修改界址点');
                      v.y = Number(e.target.value);
                    }}
                  />
                </td>
                <td>
                  <button
                    class="mini-del"
                    disabled={p.rings[ringTab].length <= 3}
                    onclick={() => editor.deleteVertex(p.id, ringTab, i)}
                  >删点</button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      {#if closure}
        <div class="closure" class:bad={closure.area > 1}>
          线性闭合差 {closure.linear.toFixed(3)} m ｜ 面积闭合差 <strong>{closure.area.toFixed(3)} m²</strong>
          {#if closure.area > 1}<span>（超 1 m²，导出时将被单独列出）</span>{/if}
        </div>
      {/if}
    </div>
  {:else}
    <div class="three-host">
      <ThreePreview />
    </div>
  {/if}
</aside>

<style>
  .right-panel {
    width: 320px;
    min-width: 320px;
    background: #f0f4f8;
    border-left: 1px solid #d5dee8;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .tabs {
    display: flex;
  }
  .tabs button {
    flex: 1;
    padding: 10px 4px;
    border: none;
    background: #dde7f0;
    color: #3d5268;
    font-size: 12.5px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
  }
  .tabs button.on {
    background: #fff;
    color: #0d47a1;
    font-weight: 700;
    border-bottom-color: #1565c0;
  }
  .body {
    padding: 12px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .empty {
    padding: 30px 16px;
    color: #7a8ca0;
    font-size: 13px;
    text-align: center;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
    color: #51637a;
  }
  .field input,
  .field select {
    padding: 6px 8px;
    border: 1px solid #c2cedb;
    border-radius: 5px;
    font-size: 12.5px;
  }
  .field input[readonly] {
    background: #eef2f6;
    color: #62748a;
  }
  .stat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .stat-grid div {
    background: #fff;
    border: 1px solid #dde5ee;
    border-radius: 6px;
    padding: 8px;
  }
  .stat-grid small {
    display: block;
    color: #7a8ca0;
    font-size: 11px;
  }
  .stat-grid strong {
    font-size: 16px;
    color: #102a43;
  }
  .stat-grid em {
    font-style: normal;
    font-size: 11px;
    color: #7a8ca0;
    margin-left: 3px;
  }
  .issue {
    border-radius: 6px;
    padding: 8px 10px;
    font-size: 12px;
    line-height: 1.5;
  }
  .issue-err {
    background: #fdecea;
    color: #b71c1c;
    border: 1px solid #f2b8b5;
  }
  .issue-warn {
    background: #fff6e5;
    color: #8a5a00;
    border: 1px solid #f0d399;
  }
  .holes h4 {
    margin: 0 0 6px;
    font-size: 12.5px;
    color: #102a43;
  }
  .hole-row {
    background: #fff;
    border: 1px solid #dde5ee;
    border-radius: 5px;
    padding: 6px 9px;
    font-size: 12px;
    color: #5a4020;
    margin-bottom: 5px;
  }
  .danger-btn {
    background: #fff;
    color: #c62828;
    border: 1px solid #e0a4a4;
    border-radius: 6px;
    padding: 7px;
    cursor: pointer;
    font-size: 12.5px;
  }
  .danger-btn:hover {
    background: #fdecea;
  }
  .ring-switch {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
  .ring-switch button {
    font-size: 11.5px;
    border: 1px solid #c2cedb;
    background: #fff;
    border-radius: 12px;
    padding: 3px 10px;
    cursor: pointer;
  }
  .ring-switch button.on {
    background: #1565c0;
    color: #fff;
    border-color: #1565c0;
  }
  .coord-table {
    border: 1px solid #dde5ee;
    border-radius: 6px;
    overflow: auto;
    max-height: 46vh;
    background: #fff;
  }
  .coord-table table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11.5px;
  }
  .coord-table th,
  .coord-table td {
    padding: 4px 6px;
    border-bottom: 1px solid #edf1f5;
  }
  .coord-table input {
    width: 86px;
    padding: 3px 5px;
    border: 1px solid #cdd8e3;
    border-radius: 4px;
    font-size: 11.5px;
  }
  .mini-del {
    border: 1px solid #e0a4a4;
    background: #fff;
    color: #c62828;
    border-radius: 4px;
    font-size: 11px;
    padding: 2px 7px;
    cursor: pointer;
  }
  .mini-del:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .closure {
    font-size: 12px;
    background: #eaf6ec;
    border: 1px solid #b5dbbc;
    color: #2e5c34;
    border-radius: 6px;
    padding: 8px 10px;
  }
  .closure.bad {
    background: #fdecea;
    border-color: #f2b8b5;
    color: #b71c1c;
  }
  .three-host {
    flex: 1;
    min-height: 0;
  }
</style>
