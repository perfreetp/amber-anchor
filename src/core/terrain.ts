// 冲积扇地形场：扇锥 + 确定性值噪声，全部由 (params, seed) 决定，无随机全局状态
import type { GenParams, Reach, ReachNode } from '../types';
import { hashStr } from './rng';
import { clamp, lerp } from './math';

export const FAN_HALF_ANGLE = (62 * Math.PI) / 180; // 扇体半顶角
export const FAN_AXIS = { x: 0, y: 1 }; // 扇体轴向：+y

/** 网格 hash 噪声：整数格点 → [0,1)，混入种子保证不同种子不同地貌 */
function cellHash(seed: number, ix: number, iy: number): number {
  const h = hashStr(`${seed}|${ix}|${iy}`);
  return h / 4294967296;
}

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

function valueNoise2D(seed: number, x: number, y: number, cell: number): number {
  const fx = x / cell;
  const fy = y / cell;
  const ix = Math.floor(fx);
  const iy = Math.floor(fy);
  const tx = smooth(fx - ix);
  const ty = smooth(fy - iy);
  const h00 = cellHash(seed, ix, iy);
  const h10 = cellHash(seed, ix + 1, iy);
  const h01 = cellHash(seed, ix, iy + 1);
  const h11 = cellHash(seed, ix + 1, iy + 1);
  return lerp(lerp(h00, h10, tx), lerp(h01, h11, tx), ty);
}

export interface TerrainField {
  params: GenParams;
  /** 原始地面高程（未下切） */
  baseHeight: (x: number, y: number) => number;
  /** 点相对扇顶的极坐标：d 距离，theta 偏轴角（弧度，带正负） */
  polar: (x: number, y: number) => { d: number; theta: number };
  /** 扇面覆盖掩码 0..1（扇缘外衰减为 0） */
  fanMask: (x: number, y: number) => number;
  extent: number;
  gridSize: number;
}

export function createTerrainField(params: GenParams): TerrainField {
  const { apexX, apexY, radius, slope, seed } = params;
  const relief = (slope / 100) * radius; // 扇顶相对扇缘的高差
  const extent = radius * 2.6;
  const gridSize = 128;

  const polar = (x: number, y: number) => {
    const dx = x - apexX;
    const dy = y - apexY;
    const d = Math.hypot(dx, dy);
    const theta = Math.atan2(dx, dy); // 0 = +y 轴向
    return { d, theta };
  };

  const fanMask = (x: number, y: number) => {
    const { d, theta } = polar(x, y);
    if (d < 1e-6) return 1;
    const angular = clamp(1 - Math.abs(theta) / FAN_HALF_ANGLE, 0, 1);
    const radial = clamp(1 - d / (radius * 1.04), 0, 1);
    // 扇缘外平滑收口
    return smooth(angular) * smooth(radial);
  };

  const baseHeight = (x: number, y: number) => {
    const { d } = polar(x, y);
    const mask = fanMask(x, y);
    const cone = relief * clamp(1 - d / radius, 0, 1) * mask;
    // 两层值噪声：大起伏 + 细纹理，幅度为扇体高差的 6% / 2%
    const n1 = valueNoise2D(seed, x, y, radius * 0.42) - 0.5;
    const n2 = valueNoise2D(seed ^ 0x9e3779b9, x, y, radius * 0.11) - 0.5;
    const noiseAmp = relief * 0.08;
    const noise = (n1 * 0.75 + n2 * 0.25) * noiseAmp * (0.25 + 0.75 * mask);
    return cone + noise;
  };

  return { params, baseHeight, polar, fanMask, extent, gridSize };
}

/** 河/渠下切剖面：t = 离岸水平距离 / 半宽，返回 0..1 的槽形系数 */
export function bankProfile(t: number): number {
  if (t >= 1) return 0;
  const c = Math.cos((clamp(t, 0, 1) * Math.PI) / 2);
  return c * c;
}

export function incisionDepth(width: number, kind: Reach['kind']): number {
  const factor = kind === 'river' ? 0.12 : 0.2;
  return Math.max(kind === 'river' ? 0.6 : 0.4, width * factor);
}

