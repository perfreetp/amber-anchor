// 素材分类元数据与默认素材库（型号 / 单价 / 占位半径 / 喷洒参数）
export const CATEGORIES = {
  rotor: { label: '旋转喷头', color: 0x2e86ff, css: '#2e86ff', spray: true },
  spray: { label: '散射喷头', color: 0x27ae60, css: '#27ae60', spray: true },
  valve: { label: '电磁阀', color: 0x7f8c8d, css: '#7f8c8d', spray: false },
  plant: { label: '苗木', color: 0x2ecc71, css: '#2ecc71', spray: false },
  light: { label: '灯具', color: 0xf1c40f, css: '#b79b00', spray: false },
  bench: { label: '长椅', color: 0x9b59b6, css: '#9b59b6', spray: false },
};

export const CATEGORY_KEYS = Object.keys(CATEGORIES);

let seq = 0;
const uid = (p) => `${p}_${Date.now().toString(36)}_${(seq++).toString(36)}`;
export const genId = uid;

export function defaultCatalog() {
  return [
    { id: genId('a'), category: 'rotor', name: '旋转喷头', model: 'RT-5000', price: 86, radius: 0.25, sprayRange: 10, sprayArc: 180 },
    { id: genId('a'), category: 'rotor', name: '旋转喷头', model: 'RT-8000Pro', price: 148, radius: 0.25, sprayRange: 16, sprayArc: 210 },
    { id: genId('a'), category: 'spray', name: '散射喷头', model: 'SP-1804', price: 32, radius: 0.2, sprayRange: 4.5, sprayArc: 360 },
    { id: genId('a'), category: 'spray', name: '散射喷头', model: 'SP-1812', price: 45, radius: 0.2, sprayRange: 6, sprayArc: 270 },
    { id: genId('a'), category: 'valve', name: '电磁阀', model: 'DV-100', price: 120, radius: 0.3 },
    { id: genId('a'), category: 'valve', name: '电磁阀', model: 'DV-200F', price: 210, radius: 0.35 },
    { id: genId('a'), category: 'plant', name: '苗木', model: '香樟 Φ8cm', price: 260, radius: 1.2 },
    { id: genId('a'), category: 'plant', name: '苗木', model: '红叶石楠球 P80', price: 95, radius: 0.8 },
    { id: genId('a'), category: 'light', name: '灯具', model: '草坪灯 CL-30', price: 75, radius: 0.2 },
    { id: genId('a'), category: 'light', name: '灯具', model: '庭院灯 TY-3M', price: 320, radius: 0.25 },
    { id: genId('a'), category: 'bench', name: '长椅', model: '防腐木 1.5m', price: 480, radius: 0.9 },
    { id: genId('a'), category: 'bench', name: '长椅', model: '铸铁 1.8m', price: 720, radius: 1.0 },
  ];
}

// 演示项目：一块矩形带圆角的场地
export function defaultProject() {
  const boundary = [];
  const w = 40, d = 26, r = 6;
  // 四个圆角：NE / NW / SW / SE，沿多边形逆时针顺序
  const cx = [w / 2 - r, -w / 2 + r, -w / 2 + r, w / 2 - r];
  const cz = [d / 2 - r, d / 2 - r, -d / 2 + r, -d / 2 + r];
  const startA = [0, 90, 180, 270];
  for (let c = 0; c < 4; c++) {
    for (let i = 0; i <= 6; i++) {
      const a = ((startA[c] + (i / 6) * 90) * Math.PI) / 180;
      boundary.push([+(cx[c] + r * Math.cos(a)).toFixed(2), +(cz[c] + r * Math.sin(a)).toFixed(2)]);
    }
  }
  return {
    id: genId('p'),
    name: '示范园区 A 区',
    boundary,
    objects: [],
    status: 'draft', // draft | review | approved | rejected
    reviewComment: '',
    createdAt: new Date().toISOString(),
  };
}
