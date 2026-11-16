// 导出：带编号 SVG 下料图、物料清单 CSV、拼缝表 CSV、最小 ZIP 打包（store）
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const mm = (m) => (m * 1000).toFixed(1)

function pathFrom(points, ox, oy) {
  return points.map((p, i) => `${i ? 'L' : 'M'}${(p.x * 1000 - ox).toFixed(2)},${(p.y * 1000 - oy).toFixed(2)}`).join(' ') + ' Z'
}

// 单块下料 SVG（单位 mm），含边长标注、拼缝编号与对应关系、图签
export function blockSvg(block, seams, sheetW, sheetH) {
  const ox = block.bbox.minX * 1000 - 20
  const oy = block.bbox.minY * 1000 - 20
  const w = block.flatWidth * 1000 + 40
  const h = block.flatHeight * 1000 + 150
  const seamById = new Map(seams.map((s) => [s.id, s]))
  const labels = []
  for (const seg of block.segments) {
    const mx = (seg.from.x + seg.to.x) / 2 * 1000 - ox
    const my = (seg.from.y + seg.to.y) / 2 * 1000 - oy
    const ang = Math.atan2((seg.to.y - seg.from.y) * 1000, (seg.to.x - seg.from.x) * 1000) * 180 / Math.PI
    if (seg.seamId) {
      const s = seamById.get(seg.seamId)
      const neighbor = s.blockA === block.id ? s.blockB : s.blockA
      labels.push(
        `<g transform="rotate(${ang.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)})">` +
        `<rect x="${(mx - 16).toFixed(1)}" y="${(my - 8).toFixed(1)}" width="32" height="16" fill="#fff" stroke="#c0392b" stroke-width="0.7"/>` +
        `<text x="${mx.toFixed(1)}" y="${(my + 4).toFixed(1)}" text-anchor="middle" font-size="9" fill="#c0392b" font-weight="bold">${esc(seg.seamId)}</text>` +
        `</g>` +
        `<text x="${mx.toFixed(1)}" y="${(my + 16).toFixed(1)}" text-anchor="middle" font-size="7.5" fill="#666">对 ${esc(neighbor)} · 高差 ${mm(s.maxHeightStep)}mm</text>`
      )
    }
    labels.push(
      `<text x="${mx.toFixed(1)}" y="${(my - 6).toFixed(1)}" text-anchor="middle" font-size="7" fill="#1f6f8b" transform="rotate(${ang.toFixed(1)} ${mx.toFixed(1)} ${(my - 6).toFixed(1)})">${mm(seg.length)}</text>`
    )
  }
  const neighbors = block.segments
    .map((s) => s.seamId)
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((sid) => {
      const s = seamById.get(sid)
      const nb = s.blockA === block.id ? s.blockB : s.blockB
      return `${sid}↔${nb}(高差${mm(s.maxHeightStep)}mm)`
    })
    .join('；')
  const tbY = block.flatHeight * 1000 + 45
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w.toFixed(0)}mm" height="${h.toFixed(0)}mm" viewBox="0 0 ${w.toFixed(0)} ${h.toFixed(0)}" font-family="Microsoft YaHei, SimHei, sans-serif">
<rect x="0" y="0" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="#fbfbf8"/>
<rect x="8" y="8" width="${(w - 16).toFixed(0)}" height="${(h - 16).toFixed(0)}" fill="none" stroke="#999" stroke-width="0.4" stroke-dasharray="3 2"/>
<path d="${pathFrom(block.outline, ox, oy)}" fill="#e8f1f5" stroke="#1b4965" stroke-width="1.2" stroke-linejoin="round"/>
${labels.join('\n')}
<g font-size="9" fill="#222">
<rect x="20" y="${tbY}" width="${(w - 40).toFixed(0)}" height="86" fill="none" stroke="#333" stroke-width="0.8"/>
<line x1="20" y1="${tbY + 22}" x2="${(w - 20).toFixed(0)}" y2="${tbY + 22}" stroke="#333" stroke-width="0.5"/>
<line x1="20" y1="${tbY + 44}" x2="${(w - 20).toFixed(0)}" y2="${tbY + 44}" stroke="#333" stroke-width="0.5"/>
<line x1="20" y1="${tbY + 66}" x2="${(w - 20).toFixed(0)}" y2="${tbY + 66}" stroke="#333" stroke-width="0.5"/>
<text x="${w / 2}" y="${tbY + 15}" text-anchor="middle" font-size="13" font-weight="bold">下料图 ${esc(block.id)}（单位：mm）</text>
<text x="26" y="${tbY + 37}">外包尺寸：${mm(block.flatWidth)} × ${mm(block.flatHeight)}　板材幅面：${sheetW} × ${sheetH}　周长：${mm(block.perimeter)}</text>
<text x="26" y="${tbY + 59}">平均高程：${block.meanElevation.toFixed(2)} m　最大摊平失真：${(block.maxDistortion * 100).toFixed(1)}%　投影面积：${block.surfaceArea.toFixed(2)} m²</text>
<text x="26" y="${tbY + 81}">拼缝对应：${esc(neighbors || '外轮廓块，无拼缝')}</text>
</g>
</svg>`
}

// 拼版总图
export function nestingSvg(partition, sheetW, sheetH) {
  const gap = 15
  let x = gap, rowH = 0, y = gap
  const placed = []
  for (const b of partition.blocks) {
    const bw = b.flatWidth * 1000 + gap, bh = b.flatHeight * 1000 + gap
    if (x + bw > sheetW && x > gap) { x = gap; y += rowH + gap; rowH = 0 }
    placed.push({ b, px: x, py: y })
    x += bw
    rowH = Math.max(rowH, bh)
  }
  const totalH = y + rowH + 30
  const parts = placed.map(({ b, px, py }) => {
    const ox = b.bbox.minX * 1000 - px
    const oy = b.bbox.minY * 1000 - py
    const cx = px + b.flatWidth * 1000 / 2
    return `<path d="${pathFrom(b.outline, ox, oy)}" fill="#e8f1f5" stroke="#1b4965" stroke-width="1"/>
