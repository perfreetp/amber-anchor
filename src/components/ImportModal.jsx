import { useState } from 'react'
import { parseText, normalizePoints, SAMPLE_CSV } from '../lib/importer.js'
import { fitHeightfield } from '../lib/terrain.js'

export default function ImportModal({ onClose, onLoaded }) {
  const [text, setText] = useState('')
  const [kind, setKind] = useState('auto')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  const onFile = async (e) => {
    const f = e.target.files[0]
    if (!f) return
    setText(await f.text())
    setError('')
  }

  const load = (raw, forcedKind) => {
    try {
      const points0 = parseText(raw, forcedKind || kind)
      const points = normalizePoints(points0)
      const bounds = { minX: 0, maxX: 100, minY: 0, maxY: 80 }
      const hf = fitHeightfield(points, 96, 96, bounds)
      onLoaded({ hf, count: points.length })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="modal-mask" onPointerDown={onClose}>
      <div className="modal" onPointerDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <b>导入等高线 / 高程点</b>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <p className="muted small">
            支持 CSV（x,y,z 高程点；或 等高线编号,x,y,z 折线，自动沿线补点）与 GeoJSON（Point / LineString / FeatureCollection，读 z 或 elevation 属性）。
            数据自动归一化到 100m × 80m 建模区，反距离加权（IDW）拟合为 97×97 地形曲面。
          </p>
          <div className="row gap">
            <label className="btn">
              选择文件
              <input type="file" accept=".csv,.txt,.geojson,.json" hidden onChange={onFile} />
            </label>
            <select value={kind} onChange={(e) => setKind(e.target.value)}>
              <option value="auto">自动识别</option>
              <option value="csv">CSV / 文本</option>
              <option value="geojson">GeoJSON</option>
            </select>
            <button className="btn ghost" onClick={() => { setText(SAMPLE_CSV); setError('') }}>填入示例 CSV</button>
          </div>
          <textarea
            className="import-text"
            placeholder="粘贴数据，或选择文件…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
          />
          {error && <div className="alert error">{error}</div>}
          {info && <div className="alert ok">{info}</div>}
        </div>
        <div className="modal-foot">
          <button className="btn ghost" onClick={onClose}>取消</button>
          <button className="btn primary" disabled={!text.trim()} onClick={() => load(text)}>
            拟合地形曲面
          </button>
        </div>
      </div>
    </div>
  )
}
