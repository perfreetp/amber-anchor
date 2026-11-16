// 确定性随机数：mulberry32 + 字符串/种子哈希
// 同一全局种子 + 同一局部序号永远产生同一随机序列，
// 因此“同一个种子生成的行道树、灌木和灯位完全一致”。

/** 32 位整数哈希（FNV-1a 变体），用于把 (seed, 命名空间, 段号) 混成流种子 */
export function hash32(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  // 再做一次 avalanche，减少相邻字符串的相关性
  h ^= h >>> 13;
  h = Math.imul(h, 0x5bd1e995);
  h ^= h >>> 15;
  return h >>> 0;
}

/** 由全局种子、命名空间、段索引、局部序号派生出稳定的流种子 */
export function streamSeed(globalSeed: number, namespace: string, segment: number): number {
  return hash32(`${globalSeed}::${namespace}::${segment}`);
}

/** mulberry32 PRNG，返回 [0,1) 的确定性随机数生成器 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function next(): number {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Rng {
  next(): number;
  /** [min, max) 浮点 */
  range(min: number, max: number): number;
  /** [min, max] 整数 */
  int(min: number, max: number): number;
  /** 按权重挑一项 */
  pick<T>(items: T[], weights: number[]): T;
}

export function makeRng(seed: number): Rng {
  const next = mulberry32(seed);
  return {
    next,
    range(min: number, max: number): number {
      return min + (max - min) * next();
    },
    int(min: number, max: number): number {
      return min + Math.floor(next() * (max - min + 1));
    },
    pick<T>(items: T[], weights: number[]): T {
      const total = weights.reduce((a, b) => a + b, 0);
      let r = next() * total;
      for (let i = 0; i < items.length; i++) {
        r -= weights[i];
        if (r < 0) return items[i];
      }
      return items[items.length - 1];
    },
  };
}
