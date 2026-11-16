import { ITEM_TYPES, TYPE_ORDER } from '../engine/catalog.js'

export default function PalettePanel({ onAdd, disabled }) {
  return (
    <aside className="palette">
      <h3>物件库</h3>
      <p className="hint">点击摆放到场地中部</p>
      {TYPE_ORDER.map((key) => {
        const t = ITEM_TYPES[key]
        return (
          <button
            key={key}
            className="palette-item"
            disabled={disabled}
            onClick={() => onAdd(key)}
            title={`${t.name} ${t.w}×${t.d}×${t.h}m`}
          >
            <span className="swatch" style={{ background: t.color }} />
            <span className="palette-name">{t.name}</span>
            <span className="palette-size">{t.w}×{t.d}×{t.h}m</span>
          </button>
        )
      })}
    </aside>
  )
}
