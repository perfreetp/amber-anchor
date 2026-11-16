// 地形高度场：拟合、样条雕刻、坡度/曲率、射线拾取
import { vec3 } from './mat4.js'

export class Heightfield {
  constructor(nx, ny, bounds, h) {
    this.nx = nx // X 方向格数
    this.ny = ny // Y 方向格数
    this.bounds = bounds // {minX, maxX, minY, maxY}
    this.h = h // Float32Array 长度 (nx+1)*(ny+1)，行优先：ix + (ny+1)*iy
  }
  get sx() { return this.bounds.maxX - this.bounds.minX }
  get sy() { return this.bounds.maxY - this.bounds.minY }
  idx(ix, iy) { return ix + (this.nx + 1) * iy }
  at(ix, iy) { return this.h[this.idx(ix, iy)] }
  xy(ix, iy) {
    return [
      this.bounds.minX + (ix / this.nx) * this.sx,
      this.bounds.minY + (iy / this.ny) * this.sy,
    ]
  }
  clone() {
    return new Heightfield(this.nx, this.ny, { ...this.bounds }, new Float32Array(this.h))
  }
  // 双线性插值采样
  sample(x, y) {
    const { minX, maxX, minY, maxY } = this.bounds
    const fx = Math.min(0.999999, Math.max(0, (x - minX) / this.sx)) * this.nx
    const fy = Math.min(0.999999, Math.max(0, (y - minY) / this.sy)) * this.ny
    const ix = Math.floor(fx), iy = Math.floor(fy)
    const tx = fx - ix, ty = fy - iy
    const h00 = this.at(ix, iy), h10 = this.at(ix + 1, iy)
    const h01 = this.at(ix, iy + 1), h11 = this.at(ix + 1, iy + 1)
    return (h00 * (1 - tx) + h10 * tx) * (1 - ty) + (h01 * (1 - tx) + h11 * tx) * ty
  }
  normal(ix, iy) {
    const dx = this.sx / this.nx, dy = this.sy / this.ny
    const xl = this.at(Math.max(0, ix - 1), iy)
    const xr = this.at(Math.min(this.nx, ix + 1), iy)
    const yd = this.at(ix, Math.max(0, iy - 1))
    const yu = this.at(ix, Math.min(this.ny, iy + 1))
    return vec3.norm([(xl - xr) / (2 * dx), (yd - yu) / (2 * dy), 1])
  }
  slopeDeg(ix, iy) {
    const n = this.normal(ix, iy)
    return Math.acos(Math.min(1, Math.max(-1, n[2]))) * 180 / Math.PI
  }
  // 平均曲率代理量：拉普拉斯算子（离散二阶导），单位 1/m
  curvature(ix, iy) {
    const dx = this.sx / this.nx, dy = this.sy / this.ny
    const c = this.at(ix, iy)
    const xl = this.at(Math.max(0, ix - 1), iy)
    const xr = this.at(Math.min(this.nx, ix + 1), iy)
    const yd = this.at(ix, Math.max(0, iy - 1))
    const yu = this.at(ix, Math.min(this.ny, iy + 1))
    return (xl + xr - 2 * c) / (dx * dx) + (yd + yu - 2 * c) / (dy * dy)
  }
}

