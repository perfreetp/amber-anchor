import type {
  Assignment,
  ControlPoint,
  GradeRecord,
  GreeningParams,
  Placement,
  RoadSample,
  Role,
  ToolMode,
  Vec3,
} from '../types';
import { buildRoadSamples, roadLength } from '../core/geometry';
import { lockPlacementAt, regeneratePlacements } from '../core/generator';
import { clearState, defaultPersistState, loadState, saveState } from '../core/store';

type Listener = () => void;

/**
 * 全局唯一状态容器。所有 Web Components 通过 getState() 读取、
 * action 方法修改、subscribe() 监听，不引入任何框架。
 */
class AppStore {
  role: Role = 'student';
  assignment: Assignment;
  params: GreeningParams;
  controlPoints: ControlPoint[] = [];
  placements: Placement[] = [];
  grades: GradeRecord[] = [];
  roadBuilt = false;
  tool: ToolMode = 'draw';
  selectedSegments: number[] = [];

  /** 道路几何为控制点的派生数据，不持久化 */
  samples: RoadSample[] = [];

  private listeners = new Set<Listener>();
  /** 防循环：程序化更新控件时暂存广播 */
  private emitting = false;

  constructor() {
    const persisted = loadState();
    const base = persisted ?? defaultPersistState();
    this.role = base.role;
    this.assignment = base.assignment;
    this.params = base.params;
    this.controlPoints = base.controlPoints;
    this.placements = base.placements;
    this.grades = base.grades;
    this.roadBuilt = base.roadBuilt;
    if (this.roadBuilt) this.rebuildSamples();
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit(): void {
    if (this.emitting) return;
    this.emitting = true;
    this.persist();
    for (const fn of this.listeners) fn();
    this.emitting = false;
  }

  private persist(): void {
    saveState({
      role: this.role,
      assignment: this.assignment,
      params: this.params,
      controlPoints: this.controlPoints,
      placements: this.placements,
      grades: this.grades,
      roadBuilt: this.roadBuilt,
    });
  }

  // ---------- 角色与题目 ----------

  setRole(role: Role): void {
    this.role = role;
    this.emit();
  }

  updateAssignment(patch: Partial<Assignment>): void {
    this.assignment = { ...this.assignment, ...patch };
    this.emit();
  }

  // ---------- 参数 ----------

  updateParams(patch: Partial<GreeningParams>): void {
    this.params = { ...this.params, ...patch };
    this.emit();
  }

  // ---------- 道路绘制 ----------

  setTool(tool: ToolMode): void {
    this.tool = tool;
    if (tool !== 'select') this.selectedSegments = [];
    this.emit();
  }

  addControlPoint(p: ControlPoint): void {
    this.controlPoints = [...this.controlPoints, p];
    this.emit();
  }

  undoControlPoint(): void {
    this.controlPoints = this.controlPoints.slice(0, -1);
    this.emit();
  }

  clearControlPoints(): void {
    this.controlPoints = [];
    this.placements = [];
    this.samples = [];
    this.roadBuilt = false;
    this.selectedSegments = [];
    this.emit();
  }

  private rebuildSamples(): void {
    this.samples = buildRoadSamples(this.controlPoints);
  }

  /** 由控制点生成道路，并整路首次生成布置 */
  buildRoad(): void {
    if (this.controlPoints.length < 2) return;
    this.rebuildSamples();
    this.roadBuilt = true;
    this.placements = regeneratePlacements(
      this.samples,
      this.params,
      this.assignment,
      [],
      [],
    );
    this.emit();
  }

  get roadTotalLength(): number {
    return roadLength(this.samples);
  }

  // ---------- 布置重生成 ----------

  /**
   * 按当前参数重生成。
   * @param scopeSegments 空数组 = 整路；否则只重算指定段（锁定树不动）
   */
  regenerate(scopeSegments: number[] = []): void {
    if (!this.roadBuilt) return;
    this.rebuildSamples();
    this.placements = regeneratePlacements(
      this.samples,
      this.params,
      this.assignment,
      this.placements,
      scopeSegments,
    );
    if (scopeSegments.length) this.selectedSegments = [];
    this.emit();
  }

  /** 手动挪动 → 锁定，后续重生成原地不动 */
  movePlacement(id: string, world: Vec3): void {
    this.placements = this.placements.map((p) =>
      p.id === id ? lockPlacementAt(p, this.samples, world) : p,
    );
    this.emit();
  }

  unlockPlacement(id: string): void {
    this.placements = this.placements.map((p) =>
      p.id === id ? { ...p, locked: false } : p,
    );
    this.emit();
  }

  setSelectedSegments(segments: number[]): void {
    this.selectedSegments = segments;
    this.emit();
  }

  // ---------- 成绩 ----------

  addGrade(record: GradeRecord): void {
    this.grades = [record, ...this.grades];
    this.emit();
  }

  updateGrade(id: string, patch: Partial<GradeRecord>): void {
    this.grades = this.grades.map((g) => (g.id === id ? { ...g, ...patch } : g));
    this.emit();
  }

  resetAll(): void {
    clearState();
    const fresh = defaultPersistState();
    this.role = fresh.role;
    this.assignment = fresh.assignment;
    this.params = fresh.params;
    this.controlPoints = [];
    this.placements = [];
    this.grades = [];
    this.samples = [];
    this.roadBuilt = false;
    this.tool = 'draw';
    this.selectedSegments = [];
    this.emit();
  }
}

export const store = new AppStore();
