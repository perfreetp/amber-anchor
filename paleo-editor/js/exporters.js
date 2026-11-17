/* 导出:PNG 序列帧(zip 打包)+ 带骨骼层级与蒙皮的 glTF */
'use strict';

/* ---- 最小 ZIP(store 模式,无压缩) ---- */
const ZIP = (() => {
  const crcTable = new Uint32Array(256).map((_, n) => {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
  });
  const crc32 = buf => {
    let c = 0xFFFFFFFF;
    for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  };
  function build(files) { // files: [{name, data:Uint8Array}]
    const enc = new TextEncoder();
    const chunks = [], central = [];
    let offset = 0;
    for (const f of files) {
      const name = enc.encode(f.name);
      const crc = crc32(f.data), size = f.data.length;
      const lh = new DataView(new ArrayBuffer(30));
      lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true);
      lh.setUint16(6, 0x0800, true); // UTF-8 标志
      lh.setUint32(14, crc, true); lh.setUint32(18, size, true); lh.setUint32(22, size, true);
      lh.setUint16(26, name.length, true);
      chunks.push(new Uint8Array(lh.buffer), name, f.data);
      const ch = new DataView(new ArrayBuffer(46));
      ch.setUint32(0, 0x02014b50, true); ch.setUint16(6, 20, true);
      ch.setUint16(8, 0x0800, true);
      ch.setUint32(16, crc, true); ch.setUint32(20, size, true); ch.setUint32(24, size, true);
      ch.setUint16(28, name.length, true); ch.setUint32(42, offset, true);
      central.push(new Uint8Array(ch.buffer), name);
      offset += 30 + name.length + size;
    }
    const cdSize = central.reduce((s, c) => s + c.length, 0);
    const end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true);
    end.setUint16(8, files.length, true); end.setUint16(10, files.length, true);
    end.setUint32(12, cdSize, true); end.setUint32(16, offset, true);
    return new Blob([...chunks, ...central, new Uint8Array(end.buffer)], { type: 'application/zip' });
  }
  return { build };
})();

function downloadBlob(blob, filename) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

/* ---- PNG 序列帧 ---- */
async function exportPNGSequence(project, cam, onProgress) {
  const W = 1280, H = 720;
  const files = [];
  const canvas2d = document.createElement('canvas');
  canvas2d.width = W; canvas2d.height = H;
  const ctx2d = canvas2d.getContext('2d');
  for (let f = 0; f < project.frameCount; f++) {
    const px = await RENDERER.renderOffscreen(project, project.tracks, f, cam, W, H);
    ctx2d.putImageData(new ImageData(px, W, H), 0, 0);
    const blob = await new Promise(r => canvas2d.toBlob(r, 'image/png'));
    const buf = new Uint8Array(await blob.arrayBuffer());
    files.push({ name: `${project.name}/frame_${String(f).padStart(4, '0')}.png`, data: buf });
    if (onProgress) onProgress(f + 1, project.frameCount);
  }
  downloadBlob(ZIP.build(files), `${project.name}_序列帧.zip`);
}

