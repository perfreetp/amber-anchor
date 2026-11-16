export default function LayersPanel({ visible, setVisible, counts, types }) {
  const toggle = (key) => {
    const next = new Set(visible)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    setVisible(next)
  }
  return (
    <div className="layers">
      <h4>按类型显隐</h4>
      {counts.map(([key, n]) => {
        const t = types[key]
        const on = visible.has(key)
        return (
          <label key={key} className={`layer-row ${on ? '' : 'off'}`}>
            <input type="checkbox" checked={on} onChange={() => toggle(key)} />
            <span className="swatch" style={{ background: t.color }} />
            <span className="layer-name">{t.name}</span>
            <span className="layer-count">{n}</span>
          </label>
        )
      })}
      <div className="layer-actions">
        <button className="btn small" onClick={() => setVisible(new Set(counts.map(([k]) => k)))}>全部显示</button>
        <button className="btn small" onClick={() => setVisible(new Set())}>全部隐藏</button>
      </div>
    </div>
  )
}