// ---------- 程序化示例地形 ----------
export function sampleTerrain(nx = 96, ny = 96) {
  const bounds = { minX: 0, maxX: 100, minY: 0, maxY: 80 }
  const n = (nx + 1) * (ny + 1)
  const h = new Float32Array(n)
  const peaks = [
    { x: 28, y: 55, a: 26, sx: 14, sy: 11 },
    { x: 68, y: 30, a: 20, sx: 12, sy: 16 },
    { x: 52, y: 66, a: 12, sx: 9, sy: 8 },
  ]
  const valley = { x: 46, y: 38, a: -10, sx: 30, sy: 7, ang: -0.5 }
  for (let iy = 0; iy <= ny; iy++) {
    for (let ix = 0; ix <= nx; ix++) {
      const [x, y] = [
        bounds.minX + (ix / nx) * (bounds.maxX - bounds.minX),
        bounds.minY + (iy / ny) * (bounds.maxY - bounds.minY),
      ]
      let z = 4
      for (const p of peaks) {
        z += p.a * Math.exp(-(((x - p.x) ** 2) / (2 * p.sx ** 2) + ((y - p.y) ** 2) / (2 * p.sy ** 2)))
      }
      const ca = Math.cos(valley.ang), sa = Math.sin(valley.ang)
      const dx = x - valley.x, dy = y - valley.y
      const u = ca * dx + sa * dy, v = -sa * dx + ca * dy
      z += valley.a * Math.exp(-(u * u / (2 * valley.sx ** 2) + v * v / (2 * valley.sy ** 2)))
      z += 1.2 * Math.sin(x * 0.21) * Math.cos(y * 0.17)
      h[ix + (nx + 1) * iy] = z
    }
  }
  return new Heightfield(nx, ny, bounds, h)
}

// ---------- 空间哈希加速的反距离加权（IDW）拟合 ----------
export function fitHeightfield(points, nx, ny, bounds, power = 2, neighbors = 12) {
  const h = new Float32Array((nx + 1) * (ny + 1))
  if (!points.length) return new Heightfield(nx, ny, bounds, h)
  const cell = Math.max(2, Math.sqrt((bounds.maxX - bounds.minX) * (bounds.maxY - bounds.minY) / points.length) * 1.4)
  const buckets = new Map()
  const key = (cx, cy) => cx + ',' + cy
  for (const p of points) {
    const cx = Math.floor(p.x / cell), cy = Math.floor(p.y / cell)
    const k = key(cx, cy)
    if (!buckets.has(k)) buckets.set(k, [])
    buckets.get(k).push(p)
  }
  const collect = (cx, cy) => buckets.get(key(cx, cy)) || []
  for (let iy = 0; iy <= ny; iy++) {
    for (let ix = 0; ix <= nx; ix++) {
      const [x, y] = [
        bounds.minX + (ix / nx) * (bounds.maxX - bounds.minX),
        bounds.minY + (iy / ny) * (bounds.maxY - bounds.minY),
      ]
      let ring = 0
      let near = []
      while (ring < 24) {
        near = []
        for (let gy = -ring; gy <= ring; gy++) {
          for (let gx = -ring; gx <= ring; gx++) {
            if (Math.max(Math.abs(gx), Math.abs(gy)) !== ring && ring > 0) continue
            for (const p of collect(Math.floor(x / cell) + gx, Math.floor(y / cell) + gy)) {
              near.push({ p, d2: (p.x - x) ** 2 + (p.y - y) ** 2 })
            }
          }
        }
        if (near.length >= neighbors) break
        ring++
      }
      near.sort((a, b) => a.d2 - b.d2)
      near = near.slice(0, neighbors)
      const exact = near.find((q) => q.d2 < 1e-12)
      if (exact) { h[ix + (nx + 1) * iy] = exact.p.z; continue }
      let wsum = 0, z = 0
      for (const q of near) {
        const w = 1 / q.d2 ** (power / 2)
        wsum += w
        z += w * q.p.z
      }
      h[ix + (nx + 1) * iy] = wsum ? z / wsum : points.reduce((s, p) => s + p.z, 0) / points.length
    }
  }
  return new Heightfield(nx, ny, bounds, h)
}

// ---------- Catmull-Rom 样条 ----------
export function catmullRom(points, samplesPerSeg = 16) {
  if (points.length < 2) return points.map((p) => ({ ...p }))
  const out = []
  const P = [points[0], ...points, points[points.length - 1]]
  for (let i = 0; i < P.length - 3; i++) {
    const p0 = P[i], p1 = P[i + 1], p2 = P[i + 2], p3 = P[i + 3]
    for (let s = 0; s < samplesPerSeg; s++) {
      const t = s / samplesPerSeg
      const t2 = t * t, t3 = t2 * t
      out.push({
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      })
    }
  }
  out.push({ ...points[points.length - 1] })
  return out
}

