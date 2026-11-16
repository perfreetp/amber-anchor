// 等轴测投影与碰撞数学（世界单位：米）
// 2:1 等轴测：x 屏 = (wx - wy) * a，y 屏 = (wx + wy) * b - wz * Z
export const TILE_W = 64 // 一米在 x 方向的两倍像素跨度
export const TILE_H = 32 // 一米在 y 方向的两倍像素跨度
export const A = TILE_W / 2
export const B = TILE_H / 2
export const Z_SCALE = TILE_H // 竖直方向 1 米对应的像素
export const GRID = 0.5 // 吸附网格 0.5 米

export const FIELD_W = 60
export const FIELD_H = 36

export function project(wx, wy, wz = 0, cam = { x: 0, y: 0, zoom: 1 }) {
  return {
    x: cam.x + (wx - wy) * A * cam.zoom,
    y: cam.y + (wx + wy) * B * cam.zoom - wz * Z_SCALE * cam.zoom,
  }
}

// 屏幕坐标 -> 地面(z=0)世界坐标
export function screenToWorld(sx, sy, cam) {
  const u = (sx - cam.x) / (A * cam.zoom)
  const v = (sy - cam.y) / (B * cam.zoom)
  return { x: (u + v) / 2, y: (v - u) / 2 }
}

const DEG = Math.PI / 180

// 物件底盘 OBB 的四个世界角点
export function footprintCorners(obj) {
  const hw = (obj.w * obj.scale) / 2
  const hd = (obj.d * obj.scale) / 2
  const r = obj.rotation * DEG
  const cos = Math.cos(r)
  const sin = Math.sin(r)
  const local = [
    [-hw, -hd],
    [hw, -hd],
    [hw, hd],
    [-hw, hd],
  ]
  return local.map(([lx, ly]) => ({
    x: obj.x + lx * cos - ly * sin,
    y: obj.y + lx * sin + ly * cos,
  }))
}

export function effectiveDims(obj) {
  return { w: obj.w * obj.scale, d: obj.d * obj.scale, h: obj.h * obj.scale }
}

// OBB（带向包围盒）SAT 相交检测，返回是否相交
export function obbIntersect(a, b) {
  const ca = footprintCorners(a)
  const cb = footprintCorners(b)
  const axes = [
    edgeAxis(ca[0], ca[1]),
    edgeAxis(ca[1], ca[2]),
    edgeAxis(cb[0], cb[1]),
    edgeAxis(cb[1], cb[2]),
  ]
  for (const axis of axes) {
    const [minA, maxA] = projectOnto(ca, axis)
    const [minB, maxB] = projectOnto(cb, axis)
    if (maxA <= minB || maxB <= minA) return false
  }
  return true
}

function edgeAxis(p, q) {
  const dx = q.x - p.x
  const dy = q.y - p.y
  const len = Math.hypot(dx, dy) || 1
  return { x: -dy / len, y: dx / len }
}

function projectOnto(points, axis) {
  let min = Infinity
  let max = -Infinity
  for (const p of points) {
    const t = p.x * axis.x + p.y * axis.y
    if (t < min) min = t
    if (t > max) max = t
  }
  return [min, max]
}

// 物件八个顶点投影后的屏幕 AABB（含拉高部分），用于图块失效
export function objectScreenAABB(obj, cam) {
  const corners = footprintCorners(obj)
  const h = obj.h * obj.scale
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const c of corners) {
    for (const z of [obj.z || 0, (obj.z || 0) + h]) {
      const p = project(c.x, c.y, z, cam)
      minX = Math.min(minX, p.x)
      minY = Math.min(minY, p.y)
      maxX = Math.max(maxX, p.x)
      maxY = Math.max(maxY, p.y)
    }
  }
  // 帐篷尖顶等额外造型余量
  const pad = 24 * cam.zoom
  return { minX: minX - pad, minY: minY - pad, maxX: maxX + pad, maxY: maxY + pad }
}

// 深度排序键：底盘角点中最大的 x+y，越大越靠前
export function depthKey(obj) {
  const corners = footprintCorners(obj)
  let m = -Infinity
  for (const c of corners) m = Math.max(m, c.x + c.y)
  return m
}

export function snap(v) {
  return Math.round(v / GRID) * GRID
}

export function round2(v) {
  return Math.round(v * 100) / 100
}

// 生成世界坐标下的体育场跑道多边形（矩形 + 两端半圆）
// straight: 直道长度，r: 半径；中心在 (cx, cy)，长边沿 x 轴
export function stadiumPolygon(cx, cy, straight, r, seg = 24) {
  const pts = []
  const half = straight / 2
  // 右端半圆（上 -> 下）
  for (let i = 0; i <= seg; i++) {
    const t = -Math.PI / 2 + (i / seg) * Math.PI
    pts.push({ x: cx + half + r * Math.cos(t), y: cy + r * Math.sin(t) })
  }
  // 左端半圆（下 -> 上）
  for (let i = 0; i <= seg; i++) {
    const t = Math.PI / 2 + (i / seg) * Math.PI
    pts.push({ x: cx - half + r * Math.cos(t), y: cy + r * Math.sin(t) })
  }
  return pts
}
