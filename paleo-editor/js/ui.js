/* UI:React + htm。首页 / 编辑器(部件树、视口、检查器、时间轴、曲线、批注、版本对比) */
'use strict';
const html = htm.bind(React.createElement);
const { useState, useEffect, useRef, useCallback } = React;

function useStore() {
  const [, setTick] = useState(0);
  useEffect(() => Store.sub(() => setTick(t => t + 1)), []);
  return Store.state;
}
const AXES = ['x', 'y', 'z'];
const GROUPS = [['t', '位移'], ['r', '旋转'], ['s', '缩放']];
const chanOf = (tracks, b, g, a) => ANIM.getChan(tracks, b, g, a);

/* ================= 首页 ================= */
function Home() {
  const state = useStore();
  const [hall, setHall] = useState('');
  const [name, setName] = useState('');
  const halls = {};
  state.projects.forEach(p => { (halls[p.hall] = halls[p.hall] || []).push(p); });
  const open = p => { Store.state.projectId = p.id; Store.state.screen = 'editor'; Store.state.frame = 0; Store.touch(); };
  const del = p => {
    if (!confirm(`删除项目「${p.name}」?该操作不可恢复。`)) return;
    state.projects = state.projects.filter(x => x.id !== p.id);
    Store.commit();
  };
  const create = () => {
    if (!hall.trim() || !name.trim()) return;
    const p = createProject(hall.trim(), name.trim());
    open(p);
  };
  return html`<div class="home">
    <header><h1>🦴 古生物复原 · 骨架绑定与步态动画编辑器</h1>
      <p>自然博物馆古生物复原组 · 项目按展厅分卷保存在本机浏览器</p></header>
    <div class="new-project">
      <input list="hall-list" placeholder="展厅(如:古脊椎动物展厅)" value=${hall} onInput=${e => setHall(e.target.value)} />
      <datalist id="hall-list">${Object.keys(halls).map(h => html`<option value=${h}></option>`)}</datalist>
      <input placeholder="项目名称(如:霸王龙步态复原)" value=${name} onInput=${e => setName(e.target.value)} />
      <button class="primary" onClick=${create}>新建项目</button>
    </div>
    ${Object.keys(halls).map(h => html`
      <section key=${h}>
        <h2>📁 ${h} <span class="dim">${halls[h].length} 个项目</span></h2>
        <div class="cards">
          ${halls[h].map(p => html`<div class="card" key=${p.id}>
            <div class="card-title" onClick=${() => open(p)}>${p.name}</div>
            <div class="card-meta">
              <span>解算帧数 <b>${p.frameCount}</b></span>
              <span>部件 ${p.parts.length}</span>
              <span>骨骼 ${p.bones.length}</span>
              <span>版本 ${p.versions.length}</span>
            </div>
            <div class="card-meta dim">批注 ${p.versions.reduce((s, v) => s + v.annotations.length, 0)} 条 ·
              ${new Date(p.createdAt).toLocaleDateString()}</div>
            <div class="card-actions">
              <button onClick=${() => open(p)}>打开</button>
              <button class="danger" onClick=${() => del(p)}>删除</button>
            </div>
          </div>`)}
        </div>
      </section>`)}
  </div>`;
}

/* ================= 部件面板 ================= */
function PartsPanel({ project }) {
  useStore();
  const fileRef = useRef();
  const importOBJ = e => {
    const file = e.target.files[0];
    if (!file) return;
    const cat = prompt('部件分类(颅骨/颈椎/肩胛/肱骨/股骨/其他):', '其他') || '其他';
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const mesh = MESH.parseOBJ(rd.result);
        addPart(project, file.name.replace(/\.obj$/i, ''), cat, mesh);
      } catch (err) { alert('OBJ 解析失败:' + err.message); }
    };
    rd.readAsText(file);
    e.target.value = '';
  };
  const addTemplate = cat => {
    const tpl = MESH.TEMPLATES[cat];
    const n = project.parts.filter(p => p.cat === cat).length + 1;
    addPart(project, `${cat} ${n}`, cat, tpl.make());
  };
  const mkBone = partId => {
    const parentId = Store.state.selBone;
    const b = addBoneFromPart(project, partId, parentId);
    Store.state.selBone = b.id;
    SKEL.autoSkin(project, partId);
    Store.commit();
    RENDERER.syncProject(project);
  };
  return html`<div class="panel-section">
    <h3>化石部件 <span class="dim">${project.parts.length}</span></h3>
    <div class="row wrap">
      ${Object.keys(MESH.TEMPLATES).map(c => html`<button class="mini" key=${c} onClick=${() => addTemplate(c)}>+${c}</button>`)}
      <button class="mini" onClick=${() => fileRef.current.click()}>📥 导入扫描件(.obj)</button>
      <input type="file" accept=".obj" ref=${fileRef} style=${{display:'none'}} onChange=${importOBJ} />
    </div>
    <ul class="part-list">
      ${project.parts.map(p => html`<li key=${p.id}
          class=${Store.state.selPart === p.id ? 'sel' : ''}
          onClick=${() => { Store.state.selPart = p.id; Store.touch(); }}>
        <span class="tag">${p.cat}</span> ${p.name}
        <span class="dim">${p.mesh.pos.length / 3}顶点</span>
        ${!project.bones.some(b => b.partId === p.id) &&
          html`<button class="mini" title="以当前选中骨骼为父级" onClick=${e => { e.stopPropagation(); mkBone(p.id); }}>→骨骼</button>`}
      </li>`)}
    </ul>
  </div>`;
}

