import type {
  Assignment,
  GreeningParams,
  Placement,
  RoadSample,
  Side,
  Vec3,
} from '../types';
import { makeRng, streamSeed } from './rng';
import { normalizeRatio, offsetPosition, sampleAt, SPECIES } from './geometry';

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return `p${Date.now().toString(36)}-${idCounter}`;
}

/** 弧长 s 所属段 */
export function segmentOf(s: number, assignment: Assignment): number {
  return Math.floor(s / assignment.segmentLength);
}

/** 段的弧长区间 */
export function segmentRange(
  segment: number,
  assignment: Assignment,
  totalLength: number,
): [number, number] {
  const start = segment * assignment.segmentLength;
  return [start, Math.min(totalLength, start + assignment.segmentLength)];
}

interface GenContext {
  samples: RoadSample[];
  params: GreeningParams;
  assignment: Assignment;
  totalLength: number;
}

/** 在指定段内按固定间距生成站位，局部序号在段内稳定 → 同种子完全可复现 */
function stationsInSegment(
  segment: number,
  spacing: number,
  phase: number,
  ctx: GenContext,
): number[] {
  const [start, end] = segmentRange(segment, ctx.assignment, ctx.totalLength);
  const out: number[] = [];
  const first = Math.ceil((start - phase) / spacing) * spacing + phase;
  for (let s = first; s < end - 0.001; s += spacing) {
    if (s >= start) out.push(Number(s.toFixed(4)));
  }
  return out;
}

function worldAt(ctx: GenContext, s: number, offset: number): Vec3 {
  const sample = sampleAt(ctx.samples, s)!;
  const p = offsetPosition(sample, offset);
  return { x: p.x, y: p.y, z: p.z };
}

/** 生成某一段内的行道树（两侧） */
function genTrees(segment: number, ctx: GenContext): Placement[] {
  const { params, assignment } = ctx;
  const rng = makeRng(streamSeed(assignment.seed, 'tree', segment));
  const ratio = normalizeRatio(params.speciesRatio);
  const weights = SPECIES.map((k) => ratio[k]);
  const half = params.roadWidth / 2;
  // 树在路缘外 1.2m
  const baseOffset = half + 1.2;
  const stations = stationsInSegment(segment, params.treeSpacing, params.treeSpacing / 2, ctx);
  const out: Placement[] = [];

  stations.forEach((s, localIndex) => {
    (['left', 'right'] as Side[]).forEach((side) => {
      const jitterS = rng.range(-0.08, 0.08) * params.treeSpacing;
      const jitterO = rng.range(-0.25, 0.25);
      const species = rng.pick(SPECIES, weights);
      const canopy = rng.range(0.75, 1);
      const sign = side === 'left' ? 1 : -1;
      const finalS = Math.max(0, s + jitterS);
      const offset = sign * (baseOffset + jitterO);
      out.push({
        id: `tree-${side}-${segment}-${localIndex}`,
        kind: 'tree',
        species,
        side,
        segment,
        s: finalS,
        offset,
        position: worldAt(ctx, finalS, offset),
        locked: false,
        rngIndex: localIndex,
        canopy,
      });
    });
  });
  return out;
}

/** 路灯：交错布置在两侧 */
function genLamps(segment: number, ctx: GenContext): Placement[] {
  const { params, assignment } = ctx;
  const rng = makeRng(streamSeed(assignment.seed, 'lamp', segment));
  const half = params.roadWidth / 2;
  const baseOffset = half + 0.6;
  const stations = stationsInSegment(segment, params.lampSpacing, params.lampSpacing / 2, ctx);
  const out: Placement[] = [];

  stations.forEach((s, localIndex) => {
    const jitterS = rng.range(-0.05, 0.05) * params.lampSpacing;
    // 用全局站位奇偶决定侧别，保证跨段也交错一致
    const globalIndex = Math.round((s - params.lampSpacing / 2) / params.lampSpacing);
    const side: Side = globalIndex % 2 === 0 ? 'left' : 'right';
    const sign = side === 'left' ? 1 : -1;
    const finalS = Math.max(0, s + jitterS);
    const offset = sign * baseOffset;
    out.push({
      id: `lamp-${side}-${segment}-${localIndex}`,
      kind: 'lamp',
      side,
      segment,
      s: finalS,
      offset,
      position: worldAt(ctx, finalS, offset),
      locked: false,
      rngIndex: localIndex,
      canopy: 1,
    });
  });
  return out;
}

