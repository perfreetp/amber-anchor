// 等轴测场景绘制 + 正交俯视绘制
import {
  A, B, Z_SCALE, FIELD_W, FIELD_H, project, footprintCorners,
  effectiveDims, stadiumPolygon,
} from './isoMath.js'
import { ITEM_TYPES } from './catalog.js'

const DEG = Math.PI / 180

function poly(ctx, pts, fill, stroke) {
  ctx.beginPath()
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
  ctx.closePath()
  if (fill) {
    ctx.fillStyle = fill
    ctx.fill()
  }
  if (stroke) {
    ctx.strokeStyle = stroke
    ctx.stroke()
  }
}

function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.min(255, Math.round(((n >> 16) & 255) * f))
  const g = Math.min(255, Math.round(((n >> 8) & 255) * f))
  const b = Math.min(255, Math.round((n & 255) * f))
  return `rgb(${r},${g},${b})`
}

// ---------- 地面 ----------
export function drawGround(ctx, cam, bounds) {
  const { minX, minY, maxX, maxY } = bounds
  // 场地菱形
  const corners = [
    project(0, 0, 0, cam),
    project(FIELD_W, 0, 0, cam),
    project(FIELD_W, FIELD_H, 0, cam),
    project(0, FIELD_H, 0, cam),
  ]
  poly(ctx, corners, '#e8f0dc')
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(corners[0].x, corners[0].y)
  for (let i = 1; i < 4; i++) ctx.lineTo(corners[i].x, corners[i].y)
  ctx.closePath()
  ctx.clip()

  // 0.5 米网格
  ctx.lineWidth = 1
  ctx.strokeStyle = 'rgba(90,120,70,0.18)'
  ctx.beginPath()
  for (let x = 0; x <= FIELD_W; x += 0.5) {
    const p1 = project(x, 0, 0, cam)
    const p2 = project(x, FIELD_H, 0, cam)
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
  }
  for (let y = 0; y <= FIELD_H; y += 0.5) {
    const p1 = project(0, y, 0, cam)
    const p2 = project(FIELD_W, y, 0, cam)
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
  }
  ctx.stroke()
  // 整数米主网格
  ctx.strokeStyle = 'rgba(70,100,55,0.35)'
  ctx.lineWidth = 1.2
  ctx.beginPath()
  for (let x = 0; x <= FIELD_W; x += 1) {
    const p1 = project(x, 0, 0, cam)
    const p2 = project(x, FIELD_H, 0, cam)
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
  }
  for (let y = 0; y <= FIELD_H; y += 1) {
    const p1 = project(0, y, 0, cam)
    const p2 = project(FIELD_W, y, 0, cam)
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
  }
  ctx.stroke()

  drawTrack(ctx, cam)
  ctx.restore()

  // 场地边框
  poly(ctx, corners, null, '#5b7a44')
  // 屏幕外区域用底色补齐（图块边缘）
  ctx.fillStyle = '#dfe7d2'
  ctx.fillRect(minX, minY, maxX - minX, corners[0].y - minY)
}

function drawTrack(ctx, cam) {
  const cx = FIELD_W / 2
  const cy = FIELD_H / 2
  const straight = 28
  const rOuter = 12
  const lanes = 6
  const laneW = 1.1
  // 跑道底色
  const outer = stadiumPolygon(cx, cy, straight, rOuter).map((p) => project(p.x, p.y, 0, cam))
  poly(ctx, outer, '#d96b5f')
  // 内场草坪
  const inner = stadiumPolygon(cx, cy, straight, rOuter - lanes * laneW).map((p) =>
    project(p.x, p.y, 0, cam)
  )
  poly(ctx, inner, '#7fb069')
  // 跑道分道线
  ctx.strokeStyle = 'rgba(255,255,255,0.85)'
  ctx.lineWidth = 1.2
  for (let i = 1; i < lanes; i++) {
    const r = rOuter - i * laneW
    const pts = stadiumPolygon(cx, cy, straight, r).map((p) => project(p.x, p.y, 0, cam))
    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    for (let j = 1; j < pts.length; j++) ctx.lineTo(pts[j].x, pts[j].y)
    ctx.closePath()
    ctx.stroke()
  }
  // 起止线
  const s1 = project(cx - straight / 2, cy - rOuter, 0, cam)
  const e1 = project(cx - straight / 2, cy + rOuter, 0, cam)
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(s1.x, s1.y)
  ctx.lineTo(e1.x, e1.y)
  ctx.stroke()
}

