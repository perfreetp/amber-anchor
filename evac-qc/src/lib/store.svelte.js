// 全局状态（Svelte 5 runes）
// 上万要素的原始数据保持非响应式（plain 变量），只有 UI 需要的派生数据进 $state，
// 避免深度代理拖慢渲染与质检。

import { LAYER_KEYS, LAYERS, SEVERITY_ORDER, ISSUE_STATUS } from './constants.js';
import { SpatialIndex } from './spatial.js';
import { runChecks, evaluateBatch } from './qc.js';
import { generateBatch } from './sampleData.js';

// ---- 非响应式大数据 ----
let rawFeatures = [];
let spatialIndex = null;
let rendererRef = null;
let workerRef = null;

// ---- 响应式 UI 状态 ----
export const state = $state({
  batch: null,                 // { batchId, generatedAt, drawings[] }
  featureTotal: 0,
  batchStatus: 'empty',
  statusText: '等待导入批次',
  checking: false,
  checkProgress: 0,
  issues: [],                  // 质检问题（带复核状态）
  filterSeverity: 'all',
  filterStatus: 'all',
  activeIssueId: null,
  layers: Object.fromEntries(LAYER_KEYS.map((k) => [k, true])),
  floors: [],                  // 楼层选项
  floorFilter: 'ALL',
  hoverInfo: null,             // { x, y, rows }
  selection: { ids: [], linkedExits: [] },
  stats: { tiles: 0, features: 0, cacheSize: 0, fps: 0 },
  release: null                // evaluateBatch 结果快照
});

export function registerRenderer(r) { rendererRef = r; }

function rebuildIndex() {
  spatialIndex = rawFeatures.length ? new SpatialIndex(rawFeatures) : null;
  if (rendererRef) rendererRef.setIndex(spatialIndex);
}

function collectFloors() {
  const set = new Set();
  for (const f of rawFeatures) {
    if (f.floor) set.add(f.floor);
  }
  state.floors = [...set].sort();
  state.floorFilter = 'ALL';
}

// ---- 批次导入 ----
export function loadBatch(batch) {
  rawFeatures = (batch.features || []).map((f) => ({ ...f, _bounds: undefined }));
  state.batch = {
    batchId: batch.batchId,
    generatedAt: batch.generatedAt,
    drawings: batch.drawings || []
  };
  state.featureTotal = rawFeatures.length;
  state.issues = [];
  state.release = null;
  state.activeIssueId = null;
  state.batchStatus = 'reviewing';
  state.statusText = '批次已导入，等待运行质检';
  collectFloors();
  rebuildIndex();
  window.dispatchEvent(new CustomEvent('qc:data-loaded'));
}

export async function loadSampleBatch() {
  const batch = generateBatch();
  loadBatch(batch);
  await runBatchChecks();
}

// 从导入的 JSON 文件装载（支持单文件/多文件合并）
export async function importFiles(fileList) {
  const drawings = [];
  const features = [];
  for (const file of fileList) {
    const text = await file.text();
    const data = JSON.parse(text);
    if (Array.isArray(data)) {
      features.push(...data);
    } else if (Array.isArray(data.features)) {
      features.push(...data.features);
      if (data.drawings) drawings.push(...data.drawings);
    }
  }
  loadBatch({
    batchId: `IMPORT-${Date.now()}`,
    generatedAt: new Date().toISOString(),
    drawings,
    features
  });
  await runBatchChecks();
}

// ---- 质检（Worker 优先，失败回退主线程）----
export function runBatchChecks() {
  if (!rawFeatures.length) return Promise.resolve();
  state.checking = true;
  state.checkProgress = 0;
  state.batchStatus = 'checking';
  state.statusText = '正在执行 12 项规则检查…';

  return new Promise((resolve) => {
    let settled = false;
    const finish = (issues) => {
      if (settled) return;
      settled = true;
      state.issues = issues;
      state.checking = false;
      state.checkProgress = 1;
      const ev = evaluateBatch(issues);
      state.release = ev;
      state.batchStatus = ev.status;
      state.statusText = ev.conclusion;
      resolve();
    };

    try {
      const worker = new Worker(new URL('./qc.worker.js', import.meta.url), { type: 'module' });
      workerRef = worker;
      worker.onmessage = (e) => {
        if (e.data.type === 'progress') state.checkProgress = e.data.progress;
        if (e.data.type === 'done') {
          finish(e.data.issues);
          worker.terminate();
          workerRef = null;
        }
      };
      worker.onerror = () => {
        // 回退：主线程同步执行
        const issues = runChecks(rawFeatures, (p) => { state.checkProgress = p; });
        finish(issues);
      };
      worker.postMessage({ type: 'run', features: rawFeatures });
    } catch {
      const issues = runChecks(rawFeatures, (p) => { state.checkProgress = p; });
      finish(issues);
    }
  });
}

// ---- 复核操作 ----
export function setIssueStatus(issueId, status) {
  const iss = state.issues.find((i) => i.issueId === issueId);
  if (!iss) return;
  iss.status = status;
  const ev = evaluateBatch(state.issues);
  state.release = ev;
  state.batchStatus = ev.status;
  state.statusText = ev.conclusion;
}

