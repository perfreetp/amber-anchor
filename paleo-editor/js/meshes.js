/* 化石部件网格:程序化生成 + OBJ 导入。网格格式 {pos:[], nrm:[], idx:[]} */
'use strict';
const MESH = {};

MESH.merge = function (parts) {
  const pos = [], nrm = [], idx = [];
  for (const p of parts) {
    const base = pos.length / 3;
    pos.push(...p.pos); nrm.push(...p.nrm);
    for (const i of p.idx) idx.push(base + i);
  }
  return { pos, nrm, idx };
};

MESH.xform = function (mesh, m) {
  const pos = [], nrm = [];
  for (let i = 0; i < mesh.pos.length; i += 3) {
    const p = PM.m4.xformPoint(m, [mesh.pos[i], mesh.pos[i+1], mesh.pos[i+2]]);
    const n = PM.v3.norm(PM.m4.xformDir(m, [mesh.nrm[i], mesh.nrm[i+1], mesh.nrm[i+2]]));
    pos.push(...p); nrm.push(...n);
  }
  return { pos, nrm, idx: mesh.idx.slice() };
};

// 椭球
MESH.ellipsoid = function (rx, ry, rz, seg = 12, rings = 8) {
  const pos = [], nrm = [], idx = [];
  for (let r = 0; r <= rings; r++) {
    const phi = r / rings * Math.PI;
    for (let s = 0; s <= seg; s++) {
      const th = s / seg * Math.PI * 2;
      const nx = Math.sin(phi) * Math.cos(th), ny = Math.cos(phi), nz = Math.sin(phi) * Math.sin(th);
      pos.push(nx * rx, ny * ry, nz * rz);
      nrm.push(...PM.v3.norm([nx / rx, ny / ry, nz / rz]));
    }
  }
  for (let r = 0; r < rings; r++) for (let s = 0; s < seg; s++) {
    const a = r * (seg + 1) + s, b = a + seg + 1;
    idx.push(a, b, a + 1, b, b + 1, a + 1);
  }
  return { pos, nrm, idx };
};

// 锥台圆柱(沿 Y 轴),骨骼骨干
MESH.tube = function (len, r0, r1, seg = 10) {
  const pos = [], nrm = [], idx = [];
  const n = 6;
  for (let i = 0; i <= n; i++) {
    const t = i / n, y = t * len;
    const r = r0 + (r1 - r0) * t;
    for (let s = 0; s <= seg; s++) {
      const th = s / seg * Math.PI * 2;
      const c = Math.cos(th), sn = Math.sin(th);
      pos.push(c * r, y, sn * r);
      nrm.push(c, 0, sn);
    }
  }
  for (let i = 0; i < n; i++) for (let s = 0; s < seg; s++) {
    const a = i * (seg + 1) + s, b = a + seg + 1;
    idx.push(a, a + 1, b, b, a + 1, b + 1);
  }
  // 端帽
  const capBase = pos.length / 3;
  pos.push(0, 0, 0, 0, len, 0); nrm.push(0, -1, 0, 0, 1, 0);
  for (let s = 0; s < seg; s++) {
    idx.push(capBase, s + 1, s);
    const top = n * (seg + 1);
    idx.push(capBase + 1, top + s, top + s + 1);
  }
  return { pos, nrm, idx };
};

// 长骨(肱骨/股骨):骨干 + 两端髁
MESH.limbBone = function (len, r) {
  const shaft = MESH.tube(len, r, r * 0.8, 10);
  const c1 = MESH.xform(MESH.ellipsoid(r * 1.6, r * 1.3, r * 1.6, 10, 6), PM.m4.translate(0, 0, 0));
  const c2 = MESH.xform(MESH.ellipsoid(r * 1.4, r * 1.2, r * 1.4, 10, 6), PM.m4.translate(0, len, 0));
  return MESH.merge([shaft, c1, c2]);
};

// 颅骨:颅腔 + 吻部 + 颧弓
MESH.skull = function () {
  const cranium = MESH.xform(MESH.ellipsoid(0.55, 0.5, 0.7, 14, 9), PM.m4.translate(0, 0.1, -0.3));
  const snout = MESH.xform(MESH.ellipsoid(0.32, 0.3, 0.85, 12, 8), PM.m4.translate(0, -0.05, 0.75));
  const jaw = MESH.xform(MESH.ellipsoid(0.26, 0.14, 0.7, 10, 6), PM.m4.translate(0, -0.38, 0.55));
  const browL = MESH.xform(MESH.ellipsoid(0.16, 0.12, 0.2, 8, 5), PM.m4.translate(0.3, 0.32, 0.25));
  const browR = MESH.xform(MESH.ellipsoid(0.16, 0.12, 0.2, 8, 5), PM.m4.translate(-0.3, 0.32, 0.25));
  return MESH.merge([cranium, snout, jaw, browL, browR]);
};

// 颈椎:椎体 + 棘突 + 横突
MESH.vertebra = function (s = 1) {
  const body = MESH.tube(0.5 * s, 0.22 * s, 0.24 * s, 10);
  const spin = MESH.xform(MESH.ellipsoid(0.06 * s, 0.3 * s, 0.12 * s, 8, 5),
    PM.m4.translate(0, 0.25 * s, 0.35 * s));
  const trL = MESH.xform(MESH.ellipsoid(0.2 * s, 0.05 * s, 0.08 * s, 8, 5),
    PM.m4.translate(0.22 * s, 0.1 * s, 0.25 * s));
  const trR = MESH.xform(MESH.ellipsoid(0.2 * s, 0.05 * s, 0.08 * s, 8, 5),
    PM.m4.translate(-0.22 * s, 0.1 * s, 0.25 * s));
  const rot = PM.m4.fromQuat(PM.quat.fromEuler([0, 0, -90]));
  return MESH.xform(MESH.merge([body, spin, trL, trR]), rot); // 椎体沿 Z
};