// ---------- 物件 ----------
function boxFaces(obj, cam, z0, z1) {
  const c = footprintCorners(obj)
  const bot = c.map((p) => project(p.x, p.y, z0, cam))
  const top = c.map((p) => project(p.x, p.y, z1, cam))
  return { bot, top }
}

function drawBox(ctx, obj, cam, z0, z1, color, alpha = 1) {
  const { bot, top } = boxFaces(obj, cam, z0, z1)
  ctx.save()
  ctx.globalAlpha = alpha
  // 两个可见侧面（朝 +x、+y）
  poly(ctx, [bot[1], bot[2], top[2], top[1]], shade(color, 0.72))
  poly(ctx, [bot[2], bot[3], top[3], top[2]], shade(color, 0.58))
  poly(ctx, top, shade(color, 1))
  ctx.strokeStyle = shade(color, 0.4)
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(bot[1].x, bot[1].y); ctx.lineTo(top[1].x, top[1].y)
  ctx.moveTo(bot[2].x, bot[2].y); ctx.lineTo(top[2].x, top[2].y)
  ctx.moveTo(bot[3].x, bot[3].y); ctx.lineTo(top[3].x, top[3].y)
  ctx.stroke()
  ctx.restore()
  return { bot, top }
}

export function drawItem(ctx, obj, cam, options = {}) {
  const t = ITEM_TYPES[obj.type]
  const dims = effectiveDims(obj)
  const baseZ = obj.z || 0
  const conflict = options.conflict
  const ghost = options.ghost

  ctx.save()
  if (ghost) ctx.globalAlpha = 0.55

  if (obj.type === 'tent') {
    const eave = baseZ + dims.h * 0.55
    drawBox(ctx, obj, cam, baseZ, eave, t.color)
    const { top } = boxFaces(obj, cam, eave, eave)
    const center = footprintCorners(obj).reduce(
      (acc, p) => ({ x: acc.x + p.x / 4, y: acc.y + p.y / 4 }),
      { x: 0, y: 0 }
    )
    const apex = project(center.x, center.y, baseZ + dims.h, cam)
    // 四面锥顶
    for (let i = 0; i < 4; i++) {
      const j = (i + 1) % 4
      const f = i === 2 ? 0.8 : i === 1 ? 0.9 : i === 3 ? 0.75 : 1
      poly(ctx, [top[i], top[j], apex], shade(t.roof, f), shade(t.roof, 0.45))
    }
  } else if (obj.type === 'stand') {
    // 三层阶梯看台：逐层向后收进、略微收窄
    const tiers = 3
    const tierH = dims.h / tiers
    for (let i = 0; i < tiers; i++) {
      const inset = (i * dims.d) / (tiers * 2)
      const sub = {
        ...obj,
        d: dims.d - inset * 2,
        y: obj.y - inset,
        w: dims.w * (1 - i * 0.06),
      }
      drawBox(ctx, sub, cam, baseZ + i * tierH, baseZ + (i + 1) * tierH, t.color)
    }
  } else if (obj.type === 'sign') {
    // 立杆 + 顶部牌面
    const poleH = dims.h * 0.55
    const pole = { ...obj, w: 0.12, d: 0.12 }
    drawBox(ctx, pole, cam, baseZ, baseZ + poleH, '#6b7280')
    const board = { ...obj, w: Math.max(dims.w, 1.4), d: 0.18 }
    drawBox(ctx, board, cam, baseZ + poleH, baseZ + dims.h, t.color)
    const { top, bot } = boxFaces(board, cam, baseZ + poleH, baseZ + dims.h)
    // 牌面箭头
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    const mid1 = { x: (bot[1].x + bot[2].x) / 2, y: (bot[1].y + bot[2].y) / 2 }
    const mid2 = { x: (top[1].x + top[2].x) / 2, y: (top[1].y + top[2].y) / 2 }
    ctx.beginPath()
    ctx.moveTo(mid1.x, mid1.y); ctx.lineTo(mid2.x, mid2.y)
    ctx.stroke()
  } else {
    // 器材：箱体 + 捆扎带
    const { bot, top } = drawBox(ctx, obj, cam, baseZ, baseZ + dims.h, t.color)
    ctx.strokeStyle = shade(t.color, 0.35)
    ctx.lineWidth = 1.5
    for (const i of [1, 2, 3]) {
      const p = {
        x: bot[i].x + (top[i].x - bot[i].x) * 0.5,
        y: bot[i].y + (top[i].y - bot[i].y) * 0.5,
      }
      const q = {
        x: bot[i - 1].x + (top[i - 1].x - bot[i - 1].x) * 0.5,
        y: bot[i - 1].y + (top[i - 1].y - bot[i - 1].y) * 0.5,
      }
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
    }
  }

  // 底盘描边
  const base = footprintCorners(obj).map((p) => project(p.x, p.y, baseZ, cam))
  ctx.globalAlpha = ghost ? 0.55 : 1
  ctx.strokeStyle = conflict ? '#dc2626' : 'rgba(30,41,59,0.55)'
  ctx.lineWidth = conflict ? 2.5 : 1.2
  if (conflict) {
    ctx.shadowColor = '#dc2626'
    ctx.shadowBlur = 8
  }
  ctx.beginPath()
  ctx.moveTo(base[0].x, base[0].y)
  for (let i = 1; i < 4; i++) ctx.lineTo(base[i].x, base[i].y)
  ctx.closePath()
  ctx.stroke()
  ctx.shadowBlur = 0

  // 标签
  if (obj.label || options.showLabel) {
    const c = footprintCorners(obj)
    const center = c.reduce((a, p) => ({ x: a.x + p.x / 4, y: a.y + p.y / 4 }), { x: 0, y: 0 })
    const lp = project(center.x, center.y, baseZ + dims.h + 0.4, cam)
    ctx.font = '12px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillStyle = '#1f2937'
    ctx.fillText(obj.label || obj.name, lp.x, lp.y)
  }
  ctx.restore()
}

