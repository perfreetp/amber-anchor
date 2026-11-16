import { createSignal, createEffect, createMemo, onMount, onCleanup, getOwner, runWithOwner, Show, For } from 'solid-js';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { state, setState, activeProject, catalogItem, objectInfo, bomFor, updateProject, setProjectStatus, addProject } from '../store.js';
import { CATEGORIES, CATEGORY_KEYS, genId } from '../catalog.js';
import { buildModel, buildCoverageMesh, categoryColor } from '../three/models.js';
import { pointInPolygon as _pip, closestOnBoundary, buildGround, buildBoundaryLine, boundaryBounds } from '../three/geo.js';
import { exportTopViewPNG, exportCSV } from '../three/exporter.js';

const SNAP_DIST = 1.5; // 边界吸附阈值（米）

export default function EditorView() {
  let container, canvas;
  const project = () => activeProject();

  const [selectedId, setSelectedId] = createSignal(null);
  const [gizmoMode, setGizmoMode] = createSignal('translate');
  const [camMode, setCamMode] = createSignal('orbit'); // orbit | top | walk
  const [showCoverage, setShowCoverage] = createSignal(true);
  const [showLabels, setShowLabels] = createSignal(true);
  const [drawMode, setDrawMode] = createSignal(false);
  const [drawPoints, setDrawPoints] = createSignal([]);
  const [toast, setToast] = createSignal('');
  const [panelTab, setPanelTab] = createSignal('props');
  const [dragAsset, setDragAsset] = createSignal(null);

  let toastTimer;
  const notify = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => setToast(''), 2600);
  };

  const bom = createMemo(() => (project() ? bomFor(project()) : { rows: [], total: 0 }));
  const selectedObj = createMemo(() => project()?.objects.find((o) => o.id === selectedId()) || null);

  onMount(async () => {
    const owner = getOwner(); // await 后 owner 会丢失，先捕获
    // ---------- 渲染器：优先 WebGPU，回退 WebGL ----------
    let renderer;
    if (navigator.gpu) {
      try {
        const { WebGPURenderer } = await import('three/webgpu');
        renderer = new WebGPURenderer({ canvas, antialias: true });
        await renderer.init();
      } catch (e) { renderer = null; }
    }
    if (!renderer) {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    }
    runWithOwner(owner, () => setupScene(renderer));
  });

  function setupScene(renderer) {
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a2230);
    scene.fog = new THREE.Fog(0x1a2230, 80, 220);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 500);
    camera.position.set(18, 20, 26);

    const hemi = new THREE.HemisphereLight(0xcfe8ff, 0x3d5a3a, 0.9);
    const sun = new THREE.DirectionalLight(0xffffff, 1.6);
    sun.position.set(30, 45, 20);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -50; sun.shadow.camera.right = 50;
    sun.shadow.camera.top = 50; sun.shadow.camera.bottom = -50;
    scene.add(hemi, sun, sun.target);

    const grid = new THREE.GridHelper(120, 120, 0x3a4a5f, 0x2a3648);
    grid.position.y = -0.01;
    scene.add(grid);

    // ---------- 控制器 ----------
    const orbit = new OrbitControls(camera, canvas);
    orbit.enableDamping = true;
    orbit.maxPolarAngle = Math.PI / 2 - 0.02;
    orbit.target.set(0, 0, 0);

    const tc = new TransformControls(camera, canvas);
    tc.addEventListener('dragging-changed', (e) => {
      orbit.enabled = !e.value;
      if (e.value) onGizmoStart(); else onGizmoEnd();
    });
    tc.addEventListener('objectChange', onGizmoChange);
    scene.add(tc.getHelper ? tc.getHelper() : tc);

    const plc = new PointerLockControls(camera, canvas);

    // ---------- 场景内容 ----------
    let groundMesh = null, boundaryLine = null;
    const objectRoot = new THREE.Group();
    scene.add(objectRoot);
    const entries = new Map(); // id -> {group, coverage, label, labelText}
    let ghost = null; // 拖放预览

    const raycaster = new THREE.Raycaster();
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    function pickGround(clientX, clientY) {
      const r = canvas.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((clientX - r.left) / r.width) * 2 - 1,
        -((clientY - r.top) / r.height) * 2 + 1
      );
      raycaster.setFromCamera(ndc, camera);
      if (groundMesh) {
        const hit = raycaster.intersectObject(groundMesh, false)[0];
        if (hit) return hit.point;
      }
      const p = new THREE.Vector3();
      return raycaster.ray.intersectPlane(groundPlane, p) ? p : null;
    }

    // ---------- 地面 ----------
    function rebuildGround() {
      if (groundMesh) { scene.remove(groundMesh); groundMesh.geometry.dispose(); groundMesh = null; }
      if (boundaryLine) { scene.remove(boundaryLine); boundaryLine = null; }
      const b = project()?.boundary;
      if (b && b.length >= 3) {
        groundMesh = buildGround(b);
        scene.add(groundMesh);
        boundaryLine = buildBoundaryLine(b);
        scene.add(boundaryLine);
        const bb = boundaryBounds(b);
        sun.target.position.set(bb.cx, 0, bb.cz);
        grid.visible = false;
      } else {
        grid.visible = true;
      }
    }

    function fitCamera() {
      const b = project()?.boundary;
      if (!b || b.length < 3) { camera.position.set(18, 20, 26); orbit.target.set(0, 0, 0); return; }
      const bb = boundaryBounds(b);
      const s = Math.max(bb.w, bb.d);
      orbit.target.set(bb.cx, 0, bb.cz);
      camera.position.set(bb.cx + s * 0.6, s * 0.9, bb.cz + s * 0.75);
    }

    // ---------- 对象条目 ----------
    function makeLabel(text) {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const x = c.getContext('2d');
      x.beginPath(); x.arc(32, 32, 26, 0, Math.PI * 2);
      x.fillStyle = 'rgba(255,255,255,0.95)'; x.fill();
      x.lineWidth = 4; x.strokeStyle = '#c0392b'; x.stroke();
      x.fillStyle = '#c0392b'; x.font = 'bold 30px sans-serif';
      x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 32, 34);
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), depthTest: false }));
      sp.scale.set(1, 1, 1);
      sp.renderOrder = 30;
      return sp;
    }

    function createEntry(o) {
      const group = buildModel(o.category, o.id.length);
      group.userData.objectId = o.id;
      group.traverse((m) => {
        if (m.isMesh) {
          m.userData.objectId = o.id;
          m.userData.origEmissive = m.material.emissive ? m.material.emissive.getHex() : 0;
        }
      });
      objectRoot.add(group);
      const label = makeLabel('?');
      objectRoot.add(label);
      const e = { group, label, labelText: '?', coverage: null, covKey: '' };
      entries.set(o.id, e);
      updateEntry(e, o);
      return e;
    }

    function updateEntry(e, o) {
      e.group.position.set(o.x, 0, o.z);
      e.group.rotation.y = o.rotY;
      e.group.scale.setScalar(o.scale);
      e.label.position.set(o.x, 2.2 * o.scale + 0.4, o.z);
      e.label.visible = showLabels();
      // 喷头覆盖扇形
      const isSpray = CATEGORIES[o.category]?.spray;
      const key = isSpray ? `${o.range}|${o.arc}` : '';
      if (isSpray && showCoverage()) {
        if (e.covKey !== key || !e.coverage) {
          if (e.coverage) { objectRoot.remove(e.coverage); e.coverage.geometry.dispose(); }
          e.coverage = buildCoverageMesh(o.range, o.arc, categoryColor(o.category));
          e.covKey = key;
          objectRoot.add(e.coverage);
        }
        e.coverage.visible = true;
        e.coverage.position.set(o.x, 0.03, o.z);
        e.coverage.rotation.z = o.rotY; // 扇形绕地面法线跟随朝向
        e.coverage.material.opacity = o.id === selectedId() ? 0.34 : 0.15;
      } else if (e.coverage) {
        e.coverage.visible = false;
      }
    }

    function removeEntry(id) {
      const e = entries.get(id);
      if (!e) return;
      objectRoot.remove(e.group);
      objectRoot.remove(e.label);
      if (e.coverage) objectRoot.remove(e.coverage);
      entries.delete(id);
    }

    function refreshLabels() {
      const objs = project()?.objects ?? [];
      objs.forEach((o, i) => {
        const e = entries.get(o.id);
        if (!e) return;
        const t = String(i + 1);
        if (e.labelText !== t) {
          e.labelText = t;
          const old = e.label.material.map;
          e.label.material.map = makeLabel(t).material.map;
          old?.dispose();
        }
      });
    }

    // 同步 store -> 场景
    createEffect(() => {
      const objs = project()?.objects ?? [];
      const seen = new Set();
      for (const o of objs) {
        seen.add(o.id);
        const e = entries.get(o.id) || createEntry(o);
        updateEntry(e, o);
      }
      for (const id of [...entries.keys()]) if (!seen.has(id)) {
        if (selectedId() === id) setSelectedId(null);
        removeEntry(id);
      }
      refreshLabels();
    });

    createEffect(() => {
      project()?.boundary; // 仅跟踪边界引用：边界或项目切换时重建地面并取景
      rebuildGround();
      fitCamera();
    });

    // ---------- 碰撞检测 ----------
    function footprintOf(o) { return objectInfo(o).radius * o.scale; }

    function collidingIds(candidate) {
      const objs = project()?.objects ?? [];
      const hit = new Set();
      const r1 = footprintOf(candidate);
      for (const o of objs) {
        if (o.id === candidate.id) continue;
        const r2 = footprintOf(o);
        if (Math.hypot(o.x - candidate.x, o.z - candidate.z) < r1 + r2) {
          hit.add(o.id);
        }
      }
      return hit;
    }

    function tint(id, red) {
      const e = entries.get(id);
      if (!e) return;
      e.group.traverse((m) => {
        if (m.isMesh && m.material.emissive) {
          m.material.emissive.setHex(red ? 0xff2211 : m.userData.origEmissive);
          m.material.emissiveIntensity = red ? 0.9 : 1;
        }
      });
    }

    let currentCollisions = new Set();
    function applyCollisionTint(set) {
      for (const id of currentCollisions) if (!set.has(id)) tint(id, false);
      for (const id of set) tint(id, true);
      currentCollisions = set;
    }

    // ---------- 选中 ----------
    function select(id) {
      setSelectedId(id);
      if (id) {
        const e = entries.get(id);
        if (e) tc.attach(e.group);
        setPanelTab('props');
      } else {
        tc.detach();
      }
      // 刷新覆盖透明度
      for (const o of project()?.objects ?? []) {
        const e = entries.get(o.id);
        if (e?.coverage) e.coverage.material.opacity = o.id === id ? 0.34 : 0.15;
      }
    }

    createEffect(() => {
      // gizmo 模式切换时调整可用轴
      const m = gizmoMode();
      tc.setMode(m);
      tc.showX = tc.showY = tc.showZ = true;
      if (m === 'translate') tc.showY = false;      // 只在地面平移
      if (m === 'rotate') { tc.showX = false; tc.showZ = false; } // 只绕 Y
    });

    // ---------- gizmo 拖动 ----------
    let preDrag = null;
    let dragging = false;

    function objFromGroup(group) {
      const o = project()?.objects.find((x) => x.id === group.userData.objectId);
      return o || null;
    }

    function onGizmoStart() {
      dragging = true;
      const o = objFromGroup(tc.object);
      if (o) preDrag = { x: o.x, z: o.z, rotY: o.rotY, scale: o.scale };
    }

    function onGizmoChange() {
      const g = tc.object;
      if (!g) return;
      const o = objFromGroup(g);
      if (!o) return;
      if (gizmoMode() === 'scale') {
        const s = (g.scale.x + g.scale.y + g.scale.z) / 3;
        g.scale.setScalar(Math.max(0.2, Math.min(5, s)));
      }
      // 实时碰撞标红
      const cand = { ...o, x: g.position.x, z: g.position.z, scale: g.scale.x };
      const set = collidingIds(cand);
      if (set.size) set.add(o.id);
      applyCollisionTint(set);
      // 覆盖圆跟随
      const e = entries.get(o.id);
      if (e?.coverage) e.coverage.position.set(g.position.x, 0.03, g.position.z);
      if (e?.label) e.label.position.set(g.position.x, 2.2 * g.scale.x + 0.4, g.position.z);
    }

    function onGizmoEnd() {
      dragging = false;
      const g = tc.object;
      const o = g && objFromGroup(g);
      if (!o) return;
      if (currentCollisions.size > 0) {
        // 重叠不允许落位：回退
        applyCollisionTint(new Set());
        updateEntry(entries.get(o.id), o);
        notify('与其他物体重叠，已回退，不允许落位');
        return;
      }
      let x = g.position.x, z = g.position.z;
      // 靠近边界时吸附到边界
      const b = project()?.boundary;
      if (b?.length >= 3) {
        const c = closestOnBoundary(x, z, b);
        if (c && c.dist < SNAP_DIST) { x = c.x; z = c.z; }
      }
      updateProject(project().id, (p) => ({
        ...p,
        objects: p.objects.map((it) => it.id === o.id
          ? { ...it, x, z, rotY: g.rotation.y, scale: g.scale.x }
          : it),
      }));
    }

    // ---------- 点击选中 ----------
    let downPos = null;
    canvas.addEventListener('pointerdown', (e) => { downPos = [e.clientX, e.clientY]; });
    canvas.addEventListener('pointerup', (e) => {
      if (!downPos) return;
      const moved = Math.hypot(e.clientX - downPos[0], e.clientY - downPos[1]);
      downPos = null;
      if (moved > 5 || dragging) return;
      if (camMode() === 'walk') return;
      if (drawMode()) { addDrawPoint(e); return; }
      const r = canvas.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -((e.clientY - r.top) / r.height) * 2 + 1
      );
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(objectRoot.children, true);
      const hit = hits.find((h) => h.object.userData.objectId || h.object.parent?.userData.objectId);
      let id = null;
      if (hit) {
        let n = hit.object;
        while (n && !n.userData.objectId) n = n.parent;
        id = n?.userData.objectId ?? null;
      }
      select(id);
    });

    // ---------- 素材拖入 ----------
    function ensureGhost(asset) {
      removeGhost();
      ghost = buildModel(asset.category, 1);
      ghost.traverse((m) => {
        if (m.isMesh) {
          m.material = m.material.clone();
          m.material.transparent = true;
          m.material.opacity = 0.6;
        }
      });
      scene.add(ghost);
    }
    function removeGhost() {
      if (ghost) { scene.remove(ghost); ghost = null; }
    }
    function tintGhost(valid) {
      ghost?.traverse((m) => {
        if (m.isMesh && m.material.emissive) m.material.emissive.setHex(valid ? 0x00aa44 : 0xff2211);
      });
    }

    canvas.addEventListener('dragover', (e) => {
      e.preventDefault();
      const asset = dragAsset();
      if (!asset) return;
      if (!ghost) ensureGhost(asset);
      const p = pickGround(e.clientX, e.clientY);
      if (!p) return;
      let { x, z } = p;
      const b = project()?.boundary;
      if (b?.length >= 3) {
        const c = closestOnBoundary(x, z, b);
        if (c && c.dist < SNAP_DIST) { x = c.x; z = c.z; }
      }
      ghost.position.set(x, 0, z);
      const cand = { id: '__ghost__', category: asset.category, x, z, scale: 1, footprint: asset.radius };
      tintGhost(collidingIds(cand).size === 0);
    });
    canvas.addEventListener('dragleave', removeGhost);
    canvas.addEventListener('drop', (e) => {
      e.preventDefault();
      const asset = dragAsset();
      removeGhost();
      if (!asset) return;
      const p = pickGround(e.clientX, e.clientY);
      if (!p) return;
      let { x, z } = p;
      const b = project()?.boundary;
      if (b?.length >= 3) {
        const c = closestOnBoundary(x, z, b);
        if (c && c.dist < SNAP_DIST) { x = c.x; z = c.z; notify('已吸附到边界'); }
      }
      const cand = { id: '__new__', category: asset.category, x, z, scale: 1, footprint: asset.radius };
      if (collidingIds(cand).size > 0) {
        notify('落点与已有物体重叠，不允许落位');
        return;
      }
      const obj = {
        id: genId('o'),
        assetId: asset.id,
        category: asset.category,
        snapName: asset.name,
        snapModel: asset.model,
        snapPrice: asset.price,
        x, z,
        rotY: 0,
        scale: 1,
        ...(CATEGORIES[asset.category]?.spray ? { range: asset.sprayRange ?? 6, arc: asset.sprayArc ?? 180 } : {}),
      };
      updateProject(project().id, (pr) => ({ ...pr, objects: [...pr.objects, obj] }));
      select(obj.id);
    });

    // ---------- 手绘边界 ----------
    let drawLine = null;
    const drawMarkers = new THREE.Group();
    scene.add(drawMarkers);

    function addDrawPoint(e) {
      const p = pickGround(e.clientX, e.clientY);
      if (!p) return;
      setDrawPoints((pts) => [...pts, [+p.x.toFixed(2), +p.z.toFixed(2)]]);
    }

    createEffect(() => {
      const pts = drawPoints();
      drawMarkers.clear();
      if (drawLine) { scene.remove(drawLine); drawLine = null; }
      if (!drawMode() || !pts.length) return;
      for (const [x, z] of pts) {
        const m = new THREE.Mesh(
          new THREE.SphereGeometry(0.25, 10, 8),
          new THREE.MeshBasicMaterial({ color: 0xffcc00 })
        );
        m.position.set(x, 0.1, z);
        drawMarkers.add(m);
      }
      const path = pts.map(([x, z]) => new THREE.Vector3(x, 0.08, z));
      if (path.length > 1) {
        drawLine = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(path),
          new THREE.LineBasicMaterial({ color: 0xffcc00 })
        );
        scene.add(drawLine);
      }
    });

    function finishBoundary() {
      const pts = drawPoints();
      if (pts.length < 3) { notify('至少需要 3 个点'); return; }
      updateProject(project().id, (p) => ({ ...p, boundary: pts }));
      setDrawMode(false);
      setDrawPoints([]);
      notify('地面已生成');
    }

    // ---------- 相机模式 ----------
    createEffect(() => {
      const mode = camMode();
      const b = project()?.boundary;
      const bb = b?.length >= 3 ? boundaryBounds(b) : { cx: 0, cz: 0, w: 40, d: 30 };
      if (mode === 'walk') {
        orbit.enabled = false;
        tc.enabled = false;
        camera.position.set(bb.cx, 1.7, bb.cz + Math.max(bb.w, bb.d) * 0.4);
        camera.lookAt(bb.cx, 1.7, bb.cz);
        notify('点击画面锁定鼠标，WASD 漫游，Esc 退出');
      } else {
        tc.enabled = true;
        orbit.enabled = true;
        if (plc.isLocked) plc.unlock();
        if (mode === 'top') {
          orbit.enableRotate = false;
          orbit.target.set(bb.cx, 0, bb.cz);
          camera.position.set(bb.cx, Math.max(bb.w, bb.d) * 1.3, bb.cz + 0.01);
          camera.up.set(0, 0, -1);
        } else {
          orbit.enableRotate = true;
          camera.up.set(0, 1, 0);
          fitCamera();
        }
      }
    });

    canvas.addEventListener('click', () => {
      if (camMode() === 'walk' && !plc.isLocked) plc.lock();
    });

    // 第一人称移动
    const keys = {};
    const onKeyDown = (e) => {
      keys[e.code] = true;
      if (e.code === 'Delete' && selectedId() && !e.target.closest('input,textarea,select')) {
        deleteSelected();
      }
      if (camMode() !== 'walk' && !e.target.closest('input,textarea,select')) {
        if (e.code === 'KeyW') setGizmoMode('translate');
        if (e.code === 'KeyE') setGizmoMode('rotate');
        if (e.code === 'KeyR') setGizmoMode('scale');
      }
    };
    const onKeyUp = (e) => { keys[e.code] = false; };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // ---------- 主循环 ----------
    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const dt = Math.min(clock.getDelta(), 0.05);
      if (camMode() === 'walk' && plc.isLocked) {
        const sp = 8 * dt;
        if (keys.KeyW) plc.moveForward(sp);
        if (keys.KeyS) plc.moveForward(-sp);
        if (keys.KeyA) plc.moveRight(-sp);
        if (keys.KeyD) plc.moveRight(sp);
        camera.position.y = 1.7;
      }
      if (camMode() !== 'walk') orbit.update();
      renderer.render(scene, camera);
    });

    // ---------- 尺寸 ----------
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth, h = container.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(container);

    // ---------- 暴露给模板的方法 ----------
    api.deleteSelected = deleteSelected;
    api.select = select;
    api.exportPNG = () => {
      const objs = (project()?.objects ?? []).map((o) => ({
        ...o, label: `${objectInfo(o).name} ${objectInfo(o).model}`,
      }));
      const helper = tc.getHelper ? tc.getHelper() : tc;
      const hide = [helper, ...[...entries.values()].map((e) => e.label)];
      exportTopViewPNG({ scene, boundary: project()?.boundary ?? [], objects: objs, filename: `${project()?.name ?? '俯视图'}.png`, hide });
    };
    api.exportCSV = () => {
      const objs = (project()?.objects ?? []).map((o) => {
        const info = objectInfo(o);
        return { ...o, ...info, categoryLabel: CATEGORIES[o.category]?.label ?? o.category };
      });
      exportCSV(objs, `${project()?.name ?? '布置'}.csv`);
    };
    api.fitCamera = fitCamera;

    function deleteSelected() {
      const id = selectedId();
      if (!id) return;
      updateProject(project().id, (p) => ({ ...p, objects: p.objects.filter((o) => o.id !== id) }));
      select(null);
      notify('已删除');
    }

    onCleanup(() => {
      ro.disconnect();
      renderer.setAnimationLoop(null);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      tc.dispose();
      orbit.dispose();
      renderer.dispose();
    });
  }

  const api = {};

  // ---------- 边界导入 ----------
  function importBoundary(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        let pts = null;
        if (Array.isArray(data) && data.length >= 3) pts = data;
        else if (Array.isArray(data?.boundary)) pts = data.boundary;
        else if (data?.type === 'Feature' && data.geometry?.type === 'Polygon') pts = data.geometry.coordinates[0];
        else if (data?.type === 'Polygon') pts = data.coordinates[0];
        if (!pts || pts.length < 3) throw new Error('bad');
        pts = pts.map((p) => [Number(p[0]), Number(p[1])]).filter((p) => isFinite(p[0]) && isFinite(p[1]));
        updateProject(project().id, (pr) => ({ ...pr, boundary: pts }));
        notify(`已导入边界（${pts.length} 点）`);
      } catch {
        notify('边界文件格式无法识别（支持 [[x,z],...] 或 GeoJSON Polygon）');
      }
    };
    reader.readAsText(file);
  }

  const hasBoundary = createMemo(() => (project()?.boundary?.length ?? 0) >= 3);

  return (
    <div class="editor">
      {/* 顶部工具栏 */}
      <div class="toolbar">
        <select
          value={state.activeProjectId}
          onChange={(e) => { setState('activeProjectId', e.currentTarget.value); api.select?.(null); }}
        >
          <For each={state.projects}>
            {(p) => <option value={p.id}>{p.name}（{p.objects.length} 件）</option>}
          </For>
        </select>
        <button onClick={() => { const name = prompt('新项目名称'); if (name !== null) addProject(name); }}>＋项目</button>
        <span class="sep" />
        <span class="tg-label">相机</span>
        <button classList={{ on: camMode() === 'orbit' }} onClick={() => setCamMode('orbit')}>斜视</button>
        <button classList={{ on: camMode() === 'top' }} onClick={() => setCamMode('top')}>俯视</button>
        <button classList={{ on: camMode() === 'walk' }} onClick={() => setCamMode('walk')}>漫游</button>
        <span class="sep" />
        <span class="tg-label">手柄</span>
        <button classList={{ on: gizmoMode() === 'translate' }} onClick={() => setGizmoMode('translate')}>移动</button>
        <button classList={{ on: gizmoMode() === 'rotate' }} onClick={() => setGizmoMode('rotate')}>旋转</button>
        <button classList={{ on: gizmoMode() === 'scale' }} onClick={() => setGizmoMode('scale')}>缩放</button>
        <span class="sep" />
        <label><input type="checkbox" checked={showCoverage()} onChange={(e) => setShowCoverage(e.currentTarget.checked)} /> 喷洒覆盖</label>
        <label><input type="checkbox" checked={showLabels()} onChange={(e) => setShowLabels(e.currentTarget.checked)} /> 编号</label>
        <span class="sep" />
        <button onClick={() => api.exportPNG()} disabled={!hasBoundary()}>导出俯视图</button>
        <button onClick={() => api.exportCSV()}>导出坐标</button>
        <button
          disabled={!project() || project().status === 'review'}
          onClick={() => { if (project()) { setProjectStatus(project().id, 'review'); notify('已提交审查'); } }}
        >提交审查</button>
        <Show when={project() && project().status !== 'draft'}>
          <span class={`status st-${project().status}`}>
            {{ review: '审查中', approved: '已通过', rejected: '已驳回' }[project().status]}
          </span>
        </Show>
      </div>

      <div class="editor-body">
        {/* 素材库面板 */}
        <div class="palette">
          <div class="palette-title">素材库（拖入场景）</div>
          <For each={CATEGORY_KEYS}>
            {(cat) => (
              <div class="pal-group">
                <div class="pal-cat" style={{ color: CATEGORIES[cat].css }}>{CATEGORIES[cat].label}</div>
                <For each={state.catalog.filter((c) => c.category === cat)}>
                  {(item) => (
                    <div
                      class="pal-item"
                      draggable={hasBoundary()}
                      title={`${item.model} ¥${item.price}`}
                      onDragStart={() => setDragAsset(item)}
                      onDragEnd={() => setDragAsset(null)}
                    >
                      <span class="pal-model">{item.model}</span>
                      <span class="pal-price">¥{item.price}</span>
                    </div>
                  )}
                </For>
              </div>
            )}
          </For>
          <Show when={!hasBoundary()}>
            <div class="pal-hint">请先生成地面边界</div>
          </Show>
        </div>

        {/* 三维画布 */}
        <div class="viewport" ref={container}>
          <canvas ref={canvas} />
          <Show when={!hasBoundary()}>
            <div class="boundary-setup">
              <h3>场地边界</h3>
              <p>导入边界文件（JSON / GeoJSON），或在场景中手绘边界后生成地面。</p>
              <div class="bs-actions">
                <label class="btn">
                  导入边界文件
                  <input type="file" accept=".json,.geojson" style="display:none"
                    onChange={(e) => e.currentTarget.files[0] && importBoundary(e.currentTarget.files[0])} />
                </label>
                <button class="btn" onClick={() => { setDrawMode(true); setDrawPoints([]); }}>手绘边界</button>
              </div>
            </div>
          </Show>
          <Show when={drawMode()}>
            <div class="draw-bar">
              手绘边界：点击地面加点（{drawPoints().length} 个）
              <button onClick={finishBoundary}>闭合生成地面</button>
              <button onClick={() => setDrawPoints((p) => p.slice(0, -1))}>撤销点</button>
              <button onClick={() => { setDrawMode(false); setDrawPoints([]); }}>取消</button>
            </div>
          </Show>
          <Show when={hasBoundary()}>
            <div class="vp-tools">
              <button onClick={() => { setDrawMode(true); setDrawPoints([]); }}>重绘边界</button>
              <label class="btn">
                导入边界
                <input type="file" accept=".json,.geojson" style="display:none"
                  onChange={(e) => e.currentTarget.files[0] && importBoundary(e.currentTarget.files[0])} />
              </label>
            </div>
          </Show>
          <Show when={toast()}>
            <div class="toast">{toast()}</div>
          </Show>
        </div>

        {/* 右侧属性 / 物料清单 */}
        <div class="side">
          <div class="side-tabs">
            <button classList={{ on: panelTab() === 'props' }} onClick={() => setPanelTab('props')}>属性</button>
            <button classList={{ on: panelTab() === 'bom' }} onClick={() => setPanelTab('bom')}>物料清单</button>
          </div>
          <Show when={panelTab() === 'props'}>
            <Show when={selectedObj()} fallback={<div class="side-hint">点击场景中的物体进行选中；从左侧素材库拖入新物体。</div>}>
              {(obj) => <ObjectProps obj={obj()} projectId={project().id} onDelete={() => api.deleteSelected()} />}
            </Show>
          </Show>
          <Show when={panelTab() === 'bom'}>
            <BomPanel bom={bom()} />
          </Show>
        </div>
      </div>
    </div>
  );
}

