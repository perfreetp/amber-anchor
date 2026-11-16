// 图块缓存：把静态底图与未变动物件渲染到 OffscreenCanvas 图块，
// 交互中只失效变动物件 AABB 覆盖的图块并重绘。
import { drawGround, drawItem } from './renderer.js'
import { objectScreenAABB, depthKey, FIELD_W, FIELD_H } from './isoMath.js'

const TILE = 256

function makeOffscreen(w, h) {
  if (typeof OffscreenCanvas !== 'undefined') return new OffscreenCanvas(w, h)
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return c
}

export class TileCache {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.tiles = new Map() // key -> {canvas, dirty}
    this.camKey = ''
    this.cols = 0
    this.rows = 0
    this.ox = 0
    this.oy = 0
  }

  resetLayout(cam) {
    const W = this.canvas.width
    const H = this.canvas.height
    // 视图覆盖的世界菱形屏幕范围估算：直接按整张画布分块
    this.cols = Math.ceil(W / TILE)
    this.rows = Math.ceil(H / TILE)
    this.tiles.clear()
    for (let ty = 0; ty < this.rows; ty++) {
      for (let tx = 0; tx < this.cols; tx++) {
        this.tiles.set(`${tx},${ty}`, { canvas: makeOffscreen(TILE, TILE), dirty: true })
      }
    }
    this.camKey = JSON.stringify(cam)
  }

  // 按物件新旧 AABB 失效图块
  invalidateForAABBs(aabbs) {
    for (const box of aabbs) {
      const x0 = Math.floor(box.minX / TILE)
      const x1 = Math.floor(box.maxX / TILE)
      const y0 = Math.floor(box.minY / TILE)
      const y1 = Math.floor(box.maxY / TILE)
      for (let ty = y0; ty <= y1; ty++) {
        for (let tx = x0; tx <= x1; tx++) {
          const t = this.tiles.get(`${tx},${ty}`)
          if (t) t.dirty = true
        }
      }
    }
  }

  invalidateAll() {
    for (const t of this.tiles.values()) t.dirty = true
  }

  // 重绘脏图块：静态内容 = 地面 + 所有非 dynamic 且可见的物件
  repaintDirty({ cam, items, visibleTypes, conflictIds, dynamicIds }) {
    const dynamic = new Set(dynamicIds || [])
    const sorted = items
      .filter((o) => visibleTypes.has(o.type) && !dynamic.has(o.id))
      .map((o) => ({ o, k: depthKey(o) }))
      .sort((a, b) => a.k - b.k)
      .map((x) => x.o)

    for (const [key, tile] of this.tiles) {
      if (!tile.dirty) continue
      const [tx, ty] = key.split(',').map(Number)
      const tctx = tile.canvas.getContext('2d')
      tctx.clearRect(0, 0, TILE, TILE)
      tctx.save()
      tctx.translate(-tx * TILE, -ty * TILE)
      drawGround(tctx, cam, {
        minX: tx * TILE,
        minY: ty * TILE,
        maxX: (tx + 1) * TILE,
        maxY: (ty + 1) * TILE,
      })
      for (const obj of sorted) {
        // 屏幕裁剪：只画与本块相交的物件
        const box = objectScreenAABB(obj, cam)
        if (
          box.maxX < tx * TILE ||
          box.minX > (tx + 1) * TILE ||
          box.maxY < ty * TILE ||
          box.minY > (ty + 1) * TILE
        ) {
          continue
        }
        drawItem(tctx, obj, cam, { conflict: conflictIds.has(obj.id) })
      }
      tctx.restore()
      tile.dirty = false
    }
  }

  // 合成静态层到主画布，再由外部叠加动态物件/手柄
  composite() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    for (const [key, tile] of this.tiles) {
      const [tx, ty] = key.split(',').map(Number)
      this.ctx.drawImage(tile.canvas, tx * TILE, ty * TILE)
    }
  }

  get dirtyCount() {
    let n = 0
    for (const t of this.tiles.values()) if (t.dirty) n++
    return n
  }
}

export { FIELD_W, FIELD_H }