/* ---- glTF(骨骼层级 + 蒙皮 + 烘焙动画) ---- */
function exportGLTF(project) {
  const binParts = [];
  const views = [], accessors = [];
  let byteLen = 0;
  const align = n => (n + 3) & ~3;
  function addBufferView(data, target) {
    const pad = align(byteLen) - byteLen;
    if (pad) { binParts.push(new Uint8Array(pad)); byteLen += pad; }
    const u8 = data instanceof Uint8Array ? data : new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    views.push({ buffer: 0, byteOffset: byteLen, byteLength: u8.length, ...(target ? { target } : {}) });
    binParts.push(u8); byteLen += u8.length;
    return views.length - 1;
  }
  function addAccessor(data, compType, count, type, target, minmax) {
    const view = addBufferView(data, target);
    const acc = { bufferView: view, componentType: compType, count, type };
    if (minmax) { acc.min = minmax[0]; acc.max = minmax[1]; }
    accessors.push(acc);
    return accessors.length - 1;
  }

  const boneIndex = {};
  project.bones.forEach((b, i) => boneIndex[b.id] = i);

  // 节点:骨骼层级
  const nodes = project.bones.map(b => ({
    name: b.name,
    translation: [...b.pivot],
    children: [],
  }));
  const roots = [];
  project.bones.forEach((b, i) => {
    if (b.parentId && boneIndex[b.parentId] !== undefined) nodes[boneIndex[b.parentId]].children.push(i);
    else roots.push(i);
  });
  nodes.forEach(n => { if (!n.children.length) delete n.children; });

  // 逆绑定矩阵
  const inv = SKEL.invBind(project);
  const ibm = new Float32Array(project.bones.length * 16);
  project.bones.forEach((b, i) => ibm.set(inv[b.id], i * 16)); // glTF 同为列主序
  const ibmAcc = addAccessor(ibm, 5126, project.bones.length, 'MAT4');

  // 网格:每个部件一个 primitive
  const meshes = [], meshNodes = [];
  for (const part of project.parts) {
    const pos = new Float32Array(part.mesh.pos);
    const nrm = new Float32Array(part.mesh.nrm);
    let mn = [1e9,1e9,1e9], mx = [-1e9,-1e9,-1e9];
    for (let i = 0; i < pos.length; i += 3) for (let a = 0; a < 3; a++) {
      mn[a] = Math.min(mn[a], pos[i+a]); mx[a] = Math.max(mx[a], pos[i+a]);
    }
    const posAcc = addAccessor(pos, 5126, pos.length / 3, 'VEC3', 34962, [mn, mx]);
    const nrmAcc = addAccessor(nrm, 5126, nrm.length / 3, 'VEC3', 34962);
    const nv = pos.length / 3;
    const joints = new Uint16Array(nv * 4), weights = new Float32Array(nv * 4);
    const sk = project.skins[part.id];
    for (let v = 0; v < nv; v++) for (let k = 0; k < 4; k++) {
      const bid = sk ? sk.wj[v*4+k] : '';
      joints[v*4+k] = (bid && boneIndex[bid] !== undefined) ? boneIndex[bid] : 0;
      weights[v*4+k] = sk ? sk.wv[v*4+k] : (k === 0 ? 1 : 0);
    }
    const jAcc = addAccessor(joints, 5123, nv, 'VEC4', 34962);
    const wAcc = addAccessor(weights, 5126, nv, 'VEC4', 34962);
    const idxArr = pos.length / 3 > 65535 ? new Uint32Array(part.mesh.idx) : new Uint16Array(part.mesh.idx);
    const iAcc = addAccessor(idxArr, idxArr instanceof Uint32Array ? 5125 : 5123, idxArr.length, 'SCALAR', 34963);
    meshes.push({ name: part.name, primitives: [{
      attributes: { POSITION: posAcc, NORMAL: nrmAcc, JOINTS_0: jAcc, WEIGHTS_0: wAcc },
      indices: iAcc,
    }]});
    meshNodes.push({ name: part.name, mesh: meshes.length - 1, skin: 0 });
  }
  const allNodes = nodes.concat(meshNodes);
  meshNodes.forEach((n, i) => { /* 挂到场景根 */ });
  roots.push(...meshNodes.map((_, i) => nodes.length + i));

  // 动画:按 24fps 逐帧烘焙每根骨的 TRS
  const fps = project.fps || 24, frames = project.frameCount;
  const times = new Float32Array(frames);
  for (let f = 0; f < frames; f++) times[f] = f / fps;
  const timeAcc = addAccessor(times, 5126, frames, 'SCALAR', null, [[0], [(frames - 1) / fps]]);
  const channels = [], samplers = [];
  project.bones.forEach((b, bi) => {
    const tOut = new Float32Array(frames * 3);
    const rOut = new Float32Array(frames * 4);
    const sOut = new Float32Array(frames * 3);
    for (let f = 0; f < frames; f++) {
      const p = ANIM.evalBone(project.tracks, b.id, f, SKEL.defPose(b));
      p.r = SKEL.applyLimits(b, p.r);
      tOut.set([b.pivot[0] + p.t[0], b.pivot[1] + p.t[1], b.pivot[2] + p.t[2]], f * 3);
      const q = PM.quat.fromEuler(p.r);
      rOut.set(q, f * 4);
      sOut.set(p.s, f * 3);
    }
    const tAcc = addAccessor(tOut, 5126, frames, 'VEC3');
    const rAcc = addAccessor(rOut, 5126, frames, 'VEC4');
    const sAcc = addAccessor(sOut, 5126, frames, 'VEC3');
    const paths = [['translation', tAcc], ['rotation', rAcc], ['scale', sAcc]];
    for (const [path, acc] of paths) {
      samplers.push({ input: timeAcc, output: acc, interpolation: 'LINEAR' });
      channels.push({ sampler: samplers.length - 1, target: { node: bi, path } });
    }
  });

  const gltf = {
    asset: { version: '2.0', generator: 'PaleoRig Editor (自然博物馆古生物复原组)' },
    scene: 0,
    scenes: [{ nodes: roots }],
    nodes: allNodes,
    skins: [{ joints: project.bones.map((_, i) => i), inverseBindMatrices: ibmAcc, name: 'skeleton' }],
    meshes,
    animations: [{ name: project.name, channels, samplers }],
    bufferViews: views,
    accessors,
    buffers: [{ byteLength: align(byteLen) }],
  };
  const jsonRaw = new TextEncoder().encode(JSON.stringify(gltf));
  const json = new Uint8Array(align(jsonRaw.length)).fill(0x20); // JSON 块以空格补齐
  json.set(jsonRaw);
  const binLen = align(byteLen);
  const bin = new Uint8Array(binLen);
  { let off = 0; const pad = n => (n + 3) & ~3;
    for (const part of binParts) { bin.set(part, off); off += part.length; } }
  // 输出 .glb
  const total = 12 + 8 + align(json.length) + 8 + bin.length;
  const glb = new ArrayBuffer(total);
  const dv = new DataView(glb);
  dv.setUint32(0, 0x46546C67, true); dv.setUint32(4, 2, true); dv.setUint32(8, total, true);
  dv.setUint32(12, align(json.length), true); dv.setUint32(16, 0x4E4F534A, true);
  new Uint8Array(glb, 20).set(json);
  let off = 20 + align(json.length);
  dv.setUint32(off, bin.length, true); dv.setUint32(off + 4, 0x004E4942, true);
  new Uint8Array(glb, off + 8).set(bin);
  downloadBlob(new Blob([glb], { type: 'model/gltf-binary' }), `${project.name}.glb`);
}