// ---------- 选中手柄 ----------
// 返回各手柄屏幕坐标，供命中测试
export function drawSelection(ctx, obj, cam) {
  const base = footprintCorners(obj).map((p) => project(p.x, p.y, obj.z || 0, cam))
  const dims = effectiveDims(obj)
  const centerW = footprintCorners(obj).reduce(
    (a, p) => ({ x: a.x + p.x / 4, y: a.y + p.y / 4 }),
    { x: 0, y: 0 }
  )
  const topCenter = project(centerW.x, centerW.y, (obj.z || 0) + dims.h, cam)
  const move = project(centerW.x, centerW.y, (obj.z || 0) + dims.h * 0.4, cam)
  const rotate = { x: topCenter.x, y: topCenter.y - 26 * cam.zoom }
  const step45 = { x: rotate.x + 30 * cam.zoom, y: rotate.y }
  const scale = base[2]

  ctx.save()
  // 底盘虚线
  ctx.setLineDash([6, 4])
  ctx.strokeStyle = '#2563eb'
  ctx.lineWidth = 1.6
  ctx.beginPath()
  ctx.moveTo(base[0].x, base[0].y)
  for (let i = 1; i < 4; i++) ctx.lineTo(base[i].x, base[i].y)
  ctx.closePath()
  ctx.stroke()
  ctx.setLineDash([])

  drawHandle(ctx, move, '#2563eb', '✛', 11)
  drawHandle(ctx, rotate, '#7c3aed', '⟳', 10)
  drawHandle(ctx, step45, '#0891b2', '45°', 10, true)
  drawHandle(ctx, scale, '#ea580c', '⤡', 10)
  ctx.restore()

  return { move, rotate, step45, scale }
}

