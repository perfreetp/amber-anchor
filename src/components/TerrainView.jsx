import { useEffect, useRef } from 'react'
import { TerrainRenderer } from '../webgl/TerrainRenderer.js'
import { rayTerrain, rayPlane, catmullRom } from '../lib/terrain.js'

export default function TerrainView(props) {
  const {
    hf, colorMode, tool, regionPoly, offsetResult, partition,
    splines, selectedSplineId, onLassoChange, onLassoCommit,
    onSplineDrag, onHoverInfo, onSelectSpline,
  } = props
  const canvasRef = useRef(null)
  const rendRef = useRef(null)
  const stateRef = useRef(props)
  stateRef.current = props
  const gesture = useRef(null)

  // 初始化
  useEffect(() => {
    const r = new TerrainRenderer(canvasRef.current)
    rendRef.current = r
    return () => r.dispose()
  }, [])

  // 地形更新
  useEffect(() => {
    if (rendRef.current && hf) rendRef.current.setTerrain(hf, colorMode)
  }, [hf, colorMode])

  // 覆盖层
  useEffect(() => {
    const r = rendRef.current
    if (!r || !hf) return
    const lines = [], points = [], quads = []

    // 雕刻单元高亮
    if (partition?.cells?.size) {
      const dx = hf.sx / hf.nx, dy = hf.sy / hf.ny
      const zLift = (x, y) => hf.sample(x, y) + 0.25
      for (const k of partition.cells) {
        const [ix, iy] = k.split(',').map(Number)
        const x0 = hf.bounds.minX + ix * dx, x1 = x0 + dx
        const y0 = hf.bounds.minY + iy * dy, y1 = y0 + dy
        quads.push({ x0, y0, x1, y1, color: [0.25, 0.65, 0.95], alpha: 0.16, z: zLift((x0 + x1) / 2, (y0 + y1) / 2) })
      }
      // 拼缝线（红）与块边界（白）
      for (const s of partition.seams) {
        const pts = s.edges.map((e) => {
          const [x, y] = hf.xy(e.ix + (e.dir === 'h' ? 0.5 : 0), e.iy + (e.dir === 'v' ? 0.5 : 0))
          return [x, y, hf.sample(x, y) + 0.5]
        })
        lines.push({ pts, color: [0.95, 0.25, 0.2], loop: false })
      }
      lines.push({
        pts: partition.outerContour.map((p) => [p.x, p.y, hf.sample(p.x, p.y) + 0.45]),
        color: [0.1, 0.85, 0.45], loop: true,
      })
    }

    // 圈选多边形（含编辑中）
    if (regionPoly && regionPoly.length) {
      const pts = regionPoly.map((p) => [p.x, p.y, hf.sample(p.x, p.y) + 0.7])
      lines.push({ pts, color: [1, 0.82, 0.2], loop: true })
      regionPoly.forEach((p) => points.push({ p: [p.x, p.y, hf.sample(p.x, p.y) + 0.9], color: [1, 0.82, 0.2], size: 9 }))
    }

    // 偏移轮廓与自交
    if (offsetResult?.poly?.length) {
      const bad = offsetResult.selfIntersections.length > 0 || offsetResult.degenerate
      lines.push({
        pts: offsetResult.poly.map((p) => [p.x, p.y, hf.sample(p.x, p.y) + 0.85]),
        color: bad ? [0.95, 0.15, 0.15] : [0.95, 0.55, 0.15], loop: true,
      })
      for (const hit of offsetResult.selfIntersections) {
        points.push({ p: [hit.x, hit.y, hf.sample(hit.x, hit.y) + 1.2], color: [1, 0.1, 0.1], size: 14 })
      }
    }

    // 样条与控制点
    for (const sp of splines) {
      const dense = catmullRom(sp.controls, 12)
      const c = sp.kind === 'ridge' ? [1.0, 0.45, 0.15] : [0.2, 0.6, 1.0]
      const sel = sp.id === selectedSplineId
      lines.push({ pts: dense.map((p) => [p.x, p.y, hf.sample(p.x, p.y) + 0.6]), color: c, loop: false })
      sp.controls.forEach((p, i) => {
        points.push({
          p: [p.x, p.y, hf.sample(p.x, p.y) + 0.9],
          color: sel ? [1, 1, 1] : c, size: sel ? 12 : 9,
        })
        void i
      })
    }
    r.setOverlays({ lines, points, quads })
  })

  const hitTerrain = (e) => {
    const r = rendRef.current
    const ray = r.screenRay(e.clientX, e.clientY)
    const hit = rayTerrain(hf, ray.origin, ray.dir)
    return { ray, hit }
  }

  const onPointerDown = (e) => {
    const r = rendRef.current
    canvasRef.current.setPointerCapture(e.pointerId)
    const s = stateRef.current

    if (s.tool === 'orbit' || e.button === 2 || e.button === 1) {
      gesture.current = { type: 'orbit', x: e.clientX, y: e.clientY, cam: { ...r.cam } }
      return
    }
    if (s.tool === 'region') {
      const { hit } = hitTerrain(e)
      if (!hit) return
      const p = { x: hit[0], y: hit[1] }
      if (e.shiftKey && s.regionPoly?.length) {
        onLassoCommit([...s.regionPoly, s.regionPoly[0]].slice(0, -1))
      } else {
        gesture.current = { type: 'lasso' }
        onLassoChange([...(s.regionPoly || []), p])
      }
      return
    }
    if (s.tool === 'spline') {
      const ray = r.screenRay(e.clientX, e.clientY)
      const picked = r.pickControlPoint(ray, s.splines)
      if (picked) {
        const sp = s.splines.find((q) => q.id === picked.splineId)
        onSelectSpline(sp.id)
        gesture.current = { type: 'spline', splineId: sp.id, index: picked.index }
        return
      }
      const { hit } = hitTerrain(e)
      if (!hit) return
      // 点空地：选中样条则追加控制点，否则新建样条
      const p = { x: hit[0], y: hit[1] }
      const cur = s.splines.find((q) => q.id === s.selectedSplineId)
      if (cur && cur.controls.length < 12) {
        onSplineDrag(cur.id, cur.controls.concat([p]), 'move')
      } else if (!cur) {
        onSplineDrag(null, p, 'create')
      }
      gesture.current = { type: 'spline-new' }
    }
  }

  const onPointerMove = (e) => {
    const r = rendRef.current
    const s = stateRef.current
    const g = gesture.current
    if (g?.type === 'orbit') {
      const dx = e.clientX - g.x, dy = e.clientY - g.y
      r.cam.yaw = g.cam.yaw - dx * 0.006
      r.cam.pitch = Math.max(0.08, Math.min(1.45, g.cam.pitch + dy * 0.006))
      r.render()
      return
    }
    const { hit } = hitTerrain(e)
    if (hit) {
      const slope = hf.slopeDeg(
        Math.round(((hit[0] - hf.bounds.minX) / hf.sx) * hf.nx),
        Math.round(((hit[1] - hf.bounds.minY) / hf.sy) * hf.ny)
      )
      onHoverInfo({ x: hit[0], y: hit[1], z: hf.sample(hit[0], hit[1]), slope })
    }
    if (g?.type === 'spline' && hit) {
      const sp = s.splines.find((q) => q.id === g.splineId)
      const next = sp.controls.map((c, i) => (i === g.index ? { x: hit[0], y: hit[1] } : c))
      onSplineDrag(sp.id, next, 'move')
    }
  }

  const onPointerUp = (e) => {
    const g = gesture.current
    gesture.current = null
    if (g?.type === 'lasso' && stateRef.current.regionPoly?.length >= 3) {
      // 圈选进行中，不自动闭合；双击/Shift 点击闭合
    }
  }

  const onDoubleClick = (e) => {
    const s = stateRef.current
    if (s.tool === 'region' && s.regionPoly?.length >= 3) {
      e.preventDefault()
      onLassoCommit(s.regionPoly)
    }
  }

  const onWheel = (e) => {
    e.preventDefault()
    const r = rendRef.current
    const k = e.deltaY < 0 ? 0.9 : 1.1
    r.cam.dist = Math.max(20, Math.min(500, r.cam.dist * k))
    r.render()
  }

  return (
    <div className="terrain-wrap">
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDoubleClick={onDoubleClick}
        onWheel={onWheel}
        onContextMenu={(e) => e.preventDefault()}
        style={{ width: '100%', height: '100%', display: 'block', touchAction: 'none', cursor: tool === 'orbit' ? 'grab' : 'crosshair' }}
      />
      <div className="view-hint">
        左键拖拽旋转视角 / 滚轮缩放{tool === 'region' ? ' · 圈选工具：点击添加界址点，双击或 Shift+点击闭合' : ''}
        {tool === 'spline' ? ' · 样条工具：拖控制点改形，选中样条后点空地追加控制点，未选中时点空地新建样条' : ''}
      </div>
    </div>
  )
}
