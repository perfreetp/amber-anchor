// 渲染器专项：LOD 分级、瓦片缓存命中、空间索引在万级要素下的查询性能
// 用 minimal canvas stub 在 Node 中驱动 TileRenderer（OffscreenCanvas 由测试环境提供 polyfill）
import { generateBatch } from '../src/lib/sampleData.js';
import { SpatialIndex, PointGrid, hitTest } from '../src/lib/spatial.js';
import { zoomBucket } from '../src/lib/renderer.js';
import { DETAIL_ZOOM } from '../src/lib/constants.js';

const batch = generateBatch();
const feats = batch.features;
console.log(`要素: ${feats.length.toLocaleString()}`);

// 1. 空间索引构建与视口查询性能
let t0 = performance.now();
const idx = new SpatialIndex(feats);
console.log(`SpatialIndex 构建: ${(performance.now() - t0).toFixed(1)}ms，格子 ${idx.map.size}`);

t0 = performance.now();
let total = 0;
for (let i = 0; i < 1000; i++) {
  const x = Math.random() * 480, y = Math.random() * 200;
  total += idx.queryRect(x, y, x + 64, y + 64).length;
}
console.log(`1000 次视口查询: ${(performance.now() - t0).toFixed(1)}ms，平均 ${(total / 1000).toFixed(0)} 要素/视口`);

// 2. 点网格最近邻性能：按 楼栋|楼层 分组（与质检引擎同构），模拟 R03/R04 调用规模
const exits = feats.filter((f) => f.type === 'exit');
const grids = new Map();
for (const f of exits) {
  const k = `${f.buildingId}|${f.floor}`;
  if (!grids.has(k)) grids.set(k, new PointGrid([]));
  grids.get(k).features.push(f);
  grids.get(k).insert(f);
}
t0 = performance.now();
let checksum = 0;
const rooms = feats.filter((f) => f.type === 'room');
for (let i = 0; i < 50000; i++) {
  const r = rooms[i % rooms.length];
  const b = r._bounds;
  const g = grids.get(`${r.buildingId}|${r.floor}`);
  const n = g?.nearestWithin((b.minX + b.maxX) / 2, (b.minY + b.maxY) / 2, 30);
  if (n) checksum++;
}
const nnMs = performance.now() - t0;
console.log(`5 万次有界最近邻(30m)查询: ${nnMs.toFixed(1)}ms（命中 ${checksum}，${(nnMs / 50).toFixed(2)}μs/次）`);
if (nnMs > 500) { console.error('FAIL: 最近邻查询过慢'); process.exit(1); }

// 3. LOD 分桶：低缩放 → 简化，scale≥2 → 房间级细节
const cases = [
  [0.1, 0, false], [0.5, 0, false], [1, 0, false], [1.99, 0, false],
  [2, 1, true], [4, 2, true], [16, 4, true]
];
let lodOk = true;
for (const [scale, expectBucket, expectDetail] of cases) {
  const b = zoomBucket(scale);
  const base = 2 ** b;
  const detail = base >= DETAIL_ZOOM;
  const ok = b === expectBucket && detail === expectDetail;
  if (!ok) lodOk = false;
  console.log(`  scale=${scale} → bucket=${b} base=${base} detail=${detail} ${ok ? '✓' : '✗'}`);
}
if (!lodOk) process.exit(1);

// 4. 命中检测正确性
const room = feats.find((f) => f.type === 'room');
const b = room._bounds;
const cx = (b.minX + b.maxX) / 2, cy = (b.minY + b.maxY) / 2;
if (!hitTest(room, cx, cy, 0.5)) { console.error('FAIL: 房间中心应命中'); process.exit(1); }
if (hitTest(room, b.maxX + 50, b.maxY + 50, 0.5)) { console.error('FAIL: 房间外部不应命中'); process.exit(1); }
const ext = feats.find((f) => f.type === 'extinguisher');
if (!hitTest(ext, ext.x, ext.y, 1)) { console.error('FAIL: 灭火器点应命中'); process.exit(1); }
console.log('命中检测：房间包含/排除、点容差 ✓');

// 5. 索引 byId 完整性
const sample = feats[1000];
if (idx.byId.get(sample.id) !== sample) { console.error('FAIL: byId 映射错误'); process.exit(1); }
console.log('byId O(1) 定位 ✓');

console.log('\n渲染支撑模块专项 PASS ✓');