/** 水深占下切深度比例（露出 25% 超高） */
export const WATER_RATIO = 0.75;

/**
 * 考虑河渠下切后的地面高程。
 * 用空间网格索引加速地形网格/剖面采样。
 */
export class ChannelBathymetry {
  private cells = new Map<string, { reach: Reach; seg: number }[]>();
  private cellSize: number;
  constructor(private reaches: Reach[]) {
    this.cellSize = Math.max(8, reaches.reduce((m, r) => Math.max(m, r.nodes[0]?.width ?? 0), 0) * 1.5);
    for (const reach of reaches) {
      for (let i = 0; i < reach.nodes.length - 1; i++) {
        this.insert(reach, i);
      }
    }
  }

  private key(cx: number, cy: number) {
    return `${cx},${cy}`;
  }

  private insert(reach: Reach, seg: number) {
    const a = reach.nodes[seg];
    const b = reach.nodes[seg + 1];
    const minX = Math.floor((Math.min(a.x, b.x) - this.cellSize) / this.cellSize);
    const maxX = Math.floor((Math.max(a.x, b.x) + this.cellSize) / this.cellSize);
    const minY = Math.floor((Math.min(a.y, b.y) - this.cellSize) / this.cellSize);
    const maxY = Math.floor((Math.max(a.y, b.y) + this.cellSize) / this.cellSize);
    for (let cx = minX; cx <= maxX; cx++) {
      for (let cy = minY; cy <= maxY; cy++) {
        const k = this.key(cx, cy);
        let arr = this.cells.get(k);
        if (!arr) this.cells.set(k, (arr = []));
        arr.push({ reach, seg });
      }
    }
  }

  /** 点到线段的最近信息 */
  private nearestOnSeg(p: { x: number; y: number }, a: ReachNode, b: ReachNode) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len2 = dx * dx + dy * dy || 1;
    const t = clamp(((p.x - a.x) * dx + (p.y - a.y) * dy) / len2, 0, 1);
    const qx = a.x + dx * t;
    const qy = a.y + dy * t;
    return {
      t,
      dist: Math.hypot(p.x - qx, p.y - qy),
      node: {
        x: qx,
        y: qy,
        z: lerp(a.z, b.z, t),
        width: lerp(a.width, b.width, t)
      }
    };
  }

  /** 返回下切后的地面高程；water 非空时该点位于某条水面以下宽度内 */
  sample(
    field: TerrainField,
    x: number,
    y: number
  ): { ground: number; water: number | null; waterReachId: string | null } {
    const base = field.baseHeight(x, y);
    const cx = Math.floor(x / this.cellSize);
    const cy = Math.floor(y / this.cellSize);
    let ground = base;
    let water: number | null = null;
    let waterReachId: string | null = null;
    const seen = new Set<number>();
    for (let gx = cx - 1; gx <= cx + 1; gx++) {
      for (let gy = cy - 1; gy <= cy + 1; gy++) {
        const arr = this.cells.get(this.key(gx, gy));
        if (!arr) continue;
        for (const item of arr) {
          const tag = item.reach.nodes.length * 100003 + item.seg + item.reach.id.length;
          if (seen.has(tag)) continue;
          seen.add(tag);
          const a = item.reach.nodes[item.seg];
          const b = item.reach.nodes[item.seg + 1];
          const near = this.nearestOnSeg({ x, y }, a, b);
          const halfW = near.node.width / 2;
          if (near.dist > halfW + this.cellSize * 0.5) continue;
          const depth = incisionDepth(near.node.width, item.reach.kind);
          const cut = depth * bankProfile(near.dist / halfW);
          // 多条河渠重叠处取较深者
          const candidateGround = base - cut;
          if (candidateGround < ground) ground = candidateGround;
          if (near.dist <= halfW) {
            // 仅当水面不低于该点实际地面（含其它河渠下切）才计为水面，
            // 避免岸缘/交叉处出现水面穿地
            if (near.node.z >= ground && (water === null || near.node.z > water)) {
              water = near.node.z;
              waterReachId = item.reach.id;
            }
          }
        }
      }
    }
    return { ground, water, waterReachId };
  }
}