// ---------- 样条雕刻：沿样条按高斯影响范围叠加抬升/下切 ----------
// spline: { id, name, kind:'ridge'|'valley', amplitude, radius, controls:[{x,y}] }
export function applySculpt(baseH, splines) {
  const h = new Float32Array(baseH.h)
  const dense = splines.flatMap((sp) =>
    catmullRom(sp.controls, 10).map((q) => ({ ...q, amp: sp.amplitude * (sp.kind === 'valley' ? -1 : 1), r2: 2 * sp.radius * sp.radius }))
  )
  if (!dense.length) return new Heightfield(baseH.nx, baseH.ny, baseH.bounds, h)
  const rMax = Math.max(...splines.map((s) => s.radius))
  for (let iy = 0; iy <= baseH.ny; iy++) {
    for (let ix = 0; ix <= baseH.nx; ix++) {
      const [x, y] = baseH.xy(ix, iy)
      let dz = 0
      for (const q of dense) {
        const d2 = (q.x - x) ** 2 + (q.y - y) ** 2
        if (d2 > 9 * q.r2) continue
        dz += q.amp * Math.exp(-d2 / q.r2)
      }
      h[ix + (baseH.nx + 1) * iy] += dz
    }
  }
  return new Heightfield(baseH.nx, baseH.ny, baseH.bounds, h)
}

// ---------- 射线与地形求交（板片法限定区间 + 步进 + 二分）----------
export function rayTerrain(hf, origin, dir) {
  const { minX, maxX, minY, maxY } = hf.bounds
  let zMin = Infinity, zMax = -Infinity
  for (const v of hf.h) { zMin = Math.min(zMin, v); zMax = Math.max(zMax, v) }
  zMin -= 2; zMax += 2

  // t 的可行区间：XY 板片 + Z 平面
  let lo = 0, hi = Infinity
  const slab = (o, d, a, b) => {
    if (Math.abs(d) < 1e-9) return o >= a && o <= b
    let t1 = (a - o) / d, t2 = (b - o) / d
    if (t1 > t2) [t1, t2] = [t2, t1]
    lo = Math.max(lo, t1); hi = Math.min(hi, t2)
    return lo <= hi
  }
  if (!slab(origin[0], dir[0], minX, maxX)) return null
  if (!slab(origin[1], dir[1], minY, maxY)) return null
  if (!slab(origin[2], dir[2], zMin, zMax)) return null
  if (hi <= lo) return null

  const f = (t) => {
    const p = [origin[0] + dir[0] * t, origin[1] + dir[1] * t, origin[2] + dir[2] * t]
    return p[2] - hf.sample(p[0], p[1])
  }
  let prevT = lo, prevF = f(lo)
  const steps = 120
  const dt = (hi - lo) / steps
  for (let i = 1; i <= steps; i++) {
    const t = lo + i * dt
    const fv = f(t)
    if ((prevF <= 0 && fv >= 0) || (prevF >= 0 && fv <= 0)) {
      let a = prevT, b = t, fa = prevF
      for (let k = 0; k < 24; k++) {
        const m = (a + b) / 2
        const fm = f(m)
        if ((fa <= 0 && fm <= 0) || (fa >= 0 && fm >= 0)) { a = m; fa = fm } else b = m
      }
      const tHit = (a + b) / 2
      return [origin[0] + dir[0] * tHit, origin[1] + dir[1] * tHit, origin[2] + dir[2] * tHit]
    }
    prevT = t
    prevF = fv
  }
  return null
}

// 射线与水平面（z=const）求交，用于控制点拖动
export function rayPlane(origin, dir, z) {
  if (Math.abs(dir[2]) < 1e-6) return null
  const t = (z - origin[2]) / dir[2]
  if (t < 0) return null
  return [origin[0] + dir[0] * t, origin[1] + dir[1] * t, z]
}

export function hStats(hf) {
  let min = Infinity, max = -Infinity, sum = 0
  for (const v of hf.h) { min = Math.min(min, v); max = Math.max(max, v); sum += v }
  return { min, max, mean: sum / hf.h.length }
}
