/* WebGPU 渲染器:GPU 蒙皮 + 骨骼线框 + 权重可视化 + 离屏导出 */
'use strict';

const RENDERER = {
  device: null, ctx: null, format: null,
  meshPipe: null, linePipe: null,
  depthTex: null, depthView: null, canvas: null,
  ubo: null, jointBuf: null, bindGroup: null,
  lineVBO: null, lineCapacity: 0,
  parts: new Map(),   // partId -> {vbo, ibo, nIdx, nv, colOffset...}
  boneIndex: {},      // boneId -> joint 槽位
  project: null,
  width: 0, height: 0,

  async init(canvas) {
    if (!navigator.gpu) throw new Error('此浏览器不支持 WebGPU,请使用 Chrome / Edge 113+');
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) throw new Error('未找到 WebGPU 适配器');
    this.device = await adapter.requestDevice();
    this.canvas = canvas;
    this.ctx = canvas.getContext('webgpu');
    this.format = navigator.gpu.getPreferredCanvasFormat();
    this.ctx.configure({ device: this.device, format: this.format, alphaMode: 'opaque' });

    const shader = this.device.createShaderModule({ code: WGSL_SRC });
    const bgl = this.device.createBindGroupLayout({ entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } },
    ]});
    const pl = this.device.createPipelineLayout({ bindGroupLayouts: [bgl] });

    this.meshPipe = this.device.createRenderPipeline({
      layout: pl,
      vertex: { module: shader, entryPoint: 'vsMesh', buffers: [{
        arrayStride: 72,
        attributes: [
          { shaderLocation: 0, offset: 0,  format: 'float32x3' },  // pos
          { shaderLocation: 1, offset: 12, format: 'float32x3' },  // nrm
          { shaderLocation: 2, offset: 24, format: 'float32x4' },  // col
          { shaderLocation: 3, offset: 40, format: 'uint32x4' },   // joints
          { shaderLocation: 4, offset: 56, format: 'float32x4' },  // weights
        ],
      }]},
      fragment: { module: shader, entryPoint: 'fsMesh', targets: [{ format: this.format }] },
      primitive: { topology: 'triangle-list', cullMode: 'none' },
      depthStencil: { format: 'depth24plus', depthWriteEnabled: true, depthCompare: 'less' },
    });

    this.linePipe = this.device.createRenderPipeline({
      layout: pl,
      vertex: { module: shader, entryPoint: 'vsLine', buffers: [{
        arrayStride: 28,
        attributes: [
          { shaderLocation: 0, offset: 0,  format: 'float32x3' },
          { shaderLocation: 2, offset: 12, format: 'float32x4' },
        ],
      }]},
      fragment: { module: shader, entryPoint: 'fsLine', targets: [{ format: this.format }] },
      primitive: { topology: 'line-list' },
      depthStencil: { format: 'depth24plus', depthWriteEnabled: false, depthCompare: 'less-equal' },
    });

    this.ubo = this.device.createBuffer({ size: 144, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
    this.jointBuf = this.device.createBuffer({ size: 64 * 64, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST });
    this.bindGroup = this.device.createBindGroup({ layout: bgl, entries: [
      { binding: 0, resource: { buffer: this.ubo } },
      { binding: 1, resource: { buffer: this.jointBuf } },
    ]});
    this.lineCapacity = 4096;
    this.lineVBO = this.device.createBuffer({ size: this.lineCapacity * 28, usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST });
  },

  resize() {
    const c = this.canvas;
    const w = Math.max(1, Math.floor(c.clientWidth * devicePixelRatio));
    const h = Math.max(1, Math.floor(c.clientHeight * devicePixelRatio));
    if (w === this.width && h === this.height && this.depthTex) return;
    this.width = c.width = w; this.height = c.height = h;
    if (this.depthTex) this.depthTex.destroy();
    this.depthTex = this.device.createTexture({ size: [w, h], format: 'depth24plus', usage: GPUTextureUsage.RENDER_ATTACHMENT });
    this.depthView = this.depthTex.createView();
  },

  // 同步项目几何:为每个部件建 VBO/IBO
  syncProject(project) {
    this.project = project;
    this.boneIndex = {};
    project.bones.forEach((b, i) => this.boneIndex[b.id] = i);
    for (const [, v] of this.parts) { v.vbo.destroy(); v.ibo.destroy(); }
    this.parts.clear();
    for (const part of project.parts) {
      const nv = part.mesh.pos.length / 3;
      const data = new ArrayBuffer(nv * 72);
      const f = new Float32Array(data), u = new Uint32Array(data);
      const sk = project.skins[part.id];
      for (let v = 0; v < nv; v++) {
        f[v*18+0] = part.mesh.pos[v*3]; f[v*18+1] = part.mesh.pos[v*3+1]; f[v*18+2] = part.mesh.pos[v*3+2];
        f[v*18+3] = part.mesh.nrm[v*3]; f[v*18+4] = part.mesh.nrm[v*3+1]; f[v*18+5] = part.mesh.nrm[v*3+2];
        // col 6..9 由 updateColors 填
        for (let k = 0; k < 4; k++) {
          const bid = sk ? sk.wj[v*4+k] : '';
          u[v*18+10+k] = (bid && this.boneIndex[bid] !== undefined) ? this.boneIndex[bid] : 0;
          f[v*18+14+k] = sk ? sk.wv[v*4+k] : (k === 0 ? 1 : 0);
        }
      }
      const vbo = this.device.createBuffer({ size: data.byteLength, usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST });
      this.device.queue.writeBuffer(vbo, 0, data);
      const idxArr = part.mesh.idx.length > 65535 ? new Uint32Array(part.mesh.idx) : new Uint16Array(part.mesh.idx);
      const ibo = this.device.createBuffer({ size: idxArr.byteLength, usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST });
      this.device.queue.writeBuffer(ibo, 0, idxArr);
      this.parts.set(part.id, { vbo, ibo, nIdx: part.mesh.idx.length, nv, idx32: idxArr instanceof Uint32Array });
      this.updateColors(project, part.id, null, false);
    }
  },

  // 顶点色:默认骨色 / 权重笔刷模式(选中骨权重渐变 + 未归一化标红)
  updateColors(project, partId, paintBoneId, paintMode) {
    const rec = this.parts.get(partId);
    if (!rec) return;
    const part = project.parts.find(p => p.id === partId);
    const sk = project.skins[partId];
    const col = new Float32Array(rec.nv * 4);
    const base = project.material.color;
    for (let v = 0; v < rec.nv; v++) {
      let r = base[0], g = base[1], b = base[2];
      if (paintMode && sk) {
        let sum = 0, wSel = 0;
        for (let k = 0; k < 4; k++) {
          sum += sk.wv[v*4+k];
          if (sk.wj[v*4+k] === paintBoneId) wSel += sk.wv[v*4+k];
        }
        if (Math.abs(sum - 1) > 0.01) { r = 1; g = 0.08; b = 0.08; }       // 未归一化 → 红
        else { r = 0.1 + wSel * 0.9; g = 0.15 + wSel * 0.7; b = 0.6 - wSel * 0.55; } // 蓝→黄渐变
      }
      col[v*4] = r; col[v*4+1] = g; col[v*4+2] = b; col[v*4+3] = 1;
    }
    // col 在交错缓冲中的偏移:每顶点 24 字节起
    const tmp = new Uint8Array(rec.nv * 16);
    new Float32Array(tmp.buffer).set(col);
    for (let v = 0; v < rec.nv; v++) {
      this.device.queue.writeBuffer(rec.vbo, v * 72 + 24, tmp, v * 16, 16);
    }
  },

  updateJointAttr(project, partId) { // 权重变化后刷新 joints/weights 属性
    const rec = this.parts.get(partId);
    const sk = project.skins[partId];
    if (!rec || !sk) return;
    const nv = rec.nv;
    const j = new Uint32Array(nv * 4), w = new Float32Array(nv * 4);
    for (let v = 0; v < nv; v++) for (let k = 0; k < 4; k++) {
      const bid = sk.wj[v*4+k];
      j[v*4+k] = (bid && this.boneIndex[bid] !== undefined) ? this.boneIndex[bid] : 0;
      w[v*4+k] = sk.wv[v*4+k];
    }
    for (let v = 0; v < nv; v++) {
      this.device.queue.writeBuffer(rec.vbo, v * 72 + 40, j, v * 4, 4);
      this.device.queue.writeBuffer(rec.vbo, v * 72 + 56, w, v * 4, 4);
    }
  },

  cameraMatrices(cam, aspect) {
    const yaw = PM.deg2rad(cam.yaw), pitch = PM.deg2rad(cam.pitch);
    const eye = [
      cam.target[0] + cam.dist * Math.cos(pitch) * Math.sin(yaw),
      cam.target[1] + cam.dist * Math.sin(pitch),
      cam.target[2] + cam.dist * Math.cos(pitch) * Math.cos(yaw)];
    const view = PM.m4.lookAt(eye, cam.target, [0, 1, 0]);
    const proj = cam.ortho
      ? (() => { const hh = cam.dist * 0.45, hw = hh * aspect; return PM.m4.ortho(-hw, hw, -hh, hh, 0.1, 200); })()
      : PM.m4.perspective(PM.deg2rad(45), aspect, 0.1, 200);
    return { vp: PM.m4.mul(proj, view), eye };
  },

  // 构建骨骼线框 + 地面网格
  buildLines(project, world, selBone) {
    const v = [];
    const push = (p, c) => v.push(p[0], p[1], p[2], c[0], c[1], c[2], c[3]);
    const gridC = [0.32, 0.34, 0.38, 1], gridC2 = [0.42, 0.44, 0.5, 1];
    for (let i = -10; i <= 10; i++) {
      const c = i === 0 ? gridC2 : gridC;
      push([i, 0, -10], c); push([i, 0, 10], c);
      push([-10, 0, i], c); push([10, 0, i], c);
    }
    const bw = SKEL.bindWorld(project);
    for (const b of project.bones) {
      const a = PM.m4.xformPoint(world[b.id], [0, 0, 0]);
      const kids = project.bones.filter(k => k.parentId === b.id);
      const sel = b.id === selBone;
      const c = sel ? [1, 0.75, 0.1, 1] : [0.35, 0.85, 0.95, 1];
      const ends = kids.length
        ? kids.map(k => PM.m4.xformPoint(world[k.id], [0, 0, 0]))
        : [PM.m4.xformPoint(world[b.id], [0, 0.5, 0])];
      for (const e of ends) {
        const dir = PM.v3.norm(PM.v3.sub(e, a));
        const len = PM.v3.dist(a, e);
        let side = PM.v3.cross(dir, Math.abs(dir[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0]);
        side = PM.v3.norm(side);
        const side2 = PM.v3.norm(PM.v3.cross(dir, side));
        const mid = PM.v3.lerp(a, e, 0.25), r = Math.min(0.09, len * 0.12);
        const pts = [0, 1, 2, 3].map(i => {
          const ang = i * Math.PI / 2;
          return PM.v3.add(mid, PM.v3.add(PM.v3.scale(side, Math.cos(ang) * r), PM.v3.scale(side2, Math.sin(ang) * r)));
        });
        for (let i = 0; i < 4; i++) {
          push(a, c); push(pts[i], c);
          push(pts[i], c); push(e, c);
          push(pts[i], c); push(pts[(i + 1) % 4], c);
        }
      }
      // 枢轴标记
      const pc = sel ? [1, 0.3, 0.3, 1] : [0.9, 0.9, 0.4, 1];
      const s = 0.07;
      push([a[0]-s,a[1],a[2]], pc); push([a[0]+s,a[1],a[2]], pc);
      push([a[0],a[1]-s,a[2]], pc); push([a[0],a[1]+s,a[2]], pc);
      push([a[0],a[1],a[2]-s], pc); push([a[0],a[1],a[2]+s], pc);
    }
    return new Float32Array(v);
  },

  // 主渲染:tracks 可覆盖(版本对比用),rect 可指定视口
  render(project, tracks, frame, cam, opts = {}) {
    if (!this.device || !project) return;
    this.resize();
    const { world, jm } = SKEL.jointMatrices(project, tracks, frame);
    // 关节矩阵上传
    const jmArr = new Float32Array(64 * 16);
    for (const bid in jm) {
      const i = this.boneIndex[bid];
      if (i !== undefined && i < 64) jmArr.set(jm[bid], i * 16);
    }
    this.device.queue.writeBuffer(this.jointBuf, 0, jmArr);

    const rect = (opts.rect || [0, 0, this.width, this.height]).map(Math.floor);
    const aspect = rect[2] / rect[3];
    const { vp, eye } = this.cameraMatrices(cam, aspect);
    const mat = project.material;
    const la = PM.deg2rad(mat.lightAngle), le = PM.deg2rad(mat.lightElev);
    const lightDir = [Math.cos(le) * Math.sin(la), Math.sin(le), Math.cos(le) * Math.cos(la)];
    const u = new Float32Array(36);
    u.set(vp, 0);
    u.set([...eye, 0], 16);
    u.set([...lightDir, 0], 20);
    u.set([mat.rough, opts.paintMode ? 1 : 0, 0, 0], 24);
    u.set([...mat.color, 1], 28);
    this.device.queue.writeBuffer(this.ubo, 0, u);

    const lines = this.buildLines(project, world, opts.selBone);
    if (lines.length > this.lineCapacity * 7) { /* 超界忽略 */ }
    this.device.queue.writeBuffer(this.lineVBO, 0, lines);

    const enc = this.device.createCommandEncoder();
    const pass = enc.beginRenderPass({
      colorAttachments: [{ view: opts.outView || this.ctx.getCurrentTexture().createView(),
        clearValue: { r: 0.09, g: 0.095, b: 0.11, a: 1 }, loadOp: opts.keep ? 'load' : 'clear', storeOp: 'store' }],
      depthStencilAttachment: opts.depthView ? { view: opts.depthView, depthClearValue: 1, depthLoadOp: 'clear', depthStoreOp: 'discard' }
        : { view: this.depthView, depthClearValue: 1, depthLoadOp: 'clear', depthStoreOp: 'discard' },
    });
    pass.setViewport(rect[0], rect[1], rect[2], rect[3], 0, 1);
    pass.setScissorRect(rect[0], rect[1], rect[2], rect[3]);
    pass.setBindGroup(0, this.bindGroup);
    pass.setPipeline(this.meshPipe);
    for (const part of project.parts) {
      const rec = this.parts.get(part.id);
      if (!rec) continue;
      pass.setVertexBuffer(0, rec.vbo);
      pass.setIndexBuffer(rec.ibo, rec.idx32 ? 'uint32' : 'uint16');
      pass.drawIndexed(rec.nIdx);
    }
    pass.setPipeline(this.linePipe);
    pass.setVertexBuffer(0, this.lineVBO);
    pass.draw(lines.length / 7);
    pass.end();
    this.device.queue.submit([enc.finish()]);
    return { world, jm };
  },

  // 离屏渲染一帧并读回 RGBA(PNG 序列导出用)
  async renderOffscreen(project, tracks, frame, cam, w, h) {
    const isBGRA = this.format === 'bgra8unorm';
    const tex = this.device.createTexture({ size: [w, h], format: this.format,
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC });
    const depth = this.device.createTexture({ size: [w, h], format: 'depth24plus', usage: GPUTextureUsage.RENDER_ATTACHMENT });
    this.render(project, tracks, frame, cam, { outView: tex.createView(), depthView: depth.createView(), rect: [0, 0, w, h] });
    const bpr = Math.ceil(w * 4 / 256) * 256;
    const buf = this.device.createBuffer({ size: bpr * h, usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ });
    const enc = this.device.createCommandEncoder();
    enc.copyTextureToBuffer({ texture: tex }, { buffer: buf, bytesPerRow: bpr }, [w, h, 1]);
    this.device.queue.submit([enc.finish()]);
    await buf.mapAsync(GPUMapMode.READ);
    const src = new Uint8Array(buf.getMappedRange());
    const out = new Uint8ClampedArray(w * h * 4);
    for (let y = 0; y < h; y++) out.set(src.subarray(y * bpr, y * bpr + w * 4), y * w * 4);
    if (isBGRA) for (let i = 0; i < out.length; i += 4) { const t = out[i]; out[i] = out[i + 2]; out[i + 2] = t; }
    buf.unmap(); buf.destroy(); tex.destroy(); depth.destroy();
    return out;
  },

  // CPU 蒙皮(笔刷拾取用)
  skinnedPositions(project, partId, jm) {
    const part = project.parts.find(p => p.id === partId);
    const sk = project.skins[partId];
    const n = part.mesh.pos.length / 3;
    const out = new Float32Array(n * 3);
    for (let v = 0; v < n; v++) {
      const p = [part.mesh.pos[v*3], part.mesh.pos[v*3+1], part.mesh.pos[v*3+2]];
      let acc = [0, 0, 0];
      if (sk) for (let k = 0; k < 4; k++) {
        const w = sk.wv[v*4+k];
        if (!w) continue;
        const m = jm[sk.wj[v*4+k]];
        if (!m) continue;
        const q = PM.m4.xformPoint(m, p);
        acc = PM.v3.add(acc, PM.v3.scale(q, w));
      }
      out[v*3] = acc[0]; out[v*3+1] = acc[1]; out[v*3+2] = acc[2];
    }
    return out;
  },

  // 射线拾取:返回 {partId, point, dist}
  raycast(project, jm, ro, rd) {
    let best = null;
    for (const part of project.parts) {
      const sp = this.skinnedPositions(project, part.id, jm);
      const idx = part.mesh.idx;
      for (let i = 0; i < idx.length; i += 3) {
        const a = [sp[idx[i]*3], sp[idx[i]*3+1], sp[idx[i]*3+2]];
        const b = [sp[idx[i+1]*3], sp[idx[i+1]*3+1], sp[idx[i+1]*3+2]];
        const c = [sp[idx[i+2]*3], sp[idx[i+2]*3+1], sp[idx[i+2]*3+2]];
        const hit = rayTri(ro, rd, a, b, c);
        if (hit && (!best || hit.t < best.dist)) {
          best = { partId: part.id, dist: hit.t, point: PM.v3.add(ro, PM.v3.scale(rd, hit.t)) };
        }
      }
    }
    return best;
  },
};

function rayTri(ro, rd, a, b, c) {
  const e1 = PM.v3.sub(b, a), e2 = PM.v3.sub(c, a);
  const p = PM.v3.cross(rd, e2), det = PM.v3.dot(e1, p);
  if (Math.abs(det) < 1e-9) return null;
  const inv = 1 / det;
  const s = PM.v3.sub(ro, a);
  const u = PM.v3.dot(s, p) * inv;
  if (u < 0 || u > 1) return null;
  const q = PM.v3.cross(s, e1);
  const v = PM.v3.dot(rd, q) * inv;
  if (v < 0 || u + v > 1) return null;
  const t = PM.v3.dot(e2, q) * inv;
  return t > 0 ? { t } : null;
}

const WGSL_SRC = `
struct U {
  vp: mat4x4f,
  camPos: vec4f,
  lightDir: vec4f,
  params: vec4f,   // x: roughness, y: paintMode
  color: vec4f,
};
@group(0) @binding(0) var<uniform> u: U;
@group(0) @binding(1) var<storage, read> joints: array<mat4x4f>;

struct MeshIn {
  @location(0) pos: vec3f,
  @location(1) nrm: vec3f,
  @location(2) col: vec4f,
  @location(3) j: vec4u,
  @location(4) w: vec4f,
};
struct VOut {
  @builtin(position) cp: vec4f,
  @location(0) nrm: vec3f,
  @location(1) col: vec4f,
  @location(2) wp: vec3f,
};
@vertex fn vsMesh(in: MeshIn) -> VOut {
  let m = joints[in.j.x] * in.w.x + joints[in.j.y] * in.w.y
        + joints[in.j.z] * in.w.z + joints[in.j.w] * in.w.w;
  let wp = (m * vec4f(in.pos, 1.0)).xyz;
  var o: VOut;
  o.cp = u.vp * vec4f(wp, 1.0);
  o.nrm = normalize((m * vec4f(in.nrm, 0.0)).xyz);
  o.col = in.col;
  o.wp = wp;
  return o;
}
@fragment fn fsMesh(in: VOut) -> @location(0) vec4f {
  let N = normalize(in.nrm);
  let L = normalize(u.lightDir.xyz);
  let V = normalize(u.camPos.xyz - in.wp);
  let H = normalize(L + V);
  let rough = clamp(u.params.x, 0.02, 1.0);
  let shin = mix(220.0, 6.0, rough);
  let diff = max(dot(N, L), 0.0);
  let spec = pow(max(dot(N, H), 0.0), shin) * (1.0 - rough) * 1.4;
  let wrap = max(dot(N, L) * 0.5 + 0.5, 0.0);
  let amb = 0.22 + 0.12 * N.y;
  var c = in.col.rgb * (amb + diff * 0.85 + wrap * 0.1) + vec3f(spec);
  // 展厅筒灯:顶部暖色补光
  let top = max(N.y, 0.0) * 0.15;
  c += vec3f(1.0, 0.92, 0.8) * top;
  return vec4f(c, 1.0);
}

struct LineIn { @location(0) pos: vec3f, @location(2) col: vec4f };
@vertex fn vsLine(in: LineIn) -> VOut {
  var o: VOut;
  o.cp = u.vp * vec4f(in.pos, 1.0);
  o.nrm = vec3f(0, 1, 0);
  o.col = in.col;
  o.wp = in.pos;
  return o;
}
@fragment fn fsLine(in: VOut) -> @location(0) vec4f {
  return vec4f(in.col.rgb, 1.0);
}
`;
