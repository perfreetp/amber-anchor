// 分块、拼缝编号、曲面摊平、相邻块高差
import { polygon, contourFromCells, relaxFlatten, edge3D } from './polygon.js'

const ckey = (ix, iy) => ix + ',' + iy
const vkey = (ix, iy) => ix + ';' + iy

// 由圈选多边形生成格网单元集合（取中心点在多边形内的单元，自动连通填充）
export function buildCells(hf, regionPoly) {
  const set = new Set()
  if (!regionPoly || regionPoly.length < 3) return set
  for (let iy = 0; iy < hf.ny; iy++) {
    for (let ix = 0; ix < hf.nx; ix++) {
      const [cx, cy] = hf.xy(ix + 0.5, iy + 0.5)
      if (polygon.pointIn(regionPoly, cx, cy) >= 0) set.add(ckey(ix, iy))
    }
  }
  return fillHoles(set)
}

// 包围盒泛洪：盒内未被标记为外部的单元全部补入（填孔），盒外单元保持原状
function fillHoles(cells) {
  if (!cells.size) return cells
  let minIx = Infinity, maxIx = -Infinity, minIy = Infinity, maxIy = -Infinity
  for (const k of cells) {
    const [ix, iy] = k.split(',').map(Number)
    minIx = Math.min(minIx, ix); maxIx = Math.max(maxIx, ix)
    minIy = Math.min(minIy, iy); maxIy = Math.max(maxIy, iy)
  }
  // 在盒外扩一圈作为泛洪空间
  const x0 = minIx - 1, x1 = maxIx + 1, y0 = minIy - 1, y1 = maxIy + 1
  const outside = new Set()
  const stack = []
  for (let ix = x0; ix <= x1; ix++) {
    stack.push([ix, y0], [ix, y1])
  }
  for (let iy = y0 + 1; iy <= y1 - 1; iy++) {
    stack.push([x0, iy], [x1, iy])
  }
  while (stack.length) {
    const [ix, iy] = stack.pop()
    const k = ckey(ix, iy)
    if (ix < x0 || ix > x1 || iy < y0 || iy > y1) continue
    if (outside.has(k) || cells.has(k)) continue
    outside.add(k)
    stack.push([ix + 1, iy], [ix - 1, iy], [ix, iy + 1], [ix, iy - 1])
  }
  const filled = new Set(cells)
  for (let iy = minIy; iy <= maxIy; iy++) {
    for (let ix = minIx; ix <= maxIx; ix++) {
      if (!outside.has(ckey(ix, iy))) filled.add(ckey(ix, iy))
    }
  }
  return filled
}

// 等分切线（格线索引），可被手动切线覆盖
export function defaultCuts(lo, hi, parts) {
  const cuts = [lo]
  for (let i = 1; i < parts; i++) cuts.push(Math.round(lo + ((hi - lo) * i) / parts))
  cuts.push(hi + 1)
  return [...new Set(cuts)].sort((a, b) => a - b)
}

function rangesFromCuts(cuts) {
  const ranges = []
  for (let i = 0; i < cuts.length - 1; i++) {
    if (cuts[i + 1] > cuts[i]) ranges.push([cuts[i], cuts[i + 1] - 1])
  }
  return ranges
}

