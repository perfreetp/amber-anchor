import { sampleTerrain, applySculpt, fitHeightfield } from '../src/lib/terrain.js'
import { buildCells, buildPartition, defaultCuts } from '../src/lib/partition.js'
import { offsetPolygon, contourFromCells, selfIntersections, polygon, relaxFlatten } from '../src/lib/polygon.js'
import { runChecks } from '../src/lib/checks.js'
import { blockSvg, bomCsv, seamCsv, buildZip } from '../src/lib/exporter.js'
import { parseCsv, parseGeoJson, normalizePoints, SAMPLE_CSV } from '../src/lib/importer.js'
import assert from 'node:assert/strict'

let pass = 0
const ok = (name, cond) => { assert.ok(cond, name); pass++; console.log('  ✓', name) }

// 1. 地形与雕刻
const base = sampleTerrain(48, 48)
ok('样例地形格网尺寸', base.h.length === 49 * 49)
const sculpted = applySculpt(base, [{ id: 's1', kind: 'ridge', amplitude: 4, radius: 5, controls: [{ x: 20, y: 20 }, { x: 60, y: 50 }] }])
ok('雕刻后样条处抬升', sculpted.sample(20, 20) > base.sample(20, 20) + 1)
ok('沟谷雕刻下切', applySculpt(base, [{ id: 's2', kind: 'valley', amplitude: 4, radius: 5, controls: [{ x: 20, y: 20 }, { x: 60, y: 50 }] }]).sample(20, 20) < base.sample(20, 20) - 1)
const stats0 = base.slopeDeg(24, 24)
ok('坡度在 0-90°', stats0 >= 0 && stats0 <= 90)
ok('曲率有限', Number.isFinite(base.curvature(24, 24)))

// 2. IDW 拟合
const pts = normalizePoints(parseCsv(SAMPLE_CSV))
const fitted = fitHeightfield(pts, 32, 32, { minX: 0, maxX: 100, minY: 0, maxY: 80 })
ok('IDW 拟合格网', fitted.h.length === 33 * 33 && Number.isFinite(fitted.h[500]))

// 3. GeoJSON 解析
const gj = { type: 'FeatureCollection', features: [
  { type: 'Feature', geometry: { type: 'Point', coordinates: [1, 2, 10] }, properties: {} },
  { type: 'Feature', geometry: { type: 'LineString', coordinates: [[0, 0, 5], [1, 1, 5], [2, 0, 5]] }, properties: {} },
] }
ok('GeoJSON 解析点数', parseGeoJson(JSON.stringify(gj)).length === 4)

// 4. 圈选多边形 → 单元 → 外轮廓
const lasso = [{ x: 20, y: 15 }, { x: 80, y: 15 }, { x: 80, y: 65 }, { x: 20, y: 65 }]
const cells = buildCells(sculpted, lasso)
ok('圈选命中单元', cells.size > 500)
const dx = sculpted.sx / sculpted.nx, dy = sculpted.sy / sculpted.ny
const contour = contourFromCells(cells, sculpted.bounds.minX, sculpted.bounds.minY, dx, dy)
ok('外轮廓为矩形 4 顶点', contour.length === 4)
ok('外轮廓无自交', selfIntersections(contour).length === 0)
ok('外轮廓逆时针(正面积)', polygon.area(contour) > 0)

// 5. 等距偏移
const off0 = offsetPolygon(contour, 1.0)
ok('小偏移无自交', off0.selfIntersections.length === 0 && !off0.degenerate)
ok('偏移后面积缩小', Math.abs(polygon.area(off0.poly)) < Math.abs(polygon.area(contour)))
const offBig = offsetPolygon(contour, 60)
ok('过大偏移退化', offBig.degenerate === true)

