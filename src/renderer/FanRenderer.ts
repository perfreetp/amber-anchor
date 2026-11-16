// WebGPU 渲染器：地形网格、水面 ribbon + Fresnel 高光、岸线描边、
// billboard 节点/批注、剖面线；按级别 LOD 隐藏
import type { Annotation, CrossSection, FanModel, Reach, Vec3 } from '../types';
import {
  mat4Invert,
  mat4Multiply,
  screenToGroundPlane,
  v3,
  type Mat4,
  type Vec2
} from '../core/math';
import { createTerrainField, ChannelBathymetry } from '../core/terrain';
import { OrbitCamera } from './camera';
import { markerWGSL, sectionWGSL, shoreWGSL, terrainWGSL, waterWGSL } from './shaders';

/** 各级别色阶（河道 → 干渠 → 支渠 → 斗渠） */
export const LEVEL_COLORS: [number, number, number][] = [
  [0.16, 0.42, 0.62], // 河道：深蓝
  [0.12, 0.58, 0.66], // 干渠：青蓝
  [0.26, 0.66, 0.45], // 支渠：青绿
  [0.55, 0.68, 0.3] // 斗渠：黄绿
];

export const LOCK_COLOR: [number, number, number] = [0.95, 0.55, 0.12];
export const HANDLE_COLOR: [number, number, number] = [0.98, 0.92, 0.32];
export const ANNOTATION_COLOR: [number, number, number] = [0.92, 0.28, 0.32];

export interface PickResult {
  kind: 'handle' | 'annotation';
  reachId?: string;
  nodeIdx?: number;
  annotationId?: string;
  point: Vec3;
}

interface Marker {
  center: Vec3;
  color: [number, number, number];
  size: number;
  ref:
    | { kind: 'handle'; reachId: string; nodeIdx: number }
    | { kind: 'annotation'; annotationId: string };
}

