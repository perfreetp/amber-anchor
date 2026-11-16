// 确定性随机数：所有随机过程必须走这里，保证同种子同参数结果逐字节一致

/** 字符串 hash → uint32（结构路径混入种子用） */
export function hashStr(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 PRNG */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 由全局种子 + 结构路径派生独立随机流（同一结构 id 永远拿到同一序列） */
export function streamFor(seed: number, path: string): () => number {
  return mulberry32((seed ^ hashStr(path)) >>> 0);
}

/** 可回放的随机流包装：记录所有取值，调试与校验用 */
export class DeterministicRandom {
  private rng: () => number;
  readonly calls: number[] = [];
  constructor(seed: number, path: string) {
    this.rng = streamFor(seed, path);
  }
  next(): number {
    const v = this.rng();
    this.calls.push(v);
    return v;
  }
  /** [min, max) 均匀分布 */
  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }
  /** 正态近似（两次均匀样本，确定性） */
  gaussian(): number {
    return this.next() + this.next() + this.next() - 1.5;
  }
  pick<T>(arr: T[]): T {
    return arr[Math.floor(this.next() * arr.length) % arr.length];
  }
}