// 主入口：构建分块、拼缝、摊平结果
export function buildPartition(hf, cells, cutXIn, cutYIn, options = {}) {
  const t0 = performance.now()
  // 把切线裁剪到实际单元包围盒
  let minIx = Infinity, maxIx = -Infinity, minIy = Infinity, maxIy = -Infinity
  for (const k of cells) {
    const [ix, iy] = k.split(',').map(Number)
    minIx = Math.min(minIx, ix); maxIx = Math.max(maxIx, ix)
    minIy = Math.min(minIy, iy); maxIy = Math.max(maxIy, iy)
  }
  const clipCuts = (cuts, lo, hi) => {
    const vals = [lo, ...cuts.filter((v) => v > lo && v <= hi), hi + 1]
    return [...new Set(vals)].sort((a, b) => a - b)
  }
  const cutX = clipCuts(cutXIn, minIx, maxIx)
  const cutY = clipCuts(cutYIn, minIy, maxIy)
  const rx = rangesFromCuts(cutX), ry = rangesFromCuts(cutY)
  const blockOf = new Map() // cellKey -> blockId
  const blocks = []
  let bid = 0
  for (const [ix0, ix1] of rx) {
    for (const [iy0, iy1] of ry) {
      const bc = new Set()
      for (let iy = iy0; iy <= iy1; iy++)
        for (let ix = ix0; ix <= ix1; ix++)
          if (cells.has(ckey(ix, iy))) bc.add(ckey(ix, iy))
      if (!bc.size) continue
      const id = 'B-' + String(++bid).padStart(2, '0')
      const block = { id, ix0, ix1, iy0, iy1, cells: bc }
      blocks.push(block)
      for (const k of bc) blockOf.set(k, id)
    }
  }

  // ---- 拼缝：相邻异块单元边聚合成缝 ----
  const seamMap = new Map() // "idA|idB" -> { pair, edges:[{ix,iy,dir}] }
  const dirOf = (a, b) => (a < b ? a + '|' + b : b + '|' + a)
  for (const block of blocks) {
    for (const k of block.cells) {
      const [ix, iy] = k.split(',').map(Number)
      const right = blockOf.get(ckey(ix + 1, iy))
      const up = blockOf.get(ckey(ix, iy + 1))
      if (right && right !== block.id) {
        const key = dirOf(block.id, right)
        if (!seamMap.has(key)) seamMap.set(key, { pair: key.split('|'), edges: [] })
        seamMap.get(key).edges.push({ ix: ix + 1, iy, dir: 'v' })
      }
      if (up && up !== block.id) {
        const key = dirOf(block.id, up)
        if (!seamMap.has(key)) seamMap.set(key, { pair: key.split('|'), edges: [] })
        seamMap.get(key).edges.push({ ix, iy: iy + 1, dir: 'h' })
      }
    }
  }
  // 把同 pair 的边按连通性串成若干条缝
  const seams = []
  let sid = 0
  for (const { pair, edges } of seamMap.values()) {
    const chains = chainEdges(edges)
    for (const chain of chains) {
      const id = 'S-' + String(++sid).padStart(2, '0')
      seams.push({ id, blockA: pair[0], blockB: pair[1], edges: chain })
    }
  }

  // ---- 每块：节点图 + 摊平 ----
  const dx = hf.sx / hf.nx, dy = hf.sy / hf.ny
  for (const block of blocks) {
    const verts = new Set()
    const edgeSet = new Set()
    const edgeRecs = []
    const boundary = new Set() // 仅属一个单元的边
    const edgeCount = new Map()
    for (const k of block.cells) {
      const [ix, iy] = k.split(',').map(Number)
      const quad = [vkey(ix, iy), vkey(ix + 1, iy), vkey(ix + 1, iy + 1), vkey(ix, iy + 1)]
      quad.forEach((v) => verts.add(v))
      const cellEdges = [
        [quad[0], quad[1], ix, iy, ix + 1, iy],
        [quad[1], quad[2], ix + 1, iy, ix + 1, iy + 1],
        [quad[2], quad[3], ix + 1, iy + 1, ix, iy + 1],
        [quad[3], quad[0], ix, iy + 1, ix, iy],
      ]
      for (const [va, vb, ax, ay, bx, by] of cellEdges) {
        const ek = va < vb ? va + '#' + vb : vb + '#' + va
        edgeCount.set(ek, (edgeCount.get(ek) || 0) + 1)
        if (edgeSet.has(ek)) continue
        edgeSet.add(ek)
        edgeRecs.push({ va, vb, ax, ay, bx, by, len3D: edge3D(hf, ax, ay, bx, by) })
      }
    }
    for (const [ek, c] of edgeCount) if (c === 1) boundary.add(ek)

    const vList = [...verts]
    const vIndex = new Map(vList.map((v, i) => [v, i]))
    const nodes = vList.map((v) => {
      const [ix, iy] = v.split(';').map(Number)
      const [x, y] = hf.xy(ix, iy)
      return { x, y, ix, iy }
    })
    const edges = edgeRecs.map((e) => ({ i: vIndex.get(e.va), j: vIndex.get(e.vb), len3D: e.len3D }))
    const bEdges = edgeRecs.filter((e) => {
      const ek = e.va < e.vb ? e.va + '#' + e.vb : e.vb + '#' + e.va
      return boundary.has(ek)
    })

    // 固定边界环上相距最远的两个顶点，消除刚体位移且不约束形状
    let bestPair = null, bestD = -1
    const bNodeIdx = [...new Set(bEdges.flatMap((e) => [vIndex.get(e.va), vIndex.get(e.vb)]))]
    for (let a = 0; a < bNodeIdx.length; a++) {
      for (let b = a + 1; b < bNodeIdx.length; b++) {
        const pa = nodes[bNodeIdx[a]], pb = nodes[bNodeIdx[b]]
        const d = (pa.x - pb.x) ** 2 + (pa.y - pb.y) ** 2
        if (d > bestD) { bestD = d; bestPair = [bNodeIdx[a], bNodeIdx[b]] }
      }
    }
    const fixed = new Set(bestPair || [0, 1])
    const { pos, maxDistortion, meanDistortion } = relaxFlatten(nodes, edges, fixed, options.iterations ?? 200)

    // 边界环（摊平坐标）
    const rings = orderBoundary(bEdges, vIndex, pos)
    const outline = rings[0] || []

    // 轮廓分段（合并共线段），附边长与拼缝号
    const segments = buildSegments(hf, block, bEdges, vIndex, pos, seams)
    const bb = polygon.bounds(outline.length ? outline : pos)
    const surfaceArea = [...block.cells].reduce((s) => s + dx * dy, 0)
    Object.assign(block, {
      flatNodes: pos,
      outline,
      segments,
      bbox: bb,
      flatWidth: bb.maxX - bb.minX,
      flatHeight: bb.maxY - bb.minY,
      perimeter: polygon.perimeter(outline),
      surfaceArea,
      maxDistortion,
      meanDistortion,
      meanElevation: meanBlockElevation(hf, block.cells),
    })
  }

  // ---- 拼缝指标：平面长、公共表面长、两侧摊平下料长、跨缝高差 ----
  for (const seam of seams) {
    const A = blocks.find((b) => b.id === seam.blockA)
    const B = blocks.find((b) => b.id === seam.blockB)
    let planar = 0, surf = 0, maxStep = 0, stepSum = 0, steps = 0
    for (const e of seam.edges) {
      const len = e.dir === 'v' ? dy : dx
      planar += len
      const [mx, my] = hf.xy(e.ix + (e.dir === 'v' ? 0 : 0.5), e.iy + (e.dir === 'h' ? 0 : 0.5))
      const off = e.dir === 'v' ? dx / 2 : dy / 2
      if (e.dir === 'v') {
        const step = Math.abs(hf.sample(mx - off, my) - hf.sample(mx + off, my))
        maxStep = Math.max(maxStep, step); stepSum += step; steps++
        surf += edge3D(hf, e.ix, e.iy, e.ix, e.iy + 1)
      } else {
        const step = Math.abs(hf.sample(mx, my - off) - hf.sample(mx, my + off))
        maxStep = Math.max(maxStep, step); stepSum += step; steps++
        surf += edge3D(hf, e.ix, e.iy, e.ix + 1, e.iy)
      }
    }
    // 两侧摊平后的实际下料边长（取各自块内该缝的分段之和）
    const flatLenOf = (block) =>
      block.segments.filter((q) => q.seamId === seam.id).reduce((s, q) => s + q.length, 0)
    const flatA = flatLenOf(A), flatB = flatLenOf(B)
    Object.assign(seam, {
      planarLength: planar,
      surfaceLength: surf,
      flatLengthA: flatA,
      flatLengthB: flatB,
      maxHeightStep: maxStep,
      meanHeightStep: stepSum / Math.max(1, steps),
      elevationDiff: Math.abs(A.meanElevation - B.meanElevation),
    })
  }

  return {
    blocks,
    seams,
    blockOf,
    outerContour: contourFromCells(cells, hf.bounds.minX, hf.bounds.minY, dx, dy),
    cells,
    elapsedMs: performance.now() - t0,
  }
}

