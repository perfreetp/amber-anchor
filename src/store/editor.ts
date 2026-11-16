// 全局响应式状态：参数、模型、编辑锁、剖面、版本快照、批注线程、版本对比
import { computed, reactive, ref, shallowRef, type Ref } from 'vue';
import type {
  Annotation,
  CrossSection,
  FanModel,
  GenParams,
  ModelStats,
  Reach,
  ReachDiff,
  VersionSnapshot,
  Vec2
} from '../types';
import {
  collectKeptReaches,
  generateModel,
  setReachLocked,
  updateReachNode
} from '../core/generator';
import { buildCrossSection } from '../core/profile';
import { computeStats } from '../core/stats';
import { diffModels } from '../core/diff';

export type ToolMode = 'orbit' | 'edit' | 'section';
export type ReviewRole = 'planner' | 'reviewer';

const STORAGE_KEY = 'fan-editor-state-v1';

const DEFAULT_PARAMS: GenParams = {
  apexX: 0,
  apexY: 0,
  radius: 1800,
  slope: 2.4,
  mainWidth: 46,
  branchLevels: 2,
  seed: 20261117
};

interface PersistShape {
  params: GenParams;
  versions: VersionSnapshot[];
  currentVersionId: string | null;
}

class EditorStore {
  params = reactive<GenParams>({ ...DEFAULT_PARAMS });
  model: Ref<FanModel | null> = shallowRef(null);
  sections = ref<CrossSection[]>([]);
  annotations = ref<Annotation[]>([]);
  versions = ref<VersionSnapshot[]>([]);
  currentVersionId = ref<string | null>(null);
  mode = ref<ToolMode>('orbit');
  role = ref<ReviewRole>('planner');
  selectedReachId = ref<string | null>(null);
  compareVersionId = ref<string | null>(null);
  diffs = ref<ReachDiff[]>([]);
  showCompare = ref(false);
  /** 拖拽中的节点，渲染器据此跳过重排 */
  dragging: Ref<{ reachId: string; nodeIdx: number } | null> = shallowRef(null);
  /** 剖面工具下正在拉的线 */
  pendingSection = ref<{ a: Vec2; b: Vec2 } | null>(null);
  previewDegraded = ref(false);
  lastRegenAt = ref('');

  private regenTimer: ReturnType<typeof setTimeout> | null = null;

  get stats(): ModelStats | null {
    return this.model.value ? computeStats(this.model.value) : null;
  }

  get selectedReach(): Reach | null {
    if (!this.model.value || !this.selectedReachId.value) return null;
    return this.model.value.reaches.find((r) => r.id === this.selectedReachId.value) ?? null;
  }

  get currentVersion(): VersionSnapshot | null {
    return this.versions.value.find((v) => v.id === this.currentVersionId.value) ?? null;
  }

  init() {
    this.restore();
    if (!this.model.value) this.regenerate({ immediate: true });
  }

  /** 参数滑块：防抖实时重算（120ms），锁定段与手改下游原地保留 */
  scheduleRegenerate() {
    if (this.regenTimer) clearTimeout(this.regenTimer);
    this.regenTimer = setTimeout(() => this.regenerate(), 120);
  }

  regenerate(opts: { immediate?: boolean } = {}) {
    const keep = this.model.value ? collectKeptReaches(this.model.value) : new Map<string, Reach>();
    const { model, degraded } = generateModel({ ...this.params }, { keep });
    this.model.value = model;
    this.previewDegraded.value = degraded;
    this.lastRegenAt.value = new Date().toISOString();
    if (!opts.immediate) this.persist();
  }

  /** 强制全精度/预览精度切换（用户手动覆盖自动降级） */
  setPrecision(precision: 'full' | 'preview') {
    const keep = this.model.value ? collectKeptReaches(this.model.value) : new Map<string, Reach>();
    const { model } = generateModel({ ...this.params }, { keep, forcePrecision: precision });
    this.model.value = model;
    this.previewDegraded.value = model.precision === 'preview';
  }

  dragNode(reachId: string, nodeIdx: number, world: Vec2) {
    if (!this.model.value) return;
    updateReachNode(this.model.value, reachId, nodeIdx, world.x, world.y);
    this.dragging.value = { reachId, nodeIdx };
  }

  endDrag() {
    this.dragging.value = null;
    this.persist();
  }

  toggleLock(reachId: string) {
    if (!this.model.value) return;
    const r = this.model.value.reaches.find((x) => x.id === reachId);
    if (!r) return;
    setReachLocked(this.model.value, reachId, !r.locked);
    this.persist();
  }

