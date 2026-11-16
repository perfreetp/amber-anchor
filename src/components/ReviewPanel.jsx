import { useState } from 'react'
import { STATUS_LABEL } from '../engine/storage.js'

export default function ReviewPanel({ project, note, setNote, onSubmit, onReview, onRestore, readOnly, fmtDate }) {
  const [opinion, setOpinion] = useState('')
  const latest = project.versions[project.versions.length - 1]

  return (
    <div className="review">
      <div className="review-status">
        当前状态：<span className={`status st-${project.status}`}>{STATUS_LABEL[project.status]}</span>
        <span className={project.reworkCount > 3 ? 'text-rework' : ''}>
          返工 {project.reworkCount} 次{project.reworkCount > 3 ? '（超标）' : ''}
        </span>
      </div>

      {!readOnly && (
        <div className="submit-box">
          <h4>提交审核（生成版本快照）</h4>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="本版布置说明，例如：帐篷沿跑道北侧排布…"
            rows={3}
          />
          <button className="btn primary" onClick={onSubmit}>提交保障处审核</button>
        </div>
      )}

      <h4>版本与审核意见（意见挂在具体版本上）</h4>
      {project.versions.length === 0 && <p className="hint">还没有提交过版本</p>}
      <div className="version-list">
        {[...project.versions].reverse().map((v) => (
          <div key={v.id} className="version-card">
            <div className="version-head">
              <strong>版本 {v.id.slice(-5)}</strong>
              <span className="hint">{fmtDate(v.ts)}</span>
            </div>
            <div className="version-note">{v.note}</div>
            <div className="version-meta">物件 {v.items.length} 件</div>
            <div className="version-actions">
              <button className="btn small" onClick={() => onRestore(v)} disabled={readOnly}>恢复此版</button>
              {project.status !== 'approved' && (
                <span className="review-actions">
                  <button
                    className="btn small ok"
                    onClick={() => {
                      const op = opinion.trim() || '同意放行'
                      onReview(v.id, op, true)
                      setOpinion('')
                    }}
                  >
                    审核通过
                  </button>
                  <button
                    className="btn small danger"
                    onClick={() => {
                      if (!opinion.trim()) {
                        alert('返工需要填写审核意见')
                        return
                      }
                      onReview(v.id, opinion.trim(), false)
                      setOpinion('')
                    }}
                  >
                    退回返工
                  </button>
                </span>
              )}
            </div>
            {v.reviews?.length > 0 && (
              <ul className="review-list">
                {v.reviews.map((r) => (
                  <li key={r.id} className={r.result === 'approved' ? 'rv-ok' : 'rv-bad'}>
                    <div>
                      <strong>{r.reviewer}</strong>
                      <span className="hint"> {fmtDate(r.ts)}</span>
                      <span className={`tag ${r.result === 'approved' ? 'ok' : 'rework'}`}>
                        {r.result === 'approved' ? '放行' : '返工'}
                      </span>
                    </div>
                    <div className="review-opinion">{r.opinion}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {project.status !== 'approved' && (
        <div className="opinion-box">
          <h4>主管审核意见</h4>
          <textarea
            value={opinion}
            onChange={(e) => setOpinion(e.target.value)}
            placeholder="填写放行或返工意见（退工时必填）"
            rows={3}
          />
        </div>
      )}
      {latest && project.status === 'approved' && (
        <p className="hint">已放行版本：{latest.id.slice(-5)}，可导出 PNG/CSV 交接。</p>
      )}
    </div>
  )
}
