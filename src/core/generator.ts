// 过程式生成器：主河道 → 多级分汊 → 干渠/支渠/斗渠
// 确定性保证：结构 id 只依赖拓扑位置；随机流由 (seed, path) 派生；
// 同种子 + 同参数（同精度）输出逐点一致。
import type { FanModel, GenParams, Reach, ReachKind, ReachLevel, ReachNode } from '../types';
import { DeterministicRandom } from './rng';
import {
  ChannelBathymetry,
  FAN_HALF_ANGLE,
  incisionDepth,
  WATER_RATIO,
  createTerrainField,
  type TerrainField
} from './terrain';
import { clamp, dirFromAngle, v2dist, type Vec2 } from './math';

const RIVER_STEP_FULL = 14; // 节点间距（米，全精度）
const RIVER_STEP_PREVIEW = 26;
const CANAL_STEP_FULL = 16;
const CANAL_STEP_PREVIEW = 30;

const KIND_LEVEL: Record<ReachKind, ReachLevel> = {
  river: 0,
  mainCanal: 1,
  subCanal: 2,
  lateral: 3
};

export interface GenResult {
  model: FanModel;
  /** 估算阶段即超过阈值、实际采用预览精度 */
  degraded: boolean;
}

export const SEGMENT_BUDGET = 3000;

/** 估算全精度下的段（折线边）总数，用于决定是否降预览精度 */
function estimateSegmentCount(params: GenParams, preview: boolean): number {
  const riverLen = params.radius * 0.98;
  const riverStep = preview ? RIVER_STEP_PREVIEW : RIVER_STEP_FULL;
  const branchCount = 2 + Math.min(3, params.branchLevels);
  // 等比求和：1 + k + k^2 ...
  const riverReaches = (Math.pow(branchCount, params.branchLevels + 1) - 1) / (branchCount - 1);
  const riverSegs = (riverReaches * riverLen * 0.62) / riverStep;

  const mainCanals = 2;
  const subPerMain = preview ? 1 : 3;
  const latPerSub = 2;
  const canalStep = preview ? CANAL_STEP_PREVIEW : CANAL_STEP_FULL;
  const subLen = params.radius * 0.22;
  const latLen = params.radius * 0.09;
  const mainSegs = (mainCanals * riverLen) / canalStep;
  const subSegs = (mainCanals * subPerMain * subLen) / canalStep;
  const latSegs = (mainCanals * subPerMain * latPerSub * latLen) / canalStep;
  return Math.round(riverSegs + mainSegs + subSegs + latSegs);
}

export interface GenOptions {
  /** 保留的手改段（id → Reach），重算时原地保留；其下游手改段一并保留 */
  keep?: Map<string, Reach>;
  forcePrecision?: 'full' | 'preview';
}

export function generateModel(params: GenParams, opts: GenOptions = {}): GenResult {
  const keep = opts.keep ?? new Map<string, Reach>();
  // 先估算，超 3000 段自动降预览精度；预览步长按预算自适应放大
  const fullEstimate = estimateSegmentCount(params, false);
  const preview = opts.forcePrecision
    ? opts.forcePrecision === 'preview'
    : fullEstimate > SEGMENT_BUDGET;
  // 段数与步长成反比：按预算反推步长倍率，保证预览精度落入 3000 段以内
  const stepFactor = preview ? Math.max(1, fullEstimate / SEGMENT_BUDGET) : 1;

  const field = createTerrainField(params);
  const riverStep = (preview ? RIVER_STEP_PREVIEW : RIVER_STEP_FULL) * stepFactor;
  const canalStep = (preview ? CANAL_STEP_PREVIEW : CANAL_STEP_FULL) * stepFactor;
  const ctx: Ctx = { params, field, preview, riverStep, canalStep, keep, made: new Map() };

  const reaches: Reach[] = [];

  // 1. 主河道
  const main = buildMainRiver(ctx);
  reaches.push(main);

  // 2. 多级分汊（递归）
  const branchCount = 2 + Math.min(3, params.branchLevels);
  growBranches(ctx, main, 1, params.branchLevels, branchCount, reaches);

  // 3. 两岸干渠
  for (const side of [-1, 1]) {
    reaches.push(buildMainCanal(ctx, side, main));
  }

  // 4. 支渠 → 斗渠
  for (const mc of reaches.filter((r) => r.kind === 'mainCanal')) {
    const subs = buildSubCanals(ctx, mc);
    for (const sub of subs) {
      reaches.push(sub);
      for (const lat of buildLaterals(ctx, sub)) reaches.push(lat);
    }
  }

  // 5. 保留段替换：被锁段及其手改下游原地保留，未锁定的重新生成
  const kept = applyKeptReaches(reaches, keep);

  // 6. 重新计算所有节点水面高程（保留段自身已有 z，不重算）
  const bath = new ChannelBathymetry(reaches);
  for (const r of reaches) {
    if (kept.has(r.id)) continue;
    for (const n of r.nodes) {
      const s = bath.sample(field, n.x, n.y);
      n.z = s.ground + incisionDepth(n.width, r.kind) * WATER_RATIO;
    }
  }

  const segmentCount = reaches.reduce((sum, r) => sum + r.nodes.length - 1, 0);
  return {
    degraded: preview,
    model: {
      params: { ...params },
      reaches,
      precision: preview ? 'preview' : 'full',
      segmentCount,
      terrain: { gridSize: field.gridSize, extent: field.extent },
      generatedAt: new Date().toISOString()
    }
  };
}

