// 导出：俯视图 PNG + 物料清单 CSV
import { renderTopDown } from './renderer.js'
import { ITEM_TYPES } from './catalog.js'
import { effectiveDims } from './isoMath.js'

export function exportPNG(items, visibleTypes, conflicts, projectName) {
  const canvas = document.createElement('canvas')
  renderTopDown(canvas, items, visibleTypes, conflicts)
  const url = canvas.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = url
  a.download = `${safeName(projectName)}-俯视图-${stamp()}.png`
  a.click()
}

// 按类型汇总：数量、单尺寸、总占地、物料
export function buildMaterialRows(items, visibleTypes) {
  const groups = new Map()
  for (const obj of items) {
    if (!visibleTypes.has(obj.type)) continue
    if (!groups.has(obj.type)) groups.set(obj.type, [])
    groups.get(obj.type).push(obj)
  }
  const rows = [['类型', '数量', '单件尺寸(米 宽×深×高)', '总占地面积(㎡)', '物料', '备注']]
  for (const [type, list] of groups) {
    const t = ITEM_TYPES[type]
    let area = 0
    for (const o of list) {
      const d = effectiveDims(o)
      area += d.w * d.d
    }
    const sample = list[0]
    const sd = effectiveDims(sample)
    rows.push([
      t.name,
      String(list.length),
      `${sd.w.toFixed(1)}×${sd.d.toFixed(1)}×${sd.h.toFixed(1)}`,
      area.toFixed(2),
      t.material,
      list.some((o) => o.scale !== 1) ? '含缩放件' : '',
    ])
  }
  rows.push(['合计', String(items.filter((o) => visibleTypes.has(o.type)).length), '', '', '', ''])
  return rows
}

export function exportCSV(items, visibleTypes, projectName) {
  const rows = buildMaterialRows(items, visibleTypes)
  const csv = rows
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
    .join('\r\n')
  // 加 BOM 保证 Excel 中文
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${safeName(projectName)}-物料清单-${stamp()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function safeName(s) {
  return (s || '未命名项目').replace(/[\\/:*?"<>|]/g, '_')
}

function stamp() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`
}