/* ================= 骨骼树 ================= */
function BoneTree({ project }) {
  useStore();
  const [dragId, setDragId] = useState(null);
  const roots = project.bones.filter(b => !b.parentId || !project.bones.some(x => x.id === b.parentId));
  const renderNode = (b, depth) => {
    const kids = project.bones.filter(k => k.parentId === b.id);
    const lim = AXES.some(a => b.limits && b.limits[a]);
    return html`<div key=${b.id}>
      <div class=${'tree-node' + (Store.state.selBone === b.id ? ' sel' : '')}
        style=${{ paddingLeft: (depth * 14 + 6) + 'px' }}
        draggable
        onDragStart=${() => setDragId(b.id)}
        onDragOver=${e => e.preventDefault()}
        onDrop=${e => { e.preventDefault(); if (dragId) reparent(project, dragId, b.id); }}
        onClick=${() => { Store.state.selBone = b.id; Store.touch(); }}>
        🦴 ${b.name} ${lim ? html`<span class="lim" title="已设关节限位">⛓</span>` : ''}
      </div>
      ${kids.map(k => renderNode(k, depth + 1))}
    </div>`;
  };
  return html`<div class="panel-section">
    <h3>骨骼层级 <span class="dim">拖动建立父子关系</span></h3>
    <div class="tree" onDragOver=${e => e.preventDefault()}
      onDrop=${e => { if (dragId && e.target.className === 'tree') reparent(project, dragId, null); }}>
      ${roots.map(b => renderNode(b, 0))}
    </div>
    ${project.bones.length > 1 && html`<button class="mini" onClick=${() => {
      if (Store.state.selBone) { reparent(project, Store.state.selBone, null); }
    }}>选中骨升为根</button>`}
  </div>`;
}

/* ================= 关节面板(枢轴 + 限位) ================= */
function JointPanel({ project }) {
  useStore();
  const b = project.bones.find(x => x.id === Store.state.selBone);
  if (!b) return html`<div class="panel-section dim">在左侧选择一根骨骼以编辑枢轴与限位</div>`;
  const setPivot = (i, v) => { b.pivot[i] = +v || 0; Store.commit(); };
  const setLim = (a, i, v) => {
    if (!b.limits[a]) b.limits[a] = [-180, 180];
    b.limits[a][i] = +v || 0; Store.commit();
  };
  return html`<div class="panel-section">
    <h3>关节 · ${b.name}</h3>
    <div class="lbl">枢轴(父空间)</div>
    <div class="row">${[0,1,2].map(i => html`
      <input key=${i} type="number" step="0.05" value=${+b.pivot[i].toFixed(3)} onChange=${e => setPivot(i, e.target.value)} />`)}
    </div>
    <div class="lbl">角度限位(度,防止关节反折)</div>
    ${AXES.map((a, i) => html`<div class="row lim-row" key=${a}>
      <label><input type="checkbox" checked=${!!b.limits[a]}
        onChange=${e => { b.limits[a] = e.target.checked ? [-120, 10] : null; Store.commit(); }} /> ${a.toUpperCase()}</label>
      ${b.limits[a] && html`<input type="number" value=${b.limits[a][0]} onChange=${e => setLim(a, 0, e.target.value)} />
        <span>~</span>
        <input type="number" value=${b.limits[a][1]} onChange=${e => setLim(a, 1, e.target.value)} />`}
    </div>`)}
    <button class="mini" onClick=${() => { b.limits.x = [-120, 10]; Store.commit(); }}>膝关节防反折预设</button>
  </div>`;
}

/* ================= 通道检查器 ================= */
function ChannelInspector({ project }) {
  useStore();
  const st = Store.state;
  const b = project.bones.find(x => x.id === st.selBone);
  if (!b) return html`<div class="panel-section dim">选择骨骼后编辑位移 / 旋转 / 缩放通道</div>`;
  const def = SKEL.defPose(b);
  const pose = ANIM.evalBone(project.tracks, b.id, st.frame, def);
  const setVal = (g, i, v) => {
    const keys = chanOf(project.tracks, b.id, g, AXES[i]);
    ANIM.setKey(keys, st.frame, +v || 0);
    Store.commit();
  };
  const hasKey = (g, i) => chanOf(project.tracks, b.id, g, AXES[i]).some(k => Math.abs(k.f - st.frame) < 0.01);
  const keyAll = () => {
    GROUPS.forEach(([g]) => AXES.forEach((a, i) => {
      const src = g === 't' ? pose.t : g === 'r' ? pose.r : pose.s;
      ANIM.setKey(chanOf(project.tracks, b.id, g, a), st.frame, src[i]);
    }));
    Store.commit();
  };
  return html`<div class="panel-section">
    <h3>通道 · ${b.name} <button class="mini" onClick=${keyAll}>全部打关键帧</button></h3>
    ${GROUPS.map(([g, label]) => html`<div key=${g}>
      <div class="lbl">${label}</div>
      <div class="row">
        ${AXES.map((a, i) => {
          const src = g === 't' ? pose.t : g === 'r' ? pose.r : pose.s;
          return html`<div class=${'chan' + (hasKey(g, i) ? ' keyed' : '')} key=${a}
            onClick=${() => { st.selChannel = g + '.' + a; Store.touch(); }}>
            <span>${a.toUpperCase()}</span>
            <input type="number" step=${g === 's' ? 0.05 : g === 'r' ? 1 : 0.02}
              value=${+src[i].toFixed(2)} onChange=${e => setVal(g, i, e.target.value)} />
            <button class=${'keybtn' + (hasKey(g, i) ? ' on' : '')} title="在当前帧打/删关键帧"
              onClick=${e => { e.stopPropagation();
                const keys = chanOf(project.tracks, b.id, g, a);
                const k = keys.find(k => Math.abs(k.f - st.frame) < 0.01);
                if (k) keys.splice(keys.indexOf(k), 1); else ANIM.setKey(keys, st.frame, src[i]);
                Store.commit(); }}>◆</button>
          </div>`;
        })}
      </div>
    </div>`)}
  </div>`;
}

