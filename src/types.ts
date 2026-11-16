// 全局共享类型定义

export type Role = 'teacher' | 'student';
export type Season = 'summer' | 'winter';
export type ToolMode = 'navigate' | 'draw' | 'move' | 'select';
export type TreeSpecies = 'camphor' | 'ginkgo' | 'plane';
export type Side = 'left' | 'right';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** 中心线控制点（用户在地面上点击绘制） */
export interface ControlPoint {
  x: number;
  z: number;
}

/** 等弧长重采样后的道路采样点 */
export interface RoadSample {
  /** 弧长位置（米） */
  s: number;
  x: number;
  y: number;
  z: number;
  /** 切线（单位向量，xz 平面） */
  tx: number;
  tz: number;
  /** 法线（左侧方向，单位向量） */
  nx: number;
  nz: number;
}

/** 学员可调的布置参数 */
export interface GreeningParams {
  /** 路宽（米） */
  roadWidth: number;
  /** 行道树间距（米） */
  treeSpacing: number;
  /** 三种行道树的比例，三项之和归一化处理 */
  speciesRatio: Record<TreeSpecies, number>;
  /** 单个花坛长度（米） */
  flowerBedLength: number;
  /** 花坛间隔（米，0 表示连续布置） */
  flowerBedGap: number;
  /** 路灯间隔（米） */
  lampSpacing: number;
  /** 灌木带间距（米） */
  shrubSpacing: number;
  season: Season;
}

/** 题目中单个参数的允许范围与分值权重 */
export interface ParamRule {
  min: number;
  max: number;
  /** 该参数占自动分的权重（自动分满分 100） */
  weight: number;
  label: string;
  unit?: string;
}

export interface Assignment {
  title: string;
  description: string;
  /** 全局随机种子，同种子下所有未锁定布置完全一致 */
  seed: number;
  /** 分段长度（米），重生成以段为最小单位 */
  segmentLength: number;
  rules: {
    roadWidth: ParamRule;
    treeSpacing: ParamRule;
    lampSpacing: ParamRule;
    flowerBedLength: ParamRule;
  };
  /** 树种比例允许的最大偏差（绝对值，如 0.1） */
  ratioTolerance: number;
  expectedRatio: Record<TreeSpecies, number>;
}

export type PlacementKind = 'tree' | 'shrub' | 'lamp' | 'flowerbed';

export interface Placement {
  id: string;
  kind: PlacementKind;
  species?: TreeSpecies;
  side: Side;
  /** 所属道路段索引；手动挪动锁定后保留原段 */
  segment: number;
  /** 沿中心线的弧长位置（米） */
  s: number;
  /** 距中心线的横向偏移（米，带正负：左正右负） */
  offset: number;
  position: Vec3;
  /** 手动挪动后锁定，重生成时原地不动 */
  locked: boolean;
  /** 生成该对象所用的局部随机序号，保证同种子可复现 */
  rngIndex: number;
  /** 树冠饱满度 0.6~1，冬季按比例降低 */
  canopy: number;
}

/** 一次自动核对的单项结果 */
export interface CheckItem {
  key: string;
  label: string;
  passed: boolean;
  score: number;
  maxScore: number;
  detail: string;
}

export interface GradeRecord {
  id: string;
  studentName: string;
  assignmentTitle: string;
  submittedAt: number;
  autoScore: number;
  finalScore: number | null;
  teacherComment: string;
  checks: CheckItem[];
  /** 提交时的参数快照 */
  params: GreeningParams;
  /** 统计用的典型错误标签 */
  errorTags: string[];
}

export interface AppState {
  role: Role;
  assignment: Assignment;
  params: GreeningParams;
  controlPoints: ControlPoint[];
  /** 是否已根据控制点生成道路几何 */
  roadBuilt: boolean;
  placements: Placement[];
  tool: ToolMode;
  /** 框选后待重生成的段索引集合，空数组表示整路重生成 */
  selectedSegments: number[];
  grades: GradeRecord[];
}