function chainEdges(edges) {
  const parent = new Map()
  const find = (k) => (parent.has(k) ? find(parent.get(k)) : k)
  const union = (a, b) => {
    const ra = find(a), rb = find(b)
    if (ra !== rb) parent.set(ra, rb)
  }
  for (const e of edges) {
    const a = e.dir === 'v' ? vkey(e.ix, e.iy) : vkey(e.ix, e.iy)
    const b = e.dir === 'v' ? vkey(e.ix, e.iy + 1) : vkey(e.ix + 1, e.iy)
    union(a, b)
  }
  const groups = new Map()
  for (const e of edges) {
    const root = find(e.dir === 'v' ? vkey(e.ix, e.iy) : vkey(e.ix, e.iy))
    if (!groups.has(root)) groups.set(root, [])
    groups.get(root).push(e)
  }
  return [...groups.values()]
}

function orderBoundary(bEdges, vIndex, pos) {
  const adj = new Map()
  for (const e of bEdges) {
    const i = vIndex.get(e.va), j = vIndex.get(e.vb)
    if (!adj.has(i)) adj.set(i, [])
    if (!adj.has(j)) adj.set(j, [])
    adj.get(i).push(j)
    adj.get(j).push(i)
  }
  const rings = []
  const seen = new Set()
  for (const start of adj.keys()) {
    if (seen.has(start)) continue
    const ring = []
    let prev = -1, cur = start
    let guard = 0
    while (guard++ < adj.size + 2) {
      ring.push(pos[cur])
      seen.add(cur)
      const nexts = adj.get(cur).filter((x) => x !== prev)
      if (!nexts.length) break
      const next = nexts[0]
      prev = cur
      cur = next
      if (cur === start) break
    }
    if (ring.length >= 3) rings.push(ring)
  }
  rings.sort((a, b) => Math.abs(polygon.area(b)) - Math.abs(polygon.area(a)))
  return rings
}

