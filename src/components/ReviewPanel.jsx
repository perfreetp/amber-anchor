import { runChecks, batchStatus } from '../lib/checks.js'

export default function ReviewPanel({ batch, hf, offsetResult, sheet, slopeLimit, onUpdateBatch, onReleased }) {
  if (!batch) {
    return <div className="panel-empty">完成分块后点击「提交批次检查」，复核员在此逐条确认/驳回。</div>
  }
  const status = batchStatus(batch.issues)
  const severe = batch.issues.filter((i) => i.level === 'severe')
  const reminders = batch.issues.filter((i) => i.level === 'reminder')

  const setStatus = (id, st) =>
    onUpdateBatch((prev) => ({ ...prev, issues: prev.issues.map((i) => (i.id === id ? { ...i, status: st } : i)) }))
  const setAll = (st) =>
    onUpdateBatch((prev) => ({ ...prev, issues: prev.issues.map((i) => ({ ...i, status: st })) }))

  const renderIssue = (i) => (
    <div key={i.id} className={`issue ${i.level} ${i.status}`}>
      <div className="issue-head">
        <span className={`badge ${i.level}`}>{i.level === 'severe' ? '严重' : '提醒'}</span>
        <b>{i.title}</b>
        <span className="issue-id">{i.id}</span>
      </div>
      <div className="issue-detail">{i.detail}</div>
      <div className="issue-actions">
        {i.status === 'pending' && (
          <>
            <button className="btn tiny danger" onClick={() => setStatus(i.id, 'confirmed')}>确认（退回重做）</button>
            <button className="btn tiny" onClick={() => setStatus(i.id, 'dismissed')}>驳回（误报）</button>
          </>
        )}
        {i.status === 'confirmed' && <span className="tag red">已确认 · 待整改</span>}
        {i.status === 'dismissed' && <span className="tag green">已驳回 · 不影响放行</span>}
      </div>
    </div>
  )

  return (
    <div className="review">
      <div className="review-summary">
        <div>
          批次 <b>{batch.id}</b> · 共 {batch.issues.length} 项
          <span className="tag red">严重 {severe.length}</span>
          <span className="tag amber">提醒 {reminders.length}</span>
        </div>
        <div className={`batch-state ${status}`}>
          {status === 'reviewing' && '待复核'}
          {status === 'rework' && '退回整改'}
          {status === 'releasable' && '达标可放行'}
        </div>
      </div>
      <p className="muted small">
        检查项：外轮廓闭合、分块重叠、板材幅面（{sheet.w}×{sheet.h} mm）、偏移自交、摊平失真（&gt;3%）、拼缝两侧表面长偏差、块内最大坡度（&gt;{slopeLimit}°）。
      </p>
      {!!severe.length && <h4>严重问题（必须整改或逐条复核）</h4>}
      {severe.map(renderIssue)}
      {!!reminders.length && <h4>提醒事项</h4>}
      {reminders.map(renderIssue)}
      {!batch.issues.length && <div className="alert ok">自动检查全部通过，无任何问题，可直接放行。</div>}
      <div className="review-foot">
        <button className="btn" onClick={() => onUpdateBatch(null)}>撤回批次</button>
        <button className="btn ghost" disabled={!batch.issues.some((i) => i.status === 'pending')} onClick={() => setAll('dismissed')}>全部驳回（误报）</button>
        <button className="btn ghost danger" disabled={!batch.issues.some((i) => i.status === 'pending')} onClick={() => setAll('confirmed')}>全部确认（退回）</button>
        <button
          className="btn primary"
          disabled={status !== 'releasable'}
          onClick={onReleased}
        >
          {status === 'releasable' ? '整批放行并导出' : '全部复核通过后放行'}
        </button>
      </div>
    </div>
  )
}

export function freshBatch(partition, hf, offsetResult, opts, prevId) {
  const { issues, severe, reminder } = runChecks(partition, hf, offsetResult, opts)
  const n = (prevId ? parseInt(prevId.split('-')[1], 10) : 0) + 1
  return {
    id: 'PC-' + String(n).padStart(3, '0'),
    submittedAt: new Date().toLocaleString('zh-CN'),
    issues, severe, reminder,
  }
}
