export default function ProjectList({ projects, onOpen, onCreate, onDelete, fmtDate, statusLabel }) {
  const now = Date.now()
  return (
    <div className="project-page">
      <div className="project-head">
        <h2>体育部建项目工单</h2>
        <button className="btn primary" onClick={onCreate}>+ 新建布置项目</button>
      </div>
      <table className="project-table">
        <thead>
          <tr>
            <th>项目名称</th>
            <th>下单方</th>
            <th>制作员</th>
            <th>截止时间</th>
            <th>状态</th>
            <th>返工次数</th>
            <th>版本</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => {
            const urgent = p.deadline - now < 2 * 86400000
            const heavyRework = p.reworkCount > 3
            return (
              <tr key={p.id} className={heavyRework ? 'row-rework' : ''}>
                <td className="cell-name">{p.name}</td>
                <td>{p.client}</td>
                <td>{p.owner}</td>
                <td className={urgent ? 'text-urgent' : ''}>
                  {fmtDate(p.deadline)}
                  {urgent && <span className="tag urgent">临近</span>}
                </td>
                <td>
                  <span className={`status st-${p.status}`}>{statusLabel[p.status]}</span>
                </td>
                <td className={heavyRework ? 'text-rework' : ''}>
                  {p.reworkCount} 次
                  {heavyRework && <span className="tag rework">超标</span>}
                </td>
                <td>{p.versions.length}</td>
                <td>
                  <button className="btn small" onClick={() => onOpen(p.id)}>打开</button>
                  <button className="btn small danger" onClick={() => onDelete(p.id)}>删除</button>
                </td>
              </tr>
            )
          })}
          {projects.length === 0 && (
            <tr><td colSpan={8} className="empty">暂无项目，点击右上角新建</td></tr>
          )}
        </tbody>
      </table>
      <p className="hint">列表按截止时间升序排列；返工次数超过 3 次的项目整行标红。</p>
    </div>
  )
}
