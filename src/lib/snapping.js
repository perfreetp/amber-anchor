// 吸附计算：岸线拐点 / 相邻宗海顶点（15像素阈值在调用处换算为世界距离）
import { nearestPointOnPolyline, dist } from './geometry.js';

export function snapVertex(worldPt, tolWorld, opts) {
  const { coastline, parcels, excludeParcelId = null, excludeRing = null } = opts;
  let best = null;
  const consider = (pt, source) => {
    const d = dist(worldPt, pt);
    if (d <= tolWorld && (!best || d < best.d)) best = { point: { ...pt }, d, source };
  };
  for (const v of coastline) consider(v, '岸线拐点');
  for (const p of parcels) {
    if (p.id === excludeParcelId) continue;
    p.rings.forEach((ring, ri) => ring.forEach((v) => consider(v, `相邻宗海 ${p.id} 界址点`)));
  }
  if (excludeParcelId && excludeRing) {
    // 同宗其他环的顶点也参与吸附（孔洞编辑时）
    const self = parcels.find((p) => p.id === excludeParcelId);
    self?.rings.forEach((ring, ri) => {
      if (ri === excludeRing) return;
      ring.forEach((v) => consider(v, `本宗环${ri}界址点`));
    });
  }
  return best;
}

// 边线吸附到航道中心线：返回投影点
export function snapToFairway(worldPt, tolWorld, centerline) {
  const r = nearestPointOnPolyline(worldPt, centerline);
  if (r && r.dist <= tolWorld) {
    return { point: r.point, d: r.dist, source: '航道中心线', segment: r.segment };
  }
  return null;
}

// 综合吸附：顶点优先，其次航道中心线
export function snapAll(worldPt, tolWorld, opts) {
  const v = snapVertex(worldPt, tolWorld, opts);
  const f = opts.fairway ? snapToFairway(worldPt, tolWorld, opts.fairway.centerline) : null;
  if (v && (!f || v.d <= f.d)) return { ...v, kind: 'vertex' };
  if (f) return { ...f, kind: 'edge' };
  return null;
}
