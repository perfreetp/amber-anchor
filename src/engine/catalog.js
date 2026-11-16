// 物件类型目录：尺寸单位米
export const ITEM_TYPES = {
  tent: {
    key: 'tent',
    name: '帐篷',
    w: 4,
    d: 4,
    h: 2.8,
    color: '#3b82f6',
    roof: '#2563eb',
    material: '顶布+支架',
  },
  equipment: {
    key: 'equipment',
    name: '器材',
    w: 2,
    d: 1.5,
    h: 1.2,
    color: '#f59e0b',
    roof: '#d97706',
    material: '木质/金属器材',
  },
  stand: {
    key: 'stand',
    name: '看台',
    w: 8,
    d: 3,
    h: 2.4,
    color: '#8b5cf6',
    roof: '#7c3aed',
    material: '拼装看台',
  },
  sign: {
    key: 'sign',
    name: '指示牌',
    w: 1,
    d: 0.4,
    h: 2.2,
    color: '#10b981',
    roof: '#059669',
    material: 'KT板+铁架',
  },
}

export const TYPE_ORDER = ['tent', 'equipment', 'stand', 'sign']

let seq = 1
export function makeItem(typeKey, x = 0, y = 0) {
  const t = ITEM_TYPES[typeKey]
  return {
    id: `${typeKey}-${Date.now().toString(36)}-${seq++}`,
    type: typeKey,
    name: t.name,
    x,
    y,
    z: 0,
    rotation: 0, // 度
    scale: 1,
    w: t.w,
    d: t.d,
    h: t.h,
    label: '',
  }
}
