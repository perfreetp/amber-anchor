// 像素级命中测试：离屏画布按颜色编码物件 ID
import { project, footprintCorners, effectiveDims } from './isoMath.js'

// 物件颜色编码从 5 开始（0-4 保留区间，0=背景黑）
const ITEM_OFFSET = 5

function makeCanvas(w, h) {
  if (typeof OffscreenCanvas !== 'undefined') return new OffscreenCanvas(w, h)
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return c
}

function idToColor(n) {
  return `rgb(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255})`
}

function pickPoly(ctx, pts, color) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
  ctx.closePath()
  ctx.fill()
}

// 用纯色画出所有物件实体（不含透明），返回编码画布
function buildPickBuffer(width, height, cam, items, visibleTypes) {
  const c = makeCanvas(width, height)
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, width, height)

  items.forEach((obj, idx) => {
    if (!visibleTypes.has(obj.type)) return
    const dims = effectiveDims(obj)
    const corners = footprintCorners(obj)
    const baseZ = obj.z || 0
    const bot = corners.map((p) => project(p.x, p.y, baseZ, cam))
    const top = corners.map((p) => project(p.x, p.y, baseZ + dims.h, cam))
    const color = idToColor(ITEM_OFFSET + idx)
    // 侧面 + 顶面，保证物体整体可点（含帐篷锥顶用顶面近似即可拾取到）
    pickPoly(ctx, [bot[1], bot[2], top[2], top[1]], color)
    pickPoly(ctx, [bot[2], bot[3], top[3], top[2]], color)
    pickPoly(ctx, top, color)
    // 帐篷锥顶
    if (obj.type === 'tent') {
      const center = corners.reduce((a, p) => ({ x: a.x + p.x / 4, y: a.y + p.y / 4 }), { x: 0, y: 0 })
      const apex = project(center.x, center.y, baseZ + dims.h, cam)
      for (let i = 0; i < 4; i++) {
        pickPoly(ctx, [top[i], top[(i + 1) % 4], apex], color)
      }
    }
  })
  return c
}

export function createPicker(canvas, getState) {
  return {
    // 返回 { kind:'item', item } | { kind:'handle', name } | null
    pick(sx, sy) {
      const { cam, items, visibleTypes, handles } = getState()
      // 1) 手柄优先（屏幕圆形命中）
      if (handles) {
        for (const [name, p] of Object.entries(handles)) {
          if (Math.hypot(sx - p.x, sy - p.y) <= 14) {
            return { kind: 'handle', name }
          }
        }
      }
      // 2) 物件像素命中
      const buf = buildPickBuffer(canvas.width, canvas.height, cam, items, visibleTypes)
      const bctx = buf.getContext('2d')
      const px = Math.round(sx)
      const py = Math.round(sy)
      if (px < 0 || py < 0 || px >= canvas.width || py >= canvas.height) return null
      const [r, g, b] = bctx.getImageData(px, py, 1, 1).data
      const n = (r << 16) | (g << 8) | b
      if (n < ITEM_OFFSET) return null
      const idx = n - ITEM_OFFSET
      const item = items[idx]
      if (!item || !visibleTypes.has(item.type)) return null
      return { kind: 'item', item }
    },

    // 框选：对选框内像素采样，收集所有物件 id
    pickRect(x0, y0, x1, y1) {
      const { cam, items, visibleTypes } = getState()
      const buf = buildPickBuffer(canvas.width, canvas.height, cam, items, visibleTypes)
      const bctx = buf.getContext('2d')
      const left = Math.max(0, Math.round(Math.min(x0, x1)))
      const right = Math.min(canvas.width - 1, Math.round(Math.max(x0, x1)))
      const top = Math.max(0, Math.round(Math.min(y0, y1)))
      const bottom = Math.min(canvas.height - 1, Math.round(Math.max(y0, y1)))
      const w = right - left + 1
      const h = bottom - top + 1
      if (w <= 0 || h <= 0) return []
      const data = bctx.getImageData(left, top, w, h).data
      const found = new Set()
      // 步长采样，控制大选框开销
      const step = 3
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const i = (y * w + x) * 4
          const n = (data[i] << 16) | (data[i + 1] << 8) | data[i + 2]
          if (n >= ITEM_OFFSET) found.add(n - ITEM_OFFSET)
        }
      }
      return [...found].map((i) => items[i]).filter(Boolean).filter((o) => visibleTypes.has(o.type))
    },
  }
}
