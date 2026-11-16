// 多边形几何：偏移、自交检测、格网轮廓追踪、曲面摊平（质量-弹簧松弛）
import { vec3 } from './mat4.js'

export const polygon = {
  area(poly) {
    let a = 0
    for (let i = 0, n = poly.length; i < n; i++) {
      const p = poly[i], q = poly[(i + 1) % n]
      a += p.x * q.y - q.x * p.y
    }
    return a / 2
  },
  centroid(poly) {
    let cx = 0, cy = 0, a = 0
    for (let i = 0, n = poly.length; i < n; i++) {
      const p = poly[i], q = poly[(i + 1) % n]
      const cross = p.x * q.y - q.x * p.y
      a += cross
      cx += (p.x + q.x) * cross
      cy += (p.y + q.y) * cross
    }
    a /= 2
    if (Math.abs(a) < 1e-9) {
      const b = polygon.bounds(poly)
      return { x: (b.minX + b.maxX) / 2, y: (b.minY + b.maxY) / 2 }
    }
    return { x: cx / (6 * a), y: cy / (6 * a) }
  },
  bounds(poly) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
    for (const p of poly) {
      minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x)
      minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y)
    }
    return { minX, maxX, minY, maxY }
  },
  perimeter(poly) {
    let L = 0
    for (let i = 0, n = poly.length; i < n; i++) {
      const p = poly[i], q = poly[(i + 1) % n]
      L += Math.hypot(q.x - p.x, q.y - p.y)
    }
    return L
  },
  // 返回 >0 内部，=0 边界，<0 外部（射线法）
  pointIn(poly, x, y) {
    let inside = false
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i].x, yi = poly[i].y, xj = poly[j].x, yj = poly[j].y
      const onEdge = Math.abs((yi - y) * (xj - x) - (yj - y) * (xi - x)) < 1e-9 &&
        x >= Math.min(xi, xj) - 1e-9 && x <= Math.max(xi, xj) + 1e-9 &&
        y >= Math.min(yi, yj) - 1e-9 && y <= Math.max(yi, yj) + 1e-9
      if (onEdge) return 0
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
    }
    return inside ? 1 : -1
  },
}

// 线段求交，返回交点数组（含端点接触），无交返回 null
export function segmentIntersection(a, b, c, d) {
  const r = { x: b.x - a.x, y: b.y - a.y }
  const s = { x: d.x - c.x, y: d.y - c.y }
  const rxs = r.x * s.y - r.y * s.x
  const qpx = c.x - a.x, qpy = c.y - a.y
  const t = (qpx * s.y - qpy * s.x) / (rxs || 1e-12)
  const u = (qpx * r.y - qpy * r.x) / (rxs || 1e-12)
  if (Math.abs(rxs) < 1e-12 * Math.max(1, Math.hypot(r.x, r.y) * Math.hypot(s.x, s.y))) {
    // 共线重叠（容差按边长缩放）
    const eps = 1e-9 * Math.max(1, Math.hypot(r.x, r.y))
    const coll = Math.abs(qpx * r.y - qpy * r.x) < eps
    if (!coll) return null
    const pts = [a, b, c, d]
    const along = (p) => ((p.x - a.x) * r.x + (p.y - a.y) * r.y) / (r.x * r.x + r.y * r.y || 1e-12)
    const ts = pts.map(along)
    const lo = Math.max(Math.min(ts[0], ts[1]), Math.min(ts[2], ts[3]))
    const hi = Math.min(Math.max(ts[0], ts[1]), Math.max(ts[2], ts[3]))
    if (hi < lo - 1e-9) return null
    const out = []
    const push = (tt) => out.push({ x: a.x + r.x * tt, y: a.y + r.y * tt, t: tt, u: tt })
    if (lo > 1e-9 && lo < 1 - 1e-9) push(lo)
    if (hi > 1e-9 && hi < 1 - 1e-9 && Math.abs(hi - lo) > 1e-9) push(hi)
    return out.length ? out : null
  }
  if (t >= -1e-9 && t <= 1 + 1e-9 && u >= -1e-9 && u <= 1 + 1e-9) {
    return [{ x: a.x + r.x * t, y: a.y + r.y * t, t, u }]
  }
  return null
}