/* ================= 蒙皮笔刷面板 ================= */
function PaintPanel({ project }) {
  useStore();
  const st = Store.state;
  const part = project.parts.find(p => p.id === st.selPart) || project.parts[0];
  const bad = part ? SKEL.badVertices(project, part.id) : 0;
  return html`<div class="panel-section">
    <h3>蒙皮权重笔刷</h3>
    <div class="lbl">目标部件</div>
    <select value=${part ? part.id : ''} onChange=${e => { st.selPart = e.target.value; Store.touch(); }}>
      ${project.parts.map(p => html`<option key=${p.id} value=${p.id}>${p.name}</option>`)}
    </select>
    <div class="lbl">影响骨骼</div>
    <select value=${st.selBone || ''} onChange=${e => { st.selBone = e.target.value; Store.touch(); }}>
      ${project.bones.map(b => html`<option key=${b.id} value=${b.id}>${b.name}</option>`)}
    </select>
    <div class="lbl">笔刷半径 ${st.brush.radius.toFixed(2)}</div>
    <input type="range" min="0.1" max="2" step="0.05" value=${st.brush.radius}
      onInput=${e => { st.brush.radius = +e.target.value; Store.touch(); }} />
    <div class="lbl">强度 ${st.brush.strength.toFixed(2)}</div>
    <input type="range" min="0.05" max="1" step="0.05" value=${st.brush.strength}
      onInput=${e => { st.brush.strength = +e.target.value; Store.touch(); }} />
    <label><input type="checkbox" checked=${st.brush.subtract}
      onChange=${e => { st.brush.subtract = e.target.checked; Store.touch(); }} /> 减去模式</label>
    <div class=${'bad-verts' + (bad ? ' has-bad' : '')}>
      ${bad ? `⚠ ${bad} 个顶点权重未归一化(视口中标红)` : '✓ 全部顶点权重已归一化'}
    </div>
    <div class="row">
      <button onClick=${() => { const n = SKEL.normalizePart(project, part.id); Store.commit();
        RENDERER.updateColors(project, part.id, st.selBone, true); RENDERER.updateJointAttr(project, part.id); }}>归一化</button>
      <button onClick=${() => { SKEL.autoSkin(project, part.id); Store.commit();
        RENDERER.updateColors(project, part.id, st.selBone, true); RENDERER.updateJointAttr(project, part.id); }}>自动蒙皮</button>
    </div>
  </div>`;
}

/* ================= 步态面板 ================= */
function GaitPanel({ project }) {
  useStore();
  const st = Store.state;
  const [src, setSrc] = useState('');
  const [dst, setDst] = useState('');
  const [offset, setOffset] = useState(12);
  const opts = project.bones.map(b => html`<option key=${b.id} value=${b.id}>${b.name}</option>`);
  return html`<div class="panel-section">
    <h3>步态</h3>
    <button onClick=${() => {
      if (!st.selBone) return alert('先选中骨骼(如肱骨.L)');
      GAIT.generate(project, st.selBone); Store.commit();
    }}>为选中骨生成 24 帧步行循环</button>
    <div class="lbl">复制步态(前腿 → 后腿,整体偏移)</div>
    <div class="row"><select value=${src} onChange=${e => setSrc(e.target.value)}><option value="">源骨</option>${opts}</select>
    <select value=${dst} onChange=${e => setDst(e.target.value)}><option value="">目标骨</option>${opts}</select></div>
    <div class="row">
      <label>偏移帧 <input type="number" style=${{width:'60px'}} value=${offset} onChange=${e => setOffset(+e.target.value || 12)} /></label>
      <button onClick=${() => {
        if (!src || !dst) return alert('选择源骨与目标骨');
        GAIT.copyTo(project, src, dst, offset); Store.commit();
      }}>复制 +${offset} 帧</button>
    </div>
  </div>`;
}

/* ================= 材质面板 ================= */
function MaterialPanel({ project }) {
  useStore();
  const m = project.material;
  const set = (k, v) => { m[k] = v; Store.commit(); };
  const hex = '#' + m.color.map(c => Math.round(c * 255).toString(16).padStart(2, '0')).join('');
  return html`<div class="panel-section">
    <h3>材质与展厅灯光</h3>
    <div class="lbl">骨面粗糙度 ${m.rough.toFixed(2)}</div>
    <input type="range" min="0" max="1" step="0.01" value=${m.rough} onInput=${e => set('rough', +e.target.value)} />
    <div class="lbl">主光方位角 ${m.lightAngle}°</div>
    <input type="range" min="0" max="360" step="1" value=${m.lightAngle} onInput=${e => set('lightAngle', +e.target.value)} />
    <div class="lbl">主光仰角(筒灯)${m.lightElev}°</div>
    <input type="range" min="5" max="85" step="1" value=${m.lightElev} onInput=${e => set('lightElev', +e.target.value)} />
    <div class="row"><label>骨色</label>
      <input type="color" value=${hex} onInput=${e => {
        const h = e.target.value;
        m.color = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
        Store.commit();
      }} /></div>
  </div>`;
}