function buildSegments(hf, block, bEdges, vIndex, pos, seams) {
  // 边 -> 拼缝号
  const seamOfEdge = new Map()
  for (const seam of seams) {
    for (const e of seam.edges) {
      const va = e.dir === 'v' ? vkey(e.ix, e.iy) : vkey(e.ix, e.iy)
      const vb = e.dir === 'v' ? vkey(e.ix, e.iy + 1) : vkey(e.ix + 1, e.iy)
      seamOfEdge.set(va < vb ? va + '#' + vb : vb + '#' + va, seam.id)
    }
  }
  const segs = []
  for (const e of bEdges) {
    const ek = e.va < e.vb ? e.va + '#' + e.vb : e.vb + '#' + e.va
    const i = vIndex.get(e.va), j = vIndex.get(e.vb)
    const pa = pos[i], pb = pos[j]
    segs.push({
      from: pa,
      to: pb,
      length: Math.hypot(pb.x - pa.x, pb.y - pa.y),
      seamId: seamOfEdge.get(ek) || null,
    })
  }
  return segs
}

function meanBlockElevation(hf, cells) {
  let sum = 0, n = 0
  for (const k of cells) {
    const [ix, iy] = k.split(',').map(Number)
    sum += hf.at(ix, iy) + hf.at(ix + 1, iy) + hf.at(ix, iy + 1) + hf.at(ix + 1, iy + 1)
    n += 4
  }
  return sum / n
}