// 简单多边形自交检测（跳过相邻边），返回交点列表
export function selfIntersections(poly) {
  const hits = []
  const n = poly.length
  const adjacent = (i, j) => {
    const d = Math.abs(i - j)
    return d === 1 || d === n - 1
  }
  for (let i = 0; i < n; i++) {
    const a = poly[i], b = poly[(i + 1) % n]
    for (let j = i + 1; j < n; j++) {
      if (adjacent(i, j)) continue
      const c = poly[j], d = poly[(j + 1) % n]
      const is = segmentIntersection(a, b, c, d)
      if (!is) continue
      for (const p of is) {
        // 仅统计边内部交点（顶点接触不算）
        const interior = p.t > 1e-6 && p.t < 1 - 1e-6 && p.u > 1e-6 && p.u < 1 - 1e-6
        if (interior) hits.push({ x: p.x, y: p.y, edges: [i, j] })
      }
    }
  }
  return hits
}

// 等距内偏移：逐边平移 + 斜接（miter，带限值），再做自交检测
export function offsetPolygon(poly, dist) {
  const n = poly.length
  const cw = polygon.area(poly) < 0
  const inward = (ex, ey) => {
    const l = Math.hypot(ex, ey) || 1
    // 内部在有向边左侧：内法线 = 方向左转 90° = (-ey, ex)；顺时针则反向
    const nx = (cw ? ey : -ey) / l
    const ny = (cw ? -ex : ex) / l
    return { x: nx * dist, y: ny * dist }
  }
  const offsetEdges = []
  for (let i = 0; i < n; i++) {
    const p = poly[i], q = poly[(i + 1) % n]
    const off = inward(q.x - p.x, q.y - p.y)
    offsetEdges.push({ a: { x: p.x + off.x, y: p.y + off.y }, b: { x: q.x + off.x, y: q.y + off.y } })
  }
  const out = []
  const miterLimit = 2.5
  for (let i = 0; i < n; i++) {
    const ePrev = offsetEdges[(i - 1 + n) % n]
    const eNext = offsetEdges[i]
    const d1 = { x: ePrev.b.x - ePrev.a.x, y: ePrev.b.y - ePrev.a.y }
    const d2 = { x: eNext.b.x - eNext.a.x, y: eNext.b.y - eNext.a.y }
    const l1 = Math.hypot(d1.x, d1.y) || 1e-9
    const l2 = Math.hypot(d2.x, d2.y) || 1e-9
    const u1 = { x: d1.x / l1, y: d1.y / l1 }
    const u2 = { x: d2.x / l2, y: d2.y / l2 }
    const cross = u1.x * u2.y - u1.y * u2.x
    const denom = 1 + u1.x * u2.x + u1.y * u2.y
    if (Math.abs(cross) < 1e-6) {
      out.push({ x: eNext.a.x, y: eNext.a.y })
      continue
    }
    // 两偏移边交点
    const t = ((eNext.a.x - ePrev.a.x) * u2.y - (eNext.a.y - ePrev.a.y) * u2.x) / cross
    const miterLen = Math.abs(t) / l1
    if (miterLen > miterLimit) {
      // 超限改用直角收口
      out.push({ x: ePrev.b.x, y: ePrev.b.y }, { x: eNext.a.x, y: eNext.a.y })
    } else {
      out.push({ x: ePrev.a.x + u1.x * t, y: ePrev.a.y + u1.y * t })
    }
  }
  const hits = selfIntersections(out)
  const a = polygon.area(out)
  const origArea = polygon.area(poly)
  // 退化：面积为零、绕序翻转（偏移过头）或面积未按预期缩小
  const degenerate = Math.abs(a) < 1e-6 || Math.sign(a) !== Math.sign(origArea) || Math.abs(a) >= Math.abs(origArea)
  return { poly: out, selfIntersections: hits, degenerate }
}

