// 统计指标：河道总长、渠系密度
import type { FanModel, ModelStats, Reach } from '../types';
import { polylineLength } from './math';

function reachLength(r: Reach): number {
  return polylineLength(r.nodes);
}

export function computeStats(model: FanModel): ModelStats {
  let riverLength = 0;
  let canalLength = 0;
  for (const r of model.reaches) {
    const len = reachLength(r);
    if (r.kind === 'river') riverLength += len;
    else canalLength += len;
  }
  // 扇形面积：扇形 = 半顶角 θ、半径 R → A = θ·R²（θ 为全顶角弧度）
  const halfAngle = (62 * Math.PI) / 180;
  const fanAreaKm2 = (2 * halfAngle * model.params.radius * model.params.radius) / 1e6;
  return {
    totalLength: riverLength + canalLength,
    riverLength,
    canalLength,
    reachCount: model.reaches.length,
    canalDensity: fanAreaKm2 > 0 ? canalLength / 1000 / fanAreaKm2 : 0,
    fanArea: fanAreaKm2
  };
}
