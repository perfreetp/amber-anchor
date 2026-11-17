/* 核心:数据模型、骨骼求值、动画曲线、蒙皮权重、项目存储 */
'use strict';

const uid = () => 'id' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const deepClone = o => JSON.parse(JSON.stringify(o));

/* ============ 动画曲线 ============ */
const ANIM = {
  // key: {f, v, hi:[df,dv], ho:[df,dv]};hi/ho 为 [0,0] 时自动(1/3 段长)
  evalChannel(keys, f) {
    if (!keys || !keys.length) return 0;
    if (f <= keys[0].f) return keys[0].v;
    const last = keys[keys.length - 1];
    if (f >= last.f) return last.v;
    let i = 0;
    while (i < keys.length - 1 && keys[i + 1].f <= f) i++;
    const k0 = keys[i], k1 = keys[i + 1];
    const span = k1.f - k0.f || 1;
    const ho = (k0.ho && (k0.ho[0] || k0.ho[1])) ? k0.ho : [span / 3, 0];
    const hi = (k1.hi && (k1.hi[0] || k1.hi[1])) ? k1.hi : [-span / 3, 0];
    // 三次贝塞尔:x=帧,y=值;先对 x 求参数 t(二分)
    const x0 = k0.f, x1 = k0.f + ho[0], x2 = k1.f + hi[0], x3 = k1.f;
    let lo = 0, hiT = 1, t = (f - x0) / span;
    for (let it = 0; it < 20; it++) {
      const mt = 1 - t;
      const x = mt*mt*mt*x0 + 3*mt*mt*t*x1 + 3*mt*t*t*x2 + t*t*t*x3;
      if (Math.abs(x - f) < 1e-4) break;
      if (x < f) lo = t; else hiT = t;
      t = (lo + hiT) / 2;
    }
    const mt = 1 - t;
    return mt*mt*mt*k0.v + 3*mt*mt*t*(k0.v + ho[1]) + 3*mt*t*t*(k1.v + hi[1]) + t*t*t*k1.v;
  },

  setKey(keys, f, v) {
    const ex = keys.find(k => Math.abs(k.f - f) < 0.01);
    if (ex) { ex.v = v; return ex; }
    const k = { f, v, hi: [0, 0], ho: [0, 0] };
    keys.push(k); keys.sort((a, b) => a.f - b.f);
    return k;
  },

  // tracks[boneId][group][axis] = [keys];group: t/r/s
  getChan(tracks, boneId, g, a) {
    if (!tracks[boneId]) tracks[boneId] = { t: {x:[],y:[],z:[]}, r: {x:[],y:[],z:[]}, s: {x:[],y:[],z:[]} };
    return tracks[boneId][g][a];
  },

  evalBone(tracks, boneId, f, def) {
    const tr = tracks[boneId];
    const out = { t: [...def.t], r: [...def.r], s: [...def.s] };
    if (!tr) return out;
    const axes = ['x', 'y', 'z'];
    for (let i = 0; i < 3; i++) {
      if (tr.t[axes[i]].length) out.t[i] = ANIM.evalChannel(tr.t[axes[i]], f);
      if (tr.r[axes[i]].length) out.r[i] = ANIM.evalChannel(tr.r[axes[i]], f);
      if (tr.s[axes[i]].length) out.s[i] = ANIM.evalChannel(tr.s[axes[i]], f);
    }
    return out;
  },
};