/* ================= 视口 ================= */
function Viewport({ project }) {
  const state = useStore();
  const canvasRef = useRef();
  const overlayRef = useRef();
  const dragRef = useRef(null);
  const [exporting, setExporting] = useState(null);

  // 渲染循环
  useEffect(() => {
    let raf, last = performance.now(), acc = 0;
    const loop = now => {
      raf = requestAnimationFrame(loop);
      const st = Store.state;
      const dt = Math.min(0.1, (now - last) / 1000); last = now;
      if (st.playing) {
        acc += dt * 24;
        let advanced = false;
        while (acc >= 1) { acc -= 1; st.frame = (st.frame + 1) % project.frameCount; advanced = true; }
        if (advanced) Store.touch();
      }
      if (!RENDERER.device) return;
      const cam = st.cam;
      if (st.compare && st.compare.on) {
        const va = project.versions.find(v => v.id === st.compare.a);
        const vb = project.versions.find(v => v.id === st.compare.b);
        const w = RENDERER.width, h = RENDERER.height;
        if (!w) return;
        const mk = v => v ? { ...project, ...v.snapshot } : project;
        RENDERER.render(mk(va), va ? va.snapshot.tracks : project.tracks, st.frame, cam, { rect: [0, 0, w / 2, h], selBone: null });
        RENDERER.render(mk(vb), vb ? vb.snapshot.tracks : project.tracks, st.frame, cam, { rect: [w / 2, 0, w - w / 2, h], keep: true, selBone: null });
      } else {
        RENDERER.render(project, project.tracks, st.frame, cam,
          { paintMode: st.mode === 'paint', selBone: st.selBone });
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [project]);

  // 摄像机射线
  const pickRay = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = 1 - ((e.clientY - rect.top) / rect.height) * 2;
    const cam = Store.state.cam;
    const aspect = rect.width / rect.height;
    const { vp, eye } = RENDERER.cameraMatrices(cam, aspect);
    const inv = PM.m4.invert(vp);
    if (cam.ortho) {
      const p0 = PM.m4.xformPoint(inv, [nx, ny, 0]);
      const p1 = PM.m4.xformPoint(inv, [nx, ny, 1]);
      return { ro: p0, rd: PM.v3.norm(PM.v3.sub(p1, p0)) };
    }
    const p = PM.m4.xformPoint(inv, [nx, ny, 1]);
    return { ro: eye, rd: PM.v3.norm(PM.v3.sub(p, eye)) };
  };

  const applyBrush = e => {
    const st = Store.state;
    const part = project.parts.find(p => p.id === st.selPart) || project.parts[0];
    if (!part || !st.selBone) return;
    const { ro, rd } = pickRay(e);
    const { jm } = SKEL.jointMatrices(project, project.tracks, st.frame);
    const hit = RENDERER.raycast(project, jm, ro, rd);
    if (!hit) return;
    const sp = RENDERER.skinnedPositions(project, part.id, jm);
    let sk = project.skins[part.id];
    if (!sk) {
      const nv = part.mesh.pos.length / 3;
      sk = project.skins[part.id] = { wj: new Array(nv * 4).fill(''), wv: new Array(nv * 4).fill(0) };
    }
    const R = st.brush.radius, sgn = st.brush.subtract ? -1 : 1;
    for (let v = 0; v < sp.length / 3; v++) {
      const d = Math.hypot(sp[v*3] - hit.point[0], sp[v*3+1] - hit.point[1], sp[v*3+2] - hit.point[2]);
      if (d > R) continue;
      const fall = 0.5 * (1 + Math.cos(Math.PI * d / R));
      // 找该顶点中目标骨的槽位,或权重最小的槽
      let idx = -1;
      for (let k = 0; k < 4; k++) if (sk.wj[v*4+k] === st.selBone) { idx = v*4+k; break; }
      if (idx < 0) {
        let minW = 1e9;
        for (let k = 0; k < 4; k++) if (sk.wv[v*4+k] < minW) { minW = sk.wv[v*4+k]; idx = v*4+k; }
        sk.wj[idx] = st.selBone;
      }
      sk.wv[idx] = PM.clamp(sk.wv[idx] + sgn * st.brush.strength * fall, 0, 1);
    }
    Store.commit();
    RENDERER.updateColors(project, part.id, st.selBone, true);
    RENDERER.updateJointAttr(project, part.id);
  };

  const onDown = e => {
    const st = Store.state;
    if (st.mode === 'annotate' && st.annoDraft) {
      const rect = canvasRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width, ny = (e.clientY - rect.top) / rect.height;
      st.annoDraft.nx = nx; st.annoDraft.ny = ny;
      Store.touch();
      return;
    }
    if (st.mode === 'paint' && e.button === 0) { dragRef.current = { type: 'paint' }; applyBrush(e); return; }
    dragRef.current = { type: 'cam', x: e.clientX, y: e.clientY, pan: e.shiftKey || e.button === 2 };
  };
  const onMove = e => {
    const d = dragRef.current;
    if (!d) return;
    const st = Store.state;
    if (d.type === 'paint') { applyBrush(e); return; }
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    d.x = e.clientX; d.y = e.clientY;
    if (d.pan) {
      const cam = st.cam;
      const yaw = PM.deg2rad(cam.yaw);
      const right = [Math.cos(yaw), 0, -Math.sin(yaw)];
      const s = cam.dist * 0.0016;
      cam.target = PM.v3.add(cam.target, PM.v3.add(PM.v3.scale(right, -dx * s), [0, dy * s, 0]));
    } else {
      st.cam.yaw += dx * 0.4;
      st.cam.pitch = PM.clamp(st.cam.pitch + dy * 0.3, -85, 85);
    }
    Store.touch();
  };
  const onUp = () => { dragRef.current = null; };
  const onWheel = e => {
    Store.state.cam.dist = PM.clamp(Store.state.cam.dist * (1 + Math.sign(e.deltaY) * 0.1), 1, 60);
    Store.touch();
  };

  // 批注标记(当前查看版本)
  const st = Store.state;
  const viewVersion = project.versions.find(v => v.id === st.annoVersion) || project.versions[project.versions.length - 1];
  const annos = viewVersion ? viewVersion.annotations : [];

  return html`<div class="viewport-wrap">
    <canvas ref=${canvasRef} class="viewport"
      onMouseDown=${onDown} onMouseMove=${onMove} onMouseUp=${onUp} onMouseLeave=${onUp}
      onWheel=${onWheel} onContextMenu=${e => e.preventDefault()}></canvas>
    <div class="vp-toolbar">
      <button class=${st.mode === 'pose' ? 'on' : ''} onClick=${() => { st.mode = 'pose'; Store.touch(); }}>🦴 姿态</button>
      <button class=${st.mode === 'paint' ? 'on' : ''} onClick=${() => { st.mode = 'paint';
        const p = project.parts.find(x => x.id === st.selPart) || project.parts[0];
        if (p) RENDERER.updateColors(project, p.id, st.selBone, true); Store.touch(); }}>🖌 蒙皮</button>
      <button class=${st.mode === 'annotate' ? 'on' : ''} onClick=${() => { st.mode = 'annotate'; Store.touch(); }}>📌 批注</button>
      <span class="sep"></span>
      <button onClick=${() => { st.cam.ortho = !st.cam.ortho; Store.touch(); }}>${st.cam.ortho ? '正交' : '透视'}</button>
      <button onClick=${() => { st.cam = { yaw: 40, pitch: 14, dist: 10, target: [0, 2, 0.3], ortho: st.cam.ortho }; Store.touch(); }}>重置视角</button>
      <span class="sep"></span>
      <button onClick=${() => { st.playing = !st.playing; Store.touch(); }}>${st.playing ? '⏸ 暂停' : '▶ 播放'}</button>
      <span class="frame-label">F${String(st.frame).padStart(3, '0')} / ${project.frameCount} · 24fps</span>
    </div>
    ${st.gpuError && html`<div class="gpu-error">⚠ ${st.gpuError}</div>`}
    ${st.mode === 'annotate' && html`<div class="anno-layer">
      ${annos.filter(a => a.nx != null && Math.abs(a.frame - st.frame) <= 2).map(a => html`
        <div key=${a.id} class=${'pin' + (a.done ? ' done' : '')}
          style=${{ left: (a.nx * 100) + '%', top: (a.ny * 100) + '%' }}
          title=${a.text}>📌</div>`)}
    </div>`}
    ${st.compare && st.compare.on && html`<div class="compare-labels"><span>A: ${(project.versions.find(v=>v.id===st.compare.a)||{}).name || '工作稿'}</span><span>B: ${(project.versions.find(v=>v.id===st.compare.b)||{}).name || '工作稿'}</span></div>`}
    ${exporting && html`<div class="exporting">导出 PNG 序列:${exporting[0]} / ${exporting[1]}</div>`}
  </div>`;
}

/* ================= 时间轴 ================= */
function Timeline({ project }) {
  const state = useStore();
  const st = Store.state;
  const ref = useRef();
  const b = project.bones.find(x => x.id === st.selBone);
  const dragRef = useRef(null);

  const frameAt = e => {
    const rect = ref.current.getBoundingClientRect();
    const labelW = 46;
    return PM.clamp(Math.round((e.clientX - rect.left - labelW) / (rect.width - labelW) * project.frameCount), 0, project.frameCount);
  };
  const onDown = e => {
    const t = e.target;
    if (t.dataset.key !== undefined && b) {
      const keys = chanOf(project.tracks, b.id, t.dataset.g, t.dataset.a);
      dragRef.current = { key: keys[+t.dataset.key] };
    } else {
      dragRef.current = { playhead: true };
      st.frame = frameAt(e); Store.touch();
    }
  };
  const onMove = e => {
    const d = dragRef.current;
    if (!d) return;
    if (d.playhead) { st.frame = frameAt(e); Store.touch(); return; }
    if (d.key) {
      d.key.f = frameAt(e);
      Store.commit();
    }
  };
  const onUp = () => {
    const d = dragRef.current;
    if (d && d.key && b) {
      GROUPS.forEach(([g]) => AXES.forEach(a => chanOf(project.tracks, b.id, g, a).sort((x, y) => x.f - y.f)));
      Store.commit();
    }
    dragRef.current = null;
  };
  const delKey = e => {
    e.preventDefault();
    if (!b) return;
    const t = e.target;
    if (t.dataset.key !== undefined) {
      const keys = chanOf(project.tracks, b.id, t.dataset.g, t.dataset.a);
      keys.splice(+t.dataset.key, 1);
      Store.commit();
    }
  };
  const addKey = e => {
    if (!b) return;
    const t = e.target;
    if (t.dataset.g && t.dataset.key === undefined) {
      const f = frameAt(e);
      const pose = ANIM.evalBone(project.tracks, b.id, f, SKEL.defPose(b));
      const src = t.dataset.g === 't' ? pose.t : t.dataset.g === 'r' ? pose.r : pose.s;
      ANIM.setKey(chanOf(project.tracks, b.id, t.dataset.g, t.dataset.a), f, src[AXES.indexOf(t.dataset.a)]);
      Store.commit();
    }
  };

  const rows = [];
  if (b) GROUPS.forEach(([g, gl]) => AXES.forEach(a => {
    const keys = chanOf(project.tracks, b.id, g, a);
    rows.push({ g, a, label: gl[0] + a.toUpperCase(), keys });
  }));
  const viewVersion = project.versions.find(v => v.id === st.annoVersion) || project.versions[project.versions.length - 1];
  const annos = viewVersion ? viewVersion.annotations : [];
  const pct = f => (f / project.frameCount * 100) + '%';

  return html`<div class="timeline" ref=${ref} onMouseDown=${onDown} onMouseMove=${onMove}
      onMouseUp=${onUp} onMouseLeave=${onUp} onDblClick=${addKey} onContextMenu=${delKey}>
    <div class="tl-ruler">
      <span class="tl-label">帧</span>
      ${Array.from({ length: Math.floor(project.frameCount / 12) + 1 }, (_, i) => html`
        <span key=${i} class="tick" style=${{ left: `calc(46px + (100% - 46px) * ${i * 12 / project.frameCount})` }}>${i * 12}</span>`)}
      ${annos.map(a => html`<span key=${a.id} class=${'anno-tick' + (a.done ? ' done' : '')}
        style=${{ left: `calc(46px + (100% - 46px) * ${a.frame / project.frameCount})` }}
        title=${'F' + a.frame + ' ' + a.text}
        onClick=${e => { e.stopPropagation(); st.frame = a.frame; Store.touch(); }}>📌</span>`)}
      <div class="playhead" style=${{ left: `calc(46px + (100% - 46px) * ${st.frame / project.frameCount})` }}></div>
    </div>
    ${rows.map(r => html`<div class="tl-row" key=${r.label}>
      <span class="tl-label ${st.selChannel === r.g + '.' + r.a ? 'sel' : ''}"
        onClick=${() => { st.selChannel = r.g + '.' + r.a; Store.touch(); }}>${r.label}</span>
      <div class="tl-track" data-g=${r.g} data-a=${r.a}>
        ${r.keys.map((k, i) => html`<span key=${i} class="key" data-g=${r.g} data-a=${r.a} data-key=${i}
          style=${{ left: pct(k.f) }} title=${'F' + k.f + ' = ' + k.v.toFixed(2)}>◆</span>`)}
      </div>
    </div>`)}
    ${!b && html`<div class="dim" style=${{padding:'8px'}}>选择骨骼以编辑其 9 条通道关键帧 · 双击轨道打关键帧 · 右键删除 · 拖动移动</div>`}
    <div class="tl-foot">
      <label>总帧数 <input type="number" value=${project.frameCount} style=${{width:'64px'}}
        onChange=${e => { project.frameCount = Math.max(24, +e.target.value || 96); Store.commit(); }} /></label>
      <span class="dim">24 fps · 双击轨道空白处打关键帧,拖动 ◆ 移动,右键删除</span>
    </div>
  </div>`;
}

/* ================= 曲线编辑器 ================= */
function CurveEditor({ project }) {
  const state = useStore();
  const ref = useRef();
  const dragRef = useRef(null);
  const st = Store.state;
  const b = project.bones.find(x => x.id === st.selBone);
  const [g, a] = st.selChannel.split('.');
  const keys = b ? chanOf(project.tracks, b.id, g, a) : [];

  useEffect(() => { draw(); });

  const W = 560, H = 200, PAD = 30;
  const range = () => {
    let mn = -10, mx = 10;
    keys.forEach(k => { mn = Math.min(mn, k.v); mx = Math.max(mx, k.v); });
    if (mx - mn < 1) { mn -= 1; mx += 1; }
    const pad = (mx - mn) * 0.15;
    return [mn - pad, mx + pad];
  };
  const toXY = (f, v, [mn, mx]) => [PAD + (f / project.frameCount) * (W - PAD - 8), H - 12 - ((v - mn) / (mx - mn)) * (H - 24)];
  const fromXY = (x, y, [mn, mx]) => [
    PM.clamp(Math.round((x - PAD) / (W - PAD - 8) * project.frameCount), 0, project.frameCount),
    mn + ((H - 12 - y) / (H - 24)) * (mx - mn)];

  function draw() {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#14161c'; ctx.fillRect(0, 0, W, H);
    const rg = range();
    ctx.strokeStyle = '#2a2e3a';
    for (let f = 0; f <= project.frameCount; f += 12) {
      const [x] = toXY(f, 0, rg);
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      ctx.fillStyle = '#556'; ctx.fillText('F' + f, x + 2, 10);
    }
    if (!keys.length) {
      ctx.fillStyle = '#667'; ctx.fillText('当前通道无关键帧 — 在时间轴双击添加', PAD, H / 2);
      return;
    }
    // 曲线
    ctx.strokeStyle = '#e8b23a'; ctx.lineWidth = 1.6; ctx.beginPath();
    for (let f = 0; f <= project.frameCount; f += 0.5) {
      const [x, y] = toXY(f, ANIM.evalChannel(keys, f), rg);
      f === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    // 手柄与关键点
    keys.forEach((k, i) => {
      const [x, y] = toXY(k.f, k.v, rg);
      const span = 8;
      const ho = (k.ho && (k.ho[0] || k.ho[1])) ? k.ho : [span, 0];
      const hi = (k.hi && (k.hi[0] || k.hi[1])) ? k.hi : [-span, 0];
      const [hx1, hy1] = toXY(k.f + ho[0], k.v + ho[1], rg);
      const [hx2, hy2] = toXY(k.f + hi[0], k.v + hi[1], rg);
      ctx.strokeStyle = '#4aa3ff'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(hx1, hy1); ctx.moveTo(x, y); ctx.lineTo(hx2, hy2); ctx.stroke();
      ctx.fillStyle = '#4aa3ff';
      ctx.beginPath(); ctx.arc(hx1, hy1, 3.5, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.arc(hx2, hy2, 3.5, 0, 7); ctx.fill();
      ctx.fillStyle = '#ffd34d';
      ctx.fillRect(x - 4, y - 4, 8, 8);
    });
  }

  const hitTest = e => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (W / rect.width), y = (e.clientY - rect.top) * (H / rect.height);
    const rg = range();
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const [kx, ky] = toXY(k.f, k.v, rg);
      if (Math.hypot(x - kx, y - ky) < 8) return { type: 'key', k };
      const span = 8;
      const ho = (k.ho && (k.ho[0] || k.ho[1])) ? k.ho : [span, 0];
      const hi = (k.hi && (k.hi[0] || k.hi[1])) ? k.hi : [-span, 0];
      const [ox, oy] = toXY(k.f + ho[0], k.v + ho[1], rg);
      if (Math.hypot(x - ox, y - oy) < 7) return { type: 'ho', k };
      const [ix, iy] = toXY(k.f + hi[0], k.v + hi[1], rg);
      if (Math.hypot(x - ix, y - iy) < 7) return { type: 'hi', k };
    }
    return null;
  };
  const onDown = e => { dragRef.current = hitTest(e); };
  const onMove = e => {
    const d = dragRef.current;
    if (!d) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (W / rect.width), y = (e.clientY - rect.top) * (H / rect.height);
    const rg = range();
    const [f, v] = fromXY(x, y, rg);
    const k = d.k;
    if (d.type === 'key') { k.f = f; k.v = v; }
    else if (d.type === 'ho') { k.ho = [Math.max(0.5, f - k.f), v - k.v]; }
    else if (d.type === 'hi') { k.hi = [Math.min(-0.5, f - k.f), v - k.v]; }
    Store.commit();
  };
  const onUpCurve = () => {
    keys.sort((p, q) => p.f - q.f);
    Store.commit();
    dragRef.current = null;
  };
  return html`<div class="curve-editor">
    <div class="ce-head">曲线编辑器 · ${b ? b.name : '—'} · ${({t:'位移',r:'旋转',s:'缩放'})[g]}.${a.toUpperCase()}
      <span class="dim">拖动黄色关键点与蓝色贝塞尔手柄调节缓动</span></div>
    <canvas ref=${ref} width=${W} height=${H}
      onMouseDown=${onDown} onMouseMove=${onMove} onMouseUp=${onUpCurve}
      onMouseLeave=${onUpCurve}></canvas>
  </div>`;
}

/* ================= 批注面板 ================= */
function AnnoPanel({ project }) {
  useStore();
  const st = Store.state;
  const [text, setText] = useState('');
  const [reply, setReply] = useState({});
  if (!project.versions.length) {
    return html`<div class="panel-section"><h3>批注</h3>
      <div class="dim">先由复原组「提交版本」,策展人才能对该版本打点批注。</div></div>`;
  }
  const v = project.versions.find(x => x.id === st.annoVersion) || project.versions[project.versions.length - 1];
  const startDraft = () => {
    st.annoDraft = { frame: st.frame, nx: null, ny: null };
    st.mode = 'annotate';
    Store.touch();
  };
  const saveDraft = () => {
    if (!text.trim() || !st.annoDraft) return;
    v.annotations.push({
      id: uid(), frame: st.annoDraft.frame, nx: st.annoDraft.nx, ny: st.annoDraft.ny,
      text: text.trim(), author: '策展人', at: Date.now(), replies: [], done: false,
    });
    st.annoDraft = null; setText('');
    Store.commit();
  };
  return html`<div class="panel-section">
    <h3>批注 · <select value=${v.id} onChange=${e => { st.annoVersion = e.target.value; Store.touch(); }}>
      ${project.versions.map(x => html`<option key=${x.id} value=${x.id}>${x.name}</option>`)}
    </select></h3>
    ${st.annoDraft ? html`<div class="anno-draft">
      <div>F${st.annoDraft.frame} ${st.annoDraft.nx != null ? '· 已在画面打点' : '· 点击视口画面放置标记(可跳过)'}</div>
      <textarea rows="2" placeholder="批注内容…" value=${text} onInput=${e => setText(e.target.value)}></textarea>
      <div class="row"><button class="primary" onClick=${saveDraft}>提交批注</button>
      <button onClick=${() => { st.annoDraft = null; Store.touch(); }}>取消</button></div>
    </div>` : html`<button onClick=${startDraft}>📌 在当前帧(F${st.frame})新建批注</button>`}
    <ul class="anno-list">
      ${v.annotations.map(a => html`<li key=${a.id} class=${a.done ? 'done' : ''}>
        <div class="anno-head" onClick=${() => { st.frame = a.frame; Store.touch(); }}>
          <b>F${a.frame}</b> ${a.nx != null ? '📍' : ''} ${a.text}
          <span class="dim">${a.author} · ${new Date(a.at).toLocaleString()}</span>
        </div>
        ${a.replies.map(r => html`<div class="reply"><b>${r.author}:</b> ${r.text}</div>`)}
        <div class="row">
          <input placeholder="制作方回复…" value=${reply[a.id] || ''}
            onInput=${e => setReply({ ...reply, [a.id]: e.target.value })} />
          <button class="mini" onClick=${() => {
            if ((reply[a.id] || '').trim()) {
              a.replies.push({ author: '制作方', text: reply[a.id].trim(), at: Date.now() });
              setReply({ ...reply, [a.id]: '' }); Store.commit();
            }
          }}>回复</button>
          <button class="mini" onClick=${() => { a.done = !a.done; Store.commit(); }}>${a.done ? '重开' : '已处理'}</button>
        </div>
      </li>`)}
    </ul>
  </div>`;
}

/* ================= 版本与对比 ================= */
function VersionPanel({ project }) {
  useStore();
  const st = Store.state;
  const [name, setName] = useState('');
  return html`<div class="panel-section">
    <h3>版本</h3>
    <div class="row">
      <input placeholder="版本说明" value=${name} onInput=${e => setName(e.target.value)} />
      <button class="primary" onClick=${() => { saveVersion(project, name.trim()); setName(''); }}>提交版本</button>
    </div>
    <ul class="version-list">
      ${project.versions.map(v => html`<li key=${v.id}>
        <b>${v.name}</b> <span class="dim">${new Date(v.at).toLocaleString()} · 批注 ${v.annotations.length}</span>
        <button class="mini" onClick=${() => { if (confirm('回滚到该版本?当前工作稿将被覆盖(可先提交新版本备份)。')) restoreVersion(project, v.id); }}>回滚</button>
      </li>`)}
    </ul>
    <div class="lbl">版本左右对比</div>
    <div class="row">
      <select value=${st.compare ? st.compare.a : ''} onChange=${e => {
        st.compare = st.compare || { a: '', b: '' }; st.compare.a = e.target.value; Store.touch(); }}>
        <option value="">A:工作稿</option>
        ${project.versions.map(v => html`<option key=${v.id} value=${v.id}>A:${v.name}</option>`)}
      </select>
      <select value=${st.compare ? st.compare.b : ''} onChange=${e => {
        st.compare = st.compare || { a: '', b: '' }; st.compare.b = e.target.value; Store.touch(); }}>
        <option value="">B:工作稿</option>
        ${project.versions.map(v => html`<option key=${v.id} value=${v.id}>B:${v.name}</option>`)}
      </select>
    </div>
    <button class=${st.compare && st.compare.on ? 'on' : ''} onClick=${() => {
      if (!st.compare) st.compare = { a: '', b: '' };
      if (st.compare.on) st.compare = null; else st.compare.on = true;
      Store.touch();
    }}>${st.compare && st.compare.on ? '退出对比' : '左右对比'}</button>
  </div>`;
}

/* ================= 编辑器 ================= */
function Editor({ project }) {
  const state = useStore();
  const st = Store.state;
  const [exporting, setExporting] = useState(null);
  const [tab, setTab] = useState('rig');

  useEffect(() => {
    RENDERER.ready = (async () => {
      if (!RENDERER.device) {
        try {
          const cv = document.querySelector('canvas.viewport');
          await RENDERER.init(cv);
          RENDERER.syncProject(project);
        } catch (err) { Store.state.gpuError = err.message; Store.touch(); }
      } else {
        RENDERER.syncProject(project);
      }
    })();
  }, [project.id]);

  // 切回姿态模式时恢复部件颜色
  useEffect(() => {
    if (st.mode !== 'paint' && RENDERER.device) {
      project.parts.forEach(p => RENDERER.updateColors(project, p.id, null, false));
    } else if (st.mode === 'paint' && RENDERER.device) {
      const p = project.parts.find(x => x.id === st.selPart) || project.parts[0];
      if (p) RENDERER.updateColors(project, p.id, st.selBone, true);
    }
  }, [st.mode, st.selPart, st.selBone]);

  const doExportPNG = async () => {
    if (!RENDERER.device) return alert('WebGPU 未就绪');
    setExporting([0, project.frameCount]);
    try {
      await exportPNGSequence(project, st.cam, (i, n) => setExporting([i, n]));
    } finally { setExporting(null); }
  };

  return html`<div class="editor">
    <div class="topbar">
      <button onClick=${() => { st.screen = 'home'; Store.touch(); }}>← 展厅</button>
      <b>${project.hall} / ${project.name}</b>
      <span class="dim">24fps · ${project.frameCount} 帧</span>
      <span class="spacer"></span>
      <button onClick=${doExportPNG} disabled=${!!exporting}>
        ${exporting ? `导出中 ${exporting[0]}/${exporting[1]}` : '📷 导出 PNG 序列'}</button>
      <button onClick=${() => exportGLTF(project)}>🧊 导出 glTF(含骨骼)</button>
    </div>
    <div class="editor-main">
      <div class="side left">
        <${PartsPanel} project=${project} />
        <${BoneTree} project=${project} />
        <${JointPanel} project=${project} />
      </div>
      <div class="center">
        <${Viewport} project=${project} />
        <${Timeline} project=${project} />
      </div>
      <div class="side right">
        <div class="tabs">
          ${[['rig','通道'],['paint','蒙皮'],['gait','步态'],['mat','材质'],['anno','批注'],['ver','版本']].map(([k, l]) =>
            html`<button key=${k} class=${tab === k ? 'on' : ''} onClick=${() => { setTab(k);
              if (k === 'paint') { st.mode = 'paint'; } else if (k === 'anno') { st.mode = 'annotate'; } else if (st.mode !== 'pose') { st.mode = 'pose'; }
              Store.touch(); }}>${l}</button>`)}
        </div>
        ${tab === 'rig' && html`<${ChannelInspector} project=${project} /><${CurveEditor} project=${project} />`}
        ${tab === 'paint' && html`<${PaintPanel} project=${project} />`}
        ${tab === 'gait' && html`<${GaitPanel} project=${project} />`}
        ${tab === 'mat' && html`<${MaterialPanel} project=${project} />`}
        ${tab === 'anno' && html`<${AnnoPanel} project=${project} />`}
        ${tab === 'ver' && html`<${VersionPanel} project=${project} />`}
      </div>
    </div>
  </div>`;
}

/* ================= 根 ================= */
function App() {
  const state = useStore();
  const project = Store.project();
  if (state.screen === 'editor' && project) return html`<${Editor} project=${project} key=${project.id} />`;
  return html`<${Home} />`;
}

Store.load();
// 支持 #open=<项目id> 深链直接打开项目(#open 打开第一个)
if (location.hash.startsWith('#open')) {
  const id = location.hash.slice(5).replace(/^=/, '');
  const p = Store.state.projects.find(x => x.id === id) || Store.state.projects[0];
  if (p) { Store.state.projectId = p.id; Store.state.screen = 'editor'; }
}
ReactDOM.createRoot(document.getElementById('root')).render(html`<${App} />`);

// #selftest:脚本化自检(开发用)
if (location.hash === '#selftest' || location.hash === '#selftest-compare') {
  (async () => {
    const log = m => console.log('[SELFTEST] ' + m);
    const compareOnly = location.hash === '#selftest-compare';
    const p = Store.state.projects[0];
    Store.state.projectId = p.id; Store.state.screen = 'editor';
    Store.touch();
    for (let i = 0; i < 200 && !RENDERER.ready; i++) await new Promise(r => setTimeout(r, 100));
    await RENDERER.ready;
    if (!RENDERER.device) { log('FAIL: WebGPU 未初始化 ' + Store.state.gpuError); return; }
    log('WebGPU 初始化成功');
    const femL = p.bones.find(b => b.name === '股骨.L');
    const femR = p.bones.find(b => b.name === '股骨.R');
    const humL = p.bones.find(b => b.name === '肱骨.L');
    GAIT.generate(p, femL.id); GAIT.copyTo(p, femL.id, femR.id, 12);
    GAIT.generate(p, humL.id);
    Store.state.selBone = femL.id;
    Store.state.frame = 12;
    // 版本 + 批注
    const v = saveVersion(p, '自检版本');
    v.annotations.push({ id: uid(), frame: 12, nx: 0.5, ny: 0.4, text: '自检批注', author: '策展人', at: Date.now(), replies: [], done: false });
    Store.commit();
    log('步态生成+复制+版本+批注 完成,版本数=' + p.versions.length);
    if (compareOnly) {
      // 分屏渲染像素断言:同一纹理左右两半分别渲染两个版本
      const W = 640, H = 360;
      const dev = RENDERER.device;
      const tex = dev.createTexture({ size: [W, H], format: RENDERER.format,
        usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC });
      const dep = dev.createTexture({ size: [W, H], format: 'depth24plus', usage: GPUTextureUsage.RENDER_ATTACHMENT });
      const mk = v => v ? { ...p, ...v.snapshot } : p;
      RENDERER.render(mk(v), v.snapshot.tracks, 12, Store.state.cam,
        { outView: tex.createView(), depthView: dep.createView(), rect: [0, 0, W / 2, H] });
      RENDERER.render(mk(null), p.tracks, 12, Store.state.cam,
        { outView: tex.createView(), depthView: dep.createView(), rect: [W / 2, 0, W / 2, H], keep: true });
      const bpr = Math.ceil(W * 4 / 256) * 256;
      const buf = dev.createBuffer({ size: bpr * H, usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ });
      const enc = dev.createCommandEncoder();
      enc.copyTextureToBuffer({ texture: tex }, { buffer: buf, bytesPerRow: bpr }, [W, H, 1]);
      dev.queue.submit([enc.finish()]);
      await buf.mapAsync(GPUMapMode.READ);
      const src8 = new Uint8Array(buf.getMappedRange());
      let left = 0, right = 0;
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const o = y * bpr + x * 4;
        if (src8[o] > 20 || src8[o+1] > 20 || src8[o+2] > 20) { x < W/2 ? left++ : right++; }
      }
      buf.unmap(); buf.destroy(); tex.destroy(); dep.destroy();
      log(`分屏渲染 左半非零=${left} 右半非零=${right} ` + (left > 5000 && right > 5000 ? '✓' : '✗'));
      Store.state.compare = { a: v.id, b: '', on: true };
      Store.state.frame = 12;
      Store.touch();
      log('对比分屏已开启');
      return;
    }
    // 蒙皮模式(权重着色)
    Store.state.mode = 'paint';
    Store.state.selPart = p.parts.find(x => x.name === '股骨.L').id;
    RENDERER.updateColors(p, Store.state.selPart, femL.id, true);
    Store.touch();
    await new Promise(r => setTimeout(r, 600));
    // 版本对比分屏(左:版本,右:工作稿)
    Store.state.mode = 'pose';
    Store.state.compare = { a: v.id, b: '', on: true };
    Store.touch();
    await new Promise(r => setTimeout(r, 300));
    // 离屏导出单帧
    const px = await RENDERER.renderOffscreen(p, p.tracks, 12, Store.state.cam, 320, 180);
    let nonZero = 0;
    for (let i = 0; i < px.length; i += 4) if (px[i] || px[i+1] || px[i+2]) nonZero++;
    log('离屏渲染 320x180 非零像素=' + nonZero + (nonZero > 10000 ? ' ✓' : ' ✗ 偏少'));
    log('完成');
  })();
}