interface Ctx {
  params: GenParams;
  field: TerrainField;
  preview: boolean;
  riverStep: number;
  canalStep: number;
  keep: Map<string, Reach>;
  made: Map<string, Reach>;
}

function makeReach(
  id: string,
  kind: ReachKind,
  parentId: string | null,
  parentAnchor: number,
  path: string,
  points: Vec2[],
  width0: number,
  width1: number,
  preview: boolean
): Reach {
  const nodes: ReachNode[] = points.map((p, i) => ({
    x: p.x,
    y: p.y,
    z: 0,
    width: width0 + (width1 - width0) * (points.length === 1 ? 0 : i / (points.length - 1))
  }));
  return {
    id,
    kind,
    level: KIND_LEVEL[kind],
    parentId,
    parentAnchor,
    path,
    nodes,
    locked: false,
    manuallyEdited: false,
    preview
  };
}

/** 生长一条中心线：初始位置/方向 + 逐节点转向，约束在扇体内部 */
function growCenterline(
  ctx: Ctx,
  path: string,
  start: Vec2,
  startAngle: number,
  length: number,
  step: number,
  turnScale: number,
  towardAxis: boolean
): Vec2[] {
  const rng = new DeterministicRandom(ctx.params.seed, path);
  const pts: Vec2[] = [{ ...start }];
  let angle = startAngle;
  const n = Math.max(3, Math.round(length / step));
  const { apexX, apexY, radius } = ctx.params;

  for (let i = 0; i < n; i++) {
    // 确定性游走：小幅随机转向 + 向扇轴回摆
    angle += rng.gaussian() * turnScale;
    if (towardAxis) {
      const prev = pts[pts.length - 1];
      const theta = Math.atan2(prev.x - apexX, prev.y - apexY);
      angle -= theta * 0.08;
    }
    angle = clamp(angle, -FAN_HALF_ANGLE * 0.96, FAN_HALF_ANGLE * 0.96);
    const d = dirFromAngle(angle);
    const prev = pts[pts.length - 1];
    let nx = prev.x + d.x * step;
    let ny = prev.y + d.y * step;

    // 扇缘约束：超出半径则贴着扇缘向内修正
    const dd = Math.hypot(nx - apexX, ny - apexY);
    if (dd > radius * 0.985) {
      const k = (radius * 0.985) / dd;
      nx = apexX + (nx - apexX) * k;
      ny = apexY + (ny - apexY) * k;
    }
    pts.push({ x: nx, y: ny });
    if (dd >= radius * 0.98) break;
  }
  return pts;
}

function buildMainRiver(ctx: Ctx): Reach {
  const { params } = ctx;
  const start: Vec2 = { x: params.apexX, y: params.apexY };
  const length = params.radius * 0.98;
  const pts = growCenterline(ctx, 'river:main', start, 0, length, ctx.riverStep, 0.16, true);
  return makeReach(
    'river:main',
    'river',
    null,
    -1,
    'river:main',
    pts,
    params.mainWidth,
    params.mainWidth * 0.42,
    ctx.preview
  );
}

