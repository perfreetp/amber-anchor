<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { editor } from '../lib/store.svelte.js';
  import { seaTypeColor } from '../lib/sample-data.js';

  let mount;
  let renderer;
  let scene;
  let camera;
  let controls;
  let group;
  let rafId = 0;
  let ro;
  let autoRotate = $state(false);
  let verticalScale = $state(1);

  function buildScene() {
    if (!group) return;
    for (const child of [...group.children]) {
      child.geometry?.dispose?.();
      child.material?.dispose?.();
      group.remove(child);
    }
    // 世界坐标 y（北向）映射到 three 的 -z，使相机斜视方向与平面图一致
    for (const p of editor.parcels) {
      const shape = new THREE.Shape();
      p.rings[0].forEach((v, i) => {
        const x = v.x;
        const z = -v.y;
        if (i === 0) shape.moveTo(x, z);
        else shape.lineTo(x, z);
      });
      shape.closePath();
      for (let ri = 1; ri < p.rings.length; ri++) {
        const hole = new THREE.Path();
        p.rings[ri].forEach((v, i) => {
          const x = v.x;
          const z = -v.y;
          if (i === 0) hole.moveTo(x, z);
          else hole.lineTo(x, z);
        });
        hole.closePath();
        shape.holes.push(hole);
      }
      const depth = p.elevation * verticalScale;
      const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, steps: 1 });
      geo.rotateX(-Math.PI / 2); // 把 shape 平面 (x,y) 转为 (x,z)，拉伸到 +y
      geo.computeVertexNormals();
      const base = new THREE.Color(seaTypeColor(p.seaType));
      const mat = new THREE.MeshStandardMaterial({
        color: base,
        transparent: true,
        opacity: p.id === editor.selectedParcelId ? 0.95 : 0.72,
        roughness: 0.55,
        metalness: 0.08
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData.parcelId = p.id;
      if (p.id === editor.selectedParcelId) {
        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(geo),
          new THREE.LineBasicMaterial({ color: 0x0d253f, linewidth: 1 })
        );
        mesh.add(edges);
      }
      group.add(mesh);
    }
    frameAll();
  }

  function frameAll() {
    if (!group.children.length || !camera) return;
    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.z, 400);
    camera.zoom = Math.min(mount.clientWidth, mount.clientHeight) / (maxDim * 1.5);
    camera.position.set(center.x, maxDim * 1.1, center.z + maxDim * 0.9);
    camera.lookAt(center);
    controls.target.copy(center);
    camera.updateProjectionMatrix();
    controls.update();
  }

  let stopEffect;
  onMount(() => {
    const w = mount.clientWidth;
    const h = mount.clientHeight;
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(w, h);
    mount.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeef3f7);
    camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, 1, 200000);
    camera.position.set(3000, 4000, 5000);
    camera.lookAt(2000, 0, 1000);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxPolarAngle = Math.PI * 0.49;

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const sun = new THREE.DirectionalLight(0xffffff, 1.1);
    sun.position.set(2000, 5000, 3000);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xcfe3ff, 0.35);
    fill.position.set(-3000, 2000, -2000);
    scene.add(fill);

    group = new THREE.Group();
    scene.add(group);

    // 网格参考面
    const grid = new THREE.GridHelper(8000, 40, 0x90a4b8, 0xc4d2de);
    grid.position.y = -0.5;
    scene.add(grid);

    buildScene();

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(group.children);
      if (hits.length) editor.selectParcel(hits[0].object.userData.parcelId);
    };
    renderer.domElement.addEventListener('click', onClick);

    ro = new ResizeObserver(() => {
      const cw = mount.clientWidth;
      const ch = mount.clientHeight;
      renderer.setSize(cw, ch);
      camera.left = -cw / 2;
      camera.right = cw / 2;
      camera.top = ch / 2;
      camera.bottom = -ch / 2;
      camera.updateProjectionMatrix();
    });
    ro.observe(mount);

    const loop = () => {
      rafId = requestAnimationFrame(loop);
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 0.8;
      controls.update();
      renderer.render(scene, camera);
    };
    loop();

    stopEffect = $effect.root(() => {
      $effect(() => {
        void editor.parcels;
        void editor.selectedParcelId;
        void verticalScale;
        buildScene();
      });
    });

    onDestroy(() => {
      stopEffect?.();
      cancelAnimationFrame(rafId);
      ro?.disconnect();
      renderer.domElement.removeEventListener('click', onClick);
      controls.dispose();
      renderer.dispose();
      mount?.removeChild(renderer.domElement);
    });
  });
</script>

<div class="three-wrap" bind:this={mount}>
  <div class="three-toolbar">
    <button class="mini" onclick={() => frameAll()} title="重置视角">⤢ 复位</button>
    <button class="mini" class:active={autoRotate} onclick={() => (autoRotate = !autoRotate)}>
      {autoRotate ? '⏸ 停止旋转' : '▶ 自动旋转'}
    </button>
    <label class="mini">
      高程倍率
      <input type="range" min="0.2" max="4" step="0.1" bind:value={verticalScale} />
      {verticalScale.toFixed(1)}×
    </label>
  </div>
  <div class="three-legend">斜视预览：柱体高度 = 用海高程（m），点击柱体可选中宗海</div>
</div>

<style>
  .three-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 260px;
  }
  .three-toolbar {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 2;
    display: flex;
    gap: 6px;
    align-items: center;
    background: rgba(255, 255, 255, 0.9);
    padding: 5px 8px;
    border-radius: 6px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  }
  button.mini,
  label.mini {
    font-size: 12px;
    border: 1px solid #c2cedb;
    background: #fff;
    border-radius: 4px;
    padding: 3px 8px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  button.mini.active {
    background: #e3f0ff;
    border-color: #1565c0;
    color: #0d47a1;
  }
  input[type='range'] {
    width: 80px;
  }
  .three-legend {
    position: absolute;
    right: 8px;
    bottom: 8px;
    font-size: 11px;
    color: #37506b;
    background: rgba(255, 255, 255, 0.88);
    padding: 4px 8px;
    border-radius: 5px;
  }
</style>