<text x="${cx.toFixed(1)}" y="${(py + 12).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="bold" fill="#1b4965">${esc(b.id)}</text>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${sheetW}mm" height="${totalH.toFixed(0)}mm" viewBox="0 0 ${sheetW} ${totalH.toFixed(0)}" font-family="Microsoft YaHei, SimHei, sans-serif">
<rect width="${sheetW}" height="${totalH.toFixed(0)}" fill="#fbfbf8"/>
${parts.join('\n')}
<text x="${gap}" y="${(totalH - 8).toFixed(0)}" font-size="9" fill="#444">拼版总图 · ${partition.blocks.length} 块 · 幅面 ${sheetW}×${sheetH} mm</text>
</svg>`
}

const csvCell = (v) => '"' + String(v).replace(/"/g, '""') + '"'

export function bomCsv(partition, reliefThickness, material) {
  const head = ['分块编号', '数量', '幅面宽(mm)', '幅面高(mm)', '周长(mm)', '投影面积(m2)', '平均高程(m)', '最大失真(%)', '浮雕厚度(mm)', '材料', '拼缝编号']
  const rows = partition.blocks.map((b) => {
    const seamIds = b.segments.map((s) => s.seamId).filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join('|')
    return [b.id, 1, mm(b.flatWidth), mm(b.flatHeight), mm(b.perimeter), b.surfaceArea.toFixed(3), b.meanElevation.toFixed(3), (b.maxDistortion * 100).toFixed(2), (reliefThickness * 1000).toFixed(0), material, seamIds]
  })
  return '﻿' + [head, ...rows].map((r) => r.map(csvCell).join(',')).join('\r\n')
}

export function seamCsv(partition) {
  const head = ['拼缝号', 'A块', 'B块', '平面长(mm)', '公共表面长(mm)', 'A侧下料长(mm)', 'B侧下料长(mm)', '最大高差(mm)', '平均高差(mm)', '块间平均高差(mm)']
  const rows = partition.seams.map((s) => [
    s.id, s.blockA, s.blockB, mm(s.planarLength), mm(s.surfaceLength), mm(s.flatLengthA), mm(s.flatLengthB),
    mm(s.maxHeightStep), mm(s.meanHeightStep), mm(s.elevationDiff),
  ])
  return '﻿' + [head, ...rows].map((r) => r.map(csvCell).join(',')).join('\r\n')
}

// ---------- 最小 ZIP（store，无压缩）----------
const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()
function crc32(bytes) {
  let c = 0xffffffff
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
const u16 = (v) => [v & 0xff, (v >>> 8) & 0xff]
const u32 = (v) => [v & 0xff, (v >>> 8) & 0xff, (v >>> 16) & 0xff, (v >>> 24) & 0xff]
const sig = (v) => u32(v) // ZIP 签名按小端 u32 存储，u32(0x04034b50) → 50 4b 03 04
export function buildZip(files) {
  const enc = new TextEncoder()
  const now = new Date()
  const dosTime = ((now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() / 2)) & 0xffff
  const dosDate = (((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate()) & 0xffff
  const chunks = [], central = []
  let offset = 0
  for (const f of files) {
    const name = enc.encode(f.name)
    const data = typeof f.content === 'string' ? enc.encode(f.content) : f.content
    const crc = crc32(data)
    const local = [
      ...sig(0x04034b50), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(dosTime), ...u16(dosDate),
      ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), ...u16(0),
    ]
    chunks.push(Uint8Array.from(local), name, data)
    central.push([
      ...sig(0x02014b50), ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0),
      ...u16(dosTime), ...u16(dosDate), ...u32(crc), ...u32(data.length), ...u32(data.length),
      ...u16(name.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(0), ...u32(offset),
    ], name)
    offset += local.length + name.length + data.length
  }
  const cdStart = offset
  let cdSize = 0
  for (const c of central) { cdSize += c.length }
  const end = [
    ...sig(0x06054b50), ...u16(0), ...u16(0), ...u16(files.length), ...u16(files.length),
    ...u32(cdSize), ...u32(cdStart), ...u16(0),
  ]
  const out = new Uint8Array(offset + cdSize + end.length)
  let p = 0
  for (const c of [...chunks, ...central, Uint8Array.from(end)]) { out.set(c, p); p += c.length }
  return out
}