/* ============ 骨骼 ============ */
const SKEL = {
  defPose: b => ({ t: [0, 0, 0], r: [...(b.restRot || [0, 0, 0])], s: [1, 1, 1] }),

  // 应用关节限位(度)
  applyLimits(bone, r) {
    const L = bone.limits || {};
    const axes = ['x', 'y', 'z'];
    return r.map((v, i) => {
      const lim = L[axes[i]];
      return lim ? PM.clamp(v, lim[0], lim[1]) : v;
    });
  },

  // 拓扑序(父先于子)
  order(bones) {
    const byId = {}, out = [], seen = new Set();
    bones.forEach(b => byId[b.id] = b);
    const visit = b => {
      if (seen.has(b.id)) return;
      if (b.parentId && byId[b.parentId]) visit(byId[b.parentId]);
      seen.add(b.id); out.push(b);
    };
    bones.forEach(visit);
    return out;
  },

  // 求某一帧的世界矩阵。tracks 可传 null(静止绑定姿势)
  computeWorld(project, tracks, frame) {
    const world = {}, pose = {};
    for (const b of SKEL.order(project.bones)) {
      const def = SKEL.defPose(b);
      const p = tracks ? ANIM.evalBone(tracks, b.id, frame, def) : def;
      p.r = SKEL.applyLimits(b, p.r);
      pose[b.id] = p;
      const local = PM.m4.compose(
        [b.pivot[0] + p.t[0], b.pivot[1] + p.t[1], b.pivot[2] + p.t[2]],
        PM.quat.fromEuler(p.r), p.s);
      world[b.id] = b.parentId && world[b.parentId]
        ? PM.m4.mul(world[b.parentId], local) : local;
    }
    return { world, pose };
  },

  // 绑定姿势(用于 invBind 与蒙皮)
  bindWorld(project) {
    const world = {};
    for (const b of SKEL.order(project.bones)) {
      const def = SKEL.defPose(b);
      const local = PM.m4.compose(b.pivot, PM.quat.fromEuler(def.r), def.s);
      world[b.id] = b.parentId && world[b.parentId]
        ? PM.m4.mul(world[b.parentId], local) : local;
    }
    return world;
  },

  invBind(project) {
    const bw = SKEL.bindWorld(project), inv = {};
    for (const id in bw) inv[id] = PM.m4.invert(bw[id]);
    return inv;
  },

  // 关节矩阵 = world * invBind(蒙皮用)
  jointMatrices(project, tracks, frame) {
    const { world } = SKEL.computeWorld(project, tracks, frame);
    const inv = SKEL.invBind(project);
    const jm = {};
    for (const id in world) jm[id] = PM.m4.mul(world[id], inv[id]);
    return { world, jm };
  },

  // 自动蒙皮:按顶点到骨骼线段的距离取前 2 根骨
  autoSkin(project, partId) {
    const part = project.parts.find(p => p.id === partId);
    if (!part) return;
    const bw = SKEL.bindWorld(project);
    const segs = [];
    for (const b of project.bones) {
      const a = PM.m4.xformPoint(bw[b.id], [0, 0, 0]);
      const kids = project.bones.filter(k => k.parentId === b.id);
      let c;
      if (kids.length) {
        c = [0, 0, 0];
        kids.forEach(k => { const p = PM.m4.xformPoint(bw[k.id], [0, 0, 0]); c = PM.v3.add(c, p); });
        c = PM.v3.scale(c, 1 / kids.length);
      } else {
        c = PM.m4.xformPoint(bw[b.id], [0, 1, 0]);
      }
      segs.push({ boneId: b.id, a, b: c });
    }
    const nv = part.mesh.pos.length / 3;
    const wj = new Array(nv * 4).fill(''), wv = new Array(nv * 4).fill(0);
    for (let v = 0; v < nv; v++) {
      const p = [part.mesh.pos[v*3], part.mesh.pos[v*3+1], part.mesh.pos[v*3+2]];
      const ds = segs.map(s => {
        const ab = PM.v3.sub(s.b, s.a), ap = PM.v3.sub(p, s.a);
        const len2 = PM.v3.dot(ab, ab) || 1e-9;
        const t = PM.clamp(PM.v3.dot(ap, ab) / len2, 0, 1);
        const q = PM.v3.add(s.a, PM.v3.scale(ab, t));
        return { boneId: s.boneId, d: PM.v3.dist(p, q) };
      }).sort((x, y) => x.d - y.d).slice(0, 2);
      let sum = 0;
      const ws = ds.map(o => { const w = 1 / Math.pow(o.d + 0.05, 2); sum += w; return w; });
      ds.forEach((o, i) => { wj[v * 4 + i] = o.boneId; wv[v * 4 + i] = ws[i] / sum; });
    }
    project.skins[partId] = { wj, wv };
  },

  normalizePart(project, partId) {
    const sk = project.skins[partId];
    if (!sk) return 0;
    let fixed = 0;
    for (let v = 0; v < sk.wv.length / 4; v++) {
      let s = 0;
      for (let i = 0; i < 4; i++) s += sk.wv[v * 4 + i];
      if (Math.abs(s - 1) > 0.01) {
        fixed++;
        if (s > 1e-6) for (let i = 0; i < 4; i++) sk.wv[v * 4 + i] /= s;
        else { sk.wv[v * 4] = 1; }
      }
    }
    return fixed;
  },

  // 未归一化顶点数
  badVertices(project, partId) {
    const sk = project.skins[partId];
    if (!sk) return 0;
    let n = 0;
    for (let v = 0; v < sk.wv.length / 4; v++) {
      let s = 0;
      for (let i = 0; i < 4; i++) s += sk.wv[v * 4 + i];
      if (Math.abs(s - 1) > 0.01) n++;
    }
    return n;
  },
};