/** 递归分汊：在父段锚点处生成 k 条汊流，直到指定级数 */
function growBranches(
  ctx: Ctx,
  parent: Reach,
  depth: number,
  maxDepth: number,
  branchCount: number,
  out: Reach[]
) {
  if (depth > maxDepth) return;
  // 锚点位置：沿父程 30%~78%，每条汊流一个，结构顺序固定
  const fractions =
    branchCount === 2
      ? [0.34, 0.66]
      : branchCount === 3
        ? [0.3, 0.52, 0.74]
        : [0.26, 0.44, 0.62, 0.78, 0.86];

  for (let k = 0; k < branchCount; k++) {
    const id = `${parent.id}/b${k}`;
    const anchorFrac = fractions[k % fractions.length] + (depth - 1) * 0.02;
    const anchorIdx = clamp(
      Math.round(anchorFrac * (parent.nodes.length - 1)),
      1,
      parent.nodes.length - 2
    );
    const anchor = parent.nodes[anchorIdx];
    const rng = new DeterministicRandom(ctx.params.seed, `${id}:dir`);
    // 交替偏向左右；角度随深度收窄
    const sign = k % 2 === 0 ? -1 : 1;
    const baseAngle =
      sign * (0.18 + rng.next() * 0.22) * (1 - depth * 0.12) + rng.gaussian() * 0.08;
    const remain = Math.max(
      ctx.riverStep * 3,
      v2dist({ x: anchor.x, y: anchor.y }, { x: ctx.params.apexX, y: ctx.params.apexY }) * 0.55
    );
    const len = clamp(remain, ctx.params.radius * 0.18, ctx.params.radius * 0.5);
    const pts = growCenterline(
      ctx,
      id,
      { x: anchor.x, y: anchor.y },
      baseAngle,
      len,
      ctx.riverStep,
      0.2,
      true
    );
    const w0 = anchor.width * 0.62;
    const reach = makeReach(
      id,
      'river',
      parent.id,
      anchorIdx,
      id,
      pts,
      w0,
      w0 * 0.45,
      ctx.preview
    );
    out.push(reach);
    growBranches(ctx, reach, depth + 1, maxDepth, branchCount, out);
  }
}

/** 两岸干渠：自扇顶附近沿扇缘内侧顺坡而下 */
function buildMainCanal(ctx: Ctx, side: number, main: Reach): Reach {
  const id = `canal:main:${side < 0 ? 'L' : 'R'}`;
  const rng = new DeterministicRandom(ctx.params.seed, `${id}:dir`);
  const start: Vec2 = {
    x: ctx.params.apexX + side * ctx.params.mainWidth * 1.6,
    y: ctx.params.apexY + ctx.params.radius * 0.04
  };
  const angle = side * (FAN_HALF_ANGLE * 0.72 + rng.next() * 0.08);
  const pts = growCenterline(
    ctx,
    id,
    start,
    angle,
    ctx.params.radius * 0.92,
    ctx.canalStep,
    0.05,
    false
  );
  const w0 = ctx.params.mainWidth * 0.28;
  return makeReach(id, 'mainCanal', main.id, 1, id, pts, w0, w0 * 0.7, ctx.preview);
}

/** 支渠：干渠上按固定程位向扇内引出 */
function buildSubCanals(ctx: Ctx, mc: Reach): Reach[] {
  const fracs = ctx.preview ? [0.5] : [0.26, 0.5, 0.74];
  const result: Reach[] = [];
  fracs.forEach((f, i) => {
    const id = `${mc.id}/s${i}`;
    const anchorIdx = clamp(Math.round(f * (mc.nodes.length - 1)), 1, mc.nodes.length - 2);
    const anchor = mc.nodes[anchorIdx];
    const rng = new DeterministicRandom(ctx.params.seed, `${id}:dir`);
    // 指向扇轴方向
    const toAxis = Math.atan2(ctx.params.apexX - anchor.x, ctx.params.apexY - anchor.y);
    const angle = toAxis + rng.gaussian() * 0.12;
    const len = ctx.params.radius * (0.2 + rng.next() * 0.08);
    const pts = growCenterline(ctx, id, { x: anchor.x, y: anchor.y }, angle, len, ctx.canalStep, 0.1, true);
    const w0 = mc.nodes[anchorIdx].width * 0.55;
    result.push(makeReach(id, 'subCanal', mc.id, anchorIdx, id, pts, w0, w0 * 0.6, ctx.preview));
  });
  return result;
}

