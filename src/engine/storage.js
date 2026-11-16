// localStorage 持久化：项目、版本、审核意见
const KEY = 'sportsvenue.projects.v1'

export function loadProjects() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return seedProjects()
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

export function saveProjects(projects) {
  localStorage.setItem(KEY, JSON.stringify(projects))
}

export function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

// 首次使用时的演示数据：含临近截止和多次返工项目
function seedProjects() {
  const now = Date.now()
  const day = 86400000
  return [
    {
      id: uid('p'),
      name: '第38届校运会主场馆布置',
      client: '体育部',
      owner: '张制作',
      deadline: now + 2 * day,
      status: 'draft',
      reworkCount: 0,
      createdAt: now - 5 * day,
      versions: [],
      items: [],
      reviews: [],
    },
    {
      id: uid('p'),
      name: '田径场检录区布置',
      client: '体育部',
      owner: '李制作',
      deadline: now + 1 * day,
      status: 'rework',
      reworkCount: 4,
      createdAt: now - 9 * day,
      versions: [],
      items: [],
      reviews: [],
    },
    {
      id: uid('p'),
      name: '北操场趣味项目区',
      client: '体育部',
      owner: '王制作',
      deadline: now + 5 * day,
      status: 'approved',
      reworkCount: 1,
      createdAt: now - 12 * day,
      versions: [],
      items: [],
      reviews: [],
    },
  ]
}

// 项目列表排序：截止时间升序；返工 >3 由 UI 标红
export function sortProjects(projects) {
  return [...projects].sort((a, b) => a.deadline - b.deadline)
}

export const STATUS_LABEL = {
  draft: '草稿',
  submitted: '待审核',
  rework: '返工中',
  approved: '已放行',
}

export function fmtDate(ts) {
  const d = new Date(ts)
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}
