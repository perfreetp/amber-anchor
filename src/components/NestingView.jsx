import { useEffect, useRef, useState } from 'react'

// 下料摊平视图：按画布比例自动排样，标注边长、拼缝编号与对应关系、图签摘要
const COLORS = ['#dfeef5', '#f3ead9', '#e3efe0', '#f5e2e2', '#eae4f3', '#dff2f1', '#f0ecd8', '#ead9e8']
const GAP_MM = 30

function pack(blocks, wrapW) {
  const placed = []
  let x = 0, rowH = 0, rowY = 0, maxX = 0
  for (const b of blocks) {
    const w = b.flatWidth * 1000, h = b.flatHeight * 1000
    if (x > 0 && x + w > wrapW) { rowY += rowH + GAP_MM; x = 0; rowH = 0 }
    placed.push({ b, tx: x - b.bbox.minX * 1000, ty: rowY - b.bbox.minY * 1000, px: x, py: rowY, w, h })
    maxX = Math.max(maxX, x + w)
    rowH = Math.max(rowH, h)
    x += w + GAP_MM
  }
  return { placed, totalW: maxX, totalH: rowY + rowH }
}

// 在候选换行宽度中选长宽比最贴合画布的排样
function bestPack(blocks, cw, ch) {
  const sumW = blocks.reduce((s, b) => s + b.flatWidth * 1000 + GAP_MM, 0)
  const target = cw / Math.max(1, ch)
  let best = null
  for (let k = 1; k <= 40; k++) {
    const wrap = sumW * k / 40
    const lay = pack(blocks, wrap)
    const aspect = lay.totalW / Math.max(1, lay.totalH)
    const score = Math.abs(Math.log(aspect / target))
    if (!best || score < best.score) best = { ...lay, score }
  }
  return best
}

