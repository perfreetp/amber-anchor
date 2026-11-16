// 全局共享类型定义

export type ReachKind = 'river' | 'mainCanal' | 'subCanal' | 'lateral';

export type ReachLevel = 0 | 1 | 2 | 3; // 0 河道 1 干渠 2 支渠 3 斗渠

export interface Vec2 {
  x: number;
  y: number;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** 生成参数（配置单内容） */
export interface GenParams {
  apexX: number; // 扇顶 x（世界坐标，米）
  apexY: number; // 扇顶 y
  radius: number; // 扇半径（米）
  slope: number; // 纵向坡度（%）
  mainWidth: number; // 主河道宽度（米）
  branchLevels: number; // 分汊级数
  seed: number; // 随机种子（整数）
}

/** 河道/渠段上的一个节点 */
export interface ReachNode {
  x: number;
  y: number;
  /** 水面高程（米），生成时由地形与下切深度推导 */
  z: number;
  /** 该点河床宽度（米），沿程收窄 */
  width: number;
}

/** 一段河/渠：生成与锁定、对比的最小单元 */
export interface Reach {
  /** 结构 id：由生成拓扑决定，与种子无关（同参数同位置），用于锁定与差异对比 */
  id: string;
  kind: ReachKind;
  level: ReachLevel;
  parentId: string | null;
  /** 父段上的分汊锚点下标（从 0 开始），用于再生成时挂接 */
  parentAnchor: number;
  /** 结构路径，确定性随机流的 key 组成部分 */
  path: string;
  nodes: ReachNode[];
  /** 手改后锁定：重算时整段（及下游手改段）原地保留 */
  locked: boolean;
  /** 是否被手动编辑过（未锁定的手改段在重算时也随锁定祖先保留） */
  manuallyEdited: boolean;
  /** 预览精度下是否为降采样版本 */
  preview: boolean;
}

export interface FanModel {
  params: GenParams;
  reaches: Reach[];
  /** 生成时实际使用的精度：full | preview（>3000 段自动降精度） */
  precision: 'full' | 'preview';
  segmentCount: number;
  terrain: TerrainInfo;
  generatedAt: string;
}

export interface TerrainInfo {
  /** 地形网格分辨率（每边格数） */
  gridSize: number;
  extent: number; // 边长（米）
}

/** 剖面上的一个采样点 */
export interface ProfileSample {
  d: number; // 距剖面线起点的水平距离（米）
  ground: number; // 地面高程
  water: number | null; // 水面高程（该处有水时）
  waterLabel: string | null; // 所属渠段 id
}

export interface CrossSection {
  id: string;
  a: Vec2;
  b: Vec2;
  samples: ProfileSample[];
  createdAt: string;
}

export type AnnotationTarget = 'map' | 'profile';

export interface Annotation {
  id: string;
  target: AnnotationTarget;
  /** 地图批注：世界坐标；剖面批注：剖面 id + 距离/高程 */
  x: number;
  y: number;
  z: number;
  profileId?: string;
  author: string;
  text: string;
  createdAt: string;
  /** 制作方回复线程 */
  replies: { author: string; text: string; at: string }[];
  resolved: boolean;
  /** 关联版本 id */
  versionId: string;
}

export interface VersionSnapshot {
  id: string;
  label: string;
  note: string;
  createdAt: string;
  model: FanModel;
  sections: CrossSection[];
  annotations: Annotation[];
}

export interface ReachDiff {
  id: string;
  kind: ReachKind;
  status: 'added' | 'removed' | 'modified' | 'unchanged';
  /** modified 时的几何偏差（米，节点平均位移） */
  deviation: number;
}

export interface ModelStats {
  totalLength: number; // 河道+渠系总长（米）
  riverLength: number;
  canalLength: number;
  reachCount: number;
  /** 渠系密度 = 渠线总长 / 扇面面积（km/km²） */
  canalDensity: number;
  fanArea: number; // 扇面面积 km²
}