function ObjectProps(props) {
  const info = createMemo(() => objectInfo(props.obj));
  const isSpray = () => CATEGORIES[props.obj.category]?.spray;

  const patch = (p) => {
    updateProject(props.projectId, (pr) => ({
      ...pr,
      objects: pr.objects.map((o) => (o.id === props.obj.id ? { ...o, ...p } : o)),
    }));
  };

  return (
    <div class="props">
      <div class="prop-title">
        <span class="dot" style={{ background: CATEGORIES[props.obj.category]?.css }} />
        {info().name} · {info().model}
      </div>
      <div class="prop-row"><span>类别</span><b>{CATEGORIES[props.obj.category]?.label}</b></div>
      <div class="prop-row"><span>单价</span><b>¥{info().price}</b></div>
      <div class="prop-row">
        <span>位置</span>
        <b>X {props.obj.x.toFixed(2)} / Z {props.obj.z.toFixed(2)}</b>
      </div>
      <label class="prop-slider">
        朝向 {Math.round((props.obj.rotY * 180) / Math.PI)}°
        <input type="range" min="-180" max="180" step="1"
          value={Math.round((props.obj.rotY * 180) / Math.PI)}
          onInput={(e) => patch({ rotY: (Number(e.currentTarget.value) * Math.PI) / 180 })} />
      </label>
      <label class="prop-slider">
        缩放 ×{props.obj.scale.toFixed(2)}
        <input type="range" min="0.3" max="3" step="0.05"
          value={props.obj.scale}
          onInput={(e) => patch({ scale: Number(e.currentTarget.value) })} />
      </label>
      <Show when={isSpray()}>
        <label class="prop-slider">
          射程 {props.obj.range} m
          <input type="range" min="1" max="25" step="0.5"
            value={props.obj.range}
            onInput={(e) => patch({ range: Number(e.currentTarget.value) })} />
        </label>
        <label class="prop-slider">
          喷洒角度 {props.obj.arc}°
          <input type="range" min="30" max="360" step="5"
            value={props.obj.arc}
            onInput={(e) => patch({ arc: Number(e.currentTarget.value) })} />
        </label>
      </Show>
      <button class="danger" onClick={props.onDelete}>删除该物体</button>
    </div>
  );
}

function BomPanel(props) {
  return (
    <div class="bom">
      <table>
        <thead>
          <tr><th>类别</th><th>型号</th><th>数量</th><th>单价</th><th>金额</th></tr>
        </thead>
        <tbody>
          <For each={props.bom.rows} fallback={<tr><td colSpan="5" class="side-hint">尚未布置任何物体</td></tr>}>
            {(r) => (
              <tr>
                <td>{r.categoryLabel}</td>
                <td>{r.model}</td>
                <td>{r.count}</td>
                <td>¥{r.price}</td>
                <td>¥{r.amount.toLocaleString()}</td>
              </tr>
            )}
          </For>
        </tbody>
        <tfoot>
          <tr><td colSpan="4">合计</td><td>¥{props.bom.total.toLocaleString()}</td></tr>
        </tfoot>
      </table>
    </div>
  );
}
