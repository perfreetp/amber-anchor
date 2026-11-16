import * as BABYLON from '@babylonjs/core';
import type {
  ControlPoint,
  GreeningParams,
  Placement,
  RoadSample,
  Season,
  TreeSpecies,
  Vec3,
} from '../types';
import { sampleAt } from '../core/geometry';

interface TreeTemplate {
  trunk: BABYLON.Mesh;
  crown: BABYLON.Mesh;
}

interface TemplateMeshes {
  root: BABYLON.TransformNode;
  pickables: { mesh: BABYLON.Mesh; ids: string[] }[];
  disposables: BABYLON.Mesh[];
  trees: Record<TreeSpecies, TreeTemplate>;
  shrub: BABYLON.Mesh;
  lampPole: BABYLON.Mesh;
  lampHead: BABYLON.Mesh;
  flower: BABYLON.Mesh;
  lockRing: BABYLON.Mesh;
}

const TREE_SPECIES_STYLE: Record<
  TreeSpecies,
  { trunkH: number; crownR: number; crownY: number; crownScaleY: number; summer: BABYLON.Color3; winter: BABYLON.Color3 }
> = {
  camphor: {
    trunkH: 2.4,
    crownR: 1.7,
    crownY: 3.4,
    crownScaleY: 0.95,
    summer: new BABYLON.Color3(0.16, 0.42, 0.18),
    winter: new BABYLON.Color3(0.32, 0.36, 0.24),
  },
  ginkgo: {
    trunkH: 2.2,
    crownR: 1.35,
    crownY: 3.0,
    crownScaleY: 1.1,
    summer: new BABYLON.Color3(0.42, 0.55, 0.16),
    winter: new BABYLON.Color3(0.45, 0.38, 0.22),
  },
  plane: {
    trunkH: 2.8,
    crownR: 1.6,
    crownY: 3.9,
    crownScaleY: 1.25,
    summer: new BABYLON.Color3(0.2, 0.48, 0.24),
    winter: new BABYLON.Color3(0.35, 0.38, 0.28),
  },
};

export interface EngineCallbacks {
  onGroundClick?: (p: ControlPoint) => void;
  onPlacementMoved?: (id: string, world: Vec3) => void;
  onBoxSelect?: (segments: number[]) => void;
  onSelectionCleared?: () => void;
}

/**
 * Babylon 场景引擎。
 * 所有绿化对象一律走 thin instance（每类一个 draw call），
 * 300+ 树木场景仍保持稳定帧率。
 */
export class SceneEngine {
  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;
  private camera: BABYLON.ArcRotateCamera;
  private ground: BABYLON.Mesh;
  private groundMat: BABYLON.StandardMaterial;
  private roadRoot: BABYLON.TransformNode;
  private placementRoot: BABYLON.TransformNode;
  private markerRoot: BABYLON.TransformNode;
  private selectRoot: BABYLON.TransformNode;
  private callbacks: EngineCallbacks = {};

  private tool: string = 'draw';
  private season: Season = 'summer';
  private currentSamples: RoadSample[] = [];
  private currentParams: GreeningParams | null = null;
  private currentPlacements: Placement[] = [];
  private segmentLength = 20;

  // 拾取映射：mesh uniqueId + thinInstanceIndex -> placement id
  private pickMap = new Map<string, string>();

  // 拖动状态
  private draggingId: string | null = null;
  private dragMarker: BABYLON.Mesh | null = null;
  private downX = 0;
  private downY = 0;
  private downTime = 0;

