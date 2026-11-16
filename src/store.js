import { createStore } from 'solid-js/store';
import { createEffect } from 'solid-js';
import { defaultCatalog, defaultProject, genId, CATEGORIES } from './catalog.js';

const LS_KEY = 'lawn3d.state.v1';

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      if (s && Array.isArray(s.catalog) && Array.isArray(s.projects)) return s;
    }
  } catch (e) { /* ignore */ }
  const demo = defaultProject();
  return { catalog: defaultCatalog(), projects: [demo], activeProjectId: demo.id };
}

const initial = load();

export const [state, setState] = createStore({
  catalog: initial.catalog,
  projects: initial.projects,
  activeProjectId: initial.activeProjectId,
});

createEffect(() => {
  // 持久化（catalog / projects 任意变化都写回）
  JSON.stringify(state.catalog); // 建立依赖
  JSON.stringify(state.projects);
  JSON.stringify(state.activeProjectId);
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({
      catalog: state.catalog,
      projects: state.projects,
      activeProjectId: state.activeProjectId,
    }));
  } catch (e) { /* 存储满等情况忽略 */ }
});

export function activeProject() {
  return state.projects.find((p) => p.id === state.activeProjectId) || null;
}

export function catalogItem(id) {
  return state.catalog.find((c) => c.id === id) || null;
}

// 对象的展示信息：素材被删时回落到放置时的快照
export function objectInfo(obj) {
  const cat = catalogItem(obj.assetId);
  return {
    category: obj.category,
    name: cat ? cat.name : obj.snapName,
    model: cat ? cat.model : obj.snapModel,
    price: cat ? cat.price : obj.snapPrice,
    radius: obj.footprint ?? (cat ? cat.radius : 0.3),
  };
}

// 物料清单：按 类别+型号 聚合
export function bomFor(project) {
  const rows = new Map();
  for (const obj of project.objects) {
    const info = objectInfo(obj);
    const key = `${info.category}|${info.model}`;
    if (!rows.has(key)) {
      rows.set(key, {
        category: info.category,
        categoryLabel: CATEGORIES[info.category]?.label || info.category,
        name: info.name,
        model: info.model,
        price: info.price,
        count: 0,
        amount: 0,
      });
    }
    const r = rows.get(key);
    r.count += 1;
    r.amount = r.count * r.price;
  }
  const list = [...rows.values()].sort((a, b) => a.categoryLabel.localeCompare(b.categoryLabel, 'zh'));
  const total = list.reduce((s, r) => s + r.amount, 0);
  return { rows: list, total };
}

export function projectTotal(project) {
  return bomFor(project).total;
}

// ---- 项目操作 ----
export function addProject(name) {
  const p = {
    id: genId('p'),
    name: name || `项目 ${state.projects.length + 1}`,
    boundary: [],
    objects: [],
    status: 'draft',
    reviewComment: '',
    createdAt: new Date().toISOString(),
  };
  setState('projects', (ps) => [...ps, p]);
  setState('activeProjectId', p.id);
  return p.id;
}

export function deleteProject(id) {
  setState('projects', (ps) => ps.filter((p) => p.id !== id));
  if (state.activeProjectId === id && state.projects.length) {
    setState('activeProjectId', state.projects[0].id);
  }
}

export function updateProject(id, fn) {
  const idx = state.projects.findIndex((p) => p.id === id);
  if (idx < 0) return;
  setState('projects', idx, fn);
}

export function setProjectStatus(id, status, comment = '') {
  updateProject(id, (p) => ({ ...p, status, reviewComment: comment }));
}

// ---- 素材库操作 ----
export function addCatalogItem(item) {
  setState('catalog', (c) => [...c, { ...item, id: genId('a') }]);
}
export function updateCatalogItem(id, patch) {
  const idx = state.catalog.findIndex((c) => c.id === id);
  if (idx >= 0) setState('catalog', idx, (c) => ({ ...c, ...patch }));
}
export function deleteCatalogItem(id) {
  setState('catalog', (c) => c.filter((x) => x.id !== id));
}
