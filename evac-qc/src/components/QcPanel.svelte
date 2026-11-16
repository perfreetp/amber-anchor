<script>
  import {
    state, getFilteredIssues, getIssueCounts, setIssueStatus, locateIssue,
    runBatchChecks, loadSampleBatch, importFiles, exportIssueCsv, exportConclusion
  } from '../lib/store.svelte.js';
  import { SEVERITY, SEVERITY_ORDER, ISSUE_STATUS } from '../lib/constants.js';

  let fileInput;

  const filteredIssues = $derived(getFilteredIssues());
  const issueCounts = $derived(getIssueCounts());

  const sevName = (k) => SEVERITY[k].name;
  const sevColor = (k) => SEVERITY[k].color;
  const statusName = (k) => ISSUE_STATUS[k].name;

  const onFiles = (e) => {
    if (e.currentTarget.files?.length) importFiles([...e.currentTarget.files]);
    e.currentTarget.value = '';
  };

  const canRelease = $derived(state.release?.status === 'released');
  const isHold = $derived(state.release?.status === 'hold');
</script>

<aside class="qc-panel">
  <div class="batch-box">
    <h3>批次质检</h3>
    {#if state.batch}
      <div class="batch-meta">
        <div class="bid" title={state.batch.batchId}>{state.batch.batchId}</div>
        <div class="meta-line">{state.batch.drawings.length} 张图纸 · {state.featureTotal.toLocaleString()} 个要素</div>
      </div>
    {/if}
    <div class="actions">
      <button class="primary" onclick={loadSampleBatch} disabled={state.checking}>
        {state.batch ? '重新生成样例批次' : '载入样例批次（压测）'}
      </button>
      <button onclick={() => fileInput.click()} disabled={state.checking}>导入图纸 JSON</button>
      <input bind:this={fileInput} type="file" accept=".json,application/json" multiple hidden onchange={onFiles} />
      <button onclick={runBatchChecks} disabled={state.checking || !state.batch}>重新运行检查</button>
      <div class="export-row">
        <button onclick={exportIssueCsv} disabled={!state.issues.length}>导出问题清单 CSV</button>
        <button onclick={exportConclusion} disabled={!state.issues.length}>导出行结论</button>
      </div>
    </div>
  </div>

  {#if state.checking}
    <div class="progress-box">
      <div class="progress-label">正在检查… {Math.round(state.checkProgress * 100)}%</div>
      <div class="progress-track"><div class="progress-fill" style="width:{state.checkProgress * 100}%"></div></div>
    </div>
  {/if}

  {#if state.release}
    <div class="gate" class:released={canRelease} class:hold={isHold}>
      <div class="gate-title">
        放行结论：{canRelease ? '✅ 准予放行' : isHold ? '⛔ 不予放行' : '⏳ 暂不可放行'}
      </div>
      <div class="gate-text">{state.release.conclusion}</div>
      <div class="gate-counts">
        待复核 {state.release.pending} · 已确认 {state.release.confirmedCount} · 拦截项 {state.release.blocked}
      </div>
    </div>
  {/if}

  {#if state.issues.length}
    <div class="summary">
      {#each SEVERITY_ORDER as k (k)}
        <button
          class="chip"
          class:active={state.filterSeverity === k}
          onclick={() => (state.filterSeverity = state.filterSeverity === k ? 'all' : k)}
          style="--chip:{sevColor(k)}"
        >
          {sevName(k)} {issueCounts[k]}
        </button>
      {/each}
    </div>
    <div class="summary sub">
      {#each ['pending', 'confirmed', 'rejected'] as k (k)}
        <button
          class="chip sm"
          class:active={state.filterStatus === k}
          onclick={() => (state.filterStatus = state.filterStatus === k ? 'all' : k)}
          style="--chip:{ISSUE_STATUS[k].color}"
        >
          {statusName(k)} {issueCounts[k]}
        </button>
      {/each}
    </div>
  {/if}

  <div class="issue-list">
    {#each filteredIssues as iss (iss.issueId)}
      {@const active = state.activeIssueId === iss.issueId}
      <div class="issue" class:active data-sev={iss.severity} data-status={iss.status}>
        <button class="issue-head" onclick={() => locateIssue(iss)}>
          <span class="sev-tag" style="background:{sevColor(iss.severity)}">{sevName(iss.severity)}</span>
          <span class="issue-main">
            <span class="rule">{iss.rule} · {iss.ruleName}</span>
            <span class="loc">{iss.buildingId} / {iss.floor}</span>
          </span>
          <span class="status-pill" style="color:{ISSUE_STATUS[iss.status].color}">{statusName(iss.status)}</span>
        </button>
        <p class="msg">{iss.message}</p>
        <div class="review-btns">
          <button
            class:on={iss.status === 'confirmed'}
            onclick={() => setIssueStatus(iss.issueId, 'confirmed')}
          >确认问题</button>
          <button
            class:on={iss.status === 'rejected'}
            onclick={() => setIssueStatus(iss.issueId, 'rejected')}
          >驳回（误报）</button>
          <button
            class:on={iss.status === 'pending'}
            onclick={() => setIssueStatus(iss.issueId, 'pending')}
          >重置待复核</button>
        </div>
      </div>
    {:else}
      {#if state.batch && !state.checking}
        <div class="empty">当前筛选下没有问题</div>
      {:else if !state.batch}
        <div class="empty">
          载入样例批次或导入图纸 JSON 后，将自动执行 12 项规则检查，
          问题按致命 / 严重 / 一般 / 提示分级，逐条复核闭环后方可整批放行。
        </div>
      {/if}
    {/each}
  </div>
</aside>

<style>
  .qc-panel {
    width: 340px; min-width: 340px; height: 100%; overflow-y: auto;
    background: #141a23; border-right: 1px solid #232c38; display: flex; flex-direction: column;
  }
  .batch-box { padding: 14px; border-bottom: 1px solid #232c38; }
  h3 { margin: 0 0 8px; font-size: 14px; color: #e6ecf5; }
  .batch-meta { margin-bottom: 10px; }
  .bid { font-size: 13px; font-weight: 600; color: #4da3ff; word-break: break-all; }
  .meta-line { font-size: 12px; color: #8292a8; margin-top: 2px; }
  .actions { display: flex; flex-direction: column; gap: 6px; }
  .actions button {
    padding: 7px 10px; border-radius: 6px; border: 1px solid #2c3542;
    background: #18202c; color: #d7e0ec; font-size: 12.5px; cursor: pointer; text-align: left;
  }
  .actions button:hover:not(:disabled) { border-color: #4da3ff; }
  .actions button:disabled { opacity: 0.45; cursor: not-allowed; }
  .actions button.primary { background: #1d4ed8; border-color: #2563eb; color: #fff; text-align: center; }
  .export-row { display: flex; gap: 6px; }
  .export-row button { flex: 1; text-align: center; }
  .progress-box { padding: 12px 14px; border-bottom: 1px solid #232c38; }
  .progress-label { font-size: 12px; color: #93a1b5; margin-bottom: 6px; }
  .progress-track { height: 6px; border-radius: 3px; background: #222c3a; overflow: hidden; }
  .progress-fill { height: 100%; background: linear-gradient(90deg, #4da3ff, #33d17a); transition: width 0.2s; }
  .gate { margin: 12px 14px 0; padding: 10px 12px; border-radius: 8px; border: 1px solid #3a4656; background: #18202c; }
  .gate.released { border-color: #33d17a; background: rgba(51,209,122,0.1); }
  .gate.hold { border-color: #ff453a; background: rgba(255,59,48,0.1); }
  .gate-title { font-size: 13px; font-weight: 700; color: #e6ecf5; }
  .gate-text { font-size: 12px; color: #aebccd; line-height: 1.5; margin-top: 4px; }
  .gate-counts { font-size: 11.5px; color: #7f8ea3; margin-top: 6px; }
  .summary { display: flex; gap: 6px; padding: 12px 14px 0; flex-wrap: wrap; }
  .summary.sub { padding-top: 6px; }
  .chip {
    border: 1px solid color-mix(in srgb, var(--chip) 45%, transparent);
    background: color-mix(in srgb, var(--chip) 12%, transparent);
    color: var(--chip); font-size: 12px; padding: 3px 9px; border-radius: 20px; cursor: pointer;
  }
  .chip.active { outline: 1.5px solid var(--chip); }
  .chip.sm { font-size: 11px; }
  .issue-list { padding: 10px 14px 20px; display: flex; flex-direction: column; gap: 8px; }
  .issue {
    border: 1px solid #26303e; border-left-width: 3px; border-radius: 8px;
    padding: 9px 10px; background: #171e29;
  }
  .issue[data-sev='fatal'] { border-left-color: #ff3b30; }
  .issue[data-sev='major'] { border-left-color: #ff9500; }
  .issue[data-sev='minor'] { border-left-color: #ffcc00; }
  .issue[data-sev='info'] { border-left-color: #64d2ff; }
  .issue.active { outline: 1.5px solid #4da3ff; }
  .issue[data-status='rejected'] { opacity: 0.55; }
  .issue-head {
    width: 100%; display: flex; align-items: center; gap: 8px;
    background: none; border: none; padding: 0; cursor: pointer; text-align: left;
  }
  .sev-tag { color: #10141b; font-size: 11px; font-weight: 700; border-radius: 4px; padding: 2px 6px; white-space: nowrap; }
  .issue-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
  .rule { font-size: 12.5px; color: #e6ecf5; }
  .loc { font-size: 11px; color: #7f8ea3; }
  .status-pill { font-size: 11px; white-space: nowrap; }
  .msg { margin: 6px 0 8px; font-size: 12px; color: #b6c2d2; line-height: 1.5; }
  .review-btns { display: flex; gap: 6px; }
  .review-btns button {
    flex: 1; padding: 4px 0; font-size: 11.5px; border-radius: 5px;
    border: 1px solid #2c3542; background: #10161e; color: #aebccd; cursor: pointer;
  }
  .review-btns button:hover { border-color: #4da3ff; color: #d7e0ec; }
  .review-btns button.on { border-color: #4da3ff; background: rgba(77,163,255,0.15); color: #4da3ff; }
  .empty { padding: 30px 16px; font-size: 12.5px; color: #647186; line-height: 1.7; text-align: center; }
</style>