  // 框选状态
  private selecting = false;
  private selectDiv: HTMLDivElement;
  private selectStart = { x: 0, y: 0 };

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      disableWebGL2Support: false,
    });
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = new BABYLON.Color4(0.82, 0.88, 0.92, 1);

    this.camera = new BABYLON.ArcRotateCamera(
      'cam',
      -Math.PI / 2.4,
      Math.PI / 3.2,
      90,
      new BABYLON.Vector3(0, 0, 0),
      this.scene,
    );
    this.camera.attachControl(canvas, true);
    this.camera.wheelDeltaPercentage = 0.01;
    this.camera.lowerRadiusLimit = 8;
    this.camera.upperRadiusLimit = 600;
    this.camera.upperBetaLimit = Math.PI / 2.05;

    const hemi = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0.3, 1, 0.2), this.scene);
    hemi.intensity = 0.85;
    const dir = new BABYLON.DirectionalLight('dir', new BABYLON.Vector3(-0.5, -1, -0.4), this.scene);
    dir.intensity = 0.55;

    this.groundMat = new BABYLON.StandardMaterial('groundMat', this.scene);
    this.groundMat.diffuseColor = new BABYLON.Color3(0.42, 0.58, 0.34);
    this.groundMat.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    this.ground = BABYLON.MeshBuilder.CreateGround(
      'ground',
      { width: 6000, height: 6000, subdivisions: 1 },
      this.scene,
    );
    this.ground.material = this.groundMat;

    this.roadRoot = new BABYLON.TransformNode('roadRoot', this.scene);
    this.placementRoot = new BABYLON.TransformNode('placementRoot', this.scene);
    this.markerRoot = new BABYLON.TransformNode('markerRoot', this.scene);
    this.selectRoot = new BABYLON.TransformNode('selectRoot', this.scene);

    this.selectDiv = document.createElement('div');
    Object.assign(this.selectDiv.style, {
      position: 'absolute',
      border: '1.5px dashed #ffd54a',
      background: 'rgba(255, 213, 74, 0.12)',
      pointerEvents: 'none',
      display: 'none',
      zIndex: '5',
    } satisfies Partial<CSSStyleDeclaration>);
    canvas.parentElement?.appendChild(this.selectDiv);

    this.bindPointer();
    this.engine.runRenderLoop(() => this.scene.render());
    const resize = () => this.engine.resize();
    window.addEventListener('resize', resize);
    this.scene.onDisposeObservable.add(() => window.removeEventListener('resize', resize));
  }

  setCallbacks(cb: EngineCallbacks): void {
    this.callbacks = cb;
  }

  setTool(tool: string): void {
    this.tool = tool;
    this.canvas.style.cursor = tool === 'draw' ? 'crosshair' : tool === 'move' ? 'grab' : 'cell';
    if (tool !== 'select') this.hideSelectionRect();
  }

  // ---------------- 道路 ----------------

  refreshRoad(samples: RoadSample[], params: GreeningParams, controlPoints: ControlPoint[], segmentLength: number): void {
    this.currentSamples = samples;
    this.currentParams = params;
    this.segmentLength = segmentLength;
    this.clearNode(this.roadRoot);
    this.clearNode(this.markerRoot);
    if (samples.length < 2) return;

    const half = params.roadWidth / 2;
    const left: BABYLON.Vector3[] = [];
    const right: BABYLON.Vector3[] = [];
    const center: BABYLON.Vector3[] = [];
    for (const s of samples) {
      left.push(new BABYLON.Vector3(s.x + s.nx * half, 0.02, s.z + s.nz * half));
      right.push(new BABYLON.Vector3(s.x - s.nx * half, 0.02, s.z - s.nz * half));
      center.push(new BABYLON.Vector3(s.x, 0.05, s.z));
    }

    // 路面
    const roadMat = new BABYLON.StandardMaterial('roadMat', this.scene);
    roadMat.diffuseColor = new BABYLON.Color3(0.32, 0.33, 0.35);
    roadMat.specularColor = new BABYLON.Color3(0.08, 0.08, 0.08);
    const road = BABYLON.MeshBuilder.CreateRibbon(
      'road',
      { pathArray: [left, right], closeArray: false, closePath: false },
      this.scene,
    );
    road.material = roadMat;
    road.parent = this.roadRoot;

    // 路缘（两侧抬高的窄带）
    const curbMat = new BABYLON.StandardMaterial('curbMat', this.scene);
    curbMat.diffuseColor = new BABYLON.Color3(0.78, 0.78, 0.74);
    for (const sign of [1, -1]) {
      const edgeIn: BABYLON.Vector3[] = [];
      const edgeOut: BABYLON.Vector3[] = [];
      for (const s of samples) {
        const off = sign * half;
        const off2 = sign * (half + 0.3);
        edgeIn.push(new BABYLON.Vector3(s.x + s.nx * off, 0.1, s.z + s.nz * off));
        edgeOut.push(new BABYLON.Vector3(s.x + s.nx * off2, 0.1, s.z + s.nz * off2));
      }
      const curb = BABYLON.MeshBuilder.CreateRibbon(
        `curb-${sign}`,
        { pathArray: [edgeIn, edgeOut] },
        this.scene,
      );
      curb.material = curbMat;
      curb.parent = this.roadRoot;
    }

    // 中心线（黄色虚线，thin instance 小方块）
    const dashMat = new BABYLON.StandardMaterial('dashMat', this.scene);
    dashMat.diffuseColor = new BABYLON.Color3(0.95, 0.8, 0.25);
    dashMat.emissiveColor = new BABYLON.Color3(0.35, 0.28, 0.05);
    const dashTemplate = BABYLON.MeshBuilder.CreateBox('dash', { size: 1 }, this.scene);
    dashTemplate.material = dashMat;
    const dashMatrices: BABYLON.Matrix[] = [];
    const total = samples[samples.length - 1].s;
    for (let s = 1; s < total - 0.5; s += 3) {
      const smp = sampleAt(samples, s);
      if (!smp) continue;
      const yaw = Math.atan2(smp.tx, smp.tz);
      dashMatrices.push(
        BABYLON.Matrix.Compose(
          new BABYLON.Vector3(0.22, 0.04, 1.4),
          BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, yaw),
          new BABYLON.Vector3(smp.x, 0.06, smp.z),
        ),
      );
    }
    this.commitInstances(dashTemplate, dashMatrices, null);
    dashTemplate.parent = this.roadRoot;

    // 分段边界（暗红色细线，便于识别“段”）
    const segMat = new BABYLON.StandardMaterial('segMat', this.scene);
    segMat.diffuseColor = new BABYLON.Color3(0.6, 0.25, 0.2);
    segMat.alpha = 0.55;
    const segTemplate = BABYLON.MeshBuilder.CreateBox('segline', { size: 1 }, this.scene);
    segTemplate.material = segMat;
    const segMatrices: BABYLON.Matrix[] = [];
    for (let s = segmentLength; s < total; s += segmentLength) {
      const smp = sampleAt(samples, s);
      if (!smp) continue;
      const yaw = Math.atan2(smp.nx, smp.nz);
      segMatrices.push(
        BABYLON.Matrix.Compose(
          new BABYLON.Vector3(params.roadWidth + 0.6, 0.03, 0.18),
          BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, yaw),
          new BABYLON.Vector3(smp.x, 0.07, smp.z),
        ),
      );
    }
    this.commitInstances(segTemplate, segMatrices, null);
    segTemplate.parent = this.roadRoot;

    // 绘制阶段的控制点标记
    if (controlPoints.length) {
      const markerMat = new BABYLON.StandardMaterial('markerMat', this.scene);
      markerMat.diffuseColor = new BABYLON.Color3(0.95, 0.45, 0.15);
      markerMat.emissiveColor = new BABYLON.Color3(0.4, 0.15, 0.02);
      for (const p of controlPoints) {
        const m = BABYLON.MeshBuilder.CreateSphere('cp', { diameter: 0.9, segments: 12 }, this.scene);
        m.material = markerMat;
        m.position = new BABYLON.Vector3(p.x, 0.5, p.z);
        m.parent = this.markerRoot;
      }
    }
  }

  // ---------------- 布置（实例化） ----------------

  refreshPlacements(placements: Placement[], params: GreeningParams): void {
    this.currentPlacements = placements;
    this.currentParams = params;
    this.clearNode(this.placementRoot);
    this.pickMap.clear();
    if (!placements.length) return;

    const templates = this.buildTemplates();
    const buckets = new Map<BABYLON.Mesh, { m: BABYLON.Matrix; c: BABYLON.Color4; id: string }[]>();
    const ensure = (mesh: BABYLON.Mesh) => {
      let b = buckets.get(mesh);
      if (!b) {
        b = [];
        buckets.set(mesh, b);
      }
      return b;
    };

    for (const p of placements) {
      const smp = sampleAt(this.currentSamples, p.s);
      const yaw = smp ? Math.atan2(smp.tx, smp.tz) : 0;

      if (p.kind === 'tree' && p.species) {
        const style = TREE_SPECIES_STYLE[p.species];
        const tpl = templates.trees[p.species];
        const winterScale = this.season === 'winter' ? 0.62 : 1;
        const crownScale = p.canopy * winterScale;
        const trunkM = BABYLON.Matrix.Compose(
          new BABYLON.Vector3(1, 1, 1),
          BABYLON.Quaternion.Identity(),
          new BABYLON.Vector3(p.position.x, style.trunkH / 2, p.position.z),
        );
        ensure(tpl.trunk).push({
          m: trunkM,
          c: new BABYLON.Color4(0.36, 0.24, 0.13, 1),
          id: p.id,
        });
        const crownColor = this.season === 'winter' ? style.winter : style.summer;
        const crownM = BABYLON.Matrix.Compose(
          new BABYLON.Vector3(crownScale, crownScale * style.crownScaleY, crownScale),
          BABYLON.Quaternion.Identity(),
          new BABYLON.Vector3(p.position.x, style.crownY, p.position.z),
        );
        ensure(tpl.crown).push({
          m: crownM,
          c: new BABYLON.Color4(crownColor.r, crownColor.g, crownColor.b, 1),
          id: p.id,
        });
        if (p.locked) {
          const ringM = BABYLON.Matrix.Compose(
            new BABYLON.Vector3(1, 1, 1),
            BABYLON.Quaternion.RotationAxis(BABYLON.Axis.X, Math.PI / 2),
            new BABYLON.Vector3(p.position.x, 0.06, p.position.z),
          );
          ensure(templates.lockRing).push({
            m: ringM,
            c: new BABYLON.Color4(1, 0.78, 0.2, 1),
            id: p.id,
          });
        }
      } else if (p.kind === 'shrub') {
        const sc = p.canopy;
        const m = BABYLON.Matrix.Compose(
          new BABYLON.Vector3(sc, sc * 0.7, sc),
          BABYLON.Quaternion.Identity(),
          new BABYLON.Vector3(p.position.x, 0.32 * sc, p.position.z),
        );
        const color =
          this.season === 'winter'
            ? new BABYLON.Color4(0.4, 0.38, 0.3, 1)
            : new BABYLON.Color4(0.22, 0.45, 0.2, 1);
        ensure(templates.shrub).push({ m, c: color, id: p.id });
      } else if (p.kind === 'lamp') {
        ensure(templates.lampPole).push({
          m: BABYLON.Matrix.Compose(
            BABYLON.Vector3.One(),
            BABYLON.Quaternion.Identity(),
            new BABYLON.Vector3(p.position.x, 2.5, p.position.z),
          ),
          c: new BABYLON.Color4(0.25, 0.27, 0.3, 1),
          id: p.id,
        });
        ensure(templates.lampHead).push({
          m: BABYLON.Matrix.Compose(
            BABYLON.Vector3.One(),
            BABYLON.Quaternion.Identity(),
            new BABYLON.Vector3(p.position.x, 5.1, p.position.z),
          ),
          c: new BABYLON.Color4(1, 0.9, 0.55, 1),
          id: p.id,
        });
      } else if (p.kind === 'flowerbed') {
        const len = params.flowerBedLength;
        const m = BABYLON.Matrix.Compose(
          new BABYLON.Vector3(1.3, 0.5, len),
          BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, yaw),
          new BABYLON.Vector3(p.position.x, 0.25, p.position.z),
        );
        const color =
          this.season === 'winter'
            ? new BABYLON.Color4(0.5, 0.4, 0.35, 1)
            : new BABYLON.Color4(0.85, 0.3, 0.45, 1);
        ensure(templates.flower).push({ m, c: color, id: p.id });
      }
    }

    for (const [mesh, items] of buckets) {
      const matrices = new Float32Array(items.length * 16);
      const colors = new Float32Array(items.length * 4);
      items.forEach((it, i) => {
        it.m.copyToArray(matrices, i * 16);
        colors[i * 4] = it.c.r;
        colors[i * 4 + 1] = it.c.g;
        colors[i * 4 + 2] = it.c.b;
        colors[i * 4 + 3] = it.c.a;
      });
      mesh.thinInstanceSetBuffer('matrix', matrices, 16);
      mesh.thinInstanceSetBuffer('color', colors, 4);
      mesh.alwaysSelectAsActiveMesh = true;
      mesh.parent = this.placementRoot;
      mesh.isPickable = true;
      const ids = items.map((it) => it.id);
      this.pickMap.set(mesh.uniqueId.toString(), ids.join(','));
      templates.pickables.push({ mesh, ids });
    }
    // 模板 TransformNode 本身不再需要（实例已承载全部变换），释放层级
    templates.root.dispose();
  }

  private buildTemplates(): TemplateMeshes {
    const disposables: BABYLON.Mesh[] = [];
    const pickables: { mesh: BABYLON.Mesh; ids: string[] }[] = [];
    const root = new BABYLON.TransformNode('tpl', this.scene);

    const makeMat = (name: string, diffuse: BABYLON.Color3, emissive?: BABYLON.Color3) => {
      const mat = new BABYLON.StandardMaterial(name, this.scene);
      mat.diffuseColor = diffuse;
      if (emissive) mat.emissiveColor = emissive;
      mat.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
      return mat;
    };

    const trees = {} as Record<TreeSpecies, TreeTemplate>;
    for (const species of ['camphor', 'ginkgo', 'plane'] as TreeSpecies[]) {
      const style = TREE_SPECIES_STYLE[species];
      // 模板几何以原点为中心，高度偏移全部烘焙进实例矩阵
      const trunk = BABYLON.MeshBuilder.CreateCylinder(
        `trunk-${species}`,
        { height: style.trunkH, diameterTop: 0.28, diameterBottom: 0.42, tessellation: 8 },
        this.scene,
      );
      trunk.material = makeMat(`trunkMat-${species}`, new BABYLON.Color3(0.36, 0.24, 0.13));
      const crown = BABYLON.MeshBuilder.CreateSphere(
        `crown-${species}`,
        { diameter: style.crownR * 2, diameterZ: style.crownR * 2, segments: 10 },
        this.scene,
      );
      crown.material = makeMat(`crownMat-${species}`, style.summer);
      trunk.parent = root;
      crown.parent = root;
      disposables.push(trunk, crown);
      trees[species] = { trunk, crown };
    }

    const shrub = BABYLON.MeshBuilder.CreateSphere('shrubTpl', { diameter: 0.9, segments: 8 }, this.scene);
    shrub.material = makeMat('shrubMat', new BABYLON.Color3(0.22, 0.45, 0.2));
    shrub.parent = root;

    const lampPole = BABYLON.MeshBuilder.CreateCylinder(
      'lampPole',
      { height: 5, diameter: 0.16, tessellation: 8 },
      this.scene,
    );
    lampPole.material = makeMat('poleMat', new BABYLON.Color3(0.25, 0.27, 0.3));
    const lampHead = BABYLON.MeshBuilder.CreateSphere('lampHead', { diameter: 0.5, segments: 10 }, this.scene);
    lampHead.material = makeMat(
      'headMat',
      new BABYLON.Color3(1, 0.9, 0.55),
      new BABYLON.Color3(0.9, 0.75, 0.35),
    );
    lampPole.parent = root;
    lampHead.parent = root;

    const flower = BABYLON.MeshBuilder.CreateBox('flowerTpl', { size: 1 }, this.scene);
    flower.material = makeMat('flowerMat', new BABYLON.Color3(0.85, 0.3, 0.45));
    flower.parent = root;

    const lockRing = BABYLON.MeshBuilder.CreateTorus(
      'lockRing',
      { diameter: 1.1, thickness: 0.12, tessellation: 16 },
      this.scene,
    );
    lockRing.material = makeMat(
      'ringMat',
      new BABYLON.Color3(1, 0.78, 0.2),
      new BABYLON.Color3(0.5, 0.35, 0.05),
    );
    lockRing.parent = root;

    disposables.push(shrub, lampPole, lampHead, flower, lockRing);
    return { root, pickables, disposables, trees, shrub, lampPole, lampHead, flower, lockRing };
  }

  private commitInstances(
    mesh: BABYLON.Mesh,
    matrices: BABYLON.Matrix[],
    colors: BABYLON.Color4[] | null,
  ): void {
    const buf = new Float32Array(matrices.length * 16);
    matrices.forEach((m, i) => m.copyToArray(buf, i * 16));
    mesh.thinInstanceSetBuffer('matrix', buf, 16);
    if (colors) {
      const cbuf = new Float32Array(colors.length * 4);
      colors.forEach((c, i) => c.toArray(cbuf, i * 4));
      mesh.thinInstanceSetBuffer('color', cbuf, 4);
    }
    mesh.alwaysSelectAsActiveMesh = true;
  }

  // ---------------- 季节 ----------------

  setSeason(season: Season): void {
    this.season = season;
    this.groundMat.diffuseColor =
      season === 'winter'
        ? new BABYLON.Color3(0.62, 0.66, 0.6)
        : new BABYLON.Color3(0.42, 0.58, 0.34);
    if (this.currentPlacements.length && this.currentParams) {
      this.refreshPlacements(this.currentPlacements, this.currentParams);
    }
  }

  // ---------------- 框选高亮 ----------------

  showSegmentHighlight(segments: number[]): void {
    this.clearNode(this.selectRoot);
    if (!segments.length || !this.currentSamples.length) return;
    const mat = new BABYLON.StandardMaterial('selMat', this.scene);
    mat.diffuseColor = new BABYLON.Color3(1, 0.84, 0.3);
    mat.alpha = 0.28;
    const set = new Set(segments);
    const total = this.currentSamples[this.currentSamples.length - 1].s;
    const width = this.currentParams?.roadWidth ?? 10;
    for (const seg of set) {
      const s0 = seg * this.segmentLength;
      const s1 = Math.min(total, s0 + this.segmentLength);
      if (s0 >= total) continue;
      const mid = sampleAt(this.currentSamples, (s0 + s1) / 2)!;
      const yaw = Math.atan2(mid.tx, mid.tz);
      const box = BABYLON.MeshBuilder.CreateBox(`sel-${seg}`, { width, height: 0.05, depth: s1 - s0 }, this.scene);
      box.material = mat;
      box.position = new BABYLON.Vector3(mid.x, 0.12, mid.z);
      box.rotationQuaternion = BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, yaw);
      box.parent = this.selectRoot;
    }
  }

  // ---------------- 交互 ----------------

  private bindPointer(): void {
    this.scene.onPointerObservable.add((info) => {
      const evt = info.event as PointerEvent;
      switch (info.type) {
        case BABYLON.PointerEventTypes.POINTERDOWN:
          this.onDown(evt);
          break;
        case BABYLON.PointerEventTypes.POINTERMOVE:
          this.onMove(evt);
          break;
        case BABYLON.PointerEventTypes.POINTERUP:
          this.onUp(evt);
          break;
      }
    });
  }

  private onDown(evt: PointerEvent): void {
    this.downX = evt.clientX;
    this.downY = evt.clientY;
    this.downTime = performance.now();

    if (this.tool === 'move') {
      const pick = this.pickPlacement();
      if (pick) {
        this.draggingId = pick;
        this.camera.detachControl();
        this.canvas.style.cursor = 'grabbing';
        this.dragMarker ??= this.createDragMarker();
        this.dragMarker.setEnabled(true);
        this.updateDragMarker();
      }
    } else if (this.tool === 'select') {
      this.selecting = true;
      this.selectStart = { x: evt.clientX, y: evt.clientY };
      this.camera.detachControl();
      Object.assign(this.selectDiv.style, {
        display: 'block',
        left: `${evt.offsetX}px`,
        top: `${evt.offsetY}px`,
        width: '0px',
        height: '0px',
      });
    }
  }

  private onMove(evt: PointerEvent): void {
    if (this.draggingId) {
      this.updateDragMarker();
      void evt;
    } else if (this.selecting) {
      const rect = this.canvas.getBoundingClientRect();
      const x = Math.min(evt.clientX - rect.left, this.selectStart.x - rect.left);
      const y = Math.min(evt.clientY - rect.top, this.selectStart.y - rect.top);
      const w = Math.abs(evt.clientX - this.selectStart.x);
      const h = Math.abs(evt.clientY - this.selectStart.y);
      Object.assign(this.selectDiv.style, {
        left: `${x}px`,
        top: `${y}px`,
        width: `${w}px`,
        height: `${h}px`,
      });
    }
  }

  private async onUp(evt: PointerEvent): Promise<void> {
    const moved = Math.hypot(evt.clientX - this.downX, evt.clientY - this.downY);
    const elapsed = performance.now() - this.downTime;

    if (this.draggingId) {
      const world = this.pickGround();
      if (world) this.callbacks.onPlacementMoved?.(this.draggingId, world);
      this.draggingId = null;
      this.dragMarker?.setEnabled(false);
      this.camera.attachControl(this.canvas, true);
      this.canvas.style.cursor = 'grab';
      return;
    }

    if (this.selecting) {
      this.selecting = false;
      this.camera.attachControl(this.canvas, true);
      this.hideSelectionRect();
      if (moved < 6) {
        this.callbacks.onSelectionCleared?.();
        return;
      }
      const rect = this.canvas.getBoundingClientRect();
      const corners = [
        { x: this.selectStart.x - rect.left, y: this.selectStart.y - rect.top },
        { x: evt.clientX - rect.left, y: evt.clientY - rect.top },
      ];
      const segments = this.segmentsFromScreenRect(corners);
      this.callbacks.onBoxSelect?.(segments);
      return;
    }

    // 单击（非拖动）
    if (moved < 6 && elapsed < 400 && this.tool === 'draw') {
      const p = this.pickGround();
      if (p) this.callbacks.onGroundClick?.({ x: p.x, z: p.z });
    }
  }

  private pickGround(): Vec3 | null {
    const pick = this.scene.pick(this.scene.pointerX, this.scene.pointerY, (m) => m === this.ground);
    if (pick?.hit && pick.pickedPoint) {
      return { x: pick.pickedPoint.x, y: 0, z: pick.pickedPoint.z };
    }
    return null;
  }

  private pickPlacement(): string | null {
    const pick = this.scene.pick(
      this.scene.pointerX,
      this.scene.pointerY,
      (m) => m.parent === this.placementRoot,
    );
    if (!pick?.hit || pick.pickedMesh == null) return null;
    const ids = this.pickMap.get(pick.pickedMesh.uniqueId.toString());
    if (!ids) return null;
    const list = ids.split(',');
    const idx = pick.thinInstanceIndex ?? 0;
    return list[idx] ?? list[0] ?? null;
  }

  private createDragMarker(): BABYLON.Mesh {
    const mat = new BABYLON.StandardMaterial('dragMat', this.scene);
    mat.diffuseColor = new BABYLON.Color3(0.2, 0.7, 1);
    mat.emissiveColor = new BABYLON.Color3(0.1, 0.35, 0.6);
    const m = BABYLON.MeshBuilder.CreateSphere('drag', { diameter: 1.2, segments: 12 }, this.scene);
    m.material = mat;
    m.position.y = 0.6;
    return m;
  }

  private updateDragMarker(): void {
    const p = this.pickGround();
    if (p && this.dragMarker) {
      this.dragMarker.position.set(p.x, 0.6, p.z);
    }
  }

  /** 屏幕矩形 → 地面四角 → 覆盖到的道路段 */
  private segmentsFromScreenRect(corners: { x: number; y: number }[]): number[] {
    const worldPts: BABYLON.Vector3[] = [];
    for (const c of corners) {
      const ray = this.scene.createPickingRay(c.x, c.y, BABYLON.Matrix.Identity(), this.camera);
      const hit = ray.intersectsPlane(new BABYLON.Plane(0, 1, 0, 0));
      if (hit) {
        const p = ray.origin.add(ray.direction.scale(hit));
        worldPts.push(p);
      }
    }
    if (worldPts.length < 2 || !this.currentSamples.length) return [];
    const minX = Math.min(...worldPts.map((p) => p.x));
    const maxX = Math.max(...worldPts.map((p) => p.x));
    const minZ = Math.min(...worldPts.map((p) => p.z));
    const maxZ = Math.max(...worldPts.map((p) => p.z));

    const segs = new Set<number>();
    for (const smp of this.currentSamples) {
      if (smp.x >= minX && smp.x <= maxX && smp.z >= minZ && smp.z <= maxZ) {
        segs.add(Math.floor(smp.s / this.segmentLength));
      }
    }
    return Array.from(segs).sort((a, b) => a - b);
  }

  private hideSelectionRect(): void {
    this.selectDiv.style.display = 'none';
  }

  // ---------------- 俯视截图 ----------------

  /** 按道路包围盒计算俯视取景参数 */
  private topDownFrame(): { center: BABYLON.Vector3; radius: number } {
    const samples = this.currentSamples;
    let minX = Infinity;
    let maxX = -Infinity;
    let minZ = Infinity;
    let maxZ = -Infinity;
    for (const s of samples) {
      minX = Math.min(minX, s.x);
      maxX = Math.max(maxX, s.x);
      minZ = Math.min(minZ, s.z);
      maxZ = Math.max(maxZ, s.z);
    }
    const margin = (this.currentParams?.roadWidth ?? 12) * 1.5 + 20;
    minX -= margin;
    maxX += margin;
    minZ -= margin;
    maxZ += margin;
    const center = new BABYLON.Vector3((minX + maxX) / 2, 0, (minZ + maxZ) / 2);
    // ArcRotateCamera 俯视取景半径需覆盖包围盒对角线的一半（含画面宽高比余量）
    const radius = Math.hypot(maxX - minX, maxZ - minZ) * 0.58;
    return { center, radius };
  }

  async topDownScreenshot(): Promise<string> {
    if (!this.currentSamples.length) throw new Error('道路尚未生成');
    const { center, radius } = this.topDownFrame();
    const saved = {
      alpha: this.camera.alpha,
      beta: this.camera.beta,
      radius: this.camera.radius,
      target: this.camera.target.clone(),
    };
    this.camera.target = center;
    this.camera.alpha = -Math.PI / 2;
    this.camera.beta = 0.03;
    this.camera.radius = radius;
    this.scene.render();

    const size = { width: 1600, height: 1200 };
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('截图超时')), 8000);
      BABYLON.Tools.CreateScreenshotUsingRenderTarget(
        this.engine,
        this.camera,
        size,
        (data) => {
          clearTimeout(timer);
          resolve(data as string);
        },
      );
    });

    this.camera.alpha = saved.alpha;
    this.camera.beta = saved.beta;
    this.camera.radius = saved.radius;
    this.camera.target = saved.target;
    return dataUrl;
  }

  /** 重新取景到道路整体 */
  frameRoad(): void {
    if (!this.currentSamples.length) return;
    const { center, radius } = this.topDownFrame();
    this.camera.target = center;
    this.camera.radius = Math.max(radius * 1.15, 50);
    this.camera.beta = Math.PI / 3.2;
  }

  private clearNode(node: BABYLON.TransformNode): void {
    for (const child of [...node.getChildMeshes()]) {
      const mat = child.material;
      child.dispose();
      // 材质挂在网格下随重建反复创建，一并释放避免泄漏（重复 dispose 安全）
      mat?.dispose();
    }
  }

  dispose(): void {
    this.selectDiv.remove();
    this.scene.dispose();
    this.engine.dispose();
  }
}
