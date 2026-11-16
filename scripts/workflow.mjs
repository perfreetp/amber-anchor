import { sampleTerrain, applySculpt } from '../src/lib/terrain.js'
import { buildCells, buildPartition, defaultCuts } from '../src/lib/partition.js'
import { offsetPolygon, contourFromCells } from '../src/lib/polygon.js'
import { runChecks, batchStatus } from '../src/lib/checks.js'
import { blockSvg, nestingSvg, bomCsv, seamCsv, buildZip } from '../src/lib/exporter.js'
import assert from 'node:assert/strict'

// 模拟 App 的完整工作流
const hf = applySculpt(sampleTerrain(64, 64), [
  { id: 's1', kind: 'ridge', amplitude: 5, radius: 4, controls: [{ x: 15, y: 55 }, { x: 55, y: 30 }, { x: 85, y: 20 }] },
  { id: 's2', kind: 'valley', amplitude: 3, radius: 3, controls: [{ x: 25, y: 20 }, { x: 50, y: 45 }] },
])
const lasso = [{ x: 18, y: 18 }, { x: 82, y: 14 }, { x: 86, y: 62 }, { x: 30, y: 68 }, { x: 14, y: 44 }]
const cells = buildCells(hf, lasso)
assert.ok(cells.size > 400)

const dx = hf.sx / hf.nx, dy = hf.sy / hf.ny
const contour = contourFromCells(cells, 0, 0, dx, dy)
assert.ok(contour.length >= 5) // 非矩形轮廓

// 厚度滑块扫一遍，验证自交/退化状态机
const states = []
for (const t of [0.3, 0.8, 1.5, 2.5, 4, 8]) {
  const o = offsetPolygon(contour, t)
  states.push({ t, bad: o.selfIntersections.length > 0 || o.degenerate, hits: o.selfIntersections.length, degen: o.degenerate })
}
console.log('厚度扫描:', states.map((s) => `t=${s.t}→${s.bad ? '红' : '绿'}(交${s.hits}${s.degen ? '/退化' : ''})`).join(' '))
assert.ok(states[0].bad === false && states[states.length - 1].bad === true)

// 分缝位置手动调整（模拟 nudgeCut）
const cutX = defaultCuts(0, 63, 4), cutY = defaultCuts(0, 63, 3)
const moved = cutX.map((v, i) => (i === 2 ? v + 3 : v))
const p1 = buildPartition(hf, cells, cutX, cutY)
const p2 = buildPartition(hf, cells, moved, cutY)
assert.equal(p1.blocks.length, p2.blocks.length)
assert.notDeepEqual(p1.seams.map((s) => s.planarLength), p2.seams.map((s) => s.planarLength))
console.log(`分缝调整：${p1.blocks.length} 块 / ${p1.seams.length} 缝，调整后缝长变化已生效`)

// 拼缝双向对应：每条缝的两个块都能反查到
for (const s of p1.seams) {
  const inA = p1.blocks.find((b) => b.id === s.blockA).segments.some((q) => q.seamId === s.id)
  const inB = p1.blocks.find((b) => b.id === s.blockB).segments.some((q) => q.seamId === s.id)
  assert.ok(inA && inB, s.id + ' 两侧对应关系完整')
}

// 批次：严重问题 → 复核确认 → 退回；全驳回 → 放行
const off = offsetPolygon(contour, 0.8)
const result = runChecks(p1, hf, off, { sheetW: 1220, sheetH: 2440, slopeLimit: 40 })
console.log(`批次检查：${result.severe} 严重 / ${result.reminder} 提醒`)

// 场景 A：存在未处理项 → reviewing；确认后整批 → 退回
let issues = result.issues.map((i) => ({ ...i }))
assert.equal(batchStatus(issues), 'reviewing')
issues[0].status = 'confirmed'
assert.equal(batchStatus(issues), 'reviewing') // 仍有其他待处理项
issues = result.issues.map((i) => ({ ...i, status: i.level === 'severe' ? 'confirmed' : 'dismissed' }))
assert.equal(batchStatus(issues), 'rework')

// 场景 C：全部驳回（误报）→ 放行
issues = result.issues.map((i) => ({ ...i, status: 'dismissed' }))
assert.equal(batchStatus(issues), 'releasable')

// 场景 D：无问题批次
const clean = runChecks(p1, hf, off, { sheetW: 100000, sheetH: 100000, slopeLimit: 90, distortionLimit: 1 })
assert.equal(clean.issues.filter((i) => i.level === 'severe').length, 0)
assert.equal(batchStatus(clean.issues), 'releasable')

// 放行导出包完整性
const files = [
  ...p1.blocks.map((b) => ({ name: `${b.id}.svg`, content: blockSvg(b, p1.seams, 1220, 2440) })),
  { name: '拼版总图.svg', content: nestingSvg(p1, 1220, 2440) },
  { name: '物料清单.csv', content: bomCsv(p1, 0.8, '浮雕铝板 3mm') },
  { name: '拼缝对应表.csv', content: seamCsv(p1) },
]
const zip = buildZip(files)
assert.ok(zip.length > 2000)
for (const b of p1.blocks) {
  const svg = blockSvg(b, p1.seams, 1220, 2440)
  assert.ok(svg.includes(b.id) && svg.includes('mm') && svg.includes('拼缝对应'))
}
console.log(`导出包：${files.length} 个文件，${(zip.length / 1024).toFixed(1)} KB`)
console.log('\n工作流集成测试全部通过 ✅')
