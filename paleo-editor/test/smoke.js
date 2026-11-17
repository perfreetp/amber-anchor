/* 冒烟测试:node test/smoke.js(在 paleo-editor 目录运行) */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ctx = {
  console, TextEncoder, TextDecoder, performance,
  localStorage: { getItem: () => null, setItem: () => {} },
};
vm.createContext(ctx);
for (const f of ['math.js', 'meshes.js', 'core.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', f), 'utf8'), ctx, { filename: f });
}
vm.runInContext(`
// 演示项目
Store.load();
const p = Store.state.projects[0];
console.assert(p.bones.length === 11, '骨骼数应为 11,实际 ' + p.bones.length);
console.assert(p.parts.length === 11, '部件数应为 11');

// 蒙皮归一化
for (const part of p.parts) {
  const bad = SKEL.badVertices(p, part.id);
  console.assert(bad === 0, part.name + ' 有 ' + bad + ' 个未归一化顶点');
}

// 世界矩阵与关节矩阵
const { world, jm } = SKEL.jointMatrices(p, p.tracks, 0);
console.assert(Object.keys(world).length === 11, '世界矩阵数量');
const pelvis = p.bones.find(b => b.name === '骨盆');
const pos = PM.m4.xformPoint(world[pelvis.id], [0,0,0]);
console.assert(Math.abs(pos[1] - 2.6) < 1e-4 && Math.abs(pos[2] + 0.8) < 1e-4, '骨盆枢轴应在 [0,2.6,-0.8],实际 ' + pos);

// 限位:股骨 x 限位 [-120,10]
const femur = p.bones.find(b => b.name === '股骨.L');
console.assert(SKEL.applyLimits(femur, [30,0,0])[0] === 10, '限位应钳制到 10');
console.assert(SKEL.applyLimits(femur, [-200,0,0])[0] === -120, '限位应钳制到 -120');

// 步态生成与 +12 帧复制
GAIT.generate(p, femur.id);
GAIT.copyTo(p, femur.id, p.bones.find(b=>b.name==='股骨.R').id, 12);
const rxL = p.tracks[femur.id].r.x, rxR = p.tracks[p.bones.find(b=>b.name==='股骨.R').id].r.x;
console.assert(rxL.length === 5 && rxR.length === 5, '步态关键帧数');
console.assert(Math.abs(rxR[0].f - rxL[0].f - 12) < 1e-9, '复制应偏移 12 帧');
const v0 = ANIM.evalChannel(rxL, 0), v12 = ANIM.evalChannel(rxR, 12);
console.assert(Math.abs(v0 - v12) < 1e-6, '偏移后同相位值应相等:' + v0 + ' vs ' + v12);

// 贝塞尔手柄
const keys = [{f:0,v:0,hi:[0,0],ho:[0,0]},{f:24,v:24,hi:[0,0],ho:[0,0]}];
console.assert(Math.abs(ANIM.evalChannel(keys, 12) - 12) < 0.01, '自动手柄应近似线性');
keys[0].ho = [8, 20]; // 快出
const eased = ANIM.evalChannel(keys, 6);
console.assert(eased > 6, '快出手柄应使前段值偏大,实际 ' + eased);

// 动画求值 + 限位联动
const pose = ANIM.evalBone(p.tracks, femur.id, 12, SKEL.defPose(femur));
console.assert(pose.r[0] <= 10.0001, '求值应被限位钳制,实际 ' + pose.r[0]);

// 归一化修复
const part = p.parts[0];
const sk = p.skins[part.id];
sk.wv[0] = 2.0; // 破坏归一化
console.assert(SKEL.badVertices(p, part.id) === 1, '应检出 1 个坏顶点');
console.assert(SKEL.normalizePart(p, part.id) === 1, '应修复 1 个');
console.assert(SKEL.badVertices(p, part.id) === 0, '修复后应为 0');

// 版本快照与回滚
saveVersion(p, '测试版');
p.frameCount = 48;
restoreVersion(p, p.versions[0].id);
console.assert(p.frameCount === 96, '回滚应恢复帧数');

// OBJ 解析
const mesh = MESH.parseOBJ('v 0 0 0\\nv 1 0 0\\nv 0 1 0\\nf 1 2 3');
console.assert(mesh.pos.length === 9 && mesh.idx.length === 3, 'OBJ 解析');

console.log('全部冒烟测试通过 ✓');
`, ctx, { filename: 'smoke' });
