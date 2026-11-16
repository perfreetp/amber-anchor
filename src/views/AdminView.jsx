import { createSignal, createMemo, For, Show } from 'solid-js';
import { state, setState, bomFor, projectTotal, addCatalogItem, updateCatalogItem, deleteCatalogItem, setProjectStatus, deleteProject } from '../store.js';
import { CATEGORIES, CATEGORY_KEYS } from '../catalog.js';

export default function AdminView() {
  const [tab, setTab] = createSignal('library');
  return (
    <div class="admin">
      <div class="admin-tabs">
        <button classList={{ on: tab() === 'library' }} onClick={() => setTab('library')}>素材库</button>
        <button classList={{ on: tab() === 'review' }} onClick={() => setTab('review')}>方案审查</button>
        <button classList={{ on: tab() === 'rollup' }} onClick={() => setTab('rollup')}>项目汇总</button>
      </div>
      <Show when={tab() === 'library'}><LibraryAdmin /></Show>
      <Show when={tab() === 'review'}><ReviewAdmin /></Show>
      <Show when={tab() === 'rollup'}><RollupAdmin /></Show>
    </div>
  );
}

/* ---------------- 素材库：运营配置型号与单价 ---------------- */
function LibraryAdmin() {
  const blank = { category: 'rotor', name: '', model: '', price: 0, radius: 0.3, sprayRange: 6, sprayArc: 180 };
  const [draft, setDraft] = createSignal({ ...blank });

  const patchDraft = (k, v) => setDraft((d) => ({ ...d, [k]: v }));

  function submit(e) {
    e.preventDefault();
    const d = draft();
    if (!d.name || !d.model) return;
    const item = {
      category: d.category, name: d.name, model: d.model,
      price: Number(d.price) || 0, radius: Number(d.radius) || 0.3,
    };
    if (CATEGORIES[d.category]?.spray) {
      item.sprayRange = Number(d.sprayRange) || 6;
      item.sprayArc = Number(d.sprayArc) || 180;
    }
    addCatalogItem(item);
    setDraft({ ...blank });
  }

  return (
    <div class="library-admin">
      <h3>素材型号与单价配置</h3>
      <table class="admin-table">
        <thead>
          <tr>
            <th>类别</th><th>名称</th><th>型号</th><th>单价(¥)</th>
            <th>占位半径(m)</th><th>射程(m)</th><th>喷洒角(°)</th><th></th>
          </tr>
        </thead>
        <tbody>
          <For each={state.catalog}>
            {(item) => {
              const spray = CATEGORIES[item.category]?.spray;
              const num = (v) => Number(v) || 0;
              return (
                <tr>
                  <td>{CATEGORIES[item.category]?.label}</td>
                  <td><input value={item.name} onInput={(e) => updateCatalogItem(item.id, { name: e.currentTarget.value })} /></td>
                  <td><input value={item.model} onInput={(e) => updateCatalogItem(item.id, { model: e.currentTarget.value })} /></td>
                  <td><input type="number" min="0" step="1" value={item.price}
                    onInput={(e) => updateCatalogItem(item.id, { price: num(e.currentTarget.value) })} /></td>
                  <td><input type="number" min="0.05" step="0.05" value={item.radius}
                    onInput={(e) => updateCatalogItem(item.id, { radius: num(e.currentTarget.value) || 0.3 })} /></td>
                  <td>{spray
                    ? <input type="number" min="1" step="0.5" value={item.sprayRange ?? 6}
                        onInput={(e) => updateCatalogItem(item.id, { sprayRange: num(e.currentTarget.value) })} />
                    : '—'}</td>
                  <td>{spray
                    ? <input type="number" min="30" max="360" step="5" value={item.sprayArc ?? 180}
                        onInput={(e) => updateCatalogItem(item.id, { sprayArc: num(e.currentTarget.value) })} />
                    : '—'}</td>
                  <td><button class="danger sm" onClick={() => deleteCatalogItem(item.id)}>删除</button></td>
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>

      <h4>新增素材</h4>
      <form class="add-form" onSubmit={submit}>
        <select value={draft().category} onChange={(e) => patchDraft('category', e.currentTarget.value)}>
          <For each={CATEGORY_KEYS}>{(k) => <option value={k}>{CATEGORIES[k].label}</option>}</For>
        </select>
        <input placeholder="名称" value={draft().name} onInput={(e) => patchDraft('name', e.currentTarget.value)} required />
        <input placeholder="型号" value={draft().model} onInput={(e) => patchDraft('model', e.currentTarget.value)} required />
        <input type="number" placeholder="单价" min="0" value={draft().price} onInput={(e) => patchDraft('price', e.currentTarget.value)} />
        <input type="number" placeholder="占位半径" step="0.05" min="0.05" value={draft().radius} onInput={(e) => patchDraft('radius', e.currentTarget.value)} />
        <Show when={CATEGORIES[draft().category]?.spray}>
          <input type="number" placeholder="射程" step="0.5" min="1" value={draft().sprayRange} onInput={(e) => patchDraft('sprayRange', e.currentTarget.value)} />
          <input type="number" placeholder="喷洒角" step="5" min="30" max="360" value={draft().sprayArc} onInput={(e) => patchDraft('sprayArc', e.currentTarget.value)} />
        </Show>
        <button type="submit">添加</button>
      </form>
    </div>
  );
}

/* ---------------- 方案审查 ---------------- */
function ReviewAdmin() {
  const [comment, setComment] = createSignal({});
  const statusLabel = { draft: '草稿', review: '待审查', approved: '已通过', rejected: '已驳回' };

  return (
    <div>
      <h3>方案审查</h3>
      <table class="admin-table">
        <thead>
          <tr><th>项目</th><th>状态</th><th>物体数</th><th>物料金额</th><th>审查意见</th><th>操作</th></tr>
        </thead>
        <tbody>
          <For each={state.projects} fallback={<tr><td colSpan="6">暂无项目</td></tr>}>
            {(p) => (
              <tr>
                <td>{p.name}</td>
                <td><span class={`status st-${p.status}`}>{statusLabel[p.status]}</span></td>
                <td>{p.objects.length}</td>
                <td>¥{projectTotal(p).toLocaleString()}</td>
                <td>
                  <input
                    placeholder="审查意见"
                    value={comment()[p.id] ?? p.reviewComment ?? ''}
                    onInput={(e) => setComment((c) => ({ ...c, [p.id]: e.currentTarget.value }))}
                  />
                </td>
                <td class="ops">
                  <button onClick={() => { setState('activeProjectId', p.id); }}>打开</button>
                  <button class="ok" disabled={p.status !== 'review'}
                    onClick={() => setProjectStatus(p.id, 'approved', comment()[p.id] ?? '')}>通过</button>
                  <button class="danger sm" disabled={p.status !== 'review'}
                    onClick={() => setProjectStatus(p.id, 'rejected', comment()[p.id] ?? '')}>驳回</button>
                  <button class="danger sm" onClick={() => confirm(`删除项目「${p.name}」？`) && deleteProject(p.id)}>删除</button>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
      <p class="hint">「打开」后切换到顶部“编辑器”页签即可查看该项目的三维布置。</p>
    </div>
  );
}

/* ---------------- 项目汇总：各项目物料金额 ---------------- */
function RollupAdmin() {
  const rows = createMemo(() =>
    state.projects.map((p) => {
      const bom = bomFor(p);
      const byCat = {};
      for (const r of bom.rows) byCat[r.category] = (byCat[r.category] || 0) + r.count;
      return { p, bom, byCat };
    })
  );
  const grand = createMemo(() => rows().reduce((s, r) => s + r.bom.total, 0));

  return (
    <div>
      <h3>各项目物料金额汇总</h3>
      <table class="admin-table">
        <thead>
          <tr>
            <th>项目</th>
            <For each={CATEGORY_KEYS}>{(k) => <th>{CATEGORIES[k].label}</th>}</For>
            <th>物料金额</th>
          </tr>
        </thead>
        <tbody>
          <For each={rows()} fallback={<tr><td colSpan="9">暂无项目</td></tr>}>
            {({ p, bom, byCat }) => (
              <tr>
                <td>{p.name}</td>
                <For each={CATEGORY_KEYS}>{(k) => <td>{byCat[k] || 0}</td>}</For>
                <td>¥{bom.total.toLocaleString()}</td>
              </tr>
            )}
          </For>
        </tbody>
        <tfoot>
          <tr>
            <td>总计</td>
            <For each={CATEGORY_KEYS}>
              {(k) => <td>{rows().reduce((s, r) => s + (r.byCat[k] || 0), 0)}</td>}
            </For>
            <td>¥{grand().toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>

      <For each={rows()}>
        {({ p, bom }) => (
          <details class="bom-detail">
            <summary>{p.name} · 物料明细（¥{bom.total.toLocaleString()}）</summary>
            <table class="admin-table">
              <thead><tr><th>类别</th><th>名称</th><th>型号</th><th>数量</th><th>单价</th><th>金额</th></tr></thead>
              <tbody>
                <For each={bom.rows}>
                  {(r) => (
                    <tr>
                      <td>{r.categoryLabel}</td><td>{r.name}</td><td>{r.model}</td>
                      <td>{r.count}</td><td>¥{r.price}</td><td>¥{r.amount.toLocaleString()}</td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </details>
        )}
      </For>
    </div>
  );
}
