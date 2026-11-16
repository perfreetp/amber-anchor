// 示例海域数据（平面坐标，单位：米；模拟 CGCS2000 投影坐标量级）
// 海岸线（折线）、航道（中心线 + 宽度）、锚地（面）、养殖区（面）、初始宗海

export const SEA_USE_TYPES = [
  { code: 'ZSHY-01', name: '渔业用海', color: '#2f9e8f' },
  { code: 'ZSHY-02', name: '工业用海', color: '#c47f2d' },
  { code: 'ZSHY-03', name: '交通运输用海', color: '#3d7bc4' },
  { code: 'ZSHY-04', name: '旅游娱乐用海', color: '#c45aa0' },
  { code: 'ZSHY-05', name: '海底工程用海', color: '#7d6bb5' },
  { code: 'ZSHY-06', name: '排污倾倒用海', color: '#8a8f4b' },
  { code: 'ZSHY-07', name: '造地工程用海', color: '#b5654a' },
  { code: 'ZSHY-08', name: '特殊用海', color: '#9a3d3d' }
];

export function seaTypeName(code) {
  return SEA_USE_TYPES.find((t) => t.code === code)?.name ?? code;
}
export function seaTypeColor(code) {
  return SEA_USE_TYPES.find((t) => t.code === code)?.color ?? '#5a8fb0';
}

// 海岸线：一条带有若干拐点的折线（陆地在北侧 y 较大一侧），依次斜穿 ZH-001、ZH-002 北部
export const coastline = [
  { x: 0, y: 1750 },
  { x: 600, y: 1700 },
  { x: 1100, y: 1620 },
  { x: 1500, y: 1480 },
  { x: 1750, y: 1260 },
  { x: 2050, y: 1000 },
  { x: 2400, y: 1050 },
  { x: 2900, y: 1600 },
  { x: 3500, y: 1520 },
  { x: 4200, y: 1450 }
];

// 航道：中心线折线（西南→东北，逐段横穿各宗海）+ 宽度（米）
export const fairway = {
  name: '主航道 L-3',
  width: 120,
  centerline: [
    { x: 200, y: 700 },
    { x: 900, y: 1050 },
    { x: 1700, y: 1300 },
    { x: 2500, y: 1180 },
    { x: 3300, y: 950 },
    { x: 3900, y: 700 }
  ]
};

// 锚地（用于扣减形成孔洞）
export const anchorages = [
  {
    id: 'anchor-1',
    name: '1号锚地',
    ring: [
      { x: 1800, y: 1000 },
      { x: 2150, y: 980 },
      { x: 2200, y: 1250 },
      { x: 1850, y: 1300 }
    ]
  },
  {
    id: 'anchor-2',
    name: '2号锚地',
    ring: [
      { x: 2750, y: 800 },
      { x: 3150, y: 780 },
      { x: 3200, y: 1050 },
      { x: 2800, y: 1100 }
    ]
  }
];

// 养殖区（底图参考图层）
export const aquacultureZones = [
  {
    id: 'aq-1',
    name: '东湾养殖区',
    ring: [
      { x: 400, y: 300 },
      { x: 1200, y: 250 },
      { x: 1350, y: 700 },
      { x: 550, y: 780 }
    ]
  },
  {
    id: 'aq-2',
    name: '沙岗养殖区',
    ring: [
      { x: 2500, y: 150 },
      { x: 3300, y: 120 },
      { x: 3400, y: 520 },
      { x: 2600, y: 580 }
    ]
  }
];

let parcelSeq = 3;
export function nextParcelId() {
  return `ZH-${String(++parcelSeq).padStart(3, '0')}`;
}
export function resetParcelSeq(n) {
  parcelSeq = n;
}

// 初始宗海
export function initialParcels() {
  return [
    {
      id: 'ZH-001',
      applicant: '蓝湾水产养殖有限公司',
      seaType: 'ZSHY-01',
      elevation: 12, // 用海高程（米），用于三维拉伸
      status: '待分派',
      rings: [
        [
          { x: 700, y: 1000 },
          { x: 1620, y: 950 },
          { x: 1620, y: 1500 },
          { x: 850, y: 1600 }
        ]
      ]
    },
    {
      id: 'ZH-002',
      applicant: '临港工业集团',
      seaType: 'ZSHY-02',
      elevation: 28,
      status: '待分派',
      rings: [
        [
          { x: 1620, y: 950 },
          { x: 2400, y: 880 },
          { x: 2480, y: 1450 },
          { x: 1620, y: 1500 }
        ]
      ]
    },
    {
      id: 'ZH-003',
      applicant: '市港务发展公司',
      seaType: 'ZSHY-03',
      elevation: 20,
      status: '待分派',
      rings: [
        [
          { x: 2550, y: 700 },
          { x: 3300, y: 650 },
          { x: 3380, y: 1200 },
          { x: 2620, y: 1280 }
        ]
      ]
    }
  ];
}

// 师傅（承办人）名单
export const surveyors = [
  { id: 'u01', name: '王建国', title: '高级调查员' },
  { id: 'u02', name: '李秀兰', title: '调查员' },
  { id: 'u03', name: '陈海涛', title: '调查员' },
  { id: 'u04', name: '赵敏', title: '助理调查员' }
];

export const WORKFLOW_STAGES = ['待分派', '调查中', '待质检', '质检合格', '不合格打回'];

// 初始工单
export function initialJobs(parcels) {
  return parcels.map((p, i) => ({
    jobId: `GD-2026-${String(1001 + i)}`,
    parcelId: p.id,
    applicant: p.applicant,
    receivedAt: `2026-11-${String(10 + i).padStart(2, '0')} 09:${20 + i * 7}`,
    stage: '待分派',
    assignee: null,
    qcResult: null,
    reworkCount: 0,
    history: [
      { at: `2026-11-${String(10 + i).padStart(2, '0')} 09:${20 + i * 7}`, action: '前台接单登记', by: '前台' }
    ]
  }));
}
