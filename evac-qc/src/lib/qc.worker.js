// 质检 Worker：整批检查在后台线程执行，避免上万要素冻结 UI
import { runChecks } from './qc.js';

self.onmessage = (e) => {
  const { type, features } = e.data;
  if (type !== 'run') return;
  const issues = runChecks(features, (p) => {
    self.postMessage({ type: 'progress', progress: p });
  });
  self.postMessage({ type: 'done', issues });
};