/* ============ 步态 ============ */
const GAIT = {
  // 为骨骼生成 24 帧步行循环(在静止朝向上叠加 R.x 摆动 + R.z 微摆)
  generate(project, boneId) {
    const bone = project.bones.find(b => b.id === boneId);
    const base = bone ? SKEL.defPose(bone).r : [0, 0, 0];
    const tr = project.tracks;
    const rx = ANIM.getChan(tr, boneId, 'r', 'x');
    const rz = ANIM.getChan(tr, boneId, 'r', 'z');
    rx.length = 0; rz.length = 0;
    const swing = [[0, 22], [6, -8], [12, -28], [18, -6], [24, 22]];
    const rock  = [[0, 0], [6, 4], [12, 0], [18, -4], [24, 0]];
    swing.forEach(([f, v]) => ANIM.setKey(rx, f, base[0] + v));
    rock.forEach(([f, v]) => ANIM.setKey(rz, f, base[2] + v));
  },
  // 复制源骨全部通道到目标骨,整体偏移 12 帧
  copyTo(project, srcId, dstId, offset = 12) {
    const src = project.tracks[srcId];
    if (!src) return false;
    const dst = { t: {x:[],y:[],z:[]}, r: {x:[],y:[],z:[]}, s: {x:[],y:[],z:[]} };
    for (const g of ['t', 'r', 's']) for (const a of ['x', 'y', 'z']) {
      dst[g][a] = src[g][a].map(k => ({ ...k, f: k.f + offset, hi: [...k.hi], ho: [...k.ho] }));
    }
    project.tracks[dstId] = dst;
    return true;
  },
};

/* ============ 项目存储 ============ */
const Store = {
  KEY: 'paleo.projects.v1',
  state: {
    projects: [],
    screen: 'home',          // home | editor
    projectId: null,
    frame: 0,
    playing: false,
    mode: 'pose',            // pose | paint | annotate
    selBone: null, selPart: null, selChannel: 'r.x',
    cam: { yaw: 40, pitch: 14, dist: 10, target: [0, 2, 0.3], ortho: false },
    brush: { radius: 0.5, strength: 0.35, subtract: false },
    compare: null,           // {a: versionId, b: versionId}
    annoDraft: null,         // 待放置的批注
    gpuError: null,
  },
  listeners: new Set(),
  sub(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); },
  commit() {
    try { localStorage.setItem(this.KEY, JSON.stringify(this.state.projects)); } catch (e) { console.warn('保存失败', e); }
    this.listeners.forEach(f => f());
  },
  touch() { this.listeners.forEach(f => f()); }, // 不落盘的 UI 状态
  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      this.state.projects = raw ? JSON.parse(raw) : [];
    } catch (e) { this.state.projects = []; }
    if (!this.state.projects.length) this.state.projects.push(makeDemoProject());
  },
  project() { return this.state.projects.find(p => p.id === this.state.projectId); },
};

/* ---- 项目操作 ---- */
function createProject(hall, name) {
  const p = {
    id: uid(), hall, name, fps: 24, frameCount: 96, createdAt: Date.now(),
    parts: [], bones: [], skins: {}, tracks: {},
    material: { rough: 0.45, lightAngle: 40, lightElev: 50, color: [0.82, 0.78, 0.7] },
    versions: [],
  };
  Store.state.projects.push(p);
  Store.commit();
  return p;
}

function addPart(project, name, cat, mesh) {
  const part = { id: uid(), name, cat, mesh };
  project.parts.push(part);
  Store.commit();
  return part;
}

// 从部件创建骨骼:枢轴默认部件包围盒中心
function addBoneFromPart(project, partId, parentId) {
  const part = project.parts.find(p => p.id === partId);
  const m = part.mesh;
  let min = [1e9,1e9,1e9], max = [-1e9,-1e9,-1e9];
  for (let i = 0; i < m.pos.length; i += 3) for (let a = 0; a < 3; a++) {
    min[a] = Math.min(min[a], m.pos[i+a]); max[a] = Math.max(max[a], m.pos[i+a]);
  }
  const center = min.map((v, i) => (v + max[i]) / 2);
  const parent = project.bones.find(b => b.id === parentId);
  const pivot = parent ? PM.v3.sub(center, PM.m4.xformPoint(SKEL.bindWorld(project)[parent.id], [0,0,0])) : center;
  const bone = {
    id: uid(), name: part.name, partId, parentId: parentId || null,
    pivot, restRot: [0, 0, 0], limits: { x: null, y: null, z: null },
  };
  project.bones.push(bone);
  Store.commit();
  return bone;
}