/** 斗渠：支渠两侧垂直引出的短渠 */
function buildLaterals(ctx: Ctx, sub: Reach): Reach[] {
  const fracs = [0.32, 0.72];
  const result: Reach[] = [];
  fracs.forEach((f, i) => {
    for (const side of [-1, 1]) {
      const id = `${sub.id}/l${i}_${side < 0 ? 'L' : 'R'}`;
      const anchorIdx = clamp(Math.round(f * (sub.nodes.length - 1)), 1, sub.nodes.length - 2);
      const anchor = sub.nodes[anchorIdx];
      const rng = new DeterministicRandom(ctx.params.seed, `${id}:dir`);
      // 局部切线的垂直方向
      const next = sub.nodes[Math.min(anchorIdx + 1, sub.nodes.length - 1)];
      const tangent = Math.atan2(next.y - anchor.y, next.x - anchor.x);
      const angle = tangent + (side * Math.PI) / 2 + rng.gaussian() * 0.08;
      const len = ctx.params.radius * (0.07 + rng.next() * 0.04);
      const pts = growCenterline(
        ctx,
        id,
        { x: anchor.x, y: anchor.y },
        angle,
        len,
        ctx.canalStep,
        0.08,
        false
      );
      const w0 = sub.nodes[anchorIdx].width * 0.45;
      result.push(
        makeReach(id, 'lateral', sub.id, anchorIdx, id, pts, w0, w0 * 0.7, ctx.preview)
      );
    }
  });
  return result;
}

/**
 * 锁定/手改保留策略：
 * - 保留集合中的段整段替换新生成结果（几何、锁定标记原样）
 * - 新拓扑中不存在的保留段（参数大变导致结构消失）：仍保留挂回，标记孤段
 * - 新生成段的起点若父段被保留，则吸附到保留父段的锚点
 */
function applyKeptReaches(reaches: Reach[], keep: Map<string, Reach>): Set<string> {
  const kept = new Set<string>();
  if (keep.size === 0) return kept;
  const byId = new Map(reaches.map((r) => [r.id, r]));
  for (const [id, old] of keep) {
    const fresh = byId.get(id);
    if (fresh) {
      const idx = reaches.indexOf(fresh);
      reaches[idx] = { ...old };
      kept.add(id);
    } else {
      // 结构已消失：保留实体但允许其悬空（编辑器中以警示色显示）
      reaches.push({ ...old });
      kept.add(id);
    }
  }
  // 吸附：父段被保留时，子段首节点对齐父段锚点
  for (const r of reaches) {
    if (kept.has(r.id) || !r.parentId) continue;
    const parent = byId.get(r.parentId) ?? reaches.find((x) => x.id === r.parentId);
    if (parent && kept.has(parent.id)) {
      const anchor = parent.nodes[clamp(r.parentAnchor, 0, parent.nodes.length - 1)];
      if (anchor && r.nodes[0]) {
        r.nodes[0].x = anchor.x;
        r.nodes[0].y = anchor.y;
      }
    }
  }
  return kept;
}

/** 手动拖拽节点后更新段（z 依据当前地形重算，宽度保留） */
export function updateReachNode(
  model: FanModel,
  reachId: string,
  nodeIdx: number,
  x: number,
  y: number
): Reach | null {
  const reach = model.reaches.find((r) => r.id === reachId);
  if (!reach || !reach.nodes[nodeIdx]) return null;
  const field = createTerrainField(model.params);
  const bath = new ChannelBathymetry(model.reaches);
  const node = reach.nodes[nodeIdx];
  node.x = x;
  node.y = y;
  const s = bath.sample(field, x, y);
  node.z = s.ground + incisionDepth(node.width, reach.kind) * WATER_RATIO;
  reach.manuallyEdited = true;
  return reach;
}

/** 锁定/解锁段。锁定后下游所有已手改段随之一并受保护。 */
export function setReachLocked(model: FanModel, reachId: string, locked: boolean): void {
  const reach = model.reaches.find((r) => r.id === reachId);
  if (!reach) return;
  reach.locked = locked;
  if (locked) reach.manuallyEdited = true;
}

/** 解除全部手改，恢复纯参数生成状态 */
export function resetAllEdits(params: GenParams): GenResult {
  return generateModel(params, { keep: new Map() });
}

/** 收集重算时需要保留的段：锁定段 + 其下游全部手改段 */
export function collectKeptReaches(model: FanModel): Map<string, Reach> {
  const keep = new Map<string, Reach>();
  const byId = new Map(model.reaches.map((r) => [r.id, r]));
  const locked = model.reaches.filter((r) => r.locked);
  const visited = new Set<string>();
  const walk = (id: string) => {
    if (visited.has(id)) return;
    visited.add(id);
    const r = byId.get(id);
    if (!r) return;
    keep.set(id, structuredClone(r));
    for (const child of model.reaches.filter((c) => c.parentId === id)) {
      if (child.manuallyEdited || child.locked) walk(child.id);
    }
  };
  for (const r of locked) walk(r.id);
  return keep;
}
