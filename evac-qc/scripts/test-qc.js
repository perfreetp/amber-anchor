// 质检引擎与样例数据的 Node 侧验证（不依赖 DOM）
import { generateBatch } from '../src/lib/sampleData.js';
import { runChecks, evaluateBatch, RULES } from '../src/lib/qc.js';

const t0 = performance.now();
const batch = generateBatch();
const t1 = performance.now();
const issues = runChecks(batch.features);
const t2 = performance.now();

const byRule = {};
const bySev = { fatal: 0, major: 0, minor: 0, info: 0 };
for (const i of issues) {
  byRule[i.rule] = (byRule[i.rule] || 0) + 1;
  bySev[i.severity]++;
}

console.log(`要素总数: ${batch.features.length.toLocaleString()}（生成 ${(t1 - t0).toFixed(0)}ms）`);
console.log(`质检耗时: ${(t2 - t1).toFixed(0)}ms，问题 ${issues.length} 条`);
console.log('严重度分布:', bySev);
console.log('规则覆盖:');
for (const code of Object.keys(RULES)) {
  console.log(`  ${code} ${RULES[code].name.padEnd(22)} ${byRule[code] ? '✓ ' + byRule[code] + ' 条' : '✗ 未触发'}`);
}

const missing = Object.keys(RULES).filter((c) => !byRule[c]);
if (missing.length) {
  console.error('FAIL: 以下规则未触发:', missing.join(', '));
  process.exit(1);
}
if (issues.length > 80) {
  console.error(`FAIL: 问题数 ${issues.length} 过多，疑似规则产生噪声`);
  process.exit(1);
}

// 复核闭环测试：全部驳回 → 放行；全部确认 → 拦截；未复核完 → reviewing
const rejected = issues.map((i) => ({ ...i, status: 'rejected' }));
const ev1 = evaluateBatch(rejected);
console.log('全部驳回 =>', ev1.status, '|', ev1.conclusion);
if (ev1.status !== 'released') { console.error('FAIL: 全部驳回应放行'); process.exit(1); }

const confirmed = issues.map((i) => ({ ...i, status: 'confirmed' }));
const ev2 = evaluateBatch(confirmed);
console.log('全部确认 =>', ev2.status, '|', ev2.conclusion);
if (ev2.status !== 'hold') { console.error('FAIL: 全部确认应不予放行'); process.exit(1); }

// 只确认一般/提示级（无致命/严重拦截项），其余驳回 → 仍可放行
const minorOnly = issues.map((i) => ({
  ...i,
  status: (i.severity === 'minor' || i.severity === 'info') ? 'confirmed' : 'rejected'
}));
const ev3 = evaluateBatch(minorOnly);
console.log('仅确认一般/提示 =>', ev3.status, '|', ev3.conclusion);
if (ev3.status !== 'released') { console.error('FAIL: 无致命/严重确认项应放行'); process.exit(1); }

// 留一条待复核 → reviewing
const withPending = issues.map((i, idx) => ({ ...i, status: idx === 0 ? 'pending' : 'rejected' }));
const ev4 = evaluateBatch(withPending);
console.log('存在待复核 =>', ev4.status, '|', ev4.conclusion);
if (ev4.status !== 'reviewing') { console.error('FAIL: 未复核完应为 reviewing'); process.exit(1); }

// 关联出口范围：B03-F01 的重号 F01-E01 只应关联到同楼栋同楼层的另一处，
// 不能把其他楼栋同样叫 F01-E01 的出口卷进来（与 store.findLinkedExits 同语义）
{
  const dup = batch.features.filter((f) =>
    f.type === 'exit' && f.buildingId === 'B03' && f.floor === 'F01' && f.exitNo === 'F01-E01');
  if (dup.length !== 2) { console.error('FAIL: B03-F01 应有两个 F01-E01'); process.exit(1); }
  const scopes = new Set(dup.map((f) => `${f.buildingId}|${f.floor}`));
  const nos = new Set(dup.map((f) => f.exitNo));
  const linked = batch.features.filter((f) =>
    f.type === 'exit' && nos.has(f.exitNo) && scopes.has(`${f.buildingId}|${f.floor}`));
  if (linked.length !== 2 || linked.some((f) => f.buildingId !== 'B03')) {
    console.error('FAIL: 关联出口越界，实际:', linked.map((f) => f.id));
    process.exit(1);
  }
  console.log('关联出口限定同楼栋同楼层 ✓（', linked.length, '处）');
}

console.log('\nPASS ✓');
