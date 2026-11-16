// 图层定义、严重度、问题状态等全局常量

export const LAYERS = [
  { key: 'building',  name: '建筑轮廓', color: '#8fa3bf', icon: '▭', order: 0 },
  { key: 'room',      name: '房间',     color: '#6b7a90', icon: '▢', order: 1 },
  { key: 'stair',     name: '楼梯',     color: '#4da3ff', icon: '◫', order: 2 },
  { key: 'exit',      name: '出口',     color: '#33d17a', icon: '⇥', order: 3 },
  { key: 'extinguisher', name: '灭火器', color: '#ff7a45', icon: '⬤', order: 4 },
  { key: 'camera',    name: '监控点位', color: '#b58cff', icon: '◉', order: 5 },
  { key: 'fireLane',  name: '消防通道', color: '#ffd43b', icon: '⇢', order: 6 }
];

export const LAYER_KEYS = LAYERS.map((l) => l.key);
export const LAYER_COLOR = Object.fromEntries(LAYERS.map((l) => [l.key, l.color]));

// 点要素（命中检测走点容差），面/线要素（命中检测走几何包含/相交）
export const POINT_TYPES = new Set(['exit', 'extinguisher', 'camera']);

export const SEVERITY = {
  fatal:  { key: 'fatal',  name: '致命', rank: 0, color: '#ff3b30' },
  major:  { key: 'major',  name: '严重', rank: 1, color: '#ff9500' },
  minor:  { key: 'minor',  name: '一般', rank: 2, color: '#ffcc00' },
  info:   { key: 'info',   name: '提示', rank: 3, color: '#64d2ff' }
};
export const SEVERITY_ORDER = ['fatal', 'major', 'minor', 'info'];

export const ISSUE_STATUS = {
  pending:  { key: 'pending', name: '待复核', color: '#8e8e93' },
  confirmed:{ key: 'confirmed', name: '确认', color: '#ff453a' },
  rejected: { key: 'rejected', name: '驳回', color: '#30d158' }
};

export const BATCH_STATUS = {
  empty:     { key: 'empty', name: '未导入' },
  checking:  { key: 'checking', name: '检查中' },
  reviewing: { key: 'reviewing', name: '复核中' },
  hold:      { key: 'hold', name: '不予放行' },
  released:  { key: 'released', name: '已放行' }
};

// 缩放分级：detailZoom 之上为房间级细节（画编号/尺寸），之下为简化色块 + 数量标注
export const DETAIL_ZOOM = 2;      // scale 阈值
export const TILE_WORLD = 64;      // 每张瓦片覆盖的世界坐标尺寸（米）
export const TILE_PX = 256;        // 瓦片像素
export const MAX_TILE_CACHE = 360; // 每级 LOD 瓦片缓存上限（LRU）