function drawHandle(ctx, p, color, glyph, r, smallText) {
  ctx.beginPath()
  ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
  ctx.fillStyle = '#fff'
  ctx.fill()
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.fillStyle = color
  ctx.font = smallText ? '8px system-ui' : '11px system-ui'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(glyph, p.x, p.y + 0.5)
  ctx.textBaseline = 'alphabetic'
}

export function drawMarquee(ctx, rect) {
  ctx.save()
  ctx.fillStyle = 'rgba(37,99,235,0.12)'
  ctx.strokeStyle = '#2563eb'
  ctx.lineWidth = 1.2
  ctx.setLineDash([5, 3])
  ctx.fillRect(rect.x0, rect.y0, rect.x1 - rect.x0, rect.y1 - rect.y0)
  ctx.strokeRect(rect.x0, rect.y0, rect.x1 - rect.x0, rect.y1 - rect.y0)
  ctx.restore()
}

// ---------- 正交俯视（导出用） ----------
export function renderTopDown(canvas, items, visibleTypes, conflicts) {
  const scale = 14 // 每米 14px
  const W = FIELD_W * scale
  const H = FIELD_H * scale
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#e8f0dc'
  ctx.fillRect(0, 0, W, H)

  // 网格
  ctx.strokeStyle = 'rgba(90,120,70,0.25)'
  ctx.lineWidth = 1
  for (let x = 0; x <= FIELD_W; x += 0.5) {
    ctx.beginPath(); ctx.moveTo(x * scale, 0); ctx.lineTo(x * scale, H); ctx.stroke()
  }
  for (let y = 0; y <= FIELD_H; y += 0.5) {
    ctx.beginPath(); ctx.moveTo(0, y * scale); ctx.lineTo(W, y * scale); ctx.stroke()
  }

  // 跑道
  const cx = FIELD_W / 2
  const cy = FIELD_H / 2
  const straight = 28
  const rOuter = 12
  const lanes = 6
  const laneW = 1.1
  const topPoly = (s, r) => {
    const pts = stadiumPolygon(cx, cy, s, r)
    return pts.map((p) => ({ x: p.x * scale, y: p.y * scale }))
  }
  poly(ctx, topPoly(straight, rOuter), '#d96b5f')
  poly(ctx, topPoly(straight, rOuter - lanes * laneW), '#7fb069')
  ctx.strokeStyle = 'rgba(255,255,255,0.9)'
  for (let i = 1; i < lanes; i++) {
    const pts = topPoly(straight, rOuter - i * laneW)
    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    for (let j = 1; j < pts.length; j++) ctx.lineTo(pts[j].x, pts[j].y)
    ctx.closePath()
    ctx.stroke()
  }

  const conflictIds = new Set()
  for (const pair of conflicts) {
    conflictIds.add(pair.a)
    conflictIds.add(pair.b)
  }
  for (const obj of items) {
    if (!visibleTypes.has(obj.type)) continue
    const t = ITEM_TYPES[obj.type]
    const dims = effectiveDims(obj)
    ctx.save()
    ctx.translate(obj.x * scale, obj.y * scale)
    ctx.rotate(-obj.rotation * DEG)
    ctx.fillStyle = t.color
    ctx.strokeStyle = conflictIds.has(obj.id) ? '#dc2626' : 'rgba(30,41,59,0.7)'
    ctx.lineWidth = conflictIds.has(obj.id) ? 3 : 1.2
    ctx.fillRect((-dims.w / 2) * scale, (-dims.d / 2) * scale, dims.w * scale, dims.d * scale)
    ctx.strokeRect((-dims.w / 2) * scale, (-dims.d / 2) * scale, dims.w * scale, dims.d * scale)
    ctx.restore()
    ctx.fillStyle = '#111827'
    ctx.font = '11px system-ui'
    ctx.textAlign = 'center'
    ctx.fillText(obj.label || obj.name, obj.x * scale, obj.y * scale - dims.d * scale * 0.5 - 4)
  }
  return canvas
}