/** 灌木带：树线与路缘之间，两侧连续点状布置 */
function genShrubs(segment: number, ctx: GenContext): Placement[] {
  const { params, assignment } = ctx;
  const rng = makeRng(streamSeed(assignment.seed, 'shrub', segment));
  const half = params.roadWidth / 2;
  const baseOffset = half + 0.45;
  const spacing = Math.max(0.8, params.shrubSpacing);
  const stations = stationsInSegment(segment, spacing, spacing / 2, ctx);
  const out: Placement[] = [];

  stations.forEach((s, localIndex) => {
    (['left', 'right'] as Side[]).forEach((side) => {
      const jitterO = rng.range(-0.12, 0.12);
      const sign = side === 'left' ? 1 : -1;
      const offset = sign * (baseOffset + jitterO);
      out.push({
        id: `shrub-${side}-${segment}-${localIndex}`,
        kind: 'shrub',
        side,
        segment,
        s,
        offset,
        position: worldAt(ctx, s, offset),
        locked: false,
        rngIndex: localIndex,
        canopy: rng.range(0.7, 1),
      });
    });
  });
  return out;
}

/** 花坛：沿外侧成段布置，长度与间隔由参数决定 */
function genFlowerBeds(segment: number, ctx: GenContext): Placement[] {
  const { params, assignment } = ctx;
  if (params.flowerBedLength <= 0) return [];
  const rng = makeRng(streamSeed(assignment.seed, 'flower', segment));
  const half = params.roadWidth / 2;
  const baseOffset = half + 2.6;
  const period = params.flowerBedLength + Math.max(0, params.flowerBedGap);
  const [start, end] = segmentRange(segment, ctx.assignment, ctx.totalLength);
  const out: Placement[] = [];

  // 以段起点对齐的周期布置，局部序号段内稳定
  const first = start;
  let localIndex = 0;
  for (let s0 = first; s0 < end; s0 += period) {
    const len = Math.min(params.flowerBedLength, end - s0);
    if (len < 1) break;
    (['left', 'right'] as Side[]).forEach((side) => {
      const sign = side === 'left' ? 1 : -1;
      const jitterO = rng.range(-0.15, 0.15);
      const offset = sign * (baseOffset + jitterO);
      const centerS = s0 + len / 2;
      out.push({
        id: `flower-${side}-${segment}-${localIndex}`,
        kind: 'flowerbed',
        side,
        segment,
        s: centerS,
        offset,
        position: worldAt(ctx, centerS, offset),
        locked: false,
        rngIndex: localIndex,
        canopy: 1,
      });
    });
    localIndex += 1;
  }
  return out;
}

/**
 * （重新）生成布置。
 * - scopeSegments 为空表示整路；否则只重算这些段。
 * - 已锁定（手动挪过）的对象永远原样保留，即使落在重算段内。
 * - 段外的未锁定对象保持不动 → “只重算受影响的区段”。
 */
export function regeneratePlacements(
  samples: RoadSample[],
  params: GreeningParams,
  assignment: Assignment,
  existing: Placement[],
  scopeSegments: number[],
): Placement[] {
  if (samples.length < 2) return [];
  const totalLength = samples[samples.length - 1].s;
  const segmentCount = Math.max(1, Math.ceil(totalLength / assignment.segmentLength));
  const scope = new Set(
    scopeSegments.length ? scopeSegments : Array.from({ length: segmentCount }, (_, i) => i),
  );
  const ctx: GenContext = { samples, params, assignment, totalLength };

  // 锁定的全部保留；非锁定但不在重算范围的也保留
  const kept = existing.filter((p) => p.locked || !scope.has(p.segment));
  const keptIds = new Set(kept.map((p) => p.id));
  const out: Placement[] = [...kept];

  for (const segment of Array.from(scope).sort((a, b) => a - b)) {
    const fresh = [
      ...genTrees(segment, ctx),
      ...genLamps(segment, ctx),
      ...genShrubs(segment, ctx),
      ...genFlowerBeds(segment, ctx),
    ];
    for (const p of fresh) {
      // 同 id 且被保留（理论上只有锁定项才会与新 id 撞）时跳过
      if (!keptIds.has(p.id)) out.push(p);
    }
  }
  return out;
}

/** 手动挪动后更新位置并锁定；同时反算 s/offset，便于清单导出 */
export function lockPlacementAt(
  placement: Placement,
  samples: RoadSample[],
  world: Vec3,
): Placement {
  // 找最近采样点反投影
  let best = samples[0];
  let bestD = Infinity;
  for (const smp of samples) {
    const d = (smp.x - world.x) ** 2 + (smp.z - world.z) ** 2;
    if (d < bestD) {
      bestD = d;
      best = smp;
    }
  }
  const dx = world.x - best.x;
  const dz = world.z - best.z;
  const offset = dx * best.nx + dz * best.nz;
  return {
    ...placement,
    locked: true,
    s: best.s,
    offset,
    position: { x: world.x, y: 0, z: world.z },
  };
}

export function makePlacementId(): string {
  return nextId();
}