function ribbonGeometry(reaches: Reach[], expand: number, lift: number) {
  const vertices: number[] = []; // pos3 + color3 + level1 = 7 floats
  const counts: number[] = [];
  for (const r of reaches) {
    const base = vertices.length / 7;
    const baseCol = r.locked ? LOCK_COLOR : LEVEL_COLORS[r.level];
    const col = baseCol;
    for (let i = 0; i < r.nodes.length; i++) {
      const n = r.nodes[i];
      const prev = r.nodes[Math.max(0, i - 1)];
      const next = r.nodes[Math.min(r.nodes.length - 1, i + 1)];
      let tx = next.x - prev.x;
      let ty = next.y - prev.y;
      const tl = Math.hypot(tx, ty) || 1;
      tx /= tl;
      ty /= tl;
      const nx = -ty;
      const ny = tx;
      const halfW = n.width / 2 + expand;
      for (const side of [-1, 1]) {
        vertices.push(
          n.x + nx * halfW * side,
          n.y + ny * halfW * side,
          n.z + lift,
          col[0],
          col[1],
          col[2],
          r.level
        );
      }
    }
    counts.push((r.nodes.length - 1) * 6);
  }
  const index: number[] = [];
  let cursor = 0;
  for (const c of counts) {
    const quads = c / 6;
    for (let q = 0; q < quads; q++) {
      const a = cursor + q * 2;
      index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    cursor += (quads + 1) * 2;
  }
  return { vertices: new Float32Array(vertices), indices: new Uint32Array(index) };
}

function shoreGeometry(reaches: Reach[]) {
  // 复用 ribbon：pos3 + level1 → 每顶点 4 float
  const geo = ribbonGeometry(reaches, 2.2, 0);
  const out: number[] = [];
  for (let i = 0; i < geo.vertices.length; i += 7) {
    out.push(geo.vertices[i], geo.vertices[i + 1], geo.vertices[i + 2], geo.vertices[i + 6]);
  }
  return { vertices: new Float32Array(out), indices: geo.indices };
}

export class FanRenderer {
  device!: GPUDevice;
  context!: GPUCanvasContext;
  format!: GPUTextureFormat;
  camera = new OrbitCamera();
  private pipelines: Record<string, GPURenderPipeline> = {};
  private uniformBuffer!: GPUBuffer;
  private terrainVB!: GPUBuffer;
  private terrainIB!: GPUBuffer;
  private terrainIndexCount = 0;
  private waterVB!: GPUBuffer;
  private waterIB!: GPUBuffer;
  private waterIndexCount = 0;
  private shoreVB!: GPUBuffer;
  private shoreIB!: GPUBuffer;
  private markerVB!: GPUBuffer;
  private markerCount = 0;
  private sectionVB!: GPUBuffer;
  private sectionCount = 0;
  private markers: Marker[] = [];
  private model: FanModel | null = null;
  private bath: ChannelBathymetry | null = null;
  private startTime = performance.now();
  private raf = 0;
  private destroyed = false;
  maxVisibleLevel = 3;

  private constructor(private canvas: HTMLCanvasElement) {}

  static async create(canvas: HTMLCanvasElement): Promise<FanRenderer> {
    const r = new FanRenderer(canvas);
    if (!navigator.gpu) throw new Error('当前浏览器不支持 WebGPU');
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) throw new Error('未找到可用 GPU 适配器');
    r.device = await adapter.requestDevice();
    r.context = canvas.getContext('webgpu')!;
    r.format = navigator.gpu.getPreferredCanvasFormat();
    r.context.configure({ device: r.device, format: r.format, alphaMode: 'opaque' });
    r.uniformBuffer = r.device.createBuffer({
      size: 80, // mat4(64) + vec3(12) + f32(4) + f32(4) + pad2(8)
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });
    r.buildPipelines();
    r.loop();
    return r;
  }

  private module(code: string) {
    return this.device.createShaderModule({ code });
  }

  private buildPipelines() {
    const bindLayout = this.device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
          buffer: { type: 'uniform' }
        }
      ]
    });
    const pipelineLayout = this.device.createPipelineLayout({ bindGroupLayouts: [bindLayout] });
    this.bindGroup = this.device.createBindGroup({
      layout: bindLayout,
      entries: [{ binding: 0, resource: { buffer: this.uniformBuffer } }]
    });

    this.pipelines.terrain = this.device.createRenderPipeline({
      layout: pipelineLayout,
      vertex: {
        module: this.module(terrainWGSL),
        entryPoint: 'vs_main',
        buffers: [
          {
            arrayStride: 16,
            attributes: [
              { shaderLocation: 0, offset: 0, format: 'float32x3' },
              { shaderLocation: 1, offset: 12, format: 'float32' }
            ]
          }
        ]
      },
      fragment: { module: this.module(terrainWGSL), entryPoint: 'fs_main', targets: [{ format: this.format }] },
      primitive: { topology: 'triangle-list' },
      depthStencil: { format: 'depth24plus', depthWriteEnabled: true, depthCompare: 'less' }
    });

    this.pipelines.water = this.device.createRenderPipeline({
      layout: pipelineLayout,
      vertex: {
        module: this.module(waterWGSL),
        entryPoint: 'vs_main',
        buffers: [
          {
            arrayStride: 28,
            attributes: [
              { shaderLocation: 0, offset: 0, format: 'float32x3' },
              { shaderLocation: 1, offset: 12, format: 'float32x3' },
              { shaderLocation: 2, offset: 24, format: 'float32' }
            ]
          }
        ]
      },
      fragment: { module: this.module(waterWGSL), entryPoint: 'fs_main', targets: [{ format: this.format }] },
      primitive: { topology: 'triangle-list' },
      depthStencil: { format: 'depth24plus', depthWriteEnabled: true, depthCompare: 'less' }
    });

    this.pipelines.shore = this.device.createRenderPipeline({
      layout: pipelineLayout,
      vertex: {
        module: this.module(shoreWGSL),
        entryPoint: 'vs_main',
        buffers: [
          {
            arrayStride: 16,
            attributes: [
              { shaderLocation: 0, offset: 0, format: 'float32x3' },
              { shaderLocation: 1, offset: 12, format: 'float32' }
            ]
          }
        ]
      },
      fragment: { module: this.module(shoreWGSL), entryPoint: 'fs_main', targets: [{ format: this.format }] },
      primitive: { topology: 'triangle-list' },
      depthStencil: { format: 'depth24plus', depthWriteEnabled: true, depthCompare: 'less' }
    });

    this.pipelines.marker = this.device.createRenderPipeline({
      layout: pipelineLayout,
      vertex: {
        module: this.module(markerWGSL),
        entryPoint: 'vs_main',
        buffers: [
          {
            arrayStride: 36,
            attributes: [
              { shaderLocation: 0, offset: 0, format: 'float32x3' },
              { shaderLocation: 1, offset: 12, format: 'float32x3' },
              { shaderLocation: 2, offset: 24, format: 'float32x2' },
              { shaderLocation: 3, offset: 32, format: 'float32' }
            ]
          }
        ]
      },
      fragment: { module: this.module(markerWGSL), entryPoint: 'fs_main', targets: [{ format: this.format }] },
      primitive: { topology: 'triangle-list' },
      depthStencil: { format: 'depth24plus', depthWriteEnabled: true, depthCompare: 'less' }
    });

    this.pipelines.section = this.device.createRenderPipeline({
      layout: pipelineLayout,
      vertex: {
        module: this.module(sectionWGSL),
        entryPoint: 'vs_main',
        buffers: [
          {
            arrayStride: 24,
            attributes: [
              { shaderLocation: 0, offset: 0, format: 'float32x3' },
              { shaderLocation: 1, offset: 12, format: 'float32x3' }
            ]
          }
        ]
      },
      fragment: { module: this.module(sectionWGSL), entryPoint: 'fs_main', targets: [{ format: this.format }] },
      primitive: { topology: 'line-list' },
      depthStencil: { format: 'depth24plus', depthWriteEnabled: true, depthCompare: 'less' }
    });
  }

  private bindGroup!: GPUBindGroup;
  private depthTexture!: GPUTexture;

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(64, Math.floor(this.canvas.clientWidth * dpr));
    const h = Math.max(64, Math.floor(this.canvas.clientHeight * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
      this.depthTexture?.destroy();
      this.depthTexture = this.device.createTexture({
        size: { width: w, height: h },
        format: 'depth24plus',
        usage: GPUTextureUsage.RENDER_ATTACHMENT
      });
    }
    this.camera.setAspect(w, h);
  }

  /** 装载模型：重建地形与河渠几何 */
  setModel(model: FanModel) {
    this.model = model;
    this.bath = new ChannelBathymetry(model.reaches);
    this.buildTerrain(model);
    this.buildChannels(model);
    this.buildMarkers(model, this.currentAnnotations);
  }

  /** 拖拽节点期间的轻量刷新：只重建水面/岸线/手柄，不重建地形 */
  refreshChannelsOnly(model: FanModel) {
    this.model = model;
    this.buildChannels(model);
    this.buildMarkers(model, this.currentAnnotations);
  }

  private currentAnnotations: Annotation[] = [];

  setAnnotations(annotations: Annotation[]) {
    this.currentAnnotations = annotations;
    if (this.model) this.buildMarkers(this.model, annotations);
  }

  private buildTerrain(model: FanModel) {
    const field = createTerrainField(model.params);
    const size = field.gridSize;
    const extent = field.extent;
    const half = extent / 2;
    const cx = model.params.apexX;
    const cy = model.params.apexY - extent * 0.12;
    const verts: number[] = [];
    for (let j = 0; j <= size; j++) {
      for (let i = 0; i <= size; i++) {
        const x = cx - half + (i / size) * extent;
        const y = cy - half + (j / size) * extent;
        const s = this.bath!.sample(field, x, y);
        verts.push(x, y, s.ground, field.fanMask(x, y));
      }
    }
    const idx: number[] = [];
    for (let j = 0; j < size; j++) {
      for (let i = 0; i < size; i++) {
        const a = j * (size + 1) + i;
        const b = a + 1;
        const c = a + size + 1;
        const d = c + 1;
        idx.push(a, c, b, b, c, d);
      }
    }
    this.terrainVB = this.upload(new Float32Array(verts), GPUBufferUsage.VERTEX);
    this.terrainIB = this.upload(new Uint32Array(idx), GPUBufferUsage.INDEX);
    this.terrainIndexCount = idx.length;
  }

  private buildChannels(model: FanModel) {
    const water = ribbonGeometry(model.reaches, 0, 0.18);
    this.waterVB = this.upload(water.vertices, GPUBufferUsage.VERTEX);
    this.waterIB = this.upload(water.indices, GPUBufferUsage.INDEX);
    this.waterIndexCount = water.indices.length;

    const shore = shoreGeometry(model.reaches);
    this.shoreVB = this.upload(shore.vertices, GPUBufferUsage.VERTEX);
    this.shoreIB = this.upload(shore.indices, GPUBufferUsage.INDEX);
  }

  private buildMarkers(model: FanModel, annotations: Annotation[]) {
    const markers: Marker[] = [];
    // 可拖节点：河道/干渠按隔点显示；选中段（含支渠/斗渠）全部节点显示
    for (const r of model.reaches) {
      const isSelected = r.id === this.selectedReachId;
      if (r.level > 1 && !isSelected) continue;
      const color = r.locked ? LOCK_COLOR : HANDLE_COLOR;
      const size = r.kind === 'river' ? 10 : 7;
      const stride = r.level > 1 || isSelected ? 1 : 2;
      for (let i = 0; i < r.nodes.length; i += stride) {
        markers.push({
          center: v3(r.nodes[i].x, r.nodes[i].y, r.nodes[i].z + 1.2),
          color,
          size,
          ref: { kind: 'handle', reachId: r.id, nodeIdx: i }
        });
      }
    }
    for (const a of annotations) {
      if (a.target !== 'map') continue;
      markers.push({
        center: v3(a.x, a.y, a.z + 2),
        color: ANNOTATION_COLOR,
        size: 12,
        ref: { kind: 'annotation', annotationId: a.id }
      });
    }
    this.markers = markers;
    const corners = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, -1],
      [1, 1],
      [-1, 1]
    ];
    const data: number[] = [];
    for (const m of markers) {
      for (const [cx, cy] of corners) {
        data.push(m.center.x, m.center.y, m.center.z, m.color[0], m.color[1], m.color[2], cx, cy, m.size);
      }
    }
    this.markerVB = this.upload(new Float32Array(data), GPUBufferUsage.VERTEX);
    this.markerCount = markers.length * 6;
  }

  private pending: { a: Vec3; b: Vec3 } | null = null;

  setPendingSection(a: Vec2 | null, b: Vec2 | null) {
    if (!a || !b) {
      this.pending = null;
      return;
    }
    const za = this.groundZ(a.x, a.y) + 2;
    const zb = this.groundZ(b.x, b.y) + 2;
    this.pending = { a: v3(a.x, a.y, za), b: v3(b.x, b.y, zb) };
  }

  /** 剖面线与批注点的空间线 */
  setSections(sections: CrossSection[]) {
    const data: number[] = [];
    const line = (a: Vec3, b: Vec3, color: [number, number, number]) => {
      data.push(a.x, a.y, a.z, color[0], color[1], color[2]);
      data.push(b.x, b.y, b.z, color[0], color[1], color[2]);
    };
    for (const s of sections) {
      const z = this.model ? this.groundZ(s.a.x, s.a.y) + 1.5 : 1.5;
      line(v3(s.a.x, s.a.y, z), v3(s.b.x, s.b.y, z), [0.98, 0.75, 0.2]);
      // 端点小立柱
      line(v3(s.a.x, s.a.y, 0), v3(s.a.x, s.a.y, z + 6), [0.98, 0.75, 0.2]);
      line(v3(s.b.x, s.b.y, 0), v3(s.b.x, s.b.y, z + 6), [0.98, 0.75, 0.2]);
    }
    if (this.pending) {
      line(this.pending.a, this.pending.b, [1, 0.45, 0.25]);
    }
    this.sectionVB = this.upload(new Float32Array(data), GPUBufferUsage.VERTEX);
    this.sectionCount = data.length / 6;
  }

  groundZ(x: number, y: number): number {
    if (!this.model || !this.bath) return 0;
    const field = createTerrainField(this.model.params);
    return this.bath.sample(field, x, y).ground;
  }

  screenToGround(px: number, py: number): Vec3 | null {
    const vp = mat4Multiply(this.camera.proj(), this.camera.view());
    const inv = mat4Invert(vp);
    if (!inv) return null;
    return screenToGroundPlane(inv, px, py, this.canvas.width, this.canvas.height);
  }

  /** 当前选中渠段 id：其全部节点显示为可拖手柄（含支渠/斗渠） */
  selectedReachId: string | null = null;

  /** CPU 拾取：屏幕点 → 最近手柄/批注（像素阈值内） */
  pick(px: number, py: number): PickResult | null {
    const vp = mat4Multiply(this.camera.proj(), this.camera.view());
    let best: { m: Marker; d: number } | null = null;
    for (const m of this.markers) {
      const w = m.center;
      const ndc = (() => {
        const v = vp;
        const xw = v[0] * w.x + v[4] * w.y + v[8] * w.z + v[12];
        const yw = v[1] * w.x + v[5] * w.y + v[9] * w.z + v[13];
        const ww = v[3] * w.x + v[7] * w.y + v[11] * w.z + v[15];
        return { x: xw / ww, y: yw / ww };
      })();
      const sx = ((ndc.x + 1) / 2) * this.canvas.width;
      const sy = ((1 - ndc.y) / 2) * this.canvas.height;
      const d = Math.hypot(sx - px, sy - py);
      if (d < 14 && (!best || d < best.d)) best = { m, d };
    }
    if (!best) return null;
    const ground = this.screenToGround(px, py) ?? v3(0, 0, 0);
    const ref = best.m.ref;
    if (ref.kind === 'handle') {
      return { kind: 'handle', reachId: ref.reachId, nodeIdx: ref.nodeIdx, point: ground };
    }
    return { kind: 'annotation', annotationId: ref.annotationId, point: ground };
  }

  /** 渠线拾取：屏幕点 → 最近的渠段（按屏幕像素距离，宽度含描边余量） */
  pickReach(px: number, py: number): string | null {
    if (!this.model) return null;
    const vp = mat4Multiply(this.camera.proj(), this.camera.view());
    const project = (w: Vec3) => {
      const ww = vp[3] * w.x + vp[7] * w.y + vp[11] * w.z + vp[15];
      return {
        x: ((vp[0] * w.x + vp[4] * w.y + vp[8] * w.z + vp[12]) / ww + 1) / 2 * this.canvas.width,
        y: (1 - (vp[1] * w.x + vp[5] * w.y + vp[9] * w.z + vp[13]) / ww) / 2 * this.canvas.height
      };
    };
    const distToSeg = (
      p: { x: number; y: number },
      a: { x: number; y: number },
      b: { x: number; y: number }
    ) => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const l2 = dx * dx + dy * dy || 1;
      const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2));
      return Math.hypot(p.x - (a.x + dx * t), p.y - (a.y + dy * t));
    };
    let bestId: string | null = null;
    let bestD = 16; // 像素阈值
    for (const r of this.model.reaches) {
      for (let i = 0; i < r.nodes.length - 1; i++) {
        const a = project(v3(r.nodes[i].x, r.nodes[i].y, r.nodes[i].z));
        const b = project(v3(r.nodes[i + 1].x, r.nodes[i + 1].y, r.nodes[i + 1].z));
        const d = distToSeg({ x: px, y: py }, a, b);
        if (d < bestD) {
          bestD = d;
          bestId = r.id;
        }
      }
    }
    return bestId;
  }

  private upload(data: Float32Array | Uint32Array, usage: number): GPUBuffer {
    const buf = this.device.createBuffer({ size: data.byteLength, usage: usage | GPUBufferUsage.COPY_DST });
    this.device.queue.writeBuffer(buf, 0, data);
    return buf;
  }

  /** 根据地面分辨率决定最大可见级别：缩小依次隐藏斗渠、支渠 */
  private updateLOD() {
    const mpp = this.camera.metersPerPixel(this.canvas.height);
    if (mpp > 9) this.maxVisibleLevel = 1;
    else if (mpp > 4.5) this.maxVisibleLevel = 2;
    else this.maxVisibleLevel = 3;
  }

  private loop = () => {
    if (this.destroyed) return;
    this.raf = requestAnimationFrame(this.loop);
    this.resize();
    this.updateLOD();
    const vp = mat4Multiply(this.camera.proj(), this.camera.view()) as Mat4;
    const eye = this.camera.eye;
    // 与 WGSL Camera 结构一致：vp(64) + eye(12) + time(4) + maxVisibleLevel(4) + pad(8)
    const uniform = new Float32Array(20);
    uniform.set(vp, 0);
    uniform.set([eye.x, eye.y, eye.z], 16);
    uniform[19] = (performance.now() - this.startTime) / 1000;
    this.device.queue.writeBuffer(this.uniformBuffer, 0, uniform);
    this.device.queue.writeBuffer(this.uniformBuffer, 76, new Float32Array([this.maxVisibleLevel, 0, 0, 0]));

    const encoder = this.device.createCommandEncoder();
    const pass = encoder.beginRenderPass({
      colorAttachments: [
        {
          view: this.context.getCurrentTexture().createView(),
          clearValue: { r: 0.11, g: 0.12, b: 0.12, a: 1 },
          loadOp: 'clear',
          storeOp: 'store'
        }
      ],
      depthStencilAttachment: {
        view: this.depthTexture.createView(),
        depthClearValue: 1,
        depthLoadOp: 'clear',
        depthStoreOp: 'store'
      }
    });
    pass.setBindGroup(0, this.bindGroup);

    if (this.terrainVB) {
      pass.setPipeline(this.pipelines.terrain);
      pass.setVertexBuffer(0, this.terrainVB);
      pass.setIndexBuffer(this.terrainIB, 'uint32');
      pass.drawIndexed(this.terrainIndexCount);
    }
    if (this.shoreVB) {
      pass.setPipeline(this.pipelines.shore);
      pass.setVertexBuffer(0, this.shoreVB);
      pass.setIndexBuffer(this.shoreIB, 'uint32');
      pass.drawIndexed(this.waterIndexCount);
    }
    if (this.waterVB) {
      pass.setPipeline(this.pipelines.water);
      pass.setVertexBuffer(0, this.waterVB);
      pass.setIndexBuffer(this.waterIB, 'uint32');
      pass.drawIndexed(this.waterIndexCount);
    }
    if (this.sectionVB && this.sectionCount) {
      pass.setPipeline(this.pipelines.section);
      pass.setVertexBuffer(0, this.sectionVB);
      pass.draw(this.sectionCount);
    }
    if (this.markerVB && this.markerCount) {
      pass.setPipeline(this.pipelines.marker);
      pass.setVertexBuffer(0, this.markerVB);
      pass.draw(this.markerCount);
    }
    pass.end();
    this.device.queue.submit([encoder.finish()]);
  };

  dispose() {
    this.destroyed = true;
    cancelAnimationFrame(this.raf);
  }
}
