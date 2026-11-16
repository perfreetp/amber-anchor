import { useEffect, useMemo, useState } from 'react'
import { loadProjects, saveProjects, sortProjects, uid, fmtDate, STATUS_LABEL } from './engine/storage.js'
import ProjectList from './components/ProjectList.jsx'
import EditorView from './components/EditorView.jsx'

export default function App() {
  const [projects, setProjects] = useState(() => loadProjects())
  const [currentId, setCurrentId] = useState(null)

  useEffect(() => {
    saveProjects(projects)
  }, [projects])

  const current = useMemo(
    () => projects.find((p) => p.id === currentId) || null,
    [projects, currentId]
  )

  function updateProject(id, patch) {
    setProjects((ps) => ps.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }

  function createProject() {
    const now = Date.now()
    const p = {
      id: uid('p'),
      name: `新布置项目 ${projects.length + 1}`,
      client: '体育部',
      owner: '制作员',
      deadline: now + 3 * 86400000,
      status: 'draft',
      reworkCount: 0,
      createdAt: now,
      versions: [],
      items: [],
      reviews: [],
    }
    setProjects((ps) => sortProjects([p, ...ps]))
    setCurrentId(p.id)
  }

  function deleteProject(id) {
    if (!confirm('确认删除该项目及其全部版本？')) return
    setProjects((ps) => ps.filter((p) => p.id !== id))
    if (currentId === id) setCurrentId(null)
  }

  // 版本快照（提交审核 / 手动存版本）
  function snapshotVersion(projectId, items, note) {
    const v = {
      id: uid('v'),
      ts: Date.now(),
      note: note || '提交审核',
      items: JSON.parse(JSON.stringify(items)),
      reviews: [],
    }
    setProjects((ps) =>
      ps.map((p) =>
        p.id === projectId
          ? { ...p, versions: [...p.versions, v], status: 'submitted', items: v.items }
          : p
      )
    )
    return v
  }

  function reviewVersion(projectId, versionId, opinion, approve) {
    setProjects((ps) =>
      ps.map((p) => {
        if (p.id !== projectId) return p
        const versions = p.versions.map((v) =>
          v.id === versionId
            ? {
                ...v,
                reviews: [
                  ...v.reviews,
                  {
                    id: uid('r'),
                    ts: Date.now(),
                    reviewer: '保障处主管',
                    opinion,
                    result: approve ? 'approved' : 'rework',
                  },
                ],
              }
            : v
        )
        return {
          ...p,
          versions,
          status: approve ? 'approved' : 'rework',
          reworkCount: approve ? p.reworkCount : p.reworkCount + 1,
        }
      })
    )
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">🏟️ 校运会场地三维布置编辑器</div>
        {current && (
          <button className="btn ghost" onClick={() => setCurrentId(null)}>
            ← 返回项目列表
          </button>
        )}
      </header>
      {!current ? (
        <ProjectList
          projects={sortProjects(projects)}
          onOpen={setCurrentId}
          onCreate={createProject}
          onDelete={deleteProject}
          fmtDate={fmtDate}
          statusLabel={STATUS_LABEL}
        />
      ) : (
        <EditorView
          key={current.id}
          project={current}
          onUpdate={(patch) => updateProject(current.id, patch)}
          onSnapshot={(items, note) => snapshotVersion(current.id, items, note)}
          onReview={(versionId, opinion, approve) =>
            reviewVersion(current.id, versionId, opinion, approve)
          }
        />
      )}
    </div>
  )
}
