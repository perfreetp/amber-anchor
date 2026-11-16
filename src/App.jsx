import { useEffect, useMemo, useRef, useState } from 'react'
import TerrainView from './components/TerrainView.jsx'
import NestingView from './components/NestingView.jsx'
import ImportModal from './components/ImportModal.jsx'
import ReviewPanel, { freshBatch } from './components/ReviewPanel.jsx'
import { sampleTerrain, applySculpt, hStats } from './lib/terrain.js'
import { buildCells, buildPartition, defaultCuts } from './lib/partition.js'
import { offsetPolygon, contourFromCells } from './lib/polygon.js'
import { blockSvg, nestingSvg, bomCsv, seamCsv, buildZip } from './lib/exporter.js'

let uid = 0
const newId = (p) => p + ++uid

const SLOPE_BREAKS = [
  { max: 15, label: '0–15° 平缓', color: '#5cb861' },
  { max: 25, label: '15–25° 缓坡', color: '#edd457' },
  { max: 35, label: '25–35° 较陡', color: '#f29438' },
  { max: 90, label: '>35° 陡坡', color: '#db453d' },
]

export default function App() {
  const baseHf = useRef(sampleTerrain(96, 96))
  const [splines, setSplines] = useState([
    { id: newId('sp'), name: '主山脊', kind: 'ridge', amplitude: 4.5, radius: 5, controls: [{ x: 14, y: 60 }, { x: 30, y: 54 }, { x: 46, y: 46 }, { x: 64, y: 36 }] },
    { id: newId('sp'), name: '主沟谷', kind: 'valley', amplitude: 3.2, radius: 4, controls: [{ x: 20, y: 26 }, { x: 38, y: 34 }, { x: 58, y: 44 }, { x: 80, y: 52 }] },
  ])
  const [selectedSplineId, setSelectedSplineId] = useState(splines[0].id)
  const [colorMode, setColorMode] = useState(0) // 0 高程 1 曲率 2 坡度
  const [tool, setTool] = useState('orbit')
  const [regionDraft, setRegionDraft] = useState(null) // 编辑中的圈选点
  const [committedRegion, setCommittedRegion] = useState(null)
  const [thickness, setThickness] = useState(0.8)
  const [partsX, setPartsX] = useState(3)
  const [partsY, setPartsY] = useState(2)
  const [cutX, setCutX] = useState(() => defaultCuts(0, 95, 3))
  const [cutY, setCutY] = useState(() => defaultCuts(0, 95, 2))
  const [sheet, setSheet] = useState({ w: 1220, h: 2440 })
  const slopeLimit = 40
  const [selectedBlockId, setSelectedBlockId] = useState(null)
  const [hover, setHover] = useState(null)
  const [tab, setTab] = useState('nest')
  const [showImport, setShowImport] = useState(false)
  const [batch, setBatch] = useState(null)
  const [released, setReleased] = useState(false)
  const [toast, setToast] = useState('')

  const regionPoly = regionDraft ?? committedRegion

  // 雕刻后的地形
  const hf = useMemo(() => applySculpt(baseHf.current, splines), [splines])
  const stats = useMemo(() => hStats(hf), [hf])

  // 雕刻范围单元
  const cells = useMemo(() => buildCells(hf, regionPoly), [hf, regionPoly])

  // 等距内偏移 + 自交检测
  const offsetResult = useMemo(() => {
    if (!cells.size) return null
    const dx = hf.sx / hf.nx, dy = hf.sy / hf.ny
    const contour = contourFromCells(cells, hf.bounds.minX, hf.bounds.minY, dx, dy)
    if (contour.length < 3) return null
    return offsetPolygon(contour, thickness)
  }, [cells, thickness, hf])

  // 分块 + 摊平
  const partition = useMemo(() => {
    if (!cells.size) return { blocks: [], seams: [], outerContour: [], cells }
    return buildPartition(hf, cells, cutX, cutY)
  }, [cells, cutX, cutY, hf])

  // 圈选范围变化后，按当前块数在新包围盒内重新等分切线
  const rangeKey = cells.size ? (() => {
    const r = cellRange(cells, 'x'), r2 = cellRange(cells, 'y')
    return r.join('-') + '/' + r2.join('-')
  })() : 'empty'
  useEffect(() => {
    if (!cells.size) return
    const [x0, x1] = cellRange(cells, 'x')
    const [y0, y1] = cellRange(cells, 'y')
    setCutX(defaultCuts(x0, x1, partsX))
    setCutY(defaultCuts(y0, y1, partsY))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangeKey])

  const selectedBlock = partition.blocks?.find((b) => b.id === selectedBlockId)

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2600) }

  // ---------- 样条 ----------
  const updateSpline = (id, patch) =>
    setSplines((arr) => arr.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  const handleSplineDrag = (id, next, action) => {
    if (action === 'create') {
      const sp = {
        id: newId('sp'), name: '新样条', kind: 'ridge', amplitude: 3, radius: 4,
        controls: [next, { x: next.x + 8, y: next.y + 4 }],
      }
      setSplines((a) => [...a, sp])
      setSelectedSplineId(sp.id)
    } else if (id && Array.isArray(next)) {
      setSplines((arr) => arr.map((s) => (s.id === id ? { ...s, controls: next } : s)))
    }
  }
  const selectedSpline = splines.find((s) => s.id === selectedSplineId)

  // ---------- 圈选 ----------
  const commitRegion = (poly) => {
    if (!poly || poly.length < 3) { flash('至少需要 3 个界址点'); return }
    setCommittedRegion(poly)
    setRegionDraft(null)
    setTool('orbit')
  }
  const clearRegion = () => { setCommittedRegion(null); setRegionDraft(null); setSelectedBlockId(null) }

  // ---------- 分缝 ----------
  const resplit = (px, py) => {
    const [x0, x1] = cellRange(cells, 'x')
    const [y0, y1] = cellRange(cells, 'y')
    if (!cells.size) { setPartsX(px); setPartsY(py); return }
    setCutX(defaultCuts(x0, x1, px))
    setCutY(defaultCuts(y0, y1, py))
    setPartsX(px); setPartsY(py)
  }
  const nudgeCut = (axis, index, delta) => {
    const arr = axis === 'x' ? cutX : cutY
    const set = axis === 'x' ? setCutX : setCutY
    set(arr.map((v, i) => (i === index ? Math.max(arr[i - 1] + 1, Math.min((arr[i + 1] || v + 1) - 1, v + delta)) : v)))
  }

  // ---------- 批次 ----------
  const submitBatch = () => {
    if (!partition.blocks.length) { flash('请先圈选雕刻范围并生成分块'); return }
    setBatch(freshBatch(partition, hf, offsetResult, { sheetW: sheet.w, sheetH: sheet.h, slopeLimit }, batch?.id))
    setReleased(false)
    setTab('review')
  }
  const releaseAndExport = () => {
    const files = [
      ...partition.blocks.map((b) => ({ name: `${b.id}.svg`, content: blockSvg(b, partition.seams, sheet.w, sheet.h) })),
      { name: '拼版总图.svg', content: nestingSvg(partition, sheet.w, sheet.h) },
      { name: '物料清单.csv', content: bomCsv(partition, thickness, '浮雕铝板 3mm') },
      { name: '拼缝对应表.csv', content: seamCsv(partition) },
    ]
    const zip = buildZip(files)
    downloadBlob(new Blob([zip], { type: 'application/zip' }), `下料图_${batch.id}.zip`)
    setReleased(true)
    flash(`批次 ${batch.id} 已放行，导出 ${files.length} 个文件`)
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">⛰ 地形浮雕分块下料建模工具 <span className="sub">地质公园科普展馆 · WebGL2</span></div>
        <div className="toolbar">
          <button className="btn" onClick={() => setShowImport(true)}>导入等高线/高程点</button>
          <div className="seg">
            {[['orbit', '视角'], ['region', '圈选范围'], ['spline', '样条雕刻']].map(([k, label]) => (
              <button key={k} className={tool === k ? 'on' : ''} onClick={() => setTool(k)}>{label}</button>
            ))}
          </div>
          <div className="seg">
            {[['0', '高程'], ['1', '曲率着色'], ['2', '坡度分级']].map(([k, label]) => (
              <button key={k} className={String(colorMode) === k ? 'on' : ''} onClick={() => setColorMode(Number(k))}>{label}</button>
            ))}
          </div>
          <button className="btn primary" onClick={submitBatch}>提交批次检查</button>
        </div>
      </header>

      <main className="main">
        <section className="view3d">
          <TerrainView
            hf={hf}
            colorMode={colorMode}
            tool={tool}
            regionPoly={regionPoly}
            offsetResult={offsetResult}
            partition={cells.size ? partition : null}
            splines={splines}
            selectedSplineId={selectedSplineId}
            onLassoChange={setRegionDraft}
            onLassoCommit={commitRegion}
            onSplineDrag={handleSplineDrag}
            onHoverInfo={setHover}
            onSelectSpline={setSelectedSplineId}
          />
          <div className="hud">
            <div>高程 {stats.min.toFixed(1)} ~ {stats.max.toFixed(1)} m · 均值 {stats.mean.toFixed(1)} m</div>
            {hover && <div>坐标 ({hover.x.toFixed(1)}, {hover.y.toFixed(1)}) · 高程 {hover.z.toFixed(2)} m · 坡度 <b className={hover.slope > slopeLimit ? 'red' : ''}>{hover.slope.toFixed(1)}°</b></div>}
            {offsetResult && (
              <div className={offsetResult.selfIntersections.length || offsetResult.degenerate ? 'red' : 'ok'}>
                内偏 {thickness}m：{offsetResult.degenerate ? '轮廓退化' : offsetResult.selfIntersections.length ? `${offsetResult.selfIntersections.length} 处自交（红色标记）` : '轮廓有效，无自交'}
              </div>
            )}
            {colorMode === 2 && (
              <div className="legend">
                {SLOPE_BREAKS.map((b) => <span key={b.label}><i style={{ background: b.color }} />{b.label}</span>)}
                <span className="muted">限值 {slopeLimit}°</span>
              </div>
            )}
            {colorMode === 1 && (
              <div className="legend">
                <span><i style={{ background: '#356bd9' }} />凹（沟谷）</span>
                <span><i style={{ background: '#ede0d0' }} />过渡</span>
                <span><i style={{ background: '#d43d38' }} />凸（山脊）</span>
              </div>
            )}
          </div>
        </section>

        <aside className="sidebar">
          <h3>样条控制点</h3>
          {selectedSpline ? (
            <div className="card">
              <div className="row between">
                <input className="input" value={selectedSpline.name} onChange={(e) => updateSpline(selectedSpline.id, { name: e.target.value })} />
                <button className="btn tiny danger" onClick={() => { setSplines((a) => a.filter((s) => s.id !== selectedSpline.id)); setSelectedSplineId(null) }}>删除</button>
              </div>
              <div className="row gap">
                <label className="seg small">
                  <button className={selectedSpline.kind === 'ridge' ? 'on' : ''} onClick={() => updateSpline(selectedSpline.id, { kind: 'ridge' })}>山脊↑</button>
                  <button className={selectedSpline.kind === 'valley' ? 'on' : ''} onClick={() => updateSpline(selectedSpline.id, { kind: 'valley' })}>沟谷↓</button>
                </label>
              </div>
              <label className="field">幅度（m）
                <input type="range" min="0" max="10" step="0.1" value={selectedSpline.amplitude}
                  onChange={(e) => updateSpline(selectedSpline.id, { amplitude: Number(e.target.value) })} />
                <span>{selectedSpline.amplitude.toFixed(1)}</span>
              </label>
              <label className="field">影响半径（m）
                <input type="range" min="1" max="12" step="0.5" value={selectedSpline.radius}
                  onChange={(e) => updateSpline(selectedSpline.id, { kind: selectedSpline.kind, radius: Number(e.target.value) })} />
                <span>{selectedSpline.radius.toFixed(1)}</span>
              </label>
              <div className="muted small">控制点 {selectedSpline.controls.length} 个（3D 视图中直接拖拽）</div>
            </div>
          ) : <div className="muted small">切到「样条雕刻」工具，在地形上点两下新建样条。</div>}
          <div className="spline-list">
            {splines.map((s) => (
              <div key={s.id} className={`spline-item ${s.id === selectedSplineId ? 'on' : ''}`} onClick={() => setSelectedSplineId(s.id)}>
                <i className={`dot ${s.kind}`} /> {s.name}
                <span className="muted small">{s.kind === 'ridge' ? '抬升' : '下切'} {s.amplitude.toFixed(1)}m</span>
              </div>
            ))}
          </div>

          <h3>雕刻范围与浮雕厚度</h3>
          <div className="card">
            <div className="row gap">
              <button className="btn tiny" onClick={() => setTool('region')}>{committedRegion ? '重新圈选' : '开始圈选'}</button>
              <button className="btn tiny ghost" disabled={!regionPoly} onClick={clearRegion}>清除</button>
              <span className="muted small">{cells.size} 个单元</span>
            </div>
            <label className="field">等距内偏厚度（m）
              <input type="range" min="0.2" max="3" step="0.1" value={thickness} onChange={(e) => setThickness(Number(e.target.value))} />
              <span>{thickness.toFixed(1)}</span>
            </label>
          </div>

          <h3>分块与分缝</h3>
          <div className="card">
            <div className="row gap">
              <label className="field inline">X 向块数
                <input type="number" min="1" max="8" value={partsX} onChange={(e) => resplit(Number(e.target.value) || 1, partsY)} />
              </label>
              <label className="field inline">Y 向块数
                <input type="number" min="1" max="8" value={partsY} onChange={(e) => resplit(partsX, Number(e.target.value) || 1)} />
              </label>
            </div>
            <div className="cut-editor">
              <b className="small">X 向分缝位置（格线索引）</b>
              {cutX.slice(1, -1).map((v, i) => (
                <div key={'x' + i} className="cut-row">
                  <span>Sx{i + 1} = {v}</span>
                  <button className="btn tiny" onClick={() => nudgeCut('x', i + 1, -1)}>◀</button>
                  <button className="btn tiny" onClick={() => nudgeCut('x', i + 1, 1)}>▶</button>
                </div>
              ))}
              <b className="small">Y 向分缝位置</b>
              {cutY.slice(1, -1).map((v, i) => (
                <div key={'y' + i} className="cut-row">
                  <span>Sy{i + 1} = {v}</span>
                  <button className="btn tiny" onClick={() => nudgeCut('y', i + 1, -1)}>◀</button>
                  <button className="btn tiny" onClick={() => nudgeCut('y', i + 1, 1)}>▶</button>
                </div>
              ))}
            </div>
            <div className="row gap">
              <label className="field inline">板材宽 mm<input type="number" value={sheet.w} onChange={(e) => setSheet({ ...sheet, w: Number(e.target.value) })} /></label>
              <label className="field inline">板材高 mm<input type="number" value={sheet.h} onChange={(e) => setSheet({ ...sheet, h: Number(e.target.value) })} /></label>
            </div>
          </div>

          {selectedBlock && (
            <>
              <h3>{selectedBlock.id} 图签</h3>
              <div className="card block-info">
                <div>外包尺寸：<b>{(selectedBlock.flatWidth * 1000).toFixed(0)} × {(selectedBlock.flatHeight * 1000).toFixed(0)} mm</b></div>
                <div>周长：{(selectedBlock.perimeter * 1000).toFixed(0)} mm · 投影面积 {selectedBlock.surfaceArea.toFixed(2)} m²</div>
                <div>平均高程：{selectedBlock.meanElevation.toFixed(2)} m</div>
                <div>最大摊平失真：<b className={selectedBlock.maxDistortion > 0.03 ? 'red' : 'ok'}>{(selectedBlock.maxDistortion * 100).toFixed(1)}%</b></div>
                <div className="seam-refs">
                  {partition.seams.filter((s) => s.blockA === selectedBlock.id || s.blockB === selectedBlock.id).map((s) => {
                    const nb = s.blockA === selectedBlock.id ? s.blockB : s.blockA
                    return <div key={s.id} className="seam-ref">{s.id} ↔ {nb} · 最大高差 <b>{(s.maxHeightStep * 1000).toFixed(0)} mm</b> · 缝长 {(s.planarLength * 1000).toFixed(0)} mm</div>
                  })}
                </div>
              </div>
            </>
          )}
        </aside>
      </main>

      <section className="bottom">
        <div className="tabs">
          {[['nest', `摊平下料图（${partition.blocks?.length || 0} 块 / ${partition.seams?.length || 0} 缝）`], ['seams', '拼缝对应与高差'], ['review', `批次复核${batch ? ' · ' + batch.id : ''}`]].map(([k, label]) => (
            <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{label}</button>
          ))}
          <span className="spacer" />
          {released && <span className="tag green">批次 {batch.id} 已放行 · SVG 与物料清单已导出</span>}
        </div>
        <div className="tab-body">
          {tab === 'nest' && (
            <NestingView partition={partition} selectedBlockId={selectedBlockId} onSelect={setSelectedBlockId} />
          )}
          {tab === 'seams' && <SeamTable partition={partition} onSelect={setSelectedBlockId} selectedBlockId={selectedBlockId} />}
          {tab === 'review' && (
            <ReviewPanel
              batch={batch} hf={hf} offsetResult={offsetResult} sheet={sheet} slopeLimit={slopeLimit}
              onUpdateBatch={setBatch} onReleased={releaseAndExport}
            />
          )}
        </div>
      </section>

      {showImport && (
        <ImportModal
          onClose={() => setShowImport(false)}
          onLoaded={({ hf: newHf, count }) => {
            baseHf.current = newHf
            setSplines([])
            setSelectedSplineId(null)
            clearRegion()
            setBatch(null); setReleased(false)
            setShowImport(false)
            flash(`已拟合地形曲面：${count} 个数据点 → 97×97 格网`)
          }}
        />
      )}
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

function SeamTable({ partition, onSelect, selectedBlockId }) {
  if (!partition.seams?.length) return <div className="panel-empty">暂无拼缝。圈选范围并分块后，这里列出每条拼缝两侧的对应关系与高差。</div>
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>拼缝号</th><th>A 块</th><th>B 块</th><th>平面长(mm)</th><th>公共表面长(mm)</th><th>A 侧下料长(mm)</th><th>B 侧下料长(mm)</th><th>最大高差(mm)</th><th>平均高差(mm)</th><th>块间均高差(mm)</th></tr>
        </thead>
        <tbody>
          {partition.seams.map((s) => (
            <tr key={s.id} className={s.blockA === selectedBlockId || s.blockB === selectedBlockId ? 'hl' : ''}>
              <td><b>{s.id}</b></td>
              <td><button className="link" onClick={() => onSelect(s.blockA)}>{s.blockA}</button></td>
              <td><button className="link" onClick={() => onSelect(s.blockB)}>{s.blockB}</button></td>
              <td>{(s.planarLength * 1000).toFixed(0)}</td>
              <td>{(s.surfaceLength * 1000).toFixed(0)}</td>
              <td>{(s.flatLengthA * 1000).toFixed(0)}</td>
              <td>{(s.flatLengthB * 1000).toFixed(0)}</td>
              <td className={s.maxHeightStep * 1000 > 20 ? 'red' : ''}><b>{(s.maxHeightStep * 1000).toFixed(0)}</b></td>
              <td>{(s.meanHeightStep * 1000).toFixed(0)}</td>
              <td>{(s.elevationDiff * 1000).toFixed(0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ---- helpers ----
function cellRange(cells, axis) {
  let lo = Infinity, hi = -Infinity
  for (const k of cells) {
    const [ix, iy] = k.split(',').map(Number)
    const v = axis === 'x' ? ix : iy
    lo = Math.min(lo, v); hi = Math.max(hi, v)
  }
  return cells.size ? [lo, hi] : [0, 0]
}

function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = name; a.click()
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}
