import type {
  Assignment,
  ControlPoint,
  GreeningParams,
  RoadSample,
  TreeSpecies,
} from '../types';

export const SPECIES: TreeSpecies[] = ['camphor', 'ginkgo', 'plane'];

export const SPECIES_LABEL: Record<TreeSpecies, string> = {
  camphor: '香樟',
  ginkgo: '银杏',
  plane: '悬铃木',
};

export const DEFAULT_PARAMS: GreeningParams = {
  roadWidth: 12,
  treeSpacing: 6,
  speciesRatio: { camphor: 0.5, ginkgo: 0.3, plane: 0.2 },
  flowerBedLength: 8,
  flowerBedGap: 4,
  lampSpacing: 24,
  shrubSpacing: 2,
  season: 'summer',
};

export const DEFAULT_ASSIGNMENT: Assignment = {
  title: '校园主干道秋季绿化布置（课程练习一）',
  description:
    '在校园主干道两侧布置行道树、灌木带、花坛与路灯。要求疏密得当、树种比例合理，' +
    '参数须落在题目允许范围内，提交后系统自动核对并由教师复核。',
  seed: 20260901,
  segmentLength: 20,
  rules: {
    roadWidth: { min: 10, max: 16, weight: 20, label: '路宽', unit: 'm' },
    treeSpacing: { min: 5, max: 8, weight: 30, label: '行道树间距', unit: 'm' },
    lampSpacing: { min: 20, max: 30, weight: 20, label: '路灯间隔', unit: 'm' },
    flowerBedLength: { min: 6, max: 12, weight: 30, label: '花坛长度', unit: 'm' },
  },
  ratioTolerance: 0.1,
  expectedRatio: { camphor: 0.5, ginkgo: 0.3, plane: 0.2 },
};

/** 把树种比例归一化，和为 1；全 0 时退回均分 */
export function normalizeRatio(ratio: Record<TreeSpecies, number>): Record<TreeSpecies, number> {
  const total = SPECIES.reduce((sum, k) => sum + Math.max(0, ratio[k]), 0);
  if (total <= 0) {
    return { camphor: 1 / 3, ginkgo: 1 / 3, plane: 1 / 3 };
  }
  return {
    camphor: Math.max(0, ratio.camphor) / total,
    ginkgo: Math.max(0, ratio.ginkgo) / total,
    plane: Math.max(0, ratio.plane) / total,
  };
}

/**
 * 由控制点构造 Catmull-Rom 样条，并按等弧长重采样。
 * 重采样保证“沿弧长 s 定位”与参数无关，分段、间距计算都基于弧长。
 */
export function buildRoadSamples(points: ControlPoint[], step = 0.5): RoadSample[] {
  if (points.length < 2) return [];

  const pts = points.map((p) => ({ x: p.x, z: p.z }));
  // 首尾补点，让曲线穿过两端控制点
  const head = { x: 2 * pts[0].x - pts[1].x, z: 2 * pts[0].z - pts[1].z };
  const tail = {
    x: 2 * pts[pts.length - 1].x - pts[pts.length - 2].x,
    z: 2 * pts[pts.length - 1].z - pts[pts.length - 2].z,
  };
  const all = [head, ...pts, tail];

  const curve: { x: number; z: number }[] = [];
  const SUBDIV = 24;
  for (let i = 1; i < all.length - 2; i++) {
    const p0 = all[i - 1];
    const p1 = all[i];
    const p2 = all[i + 1];
    const p3 = all[i + 2];
    for (let j = 0; j < SUBDIV; j++) {
      const t = j / SUBDIV;
      const t2 = t * t;
      const t3 = t2 * t;
      curve.push({
        x:
          0.5 *
          (2 * p1.x +
            (-p0.x + p2.x) * t +
            (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
            (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        z:
          0.5 *
          (2 * p1.z +
            (-p0.z + p2.z) * t +
            (2 * p0.z - 5 * p1.z + 4 * p2.z - p3.z) * t2 +
            (-p0.z + 3 * p1.z - 3 * p2.z + p3.z) * t3),
      });
    }
  }
  curve.push(pts[pts.length - 1]);

  // 累计弧长
  const cum: number[] = [0];
  for (let i = 1; i < curve.length; i++) {
    const dx = curve[i].x - curve[i - 1].x;
    const dz = curve[i].z - curve[i - 1].z;
    cum.push(cum[i - 1] + Math.hypot(dx, dz));
  }
  const total = cum[cum.length - 1];
  if (total < 1) return [];

  // 等弧长重采样
  const samples: RoadSample[] = [];
  let ci = 0;
  const count = Math.max(2, Math.round(total / step));
  for (let k = 0; k <= count; k++) {
    const s = (total * k) / count;
    while (ci < cum.length - 2 && cum[ci + 1] < s) ci++;
    const segLen = cum[ci + 1] - cum[ci] || 1;
    const f = (s - cum[ci]) / segLen;
    const a = curve[ci];
    const b = curve[ci + 1];
    const x = a.x + (b.x - a.x) * f;
    const z = a.z + (b.z - a.z) * f;
    let tx = b.x - a.x;
    let tz = b.z - a.z;
    const len = Math.hypot(tx, tz) || 1;
    tx /= len;
    tz /= len;
    // 左侧法线
    const nx = -tz;
    const nz = tx;
    samples.push({ s, x, y: 0, z, tx, tz, nx, nz });
  }
  return samples;
}

export function roadLength(samples: RoadSample[]): number {
  return samples.length ? samples[samples.length - 1].s : 0;
}

/** 按弧长 s 取采样点（线性插值） */
export function sampleAt(samples: RoadSample[], s: number): RoadSample | null {
  if (!samples.length) return null;
  const total = samples[samples.length - 1].s;
  const clamped = Math.max(0, Math.min(total, s));
  // 二分查找
  let lo = 0;
  let hi = samples.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (samples[mid].s < clamped) lo = mid + 1;
    else hi = mid;
  }
  const b = samples[lo];
  if (lo === 0) return b;
  const a = samples[lo - 1];
  const f = (clamped - a.s) / ((b.s - a.s) || 1);
  return {
    s: clamped,
    x: a.x + (b.x - a.x) * f,
    y: 0,
    z: a.z + (b.z - a.z) * f,
    tx: a.tx + (b.tx - a.tx) * f,
    tz: a.tz + (b.tz - a.z) * f,
    nx: a.nx + (b.nx - a.nx) * f,
    nz: a.nz + (b.nz - a.nz) * f,
  };
}

/** 由弧长 + 横向偏移求世界坐标 */
export function offsetPosition(
  sample: RoadSample,
  offset: number,
  y = 0,
): { x: number; y: number; z: number } {
  return {
    x: sample.x + sample.nx * offset,
    y,
    z: sample.z + sample.nz * offset,
  };
}
