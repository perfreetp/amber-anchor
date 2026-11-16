import { useEffect, useMemo, useRef, useState } from 'react'
import { EditorEngine } from '../engine/editorEngine.js'
import { ITEM_TYPES, TYPE_ORDER, makeItem } from '../engine/catalog.js'
import { exportPNG, exportCSV, buildMaterialRows } from '../engine/exporter.js'
import { conflictIdSet } from '../engine/conflict.js'
import PalettePanel from './PalettePanel.jsx'
import LayersPanel from './LayersPanel.jsx'
import ConflictPanel from './ConflictPanel.jsx'
import ReviewPanel from './ReviewPanel.jsx'

export default function EditorView({ project, onUpdate, onSnapshot, onReview }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const engineRef = useRef(null)
  const [hud, setHud] = useState({ items: [], conflicts: [], selected: [], readOnly: false })
  const [visible, setVisible] = useState(() => new Set(TYPE_ORDER))
  const [tab, setTab] = useState('layers')
  const [note, setNote] = useState('')

  const readOnly = project.status === 'approved'

  // 初始化引擎
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const rect = wrap.getBoundingClientRect()
    canvas.width = Math.floor(rect.width)
    canvas.height = Math.floor(rect.height)
    const engine = new EditorEngine(canvas, (s) => setHud(s))
    engineRef.current = engine
    engine.setItems(project.items || [])
    // 初始相机居中（resize 尺寸未变时不会自动居中）
    engine.centerCamera()
    engine.cache.resetLayout(engine.cam)
    engine.dirty = true
    engine.setReadOnly(project.status === 'approved')
    const ro = new ResizeObserver(() => {
      const r = wrap.getBoundingClientRect()
      engine.resize(Math.floor(r.width), Math.floor(r.height))
    })
    ro.observe(wrap)

    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'Delete' || e.key === 'Backspace') engine.deleteSelected()
      if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        engine.selectAll()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      ro.disconnect()
      window.removeEventListener('keydown', onKey)
      engine.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 引擎数据 -> 项目持久化：按内容签名比对，避免引用变化导致的无效写回/重渲染
  const lastSyncSig = useRef('')
  useEffect(() => {
    if (!engineRef.current) return
    const sig = JSON.stringify(hud.items)
    if (sig === lastSyncSig.current) return
    lastSyncSig.current = sig
    onUpdate({ items: JSON.parse(sig) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hud.items])

  useEffect(() => {
    engineRef.current?.setVisible(visible)
  }, [visible])

  useEffect(() => {
    engineRef.current?.setReadOnly(readOnly)
  }, [readOnly])

  const addItem = (typeKey) => {
    if (readOnly) return
    const engine = engineRef.current
    // 放在场地中部，带少量随机偏移避免完全重叠
    const item = makeItem(typeKey, 26 + Math.random() * 4, 16 + Math.random() * 3)
    const next = [...engine.items, item]
    engine.setItems(next)
    engine.selectedIds = new Set([item.id])
    setTab('conflict')
  }

  const selected = hud.selected
  const conflictIds = useMemo(() => conflictIdSet(hud.conflicts), [hud.conflicts])
  const itemById = useMemo(() => new Map(hud.items.map((o) => [o.id, o])), [hud.items])

  const updateSelected = (patch) => {
    const engine = engineRef.current
    const next = engine.items.map((o) =>
      engine.selectedIds.has(o.id) ? { ...o, ...patch } : o
    )
    engine.setItems(next)
  }

  const restoreVersion = (v) => {
    if (!confirm(`恢复版本 ${v.id.slice(-5)} 的布置？当前未提交的改动会被覆盖。`)) return
    const engine = engineRef.current
    engine.setItems(JSON.parse(JSON.stringify(v.items)))
  }

  const submit = () => {
    if (hud.conflicts.length) {
      if (!confirm('当前存在包围盒冲突，仍要提交审核吗？')) return
    }
    onSnapshot(hud.items, note || '提交审核')
    setNote('')
  }

  const materialRows = useMemo(
    () => buildMaterialRows(hud.items, visible),
    [hud.items, visible]
  )

  return (
    <div className="editor">
      <PalettePanel onAdd={addItem} disabled={readOnly} />

      <div className="stage" ref={wrapRef}>
        <canvas ref={canvasRef} className="stage-canvas" />
        <div className="stage-toolbar">
          <button className="btn small" onClick={() => engineRef.current?.setZoom(engineRef.current.cam.zoom * 1.2)}>＋</button>
          <button className="btn small" onClick={() => engineRef.current?.setZoom(engineRef.current.cam.zoom / 1.2)}>－</button>
          <button className="btn small" onClick={() => {
            const e = engineRef.current
            e.centerCamera(); e.cache.resetLayout(e.cam); e.dirty = true
          }}>居中</button>
          <span className="zoom-label">{Math.round((engineRef.current?.cam.zoom ?? 1) * 100)}%</span>
        </div>
        <div className="stage-hint">
          左键拾取/框选 · Shift 加选 · 拖动轴向约束 · Alt+左键平移 · 滚轮缩放 · Delete 删除
        </div>
        {readOnly && <div className="readonly-banner">该项目已审核放行，布置锁定为只读</div>}
      </div>

      <aside className="sidebar">
        <div className="tabs">
          {[
            ['layers', '图层'],
            ['conflict', `冲突${hud.conflicts.length ? ` (${hud.conflicts.length})` : ''}`],
            ['items', '物料'],
            ['review', '审核'],
          ].map(([k, label]) => (
            <button
              key={k}
              className={`tab ${tab === k ? 'active' : ''} ${k === 'conflict' && hud.conflicts.length ? 'badge' : ''}`}
              onClick={() => setTab(k)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="tab-body">
          {tab === 'layers' && (
            <LayersPanel
              visible={visible}
              setVisible={setVisible}
              counts={TYPE_ORDER.map((t) => [t, hud.items.filter((o) => o.type === t).length])}
              types={ITEM_TYPES}
            />
          )}

          {tab === 'conflict' && (
            <ConflictPanel
              conflicts={hud.conflicts}
              itemById={itemById}
              selectedIds={new Set(selected.map((o) => o.id))}
              onLocate={(id) => {
                const e = engineRef.current
                e.selectedIds = new Set([id])
                e.dirty = true
                e.emit()
              }}
            />
          )}

          {tab === 'items' && (
            <div className="material-panel">
              <table className="material-table">
                <tbody>
                  {materialRows.map((r, i) => (
                    <tr key={i} className={i === 0 ? 'mat-head' : i === materialRows.length - 1 ? 'mat-total' : ''}>
                      {r.map((c, j) => <td key={j}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'review' && (
            <ReviewPanel
              project={project}
              note={note}
              setNote={setNote}
              onSubmit={submit}
              onReview={onReview}
              onRestore={restoreVersion}
              readOnly={readOnly}
              fmtDate={(t) => new Date(t).toLocaleString('zh-CN')}
            />
          )}
        </div>

        {selected.length > 0 && (
          <div className="inspector">
            <div className="inspector-title">
              已选 {selected.length} 件
              {selected.length === 1 && <span>：{ITEM_TYPES[selected[0].type].name}</span>}
            </div>
            {selected.length === 1 && (
              <SingleInspector obj={selected[0]} onChange={updateSelected} />
            )}
            {selected.length > 1 && <div className="hint">框选批次：拖动手柄可整体挪动，松手整体吸附 0.5 米网格</div>}
            {!readOnly && (
              <button className="btn danger small" onClick={() => engineRef.current.deleteSelected()}>
                删除选中
              </button>
            )}
          </div>
        )}

        <div className="export-bar">
          <button
            className="btn"
            onClick={() => exportPNG(hud.items, visible, hud.conflicts, project.name)}
          >
            导出俯视图 PNG
          </button>
          <button
            className="btn"
            onClick={() => exportCSV(hud.items, visible, project.name)}
          >
            导出物料 CSV
          </button>
        </div>
      </aside>
    </div>
  )
}

function SingleInspector({ obj, onChange }) {
  const t = ITEM_TYPES[obj.type]
  return (
    <div className="inspector-grid">
      <label>名称/备注
        <input value={obj.label} onChange={(e) => onChange({ label: e.target.value })} placeholder={t.name} />
      </label>
      <label>X (米)
        <input type="number" step={0.5} value={obj.x} onChange={(e) => onChange({ x: Number(e.target.value) })} />
      </label>
      <label>Y (米)
        <input type="number" step={0.5} value={obj.y} onChange={(e) => onChange({ y: Number(e.target.value) })} />
      </label>
      <label>旋转 (度)
        <input type="number" step={5} value={obj.rotation} onChange={(e) => onChange({ rotation: Number(e.target.value) })} />
      </label>
      <label>缩放
        <input type="number" step={0.05} min={0.4} max={3} value={obj.scale} onChange={(e) => onChange({ scale: Number(e.target.value) })} />
      </label>
    </div>
  )
}
