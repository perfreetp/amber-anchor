import { ITEM_TYPES } from '../engine/catalog.js'

export default function ConflictPanel({ conflicts, itemById, onLocate }) {
  if (!conflicts.length) {
    return (
      <div className="conflict-empty">
        <div className="ok-mark">✓</div>
        <p>当前没有包围盒冲突</p>
        <p className="hint">两个物件底盘 OBB 相交时会在此列出，并在画布上描红</p>
      </div>
    )
  }
  return (
    <div className="conflict-list">
      <h4 className="text-rework">冲突对（{conflicts.length}）</h4>
      {conflicts.map((c, i) => {
        const a = itemById.get(c.a)
        const b = itemById.get(c.b)
        if (!a || !b) return null
        return (
          <div key={i} className="conflict-card">
            <div className="conflict-pair">
              <button className="conflict-chip" onClick={() => onLocate(a.id)}>
                <span className="swatch" style={{ background: ITEM_TYPES[a.type].color }} />
                {a.label || a.name} <small>({a.x.toFixed(1)}, {a.y.toFixed(1)})</small>
              </button>
              <span className="conflict-x">✕</span>
              <button className="conflict-chip" onClick={() => onLocate(b.id)}>
                <span className="swatch" style={{ background: ITEM_TYPES[b.type].color }} />
                {b.label || b.name} <small>({b.x.toFixed(1)}, {b.y.toFixed(1)})</small>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