export function getFeature(id) {
  return rawFeatures.find((f) => f.id === id) || null;
}

export function getFeatures(ids) {
  const set = new Set(ids);
  return rawFeatures.filter((f) => set.has(f.id));
}

// 同编号关联出口（点选多个要素时高亮）：编号唯一性按 楼栋+楼层 约束，关联限定同范围
export function findLinkedExits(features) {
  const exitFeats = features.filter((f) => f.type === 'exit');
  if (!exitFeats.length) return [];
  const scopes = new Set(exitFeats.map((f) => `${f.buildingId}|${f.floor}`));
  const nos = new Set(exitFeats.map((f) => f.exitNo));
  return rawFeatures.filter((f) =>
    f.type === 'exit' &&
    nos.has(f.exitNo) &&
    scopes.has(`${f.buildingId}|${f.floor}`));
}

// ---- 问题定位：闪烁三次 + 自动切楼层 ----
export function locateIssue(issue) {
  state.activeIssueId = issue.issueId;
  const target = getFeature(issue.featureId);
  const ids = [issue.featureId, ...(issue.refs || [])].filter(Boolean);
  if (target && target.floor && state.floors.includes(target.floor)) {
    state.floorFilter = target.floor;
  }
  // 等楼层切换触发瓦片重建后再闪烁
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (rendererRef) {
      rendererRef.invalidate();
      rendererRef.startFlash(ids, issue.severity === 'fatal' ? '#ff3b30' : '#ff9500');
      if (target) {
        rendererRef.cx = target.x ?? (target._bounds ? (target._bounds.minX + target._bounds.maxX) / 2 : 0);
        rendererRef.cy = target.y ?? (target._bounds ? (target._bounds.minY + target._bounds.maxY) / 2 : 0);
      }
    }
  }));
}

// ---- 图层 / 楼层 ----
export function toggleLayer(key) {
  state.layers[key] = !state.layers[key];
  rendererRef?.invalidate();
}
export function setFloor(floor) {
  state.floorFilter = floor;
  rendererRef?.invalidate();
}

// ---- 筛选派生（Svelte 5 不能直接导出 $derived，用 getter 函数暴露当前值）----
const _filteredIssues = $derived.by(() => {
  return state.issues.filter((i) =>
    (state.filterSeverity === 'all' || i.severity === state.filterSeverity) &&
    (state.filterStatus === 'all' || i.status === state.filterStatus)
  );
});
export const getFilteredIssues = () => _filteredIssues;

const _issueCounts = $derived.by(() => {
  const c = { total: state.issues.length, pending: 0, confirmed: 0, rejected: 0 };
  for (const s of SEVERITY_ORDER) c[s] = 0;
  for (const i of state.issues) {
    c[i.severity]++;
    c[i.status]++;
  }
  return c;
});
export const getIssueCounts = () => _issueCounts;

// ---- 导出 ----
function csvCell(v) {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function exportIssueCsv() {
  const header = ['问题编号', '规则', '规则名称', '严重度', '状态', '楼栋', '楼层', '问题描述', '定位要素', '关联要素'];
  const lines = [header.join(',')];
  for (const i of state.issues) {
    lines.push([
      i.issueId, i.rule, i.ruleName,
      ({ fatal: '致命', major: '严重', minor: '一般', info: '提示' })[i.severity],
      ISSUE_STATUS[i.status].name,
      i.buildingId, i.floor, i.message, i.featureId ?? '', (i.refs || []).join(';')
    ].map(csvCell).join(','));
  }
  download('﻿' + lines.join('\r\n'), `${state.batch?.batchId || 'batch'}-问题清单.csv`, 'text/csv;charset=utf-8');
}

export function exportConclusion() {
  const ev = evaluateBatch(state.issues);
  const c = getIssueCounts();
  const lines = [
    `校园疏散指示图批次质检放行结论`,
    `================================`,
    `批次编号：${state.batch?.batchId || '—'}`,
    `生成时间：${state.batch?.generatedAt || '—'}`,
    `图纸数量：${state.batch?.drawings?.length || 0} 张`,
    `要素总数：${state.featureTotal}`,
    ``,
    `问题统计：总计 ${c.total} 条（致命 ${c.fatal} / 严重 ${c.major} / 一般 ${c.minor} / 提示 ${c.info}）`,
    `复核状态：待复核 ${c.pending} / 已确认 ${c.confirmed} / 已驳回 ${c.rejected}`,
    ``,
    `放行结论：【${ev.status === 'released' ? '准予放行' : ev.status === 'hold' ? '不予放行' : '暂不可放行'}】`,
    `结论说明：${ev.conclusion}`,
    ``,
    `逐条明细：`,
    ...state.issues.map((i) =>
      `[${i.issueId}] ${ISSUE_STATUS[i.status].name} · ${({ fatal: '致命', major: '严重', minor: '一般', info: '提示' })[i.severity]} · ${i.ruleName} · ${i.buildingId} ${i.floor} — ${i.message}`)
  ];
  download(lines.join('\r\n'), `${state.batch?.batchId || 'batch'}-放行结论.txt`, 'text/plain;charset=utf-8');
}

function download(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const LAYER_META = LAYERS;