function reparent(project, boneId, newParentId) {
  if (boneId === newParentId) return;
  // 防止环
  let p = newParentId;
  while (p) {
    if (p === boneId) return;
    const b = project.bones.find(x => x.id === p);
    p = b && b.parentId;
  }
  const bone = project.bones.find(b => b.id === boneId);
  // 保持世界位置:换算新父空间下的枢轴
  const bw = SKEL.bindWorld(project);
  const worldPos = PM.m4.xformPoint(bw[bone.id], [0, 0, 0]);
  bone.parentId = newParentId || null;
  if (newParentId) {
    const pw = SKEL.bindWorld(project)[newParentId];
    bone.pivot = PM.m4.xformPoint(PM.m4.invert(pw), worldPos);
  } else {
    bone.pivot = worldPos;
  }
  Store.commit();
}

/* ---- 版本与批注 ---- */
function saveVersion(project, name) {
  const v = {
    id: uid(), name: name || ('版本 ' + (project.versions.length + 1)),
    at: Date.now(),
    snapshot: deepClone({
      bones: project.bones, tracks: project.tracks, skins: project.skins,
      frameCount: project.frameCount, material: project.material,
    }),
    annotations: [],
  };
  project.versions.push(v);
  Store.commit();
  return v;
}

function restoreVersion(project, versionId) {
  const v = project.versions.find(x => x.id === versionId);
  if (!v) return;
  Object.assign(project, deepClone(v.snapshot));
  Store.commit();
}

/* ---- 演示项目:霸王龙步态复原 ---- */
function makeDemoProject() {
  const p = {
    id: uid(), hall: '古脊椎动物展厅', name: '霸王龙步态复原', fps: 24, frameCount: 96,
    createdAt: Date.now(), parts: [], bones: [], skins: {}, tracks: {},
    material: { rough: 0.45, lightAngle: 40, lightElev: 50, color: [0.82, 0.78, 0.7] },
    versions: [],
  };
  // 骨骼定义:pivot 为父空间偏移,restRot 为静止朝向(四肢 +Y 朝下)
  const defs = [
    { name: '骨盆',   cat: '骨盆', parent: null,      pivot: [0, 2.6, -0.8] },
    { name: '躯干',   cat: '躯干', parent: '骨盆',    pivot: [0, 0.3, 1.3] },
    { name: '颈椎 I', cat: '颈椎', parent: '躯干',    pivot: [0, 0.25, 1.2] },
    { name: '颈椎 II',cat: '颈椎', parent: '颈椎 I',  pivot: [0, 0.2, 0.5] },
    { name: '颅骨',   cat: '颅骨', parent: '颈椎 II', pivot: [0, 0.15, 0.7] },
    { name: '肩胛.L', cat: '肩胛', parent: '躯干',    pivot: [0.7, 0, 0.5] },
    { name: '肱骨.L', cat: '肱骨', parent: '肩胛.L',  pivot: [0.2, -0.9, 0], restRot: [0, 0, 180] },
    { name: '肩胛.R', cat: '肩胛', parent: '躯干',    pivot: [-0.7, 0, 0.5] },
    { name: '肱骨.R', cat: '肱骨', parent: '肩胛.R',  pivot: [-0.2, -0.9, 0], restRot: [0, 0, 180] },
    { name: '股骨.L', cat: '股骨', parent: '骨盆',    pivot: [0.55, -0.6, 0], restRot: [0, 0, 180] },
    { name: '股骨.R', cat: '股骨', parent: '骨盆',    pivot: [-0.55, -0.6, 0], restRot: [0, 0, 180] },
  ];
  const boneOf = {};
  for (const d of defs) {
    const parent = d.parent ? boneOf[d.parent] : null;
    const bone = {
      id: uid(), name: d.name, partId: null, parentId: parent ? parent.id : null,
      pivot: [...d.pivot], restRot: d.restRot ? [...d.restRot] : [0, 0, 0],
      limits: { x: null, y: null, z: null },
    };
    p.bones.push(bone);
    boneOf[d.name] = bone;
  }
  // 按绑定世界矩阵放置部件网格(模板网格建模于骨骼局部空间)
  const bw = SKEL.bindWorld(p);
  for (const d of defs) {
    const tpl = MESH.TEMPLATES[d.cat];
    const mesh = MESH.xform(tpl.make(), bw[boneOf[d.name].id]);
    const part = { id: uid(), name: d.name, cat: d.cat, mesh };
    p.parts.push(part);
    boneOf[d.name].partId = part.id;
  }
  // 股骨限位:防止膝盖反折
  for (const n of ['股骨.L', '股骨.R']) {
    const b = p.bones.find(x => x.name === n);
    b.limits.x = [-120, 10];
  }
  // 自动蒙皮
  for (const part of p.parts) SKEL.autoSkin(p, part.id);
  // saveVersion(p, '初始绑定');
  return p;
}
