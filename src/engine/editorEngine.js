// 编辑器引擎：状态、鼠标交互、图块缓存渲染调度
import {
  project, screenToWorld, objectScreenAABB, snap, round2,
  depthKey, footprintCorners, FIELD_W, FIELD_H,
} from './isoMath.js'
import { drawItem, drawSelection, drawMarquee } from './renderer.js'
import { TileCache } from './tileCache.js'
import { createPicker } from './picker.js'
import { computeConflicts, conflictIdSet } from './conflict.js'

const HANDLE_R = 14

export class EditorEngine {
  constructor(canvas, onState) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.onState = onState
    this.items = []
    this.visibleTypes = new Set(['tent', 'equipment', 'stand', 'sign'])
    this.selectedIds = new Set()
    this.conflicts = []
    this.cam = { x: 0, y: 0, zoom: 1 }
    this.handles = null
    this.mode = 'idle' // idle | pan | marquee | drag | rotate | step45 | scale
    this.drag = null
    this.marquee = null
    this.ghostItems = null
    this.dynamicIds = []
    this.prevAABBs = []
    this.lockedIds = new Set() // 已放行版本的物件锁定（当前简化：放行后不可编辑）
    this.readOnly = false
    this.cache = new TileCache(canvas)
    this.picker = createPicker(canvas, () => ({
      cam: this.cam,
      items: this.items,
      visibleTypes: this.visibleTypes,
      handles: this.handles,
    }))
    this.raf = 0
    this.dirty = true
    this._bind()
    this.frame = this.frame.bind(this)
    this.raf = requestAnimationFrame(this.frame)
  }

  // ---------- 对外数据 ----------
  setItems(items) {
    this.items = items.map((o) => ({ ...o }))
    this.selectedIds = new Set([...this.selectedIds].filter((id) => this.items.some((o) => o.id === id)))
    this.recompute()
    this.cache.invalidateAll()
    this.dirty = true
    this.emit()
  }

  setVisible(types) {
    this.visibleTypes = new Set(types)
    // 隐藏的物件退出选中集，避免隐藏物件仍显示手柄
    this.selectedIds = new Set(
      [...this.selectedIds].filter((id) => {
        const o = this.items.find((it) => it.id === id)
        return o && this.visibleTypes.has(o.type)
      })
    )
    this.recompute()
    this.cache.invalidateAll()
    this.dirty = true
    this.emit()
  }

  setReadOnly(ro) {
    this.readOnly = ro
    if (ro) {
      this.selectedIds.clear()
      this.handles = null
    }
    this.emit()
  }

  recompute() {
    this.conflicts = computeConflicts(this.items, this.visibleTypes)
  }

  emit() {
    this.onState?.({
      items: this.items,
      conflicts: this.conflicts,
      selected: this.items.filter((o) => this.selectedIds.has(o.id)),
      readOnly: this.readOnly,
    })
  }

  // ---------- 尺寸 / 相机 ----------
  resize(w, h) {
    if (this.canvas.width === w && this.canvas.height === h) return
    this.canvas.width = w
    this.canvas.height = h
    this.centerCamera()
    this.cache.resetLayout(this.cam)
    this.dirty = true
  }

  centerCamera() {
    const c = project(FIELD_W / 2, FIELD_H / 2, 0, { x: 0, y: 0, zoom: this.cam.zoom })
    this.cam.x = this.canvas.width / 2 - c.x
    this.cam.y = this.canvas.height / 2 - c.y - 40
  }

  setZoom(z, sx, sy) {
    const before = screenToWorld(sx ?? this.canvas.width / 2, sy ?? this.canvas.height / 2, this.cam)
    this.cam.zoom = Math.min(2, Math.max(0.4, z))
    const afterW = before
    const p = project(afterW.x, afterW.y, 0, { x: 0, y: 0, zoom: this.cam.zoom })
    this.cam.x = (sx ?? this.canvas.width / 2) - p.x
    this.cam.y = (sy ?? this.canvas.height / 2) - p.y
    this.cache.resetLayout(this.cam)
    this.dirty = true
  }

  // ---------- 鼠标事件 ----------
  _bind() {
    this._onDown = (e) => this.onDown(e)
    this._onMove = (e) => this.onMove(e)
    this._onUp = (e) => this.onUp(e)
    this._onWheel = (e) => this.onWheel(e)
    this._onContext = (e) => e.preventDefault()
    this.canvas.addEventListener('mousedown', this._onDown)
    window.addEventListener('mousemove', this._onMove)
    window.addEventListener('mouseup', this._onUp)
    this.canvas.addEventListener('wheel', this._onWheel, { passive: false })
    this.canvas.addEventListener('contextmenu', this._onContext)
  }

  destroy() {
    cancelAnimationFrame(this.raf)
    this.canvas.removeEventListener('mousedown', this._onDown)
    window.removeEventListener('mousemove', this._onMove)
    window.removeEventListener('mouseup', this._onUp)
    this.canvas.removeEventListener('wheel', this._onWheel)
    this.canvas.removeEventListener('contextmenu', this._onContext)
  }

  _pos(e) {
    const r = this.canvas.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  onDown(e) {
    const p = this._pos(e)
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      this.mode = 'pan'
      this.drag = { sx: p.x, sy: p.y, cx: this.cam.x, cy: this.cam.y }
      return
    }
    if (e.button !== 0 || this.readOnly) {
      if (e.button === 2) return
      return
    }

    const hit = this.picker.pick(p.x, p.y)
    if (hit?.kind === 'handle') {
      const selected = this.items.filter((o) => this.selectedIds.has(o.id))
      if (selected.length === 1) {
        if (hit.name === 'move') {
          // 走与点物件一致的拖动流程，保证 starts/轴向逻辑统一
          this.mode = 'drag'
          this.drag = {
            start: p,
            startWorld: screenToWorld(p.x, p.y, this.cam),
            starts: selected.map((o) => ({ id: o.id, x: o.x, y: o.y })),
            axis: null,
            moved: false,
          }
          this.dynamicIds = selected.map((o) => o.id)
          this.prevAABBs = selected.map((o) => objectScreenAABB(o, this.cam))
          this._invalidateGroup(selected)
          this.dirty = true
          return
        }
        this.mode = hit.name
        const obj = selected[0]
        this.drag = {
          start: p,
          startObj: { ...obj },
          startWorld: screenToWorld(p.x, p.y, this.cam),
          axis: null,
        }
        this.dynamicIds = [obj.id]
        this.prevAABBs = [objectScreenAABB(obj, this.cam)]
        this._invalidateObj(obj)
      }
      return
    }

    if (hit?.kind === 'item') {
      const obj = hit.item
      const additive = e.shiftKey
      if (!this.selectedIds.has(obj.id)) {
        if (!additive) this.selectedIds.clear()
        this.selectedIds.add(obj.id)
      } else if (additive) {
        this.selectedIds.delete(obj.id)
      }
      const group = this.items.filter((o) => this.selectedIds.has(o.id))
      if (group.length === 0) {
        // Shift 取消了最后一个选中件：仅更新选择态，不进入拖动
        this.mode = 'idle'
        this.dirty = true
        this.emit()
        return
      }
      this.mode = 'drag'
      this.drag = {
        start: p,
        startWorld: screenToWorld(p.x, p.y, this.cam),
        starts: group.map((o) => ({ id: o.id, x: o.x, y: o.y })),
        axis: null,
        moved: false,
      }
      this.dynamicIds = group.map((o) => o.id)
      this.prevAABBs = group.map((o) => objectScreenAABB(o, this.cam))
      this._invalidateGroup(group)
      this.dirty = true
      this.emit()
      return
    }

    // 空白：框选
    this.selectedIds.clear()
    this.handles = null
    this.mode = 'marquee'
    this.marquee = { x0: p.x, y0: p.y, x1: p.x, y1: p.y }
    this.dirty = true
    this.emit()
  }

  onMove(e) {
    const p = this._pos(e)
    if (this.mode === 'pan') {
      this.cam.x = this.drag.cx + (p.x - this.drag.sx)
      this.cam.y = this.drag.cy + (p.y - this.drag.sy)
      this.cache.resetLayout(this.cam)
      this.dirty = true
      return
    }
    if (this.mode === 'marquee') {
      this.marquee.x1 = p.x
      this.marquee.y1 = p.y
      this.dirty = true
      return
    }
    if (!['drag', 'rotate', 'step45', 'scale'].includes(this.mode)) return

    const d = this.drag
    if (this.mode === 'drag') {
      const w = screenToWorld(p.x, p.y, this.cam)
      let dx = w.x - d.startWorld.x
      let dy = w.y - d.startWorld.y
      // 轴向约束：移动超过阈值后锁定主轴
      if (!d.axis && Math.hypot(dx, dy) > 0.6) {
        d.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      }
      if (d.axis === 'x') dy = 0
      if (d.axis === 'y') dx = 0
      d.moved = true
      const nextGhosts = []
      for (const s of d.starts) {
        const obj = this.items.find((o) => o.id === s.id)
        const g = {
          ...obj,
          x: clampField(s.x + dx, 0, FIELD_W, (obj.w * obj.scale) / 2),
          y: clampField(s.y + dy, 0, FIELD_H, (obj.d * obj.scale) / 2),
        }
        nextGhosts.push(g)
      }
      // 失效旧/新幽灵 AABB 覆盖的图块
      this.cache.invalidateForAABBs([
        ...this.prevAABBs,
        ...nextGhosts.map((g) => objectScreenAABB(g, this.cam)),
      ])
      this.prevAABBs = nextGhosts.map((g) => objectScreenAABB(g, this.cam))
      this.ghostItems = nextGhosts
      this.dirty = true
      return
    }

    const obj = this.items.find((o) => o.id === d.startObj.id)
    if (!obj) return
    if (this.mode === 'rotate' || this.mode === 'step45') {
      const centerW = { x: obj.x, y: obj.y }
      const c = project(centerW.x, centerW.y, 0, this.cam)
      const ang = Math.atan2(p.y - c.y, p.x - c.x)
      const deg = (ang * 180) / Math.PI + 90
      if (this.mode === 'step45') {
        obj.rotation = Math.round(deg / 45) * 45
      } else {
        obj.rotation = Math.round(deg / 5) * 5
      }
      const newBox = objectScreenAABB(obj, this.cam)
      this.cache.invalidateForAABBs([...this.prevAABBs, newBox])
      this.prevAABBs = [newBox]
      this.dirty = true
      this.emit()
    } else if (this.mode === 'scale') {
      const w = screenToWorld(p.x, p.y, this.cam)
      const startW = screenToWorld(d.start.x, d.start.y, this.cam)
      const dist = Math.hypot(w.x - obj.x, w.y - obj.y)
      const startDist = Math.max(0.4, Math.hypot(startW.x - d.startObj.x, startW.y - d.startObj.y))
      const ns = Math.min(3, Math.max(0.4, d.startObj.scale * (dist / startDist)))
      obj.scale = Math.round(ns * 20) / 20
      const newBox = objectScreenAABB(obj, this.cam)
      this.cache.invalidateForAABBs([...this.prevAABBs, newBox])
      this.prevAABBs = [newBox]
      this.dirty = true
      this.emit()
    }
  }

  onUp() {
    if (this.mode === 'marquee') {
      const m = this.marquee
      const picked = this.picker.pickRect(m.x0, m.y0, m.x1, m.y1)
      this.selectedIds = new Set(picked.map((o) => o.id))
      this.marquee = null
      this.mode = 'idle'
      this.dirty = true
      this.emit()
      return
    }
    if (this.mode === 'drag') {
      if (this.ghostItems) {
        // 松手：吸附 0.5 米网格，z 贴地（底盘高度归零）
        for (const g of this.ghostItems) {
          const obj = this.items.find((o) => o.id === g.id)
          obj.x = snap(g.x)
          obj.y = snap(g.y)
          obj.z = 0
        }
      }
      this.ghostItems = null
      this.dynamicIds = []
      this.prevAABBs = []
      this.recompute()
      // 仅在确实移动过时全量失效；纯点击选中保留图块缓存
      if (this.drag?.moved) this.cache.invalidateAll()
      this.dirty = true
      this.mode = 'idle'
      this.emit()
      return
    }
    if (['rotate', 'step45', 'scale'].includes(this.mode)) {
      this.dynamicIds = []
      this.recompute()
      this.cache.invalidateAll()
      this.dirty = true
      this.mode = 'idle'
      this.emit()
      return
    }
    this.mode = 'idle'
    this.drag = null
  }

  onWheel(e) {
    e.preventDefault()
    const p = this._pos(e)
    const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1
    this.setZoom(this.cam.zoom * factor, p.x, p.y)
  }

  _invalidateObj(obj) {
    this.cache.invalidateForAABBs([objectScreenAABB(obj, this.cam)])
  }

  _invalidateGroup(group) {
    this.cache.invalidateForAABBs(group.map((o) => objectScreenAABB(o, this.cam)))
  }

  // 键盘删除
  deleteSelected() {
    if (this.readOnly || !this.selectedIds.size) return
    const group = this.items.filter((o) => this.selectedIds.has(o.id))
    this._invalidateGroup(group)
    this.items = this.items.filter((o) => !this.selectedIds.has(o.id))
    this.selectedIds.clear()
    this.handles = null
    this.recompute()
    this.dirty = true
    this.emit()
  }

  selectAll() {
    this.selectedIds = new Set(this.items.filter((o) => this.visibleTypes.has(o.type)).map((o) => o.id))
    this.dirty = true
    this.emit()
  }

  // ---------- 渲染 ----------
  frame() {
    this.raf = requestAnimationFrame(this.frame)
    if (!this.dirty) return
    this.dirty = false
    this.render()
  }

  render() {
    const conflictIds = conflictIdSet(this.conflicts)
    // 动态物件（拖动中）从缓存剔除，按 AABB 失效其图块
    const dynamicSet = new Set(this.dynamicIds)
    this.cache.repaintDirty({
      cam: this.cam,
      items: this.items,
      visibleTypes: this.visibleTypes,
      conflictIds,
      dynamicIds: this.dynamicIds,
    })
    this.cache.composite()

    // 动态层按深度键插回，保证与静态层的前后遮挡关系正确
    let ghostConflictIds = null
    if (this.ghostItems) ghostConflictIds = this._ghostConflictIds(conflictIds)
    const dynamicRenderList = (this.ghostItems ||
      this.items.filter((o) => dynamicSet.has(o.id))
    )
      .filter((o) => this.visibleTypes.has(o.type))
      .map((o) => ({ o, k: depthKey(o) }))
      .sort((a, b) => a.k - b.k)
    for (const { o } of dynamicRenderList) {
      drawItem(this.ctx, o, this.cam, {
        conflict: ghostConflictIds ? ghostConflictIds.has(o.id) : conflictIds.has(o.id),
        ghost: !!this.ghostItems,
      })
    }

    // 选中描边与手柄
    this.handles = null
    const selected = this.items.filter((o) => this.selectedIds.has(o.id))
    if (selected.length && !this.readOnly) {
      // 所有选中件都画底盘虚线（拖动中也保持可见）
      for (const obj of selected) {
        const base = footprintCorners(obj).map((p) => project(p.x, p.y, obj.z || 0, this.cam))
        this.ctx.save()
        this.ctx.setLineDash([6, 4])
        this.ctx.strokeStyle = '#2563eb'
        this.ctx.lineWidth = 1.6
        this.ctx.beginPath()
        this.ctx.moveTo(base[0].x, base[0].y)
        for (let i = 1; i < 4; i++) this.ctx.lineTo(base[i].x, base[i].y)
        this.ctx.closePath()
        this.ctx.stroke()
        this.ctx.restore()
      }
      // 单选且未在拖动时显示四个操作手柄
      if (selected.length === 1 && this.mode !== 'drag') {
        this.handles = drawSelection(this.ctx, selected[0], this.cam)
      }
    }

    if (this.marquee) drawMarquee(this.ctx, this.marquee)
  }

  _ghostConflictIds(base) {
    // 用幽灵位置临时替换做一次冲突计算
    const ghostMap = new Map(this.ghostItems.map((g) => [g.id, g]))
    const temp = this.items.map((o) => ghostMap.get(o.id) || o)
    const cf = computeConflicts(temp, this.visibleTypes)
    const s = conflictIdSet(cf)
    for (const id of base) s.add(id)
    return s
  }
}

function clampField(v, min, max, half) {
  return Math.min(max - half, Math.max(min + half, v))
}

export { HANDLE_R, depthKey, round2 }