// ---------- 格网单元集合 → 外轮廓（沿单元边追踪，输出逆时针多边形）----------
// cells: Set("ix,iy")，单元 (ix,iy) 占据 [x0+ix*dx, x0+(ix+1)*dx] × [y0+iy*dy, y0+(iy+1)*dy]
export function contourFromCells(cellSet, x0, y0, dx, dy) {
  if (!cellSet.size) return []
  // 有向边 a->b 用 "aKey>bKey" 存储；反向边 "bKey>aKey" 存在则抵消
  const vk = (gx, gy) => gx + '_' + gy
  const edges = new Map()
  const v = (gx, gy) => ({ x: x0 + gx * dx, y: y0 + gy * dy })
  const add = (ax, ay, bx, by) => {
    const fwd = vk(ax, ay) + '>' + vk(bx, by)
    const rev = vk(bx, by) + '>' + vk(ax, ay)
    if (edges.has(rev)) edges.delete(rev)
    else edges.set(fwd, { a: v(ax, ay), b: v(bx, by) })
  }
  for (const key of cellSet) {
    const [ix, iy] = key.split(',').map(Number)
    add(ix, iy, ix + 1, iy)         // 底
    add(ix + 1, iy, ix + 1, iy + 1) // 右
    add(ix + 1, iy + 1, ix, iy + 1) // 顶
    add(ix, iy + 1, ix, iy)         // 左
  }
  if (!edges.size) return []
  // 串接成环
  const rings = []
  const remaining = new Map(edges)
  while (remaining.size) {
    const firstKey = remaining.keys().next().value
    const first = remaining.get(firstKey)
    remaining.delete(firstKey)
    const ring = [first.a]
    let cur = first.b
    const start = first.a
    let guard = 0
    while (guard++ < edges.size + 4) {
      if (Math.hypot(cur.x - start.x, cur.y - start.y) < 1e-9) break
      ring.push(cur)
      let found = null
      for (const [k, e] of remaining) {
        if (Math.hypot(e.a.x - cur.x, e.a.y - cur.y) < 1e-9) { found = [k, e]; break }
      }
      if (!found) break
      remaining.delete(found[0])
      cur = found[1].b
    }
    rings.push(ring)
  }
  // 去掉共线中间点
  return rings.map((ring) => {
    const out = []
    const n = ring.length
    for (let i = 0; i < n; i++) {
      const p = ring[(i - 1 + n) % n], q = ring[i], r = ring[(i + 1) % n]
      const cross = (q.x - p.x) * (r.y - q.y) - (q.y - p.y) * (r.x - q.x)
      if (Math.abs(cross) > 1e-9) out.push(q)
    }
    return out
  }).filter((r) => r.length >= 3).sort((a, b) => Math.abs(polygon.area(b)) - Math.abs(polygon.area(a)))[0] || []
}

// ---------- 曲面摊平：质量-弹簧松弛（Gauss-Seidel）----------
// nodes: [{x,y}(平面初值)], edges: [{i,j,len3D}], fixed: 固定节点索引集合
export function relaxFlatten(nodes, edges, fixed, iterations = 200) {
  const pos = nodes.map((p) => ({ x: p.x, y: p.y }))
  const adj = pos.map(() => [])
  for (const e of edges) {
    adj[e.i].push({ j: e.j, L: e.len3D })
    adj[e.j].push({ j: e.i, L: e.len3D })
  }
  for (let it = 0; it < iterations; it++) {
    for (let i = 0; i < pos.length; i++) {
      if (fixed.has(i)) continue
      const nb = adj[i]
      if (!nb.length) continue
      // 弹簧均值松弛：x_i = mean_j(x_j - L * unit_ij)，受拉边权重更高
      let ax = 0, ay = 0, wsum = 0
      for (const { j, L } of nb) {
        const q = pos[j]
        const d = Math.hypot(q.x - pos[i].x, q.y - pos[i].y) || 1e-9
        const w = d > L ? 1.8 : 1.0
        ax += (q.x - (L * (q.x - pos[i].x)) / d) * w
        ay += (q.y - (L * (q.y - pos[i].y)) / d) * w
        wsum += w
      }
      pos[i].x = ax / wsum
      pos[i].y = ay / wsum
    }
  }
  // 失真统计
  let maxErr = 0, sumErr = 0
  for (const e of edges) {
    const d = Math.hypot(pos[e.i].x - pos[e.j].x, pos[e.i].y - pos[e.j].y)
    const err = Math.abs(d - e.len3D) / e.len3D
    maxErr = Math.max(maxErr, err)
    sumErr += err
  }
  return { pos, maxDistortion: maxErr, meanDistortion: sumErr / edges.length }
}

// 三维表面棱边长度（含高差）
export function edge3D(hf, ixA, iyA, ixB, iyB) {
  const [ax, ay] = hf.xy(ixA, iyA)
  const [bx, by] = hf.xy(ixB, iyB)
  const az = hf.at(ixA, iyA), bz = hf.at(ixB, iyB)
  return vec3.len([bx - ax, by - ay, bz - az])
}