  /** 放弃单段手改（恢复到当前参数下的生成形态：整模型重算但不保留该段） */
  discardReachEdits(reachId: string) {
    if (!this.model.value) return;
    const keep = collectKeptReaches(this.model.value);
    keep.delete(reachId);
    const { model } = generateModel({ ...this.params }, { keep });
    this.model.value = model;
    this.selectedReachId.value = null;
    this.persist();
  }

  resetAll() {
    const { model } = generateModel({ ...this.params });
    this.model.value = model;
    this.sections.value = [];
    this.annotations.value = [];
    this.selectedReachId.value = null;
    this.persist();
  }

  addSection(a: Vec2, b: Vec2) {
    if (!this.model.value || Math.hypot(b.x - a.x, b.y - a.y) < 8) return;
    const section = buildCrossSection(this.model.value, a, b);
    this.sections.value = [...this.sections.value, section];
    return section;
  }

  removeSection(id: string) {
    this.sections.value = this.sections.value.filter((s) => s.id !== id);
    this.annotations.value = this.annotations.value.filter((a) => a.profileId !== id);
  }

  addAnnotation(
    a: Omit<Annotation, 'id' | 'createdAt' | 'replies' | 'resolved' | 'versionId' | 'author'> & {
      author?: string;
    }
  ) {
    const ann: Annotation = {
      ...a,
      id: `ann-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e4).toString(36)}`,
      author: a.author ?? (this.role.value === 'reviewer' ? '审核人' : '规划师'),
      createdAt: new Date().toISOString(),
      replies: [],
      resolved: false,
      versionId: this.currentVersionId.value ?? 'workspace'
    };
    this.annotations.value = [...this.annotations.value, ann];
    return ann;
  }

  replyAnnotation(annotationId: string, text: string) {
    const ann = this.annotations.value.find((x) => x.id === annotationId);
    if (!ann || !text.trim()) return;
    ann.replies.push({
      author: this.role.value === 'reviewer' ? '审核人' : '制作方',
      text: text.trim(),
      at: new Date().toISOString()
    });
    this.annotations.value = [...this.annotations.value];
  }

  toggleResolved(annotationId: string) {
    const ann = this.annotations.value.find((x) => x.id === annotationId);
    if (!ann) return;
    ann.resolved = !ann.resolved;
    this.annotations.value = [...this.annotations.value];
  }

  /** 提交新版本：当前模型 + 剖面 + 批注整体快照 */
  submitVersion(label: string, note: string): VersionSnapshot {
    if (!this.model.value) throw new Error('模型尚未生成');
    const snapshot: VersionSnapshot = {
      id: `ver-${Date.now().toString(36)}`,
      label: label || `版本 ${this.versions.value.length + 1}`,
      note,
      createdAt: new Date().toISOString(),
      model: structuredClone(this.model.value),
      sections: structuredClone(this.sections.value),
      annotations: structuredClone(this.annotations.value)
    };
    this.versions.value = [...this.versions.value, snapshot];
    this.currentVersionId.value = snapshot.id;
    this.persist();
    return snapshot;
  }

  /** 载入历史版本进入工作区 */
  loadVersion(id: string) {
    const v = this.versions.value.find((x) => x.id === id);
    if (!v) return;
    this.model.value = structuredClone(v.model);
    this.sections.value = structuredClone(v.sections);
    this.annotations.value = structuredClone(v.annotations);
    Object.assign(this.params, v.model.params);
    this.currentVersionId.value = id;
    this.showCompare.value = false;
  }

  openCompare(versionId: string) {
    const oldV = this.versions.value.find((v) => v.id === versionId);
    if (!oldV || !this.model.value) return;
    this.compareVersionId.value = versionId;
    this.diffs.value = diffModels(oldV.model, this.model.value);
    this.showCompare.value = true;
  }

  deleteVersion(id: string) {
    this.versions.value = this.versions.value.filter((v) => v.id !== id);
    if (this.currentVersionId.value === id) this.currentVersionId.value = null;
    this.persist();
  }

  private persist() {
    try {
      const data: PersistShape = {
        params: { ...this.params },
        versions: this.versions.value,
        currentVersionId: this.currentVersionId.value
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // 存储满或隐私模式：静默，版本仍在内存中可用
    }
  }

  private restore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw) as PersistShape;
      if (data.params) Object.assign(this.params, data.params);
      this.versions.value = data.versions ?? [];
      this.currentVersionId.value = data.currentVersionId;
    } catch {
      /* 损坏的缓存直接忽略 */
    }
  }
}

export const store = new EditorStore();
export { DEFAULT_PARAMS };