// 凹形多边形偏移自交（L 形，厚偏移 → 自交）
const L = [{ x: 0, y: 0 }, { x: 40, y: 0 }, { x: 40, y: 12 }, { x: 12, y: 12 }, { x: 12, y: 40 }, { x: 0, y: 40 }]
const offL = offsetPolygon(L, 8)
ok('L 形厚偏移检测到自交或退化', offL.selfIntersections.length > 0 || offL.degenerate)

// 6. 分块
const cutX = defaultCuts(0, 47, 3), cutY = defaultCuts(0, 47, 2)
const part = buildPartition(sculpted, cells, cutX, cutY)
ok('生成 6 个分块', part.blocks.length === 6)
ok('拼缝数 = (3-1)*2 + 3*(2-1) = 7', part.seams.length === 7)
// 无重叠
const all = new Set()
let overlap = 0
for (const b of part.blocks) for (const k of b.cells) { if (all.has(k)) overlap++; all.add(k) }
ok('分块无重叠', overlap === 0 && all.size === cells.size)
// 每块摊平
for (const b of part.blocks) {
  assert.ok(b.outline.length >= 3, b.id + ' 有摊平轮廓')
  assert.ok(b.flatWidth > 0 && b.flatHeight > 0)
  assert.ok(b.maxDistortion >= 0 && b.maxDistortion < 0.5, b.id + ' 失真合理: ' + b.maxDistortion)
  assert.ok(b.segments.length >= 4)
}
ok('所有块摊平有效', true)
// 拼缝指标
for (const s of part.seams) {
  assert.ok(s.planarLength > 0)
  assert.ok(s.maxHeightStep >= 0)
  assert.ok(s.surfaceLength >= s.planarLength - 1e-9)
  assert.ok(s.flatLengthA > 0 && s.flatLengthB > 0)
}
ok('拼缝边长/高差指标完整', true)

// 7. 检查（严重：幅面超限）
const checks = runChecks(part, sculpted, off0, { sheetW: 200, sheetH: 200, slopeLimit: 40 })
ok('小板材检出幅面严重问题', checks.issues.some((i) => i.code === 'SHEET_SIZE' && i.level === 'severe'))
const checks2 = runChecks(part, sculpted, off0, { sheetW: 40000, sheetH: 40000, slopeLimit: 90 })
ok('正常参数无严重问题', checks2.issues.every((i) => i.level !== 'severe'))
// 空范围
const empty = runChecks({ blocks: [], seams: [], outerContour: [], cells: new Set() }, sculpted, null, { sheetW: 1000, sheetH: 1000 })
ok('空范围报严重问题', empty.issues.some((i) => i.level === 'severe'))

// 8. 导出
const svg = blockSvg(part.blocks[0], part.seams, 1220, 2440)
ok('SVG 含 XML 头与块编号', svg.startsWith('<?xml') && svg.includes(part.blocks[0].id))
const bom = bomCsv(part, 0.8, '铝板')
ok('BOM 行数 = 块数+1', bom.split('\r\n').length === part.blocks.length + 1)
const sc = seamCsv(part)
ok('拼缝表行数 = 缝数+1', sc.split('\r\n').length === part.seams.length + 1)
const zip = buildZip([{ name: 'a.txt', content: 'hello' }, { name: 'b.svg', content: svg }])
ok('ZIP 本地头与 EOCD 签名', zip[0] === 0x50 && zip[1] === 0x4b && zip[zip.length - 22] === 0x50 && zip[zip.length - 21] === 0x4b && zip[zip.length - 20] === 0x05 && zip[zip.length - 19] === 0x06)

// 9. 松弛器退化输入
const r = relaxFlatten([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }],
  [{ i: 0, j: 1, len3D: 1 }, { i: 1, j: 2, len3D: 1 }, { i: 2, j: 0, len3D: Math.SQRT2 }], new Set([0, 1]), 50)
ok('松弛输出有限', r.pos.every((p) => Number.isFinite(p.x) && Number.isFinite(p.y)))

console.log(`\n全部 ${pass} 项断言通过 ✅`)
