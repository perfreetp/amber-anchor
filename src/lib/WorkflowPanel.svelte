<script>
  import { editor } from '../lib/store.svelte.js';
  import { surveyors, SEA_USE_TYPES } from '../lib/sample-data.js';

  let tab = $state('jobs'); // register | jobs | qc | board
  const form = $state({ applicant: '', seaType: SEA_USE_TYPES[0].code, elevation: 12 });
  let rejectReason = $state('');
  let rejectingJob = $state(null);

  const stageChip = {
    待分派: '#8a6d3b',
    调查中: '#1565c0',
    待质检: '#e65100',
    质检合格: '#2e7d32',
    不合格打回: '#c62828',
    已合并: '#707a85'
  };

  function submitRegister() {
    if (!form.applicant.trim()) {
      editor.notify('warn', '请填写申请人/项目名称');
      return;
    }
    editor.registerJob({ ...form });
    form.applicant = '';
    tab = 'jobs';
  }

  function surveyorName(id) {
    return surveyors.find((s) => s.id === id)?.name ?? '—';
  }
</script>

<section class="bottom-panel">
  <nav class="bp-tabs">
    <button class:on={tab === 'register'} onclick={() => (tab = 'register')}>① 前台接单登记</button>
    <button class:on={tab === 'jobs'} onclick={() => (tab = 'jobs')}>
      ② 工单分派与办理 <em class="n">{editor.jobs.filter((j) => j.stage === '待分派').length}</em>
    </button>
    <button class:on={tab === 'qc'} onclick={() => (tab = 'qc')}>
      ③ 质检抽查 <em class="n warn">{editor.jobs.filter((j) => j.stage === '待质检').length}</em>
    </button>
    <button class:on={tab === 'board'} onclick={() => (tab = 'board')}>④ 完成量与返工率看板</button>
  </nav>

  <div class="bp-body">
    {#if tab === 'register'}
      <div class="register">
        <label>申请人 / 项目名称<input placeholder="如：蓝湾水产养殖有限公司" bind:value={form.applicant} /></label>
        <label>用海类型
          <select bind:value={form.seaType}>
            {#each SEA_USE_TYPES as t (t.code)}<option value={t.code}>{t.name}</option>{/each}
          </select>
        </label>
        <label>用海高程(m)<input type="number" min="1" bind:value={form.elevation} /></label>
        <button class="btn-primary" onclick={submitRegister}>登记并生成宗海草稿</button>
        <p class="tip">登记后自动生成待编辑宗海（默认矩形轮廓）与工单，状态为「待分派」。</p>
      </div>
    {:else if tab === 'jobs'}
      <div class="table-scroll">
        <table>
          <thead>
            <tr><th>工单号</th><th>宗海</th><th>申请人</th><th>接单时间</th><th>承办师傅</th><th>状态</th><th>返工</th><th>操作</th></tr>
          </thead>
          <tbody>
            {#each editor.jobs as j (j.jobId)}
              <tr>
                <td>{j.jobId}</td>
                <td><a onclick={() => editor.selectParcel(j.parcelId)}>{j.parcelId}</a></td>
                <td>{j.applicant}</td>
                <td class="nowrap">{j.receivedAt}</td>
                <td>{surveyorName(j.assignee)}</td>
                <td><span class="chip" style={`color:${stageChip[j.stage]};border-color:${stageChip[j.stage]}`}>{j.stage}</span></td>
                <td>{j.reworkCount}</td>
                <td class="actions">
                  {#if j.stage === '待分派'}
                    <select onchange={(e) => e.target.value && editor.assignJob(j.jobId, e.target.value)}>
                      <option value="">分派给…</option>
                      {#each surveyors as s (s.id)}<option value={s.id}>{s.name}（{s.title}）</option>{/each}
                    </select>
                  {:else if j.stage === '调查中' || j.stage === '不合格打回'}
                    {#if j.stage === '不合格打回'}
                      <button class="btn-warn" onclick={() => editor.reworkResubmit(j.jobId)}>返工后重新提交</button>
                    {:else}
                      <button class="btn-primary small" onclick={() => editor.submitQc(j.jobId)}>提交质检</button>
                    {/if}
                    {#if editor.hasBlockingIssue(j.parcelId)}
                      <span class="block-tag">⚠ 自相交，禁止提交</span>
                    {/if}
                  {:else}
                    <button class="btn-ghost small" onclick={() => editor.selectParcel(j.parcelId)}>查看宗海</button>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else if tab === 'qc'}
      <div class="table-scroll">
        <table>
          <thead>
            <tr><th>工单号</th><th>宗海</th><th>承办人</th><th>提交次数</th><th>历史返工</th><th>几何校验</th><th>质检结论</th></tr>
          </thead>
          <tbody>
            {#each editor.jobs.filter((j) => ['待质检', '质检合格', '不合格打回'].includes(j.stage)) as j (j.jobId)}
              {@const blocked = editor.hasBlockingIssue(j.parcelId)}
              <tr>
                <td>{j.jobId}</td>
                <td><a onclick={() => editor.selectParcel(j.parcelId)}>{j.parcelId}</a></td>
                <td>{surveyorName(j.assignee)}</td>
                <td>{j.qcSubmits ?? 0}</td>
                <td>{j.reworkCount}</td>
                <td>{#if blocked}<span class="block-tag">自相交未消除</span>{:else}<span class="ok">通过</span>{/if}</td>
                <td class="actions">
                  {#if j.stage === '待质检'}
                    <button class="btn-pass" disabled={blocked} onclick={() => editor.qcPass(j.jobId)}>抽查合格</button>
                    <button class="btn-reject" onclick={() => (rejectingJob = j.jobId)}>不合格打回</button>
                  {:else if j.stage === '质检合格'}
                    <span class="ok">✓ {j.qcResult?.at ?? ''} 合格</span>
                  {:else}
                    <span class="block-tag">已打回：{j.qcResult?.reason}</span>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        {#if !editor.jobs.some((j) => ['待质检', '质检合格', '不合格打回'].includes(j.stage))}
          <p class="tip">暂无待质检工单。</p>
        {/if}
      </div>

      {#if rejectingJob}
        <div class="modal-mask" onclick={() => (rejectingJob = null)}>
          <div class="modal" onclick={(e) => e.stopPropagation()}>
            <h4>质检不合格打回</h4>
            <textarea bind:value={rejectReason} placeholder="请填写打回原因，如：界址点与岸线拐点偏差超限、孔洞面积不符…" rows="4"></textarea>
            <div class="modal-actions">
              <button class="btn-ghost" onclick={() => (rejectingJob = null)}>取消</button>
              <button
                class="btn-reject"
                onclick={() => {
                  editor.qcReject(rejectingJob, rejectReason);
                  rejectingJob = null;
                  rejectReason = '';
                }}
              >确认打回</button>
            </div>
          </div>
        </div>
      {/if}
    {:else}
      {@const d = editor.dashboard}
      <div class="board">
        <div class="kpis">
          <div class="kpi"><small>工单总量</small><strong>{d.total}</strong></div>
          <div class="kpi"><small>质检合格完成量</small><strong>{d.done}</strong></div>
          <div class="kpi"><small>当前打回</small><strong class="warn">{d.rejected}</strong></div>
          <div class="kpi"><small>累计提交次数</small><strong>{d.submits}</strong></div>
          <div class="kpi"><small>累计返工次数</small><strong>{d.reworks}</strong></div>
          <div class="kpi accent"><small>返工率</small><strong>{(d.reworkRate * 100).toFixed(1)}%</strong><em>返工/提交</em></div>
        </div>
        <div class="board-cols">
          <div>
            <h4>阶段分布</h4>
            {#each Object.entries(d.stageCounts) as [stage, count] (stage)}
              <div class="bar-row">
                <span class="bar-label">{stage}</span>
                <div class="bar"><i style={`width:${(count / d.total) * 100}%;background:${stageChip[stage] ?? '#5a8fb0'}`}></i></div>
                <strong>{count}</strong>
              </div>
            {/each}
          </div>
          <div>
            <h4>师傅工作量</h4>
            <table class="surveyor-table">
              <thead><tr><th>师傅</th><th>承办</th><th>合格</th><th>返工</th><th>返工率</th></tr></thead>
              <tbody>
                {#each d.bySurveyor as s (s.id)}
                  <tr>
                    <td>{s.name}<small>{s.title}</small></td>
                    <td>{s.total}</td>
                    <td class="ok">{s.done}</td>
                    <td class:warn={s.rework > 0}>{s.rework}</td>
                    <td>{s.total ? ((s.rework / Math.max(1, s.total)) * 100).toFixed(0) : 0}%</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .bottom-panel {
    height: 252px;
    min-height: 252px;
    background: #fff;
    border-top: 1px solid #cdd8e3;
    display: flex;
    flex-direction: column;
  }
  .bp-tabs {
    display: flex;
    gap: 2px;
    background: #e4ebf2;
    padding: 4px 8px 0;
  }
  .bp-tabs button {
    border: 1px solid #cdd8e3;
    border-bottom: none;
    background: #eef3f8;
    padding: 7px 14px;
    font-size: 12.5px;
    border-radius: 7px 7px 0 0;
    cursor: pointer;
    color: #3d5268;
  }
  .bp-tabs button.on {
    background: #fff;
    color: #0d47a1;
    font-weight: 700;
  }
  .n {
    font-style: normal;
    background: #1565c0;
    color: #fff;
    border-radius: 9px;
    padding: 0 7px;
    font-size: 11px;
    margin-left: 4px;
  }
  .n.warn {
    background: #e65100;
  }
  .bp-body {
    flex: 1;
    overflow: hidden;
    padding: 10px 14px;
  }
  .table-scroll {
    height: 100%;
    overflow: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }
  th,
  td {
    padding: 6px 9px;
    border-bottom: 1px solid #edf1f5;
    text-align: left;
    white-space: nowrap;
  }
  th {
    color: #51637a;
    background: #f6f9fc;
    position: sticky;
    top: 0;
  }
  td a {
    color: #1565c0;
    cursor: pointer;
    text-decoration: underline;
  }
  .nowrap {
    font-variant-numeric: tabular-nums;
  }
  .chip {
    border: 1px solid;
    border-radius: 10px;
    padding: 1px 8px;
    font-size: 11px;
  }
  .actions {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  select,
  input,
  textarea {
    font-family: inherit;
    font-size: 12.5px;
    padding: 5px 8px;
    border: 1px solid #c2cedb;
    border-radius: 5px;
  }
  .btn-primary,
  .btn-ghost,
  .btn-warn,
  .btn-pass,
  .btn-reject {
    border-radius: 5px;
    padding: 5px 12px;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid;
  }
  .btn-primary {
    background: #1565c0;
    border-color: #0d47a1;
    color: #fff;
  }
  .btn-ghost {
    background: #fff;
    border-color: #b8c6d4;
    color: #33475b;
  }
  .btn-warn {
    background: #fff4e0;
    border-color: #e65100;
    color: #b34700;
  }
  .btn-pass {
    background: #e7f5e9;
    border-color: #2e7d32;
    color: #1b5e20;
  }
  .btn-pass:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .btn-reject {
    background: #fdecea;
    border-color: #c62828;
    color: #b71c1c;
  }
  .small {
    padding: 4px 9px;
  }
  .block-tag {
    color: #c62828;
    font-weight: 700;
    font-size: 11.5px;
  }
  .ok {
    color: #2e7d32;
    font-weight: 600;
  }
  .warn {
    color: #e65100;
  }
  .register {
    display: flex;
    gap: 14px;
    align-items: end;
  }
  .register label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
    color: #51637a;
  }
  .register input,
  .register select {
    width: 210px;
  }
  .tip {
    font-size: 12px;
    color: #7a8ca0;
    align-self: center;
  }
  .board {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    overflow: auto;
  }
  .kpis {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
  }
  .kpi {
    background: #f6f9fc;
    border: 1px solid #dde5ee;
    border-radius: 8px;
    padding: 8px 12px;
  }
  .kpi small {
    display: block;
    color: #7a8ca0;
    font-size: 11px;
  }
  .kpi strong {
    font-size: 22px;
    color: #102a43;
  }
  .kpi.accent {
    background: #eaf3ff;
    border-color: #9ec6ef;
  }
  .kpi em {
    font-style: normal;
    font-size: 10.5px;
    color: #7a8ca0;
    display: block;
  }
  .board-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }
  .board-cols h4 {
    margin: 2px 0 8px;
    font-size: 13px;
    color: #102a43;
  }
  .bar-row {
    display: grid;
    grid-template-columns: 84px 1fr 32px;
    gap: 8px;
    align-items: center;
    margin-bottom: 6px;
    font-size: 12px;
  }
  .bar {
    background: #edf1f5;
    border-radius: 8px;
    height: 12px;
    overflow: hidden;
  }
  .bar i {
    display: block;
    height: 100%;
    border-radius: 8px;
  }
  .surveyor-table small {
    display: block;
    color: #8aa;
    font-size: 10.5px;
  }
  .modal-mask {
    position: fixed;
    inset: 0;
    background: rgba(8, 22, 38, 0.5);
    display: grid;
    place-items: center;
    z-index: 60;
  }
  .modal {
    background: #fff;
    border-radius: 10px;
    width: min(480px, 92vw);
    padding: 18px;
    color: #102a43;
  }
  .modal h4 {
    margin: 0 0 10px;
  }
  .modal textarea {
    width: 100%;
    box-sizing: border-box;
  }
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 12px;
  }
</style>
