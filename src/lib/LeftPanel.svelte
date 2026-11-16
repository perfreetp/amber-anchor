<script>
  import { editor } from '../lib/store.svelte.js';
  import { seaTypeColor, seaTypeName, SEA_USE_TYPES } from '../lib/sample-data.js';
  import * as G from '../lib/geometry.js';

  const layerDefs = [
    { key: 'parcels', label: '宗海图层' },
    { key: 'vertices', label: '界址点图层' },
    { key: 'seaTypes', label: '用海类型着色' },
    { key: 'coastline', label: '海岸线底图' },
    { key: 'fairway', label: '航道底图' },
    { key: 'aquaculture', label: '养殖区底图' },
    { key: 'anchorages', label: '锚地底图' }
  ];

  const stageColor = {
    待分派: '#8a6d3b',
    调查中: '#1565c0',
    待质检: '#e65100',
    质检合格: '#2e7d32',
    不合格打回: '#c62828',
    已合并: '#707a85'
  };
</script>

<aside class="left-panel">
  <section class="card">
    <h3>图层控制</h3>
    {#each layerDefs as d (d.key)}
      <label class="layer-row">
        <input type="checkbox" bind:checked={editor.layers[d.key]} />
        <span>{d.label}</span>
      </label>
    {/each}
    <label class="layer-row snap">
      <input type="checkbox" bind:checked={editor.snapEnabled} />
      <span>节点吸附（{editor.snapTolPx}px）</span>
    </label>
  </section>

  <section class="card grow">
    <h3>
      宗海列表
      <span class="count">{editor.parcels.length} 宗</span>
    </h3>
    <div class="parcel-list">
      {#each editor.parcels as p (p.id)}
        {@const issues = editor.issuesOf(p.id)}
        {@const blocked = issues.some((i) => i.type === '自相交' || i.type === '顶点不足')}
        {@const boxed = editor.boxSelectedIds.includes(p.id)}
        <button
          class="parcel-item"
          class:selected={p.id === editor.selectedParcelId}
          class:boxed
          onclick={() => editor.selectParcel(p.id)}
        >
          <span class="dot" style={`background:${seaTypeColor(p.seaType)}`}></span>
          <span class="pi-main">
            <strong>{p.id}</strong>
            <small>{seaTypeName(p.seaType)} · {G.polygonArea({ rings: p.rings }).toFixed(1)} m²</small>
            <small class="applicant">{p.applicant}</small>
          </span>
          <span class="badge" style={`color:${stageColor[p.status] ?? '#555'};border-color:${stageColor[p.status] ?? '#999'}`}>
            {p.status}
          </span>
          {#if blocked}
            <span class="err-tag" title={issues.map((i) => i.detail).join('；')}>⚠ 自相交</span>
          {/if}
        </button>
      {/each}
    </div>
  </section>

  <section class="card">
    <h3>用海类型图例</h3>
    <div class="legend-grid">
      {#each SEA_USE_TYPES as t (t.code)}
        <div class="legend-item">
          <span class="dot" style={`background:${t.color}`}></span>
          <span>{t.name}</span>
        </div>
      {/each}
    </div>
  </section>
</aside>

<style>
  .left-panel {
    width: 264px;
    min-width: 264px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    overflow: hidden;
    background: #f0f4f8;
    border-right: 1px solid #d5dee8;
  }
  .card {
    background: #fff;
    border: 1px solid #dde5ee;
    border-radius: 8px;
    padding: 10px;
  }
  .card.grow {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }
  h3 {
    margin: 0 0 8px;
    font-size: 13px;
    color: #102a43;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .count {
    font-weight: normal;
    font-size: 11px;
    color: #7a8ca0;
  }
  .layer-row {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12.5px;
    padding: 3px 0;
    color: #33475b;
    cursor: pointer;
  }
  .layer-row.snap {
    margin-top: 6px;
    padding-top: 7px;
    border-top: 1px dashed #d5dee8;
    color: #0d47a1;
    font-weight: 600;
  }
  .parcel-list {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
    min-height: 0;
  }
  .parcel-item {
    display: grid;
    grid-template-columns: 10px 1fr auto;
    gap: 6px;
    align-items: start;
    text-align: left;
    border: 1px solid #dde5ee;
    border-radius: 6px;
    padding: 7px 8px;
    background: #fbfdff;
    cursor: pointer;
    position: relative;
  }
  .parcel-item.selected {
    border-color: #1565c0;
    background: #eaf3ff;
  }
  .parcel-item.boxed::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 2px dashed #1565c0;
    border-radius: 6px;
    pointer-events: none;
  }
  .pi-main {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .pi-main small {
    color: #62748a;
    font-size: 11px;
  }
  .pi-main .applicant {
    color: #8aa;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-top: 4px;
    display: inline-block;
  }
  .badge {
    font-size: 10px;
    border: 1px solid;
    border-radius: 10px;
    padding: 1px 6px;
    white-space: nowrap;
  }
  .err-tag {
    grid-column: 2 / 4;
    font-size: 11px;
    color: #c62828;
    font-weight: 700;
  }
  .legend-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px 8px;
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11.5px;
    color: #33475b;
  }
</style>
