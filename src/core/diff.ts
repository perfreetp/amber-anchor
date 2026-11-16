// 两版本渠段差异对比：以结构 id 对齐，节点均位移作为偏差
import type { FanModel, Reach, ReachDiff } from '../types';

function averageDeviation(a: Reach, b: Reach): number {
  const n = Math.min(a.nodes.length, b.nodes.length);
  if (n === 0) return 0;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const dx = a.nodes[i].x - b.nodes[i].x;
    const dy = a.nodes[i].y - b.nodes[i].y;
    sum += Math.hypot(dx, dy);
  }
  return sum / n;
}

export function diffModels(oldModel: FanModel, newModel: FanModel): ReachDiff[] {
  const oldMap = new Map(oldModel.reaches.map((r) => [r.id, r]));
  const newMap = new Map(newModel.reaches.map((r) => [r.id, r]));
  const ids = new Set<string>([...oldMap.keys(), ...newMap.keys()]);
  const diffs: ReachDiff[] = [];
  for (const id of ids) {
    const o = oldMap.get(id);
    const n = newMap.get(id);
    if (o && !n) {
      diffs.push({ id, kind: o.kind, status: 'removed', deviation: 0 });
    } else if (!o && n) {
      diffs.push({ id, kind: n.kind, status: 'added', deviation: 0 });
    } else if (o && n) {
      const deviation = averageDeviation(o, n);
      diffs.push({
        id,
        kind: n.kind,
        status: deviation > 0.5 ? 'modified' : 'unchanged',
        deviation
      });
    }
  }
  const order = { removed: 0, added: 1, modified: 2, unchanged: 3 };
  return diffs.sort((a, b) => order[a.status] - order[b.status] || b.deviation - a.deviation);
}
