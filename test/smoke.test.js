import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import {
  project, screenToWorld, obbIntersect, snap, depthKey, footprintCorners,
} from '../src/engine/isoMath.js'
import { makeItem } from '../src/engine/catalog.js'
import { computeConflicts } from '../src/engine/conflict.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

// 0. 静态守卫：所有 drawBox 调用首参必须是 ctx，第二参才是物件（历史上写反导致渲染崩溃）
const rendererSrc = readFileSync(join(__dirname, '../src/engine/renderer.js'), 'utf8')
const badDrawBox = rendererSrc.match(/drawBox\(\s*(?!ctx\b)[a-zA-Z_$][\w$]*\s*,/g)
assert.equal(badDrawBox, null, `drawBox 首参必须是 ctx，发现: ${JSON.stringify(badDrawBox)}`)

// 1. 投影/反投影互逆
const cam = { x: 120, y: 80, zoom: 1.3 }
const w = { x: 12.5, y: 7.25 }
const p = project(w.x, w.y, 0, cam)
const back = screenToWorld(p.x, p.y, cam)
assert.ok(Math.abs(back.x - w.x) < 1e-9 && Math.abs(back.y - w.y) < 1e-9, '投影逆变换')

// 2. 0.5 米吸附
assert.equal(snap(1.23), 1.0)
assert.equal(snap(1.3), 1.5)
assert.equal(snap(0.25), 0.5)

// 3. 两个重叠帐篷应碰撞，拉开后不碰撞
const a = makeItem('tent', 10, 10)
const b = makeItem('tent', 12, 10) // 4x4 帐篷，中心距 2m，必重叠
assert.equal(obbIntersect(a, b), true, '重叠 OBB 应相交')
b.x = 20
assert.equal(obbIntersect(a, b), false, '分离 OBB 不相交')

// 4. 正方形物件旋转 90 度后角点集合一致（覆盖同四个世界点）
const c = makeItem('tent', 5, 5)
const c90 = { ...c, rotation: 90 }
const pts0 = footprintCorners(c).map((q) => `${q.x.toFixed(2)},${q.y.toFixed(2)}`).sort()
const pts90 = footprintCorners(c90).map((q) => `${q.x.toFixed(2)},${q.y.toFixed(2)}`).sort()
assert.deepEqual(pts0, pts90, '90度旋转角点集合不变（中心对称矩形）')

// 5. 深度键：y 更大（靠南）的物件更靠前
const near = makeItem('sign', 5, 20)
const far = makeItem('sign', 5, 5)
assert.ok(depthKey(near) > depthKey(far), '深度排序方向')

// 6. computeConflicts 返回冲突对 id
const list = [
  makeItem('stand', 10, 10),
  makeItem('stand', 11, 10),
  makeItem('stand', 30, 30),
]
const visible = new Set(['tent', 'equipment', 'stand', 'sign'])
const cf = computeConflicts(list, visible)
assert.equal(cf.length, 1)
assert.equal(cf[0].a, list[0].id)
assert.equal(cf[0].b, list[1].id)

// 7. 隐藏类型不参与冲突
const visible2 = new Set(['tent', 'equipment', 'sign'])
assert.equal(computeConflicts(list, visible2).length, 0)

console.log('smoke tests passed ✓')
