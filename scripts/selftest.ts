// 核心逻辑自检：确定性、锁定保留、预览降级、统计与差异
import { generateModel, collectKeptReaches, updateReachNode, setReachLocked } from '../src/core/generator';
import { computeStats } from '../src/core/stats';
import { diffModels } from '../src/core/diff';
import { buildCrossSection } from '../src/core/profile';
import type { GenParams } from '../src/types';

let pass = 0;
let fail = 0;
function check(name: string, cond: boolean, extra = '') {
  if (cond) {
    pass++;
    console.log(`  ✓ ${name}`);
  } else {
    fail++;
    console.error(`  ✗ ${name} ${extra}`);
  }
}

const params: GenParams = {
  apexX: 0,
  apexY: 0,
  radius: 1800,
  slope: 2.4,
  mainWidth: 46,
  branchLevels: 2,
  seed: 20261117
};

console.log('1) 确定性：同种子同参数两次生成必须逐点一致');
const a = generateModel({ ...params }).model;
const b = generateModel({ ...params }).model;
check('reach 数量一致', a.reaches.length === b.reaches.length);
check('结构 id 序列一致', a.reaches.every((r, i) => r.id === b.reaches[i].id));
check('节点几何 JSON 完全一致', JSON.stringify(a.reaches.map((r) => r.nodes)) === JSON.stringify(b.reaches.map((r) => r.nodes)));

console.log('2) 种子敏感性：换种子必须产生不同几何，但结构 id 不变');
const c = generateModel({ ...params, seed: params.seed + 1 }).model;
check('结构 id 仍一致', c.reaches.every((r, i) => r.id === a.reaches[i].id));
check('几何发生变化', JSON.stringify(c.reaches.map((r) => r.nodes)) !== JSON.stringify(a.reaches.map((r) => r.nodes)));

console.log('3) 超 3000 段自动降预览精度');
const big = generateModel({ ...params, radius: 3600, branchLevels: 4 });
check('标记 degraded', big.degraded === true);
check('模型精度为 preview', big.model.precision === 'preview');
check('预览段数落回 3000 预算内', big.model.segmentCount <= 3000, `实际 ${big.model.segmentCount}`);
const small = generateModel({ ...params });
check('常规参数保持全精度', small.model.precision === 'full');
check('常规参数段数 < 3000', small.model.segmentCount <= 3000);

console.log('4) 锁定段 + 下游手改段在参数重算后原地保留');
const work = generateModel({ ...params }).model;
const main = work.reaches.find((r) => r.id === 'river:main')!;
updateReachNode(work, main.id, 5, 123, 456);
setReachLocked(work, main.id, true);
const lockedSnapshot = JSON.stringify(work.reaches.find((r) => r.id === main.id)!.nodes);
const keep = collectKeptReaches(work);
check('保留集包含锁定主河', keep.has('river:main'));
const regen = generateModel({ ...params, radius: 2200, mainWidth: 60 }, { keep }).model;
const keptMain = regen.reaches.find((r) => r.id === 'river:main')!;
check('锁定段节点逐点不变', JSON.stringify(keptMain.nodes) === lockedSnapshot);
check('锁定段仍标记 locked', keptMain.locked === true);
const unlocked = regen.reaches.find((r) => r.id === 'canal:main:L')!;
const oldLeft = a.reaches.find((r) => r.id === 'canal:main:L')!;
check('未锁定段按新参数重排', JSON.stringify(unlocked.nodes) !== JSON.stringify(oldLeft.nodes));

console.log('5) 下游手改段随锁定祖先保留');
const child = work.reaches.find((r) => r.parentId === 'river:main')!;
updateReachNode(work, child.id, 2, 321, 654);
const keep2 = collectKeptReaches(work);
check('下游手改段进入保留集', keep2.has(child.id));

console.log('6) 统计指标合理');
const stats = computeStats(a);
check('总长 = 河道 + 渠系', Math.abs(stats.totalLength - (stats.riverLength + stats.canalLength)) < 1e-6);
check('渠系密度为正', stats.canalDensity > 0);
check('扇面面积为正', stats.fanArea > 0);
check('reach 数与模型一致', stats.reachCount === a.reaches.length);

console.log('7) 版本差异对比');
const d = diffModels(a, c);
check('差异覆盖全部 id', d.length === a.reaches.length);
check('存在 modified 段', d.some((x) => x.status === 'modified'));
const selfDiff = diffModels(a, generateModel({ ...params }).model);
check('同参数对比全部 unchanged', selfDiff.every((x) => x.status === 'unchanged'));

console.log('8) 横断面采样');
const sec = buildCrossSection(a, { x: -900, y: 900 }, { x: 900, y: 900 });
check('采样点数量充足', sec.samples.length > 50);
check('地面高程有起伏', new Set(sec.samples.map((s) => s.ground.toFixed(2))).size > 2);
check('能采到水面', sec.samples.some((s) => s.water !== null));
check('水面高于局部地面', sec.samples.filter((s) => s.water !== null).every((s) => s.water! >= s.ground - 0.01));

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
if (fail) process.exit(1);