// 肩胛:扁平板状 + 肩峰
MESH.scapula = function () {
  const blade = MESH.xform(MESH.ellipsoid(0.1, 0.7, 0.45, 10, 7), PM.m4.translate(0, 0.3, 0));
  const ridge = MESH.xform(MESH.ellipsoid(0.08, 0.6, 0.08, 8, 5), PM.m4.translate(0.08, 0.3, 0));
  const socket = MESH.xform(MESH.ellipsoid(0.18, 0.2, 0.2, 8, 5), PM.m4.translate(0, -0.35, 0));
  return MESH.merge([blade, ridge, socket]);
};

// 躯干(胸腔)
MESH.ribcage = function () {
  const body = MESH.ellipsoid(0.85, 0.8, 1.5, 16, 10);
  const parts = [body];
  for (let i = 0; i < 5; i++) {
    const z = -0.9 + i * 0.45;
    parts.push(MESH.xform(MESH.ellipsoid(0.92, 0.1, 0.12, 10, 5), PM.m4.translate(0, -0.1, z)));
  }
  return MESH.merge(parts);
};

// 骨盆
MESH.pelvis = function () {
  const iliumL = MESH.xform(MESH.ellipsoid(0.12, 0.5, 0.55, 10, 6), PM.m4.translate(0.35, 0.2, 0));
  const iliumR = MESH.xform(MESH.ellipsoid(0.12, 0.5, 0.55, 10, 6), PM.m4.translate(-0.35, 0.2, 0));
  const sacrum = MESH.xform(MESH.ellipsoid(0.3, 0.25, 0.5, 10, 6), PM.m4.translate(0, 0, 0));
  return MESH.merge([iliumL, iliumR, sacrum]);
};

MESH.TEMPLATES = {
  '颅骨':   { make: () => MESH.skull(),            cat: '颅骨' },
  '颈椎':   { make: () => MESH.vertebra(1),        cat: '颈椎' },
  '肩胛':   { make: () => MESH.scapula(),          cat: '肩胛' },
  '肱骨':   { make: () => MESH.limbBone(1.6, 0.14),cat: '肱骨' },
  '股骨':   { make: () => MESH.limbBone(2.0, 0.18),cat: '股骨' },
  '躯干':   { make: () => MESH.ribcage(),          cat: '躯干' },
  '骨盆':   { make: () => MESH.pelvis(),         cat: '骨盆' },
};

// OBJ 导入(化石扫描件):解析 v/f,三角扇形展开,重算法线
MESH.parseOBJ = function (text) {
  const vs = [], pos = [], idx = [];
  const map = new Map();
  for (const line of text.split('\n')) {
    const t = line.trim().split(/\s+/);
    if (t[0] === 'v') vs.push([+t[1], +t[2], +t[3]]);
    else if (t[0] === 'f') {
      const face = t.slice(1).map(tok => {
        const i = parseInt(tok.split('/')[0], 10);
        const vi = i > 0 ? i - 1 : vs.length + i;
        if (!map.has(vi)) { map.set(vi, pos.length / 3); pos.push(...vs[vi]); }
        return map.get(vi);
      });
      for (let i = 1; i < face.length - 1; i++) idx.push(face[0], face[i], face[i + 1]);
    }
  }
  if (!pos.length || !idx.length) throw new Error('OBJ 中没有几何数据');
  // 居中并归一化到约 2 单位
  let min = [1e9, 1e9, 1e9], max = [-1e9, -1e9, -1e9];
  for (let i = 0; i < pos.length; i += 3) for (let a = 0; a < 3; a++) {
    min[a] = Math.min(min[a], pos[i + a]); max[a] = Math.max(max[a], pos[i + a]);
  }
  const c = min.map((v, i) => (v + max[i]) / 2);
  const sc = 2 / Math.max(max[0] - min[0], max[1] - min[1], max[2] - min[2], 1e-6);
  for (let i = 0; i < pos.length; i += 3) for (let a = 0; a < 3; a++) pos[i + a] = (pos[i + a] - c[a]) * sc;
  // 重算面法线累积
  const nrm = new Array(pos.length).fill(0);
  for (let i = 0; i < idx.length; i += 3) {
    const [a, b, c2] = [idx[i] * 3, idx[i + 1] * 3, idx[i + 2] * 3];
    const ab = [pos[b] - pos[a], pos[b + 1] - pos[a + 1], pos[b + 2] - pos[a + 2]];
    const ac = [pos[c2] - pos[a], pos[c2 + 1] - pos[a + 1], pos[c2 + 2] - pos[a + 2]];
    const n = PM.v3.cross(ab, ac);
    for (const v of [a, b, c2]) { nrm[v] += n[0]; nrm[v + 1] += n[1]; nrm[v + 2] += n[2]; }
  }
  for (let i = 0; i < nrm.length; i += 3) {
    const n = PM.v3.norm([nrm[i], nrm[i + 1], nrm[i + 2]]);
    nrm[i] = n[0]; nrm[i + 1] = n[1]; nrm[i + 2] = n[2];
  }
  return { pos, nrm, idx };
};