export default function NestingView({ partition, selectedBlockId, onSelect }) {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const viewRef = useRef({ scale: 1, ox: 40, oy: 40, fitted: '' })
  const layoutRef = useRef(null)
  const dragRef = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = wrapRef.current
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }))
    ro.observe(el)
    setSize({ w: el.clientWidth, h: el.clientHeight })
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf = 0
    const draw = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const w = canvas.clientWidth, h = canvas.clientHeight
      if (canvas.width !== w * dpr) { canvas.width = w * dpr; canvas.height = h * dpr }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#f7f6f1'
      ctx.fillRect(0, 0, w, h)
      const blocks = partition?.blocks
      if (!blocks?.length) {
        ctx.fillStyle = '#888'
        ctx.font = '13px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('完成雕刻范围圈选并分块后，这里显示摊平下料图', w / 2, h / 2)
        raf = requestAnimationFrame(draw)
        return
      }
      const layout = bestPack(blocks, Math.max(100, w), Math.max(100, h))
      layoutRef.current = layout
      const v = viewRef.current
      const fitKey = blocks.map((b) => b.id).join(',') + w + 'x' + h
      if (v.fitted !== fitKey) {
        v.scale = Math.max(0.01, Math.min(8, Math.min((w - 70) / layout.totalW, (h - 90) / layout.totalH)))
        v.ox = (w - layout.totalW * v.scale) / 2
        v.oy = 36
        v.fitted = fitKey
      }
      const X = (xMM) => v.ox + xMM * v.scale
      const Y = (yMM) => v.oy + yMM * v.scale
      const fs = Math.max(8, Math.min(13, 10 / Math.max(0.6, v.scale)))

      ctx.strokeStyle = '#e8e5dc'
      ctx.lineWidth = 1
      for (let gx = 0; gx <= layout.totalW; gx += 100) {
        ctx.beginPath(); ctx.moveTo(X(gx), Y(0)); ctx.lineTo(X(gx), Y(layout.totalH)); ctx.stroke()
      }
      for (let gy = 0; gy <= layout.totalH; gy += 100) {
        ctx.beginPath(); ctx.moveTo(X(0), Y(gy)); ctx.lineTo(X(layout.totalW), Y(gy)); ctx.stroke()
      }

      layout.placed.forEach(({ b, tx, ty, px, py }, bi) => {
        const selected = b.id === selectedBlockId
        const P = (p) => [X(p.x * 1000 + tx), Y(p.y * 1000 + ty)]
        ctx.beginPath()
        b.outline.forEach((p, i) => { const [cx, cy] = P(p); i ? ctx.lineTo(cx, cy) : ctx.moveTo(cx, cy) })
        ctx.closePath()
        ctx.fillStyle = selected ? '#cfe3f2' : COLORS[bi % COLORS.length]
        ctx.fill()
        ctx.strokeStyle = selected ? '#155a8a' : '#1b4965'
        ctx.lineWidth = selected ? 2 : 1
        ctx.stroke()

        ctx.font = `${fs}px sans-serif`
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        // 每条拼缝只在该块内最长的一段上标注一次
        const seamBest = new Map()
        for (const seg of b.segments) {
          if (!seg.seamId) continue
          const cur = seamBest.get(seg.seamId)
          if (!cur || seg.length > cur.length) seamBest.set(seg.seamId, seg)
        }
        for (const seg of b.segments) {
          const [x1, y1] = P(seg.from), [x2, y2] = P(seg.to)
          const screenLen = Math.hypot(x2 - x1, y2 - y1)
          const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
          const deg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI
          const norm = ((deg % 180) + 180) % 180 > 90 ? deg + 180 : deg
          const showLen = screenLen >= 22 // 屏幕上够长才标边长
          const showSeam = seg.seamId && seamBest.get(seg.seamId) === seg
          if (!showLen && !showSeam) continue
          ctx.save()
          ctx.translate(mx, my - (showSeam ? fs + 2 : fs - 4))
          ctx.rotate(norm * Math.PI / 180)
          if (showSeam) {
            const s = partition.seams.find((q) => q.id === seg.seamId)
            const nb = s.blockA === b.id ? s.blockB : s.blockB
            const label = `${seg.seamId}↔${nb}`
            const tw = ctx.measureText(label).width
            ctx.fillStyle = '#fff'
            ctx.fillRect(-tw / 2 - 3, -fs, tw + 6, fs + 4)
            ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 0.8
            ctx.strokeRect(-tw / 2 - 3, -fs, tw + 6, fs + 4)
            ctx.fillStyle = '#c0392b'
            ctx.fillText(label, 0, 0)
            ctx.fillStyle = '#666'
            ctx.font = `${fs - 2}px sans-serif`
            ctx.fillText(`高差${(s.maxHeightStep * 1000).toFixed(0)}`, 0, fs + 3)
            ctx.font = `${fs}px sans-serif`
          }
          if (showLen) {
            ctx.fillStyle = '#1f6f8b'
            ctx.fillText(`${(seg.length * 1000).toFixed(0)}`, 0, showSeam ? -(fs * 2 + 4) : 0)
          }
          ctx.restore()
        }

        const cx = X(px + b.flatWidth * 1000 / 2)
        const cy = Y(py + b.flatHeight * 1000 / 2)
        ctx.fillStyle = '#1b4965'
        ctx.font = `bold ${fs + 4}px sans-serif`
        ctx.fillText(b.id, cx, cy - fs)
        ctx.font = `${fs - 1}px sans-serif`
        ctx.fillStyle = '#444'
        ctx.fillText(`${(b.flatWidth * 1000).toFixed(0)}×${(b.flatHeight * 1000).toFixed(0)}mm`, cx, cy + 4)
        ctx.fillText(`均高${b.meanElevation.toFixed(1)}m 失真${(b.maxDistortion * 100).toFixed(1)}%`, cx, cy + fs + 5)
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [partition, selectedBlockId, size])

  useEffect(() => { viewRef.current.fitted = '' }, [partition?.cells?.size, size.w, size.h])

  const toLayoutMM = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const v = viewRef.current
    return { x: (e.clientX - rect.left - v.ox) / v.scale, y: (e.clientY - rect.top - v.oy) / v.scale }
  }

  const onPointerDown = (e) => {
    if (e.button !== 0) return
    const p = toLayoutMM(e)
    let hit = null
    const layout = layoutRef.current
    if (layout) {
      for (const { b, px, py } of layout.placed) {
        if (p.x >= px && p.x <= px + b.flatWidth * 1000 && p.y >= py && p.y <= py + b.flatHeight * 1000) { hit = b.id; break }
      }
    }
    if (hit) onSelect(hit)
    dragRef.current = { x: e.clientX, y: e.clientY, ...viewRef.current, pan: !hit || e.shiftKey }
    canvasRef.current.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e) => {
    const d = dragRef.current
    if (!d?.pan) return
    viewRef.current.ox = d.ox + (e.clientX - d.x)
    viewRef.current.oy = d.oy + (e.clientY - d.y)
  }
  const onWheel = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const v = viewRef.current
    const mx = e.clientX - rect.left, my = e.clientY - rect.top
    const wx = (mx - v.ox) / v.scale, wy = (my - v.oy) / v.scale
    const k = e.deltaY < 0 ? 1.12 : 1 / 1.12
    v.scale = Math.max(0.01, Math.min(30, v.scale * k))
    v.ox = mx - wx * v.scale
    v.oy = my - wy * v.scale
  }

  return (
    <div className="nesting-wrap" ref={wrapRef}>
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => (dragRef.current = null)}
        onWheel={onWheel}
        style={{ width: '100%', height: '100%', cursor: 'crosshair', touchAction: 'none' }}
      />
      <div className="view-hint">滚轮缩放 · Shift+拖拽或空白处拖拽平移 · 点击分块选中 · 网格 100mm</div>
    </div>
  )
}
