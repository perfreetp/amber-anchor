import * as G from './geometry.js';
import { seaTypeColor, seaTypeName, fairway, coastline } from './sample-data.js';

const SCALE_DENOM = 5000; // 1:5000
// 图上 1mm = 实地 5m；SVG 用户单位按毫米
const M_TO_MM = 1000 / SCALE_DENOM;

function download(filename, content, mime) {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function ringPath(ring, ox, oy) {
  return (
    ring
      .map((v, i) => `${i === 0 ? 'M' : 'L'}${((v.x - ox) * M_TO_MM).toFixed(3)},${((oy - v.y) * M_TO_MM).toFixed(3)}`)
      .join(' ') + ' Z'
  );
}

// 导出整幅宗海图 SVG（1:5000）
export function exportMapSVG(parcels, closureBadIds) {
  const all = parcels.map((p) => ({ rings: p.rings }));
  const box = G.bbox(all);
  const pad = 120; // 实地米留白
  const minX = box.minX - pad;
  const maxY = box.maxY + pad;
  const widthMm = (box.w + pad * 2) * M_TO_MM;
  const heightMm = (box.h + pad * 2) * M_TO_MM;

  const bad = new Set(closureBadIds);
  const parcelLayers = parcels
    .map((p) => {
      const color = seaTypeColor(p.seaType);
      const fill = p.rings
        .map((ring, ri) => {
          const d = ringPath(ring, minX, maxY);
          if (ri === 0) {
            return `<path d="${d}" fill="${color}" fill-opacity="0.28" stroke="${bad.has(p.id) ? '#d12b2b' : '#143a5c'}" stroke-width="0.35" stroke-linejoin="round"/>`;
          }
          return `<path d="${d}" fill="#ffffff" fill-opacity="0.85" stroke="#7a3b1d" stroke-width="0.3" stroke-dasharray="1.2,0.8"/>`;
        })
        .join('\n      ');
      const pts = p.rings
        .map((ring, ri) =>
          ring
            .map((v, i) => {
              const x = ((v.x - minX) * M_TO_MM).toFixed(3);
              const y = ((maxY - v.y) * M_TO_MM).toFixed(3);
              const label = ri === 0 ? `J${i + 1}` : `K${ri}-${i + 1}`;
              return `<g><circle cx="${x}" cy="${y}" r="0.7" fill="#143a5c"/><text x="${Number(x) + 1.1}" y="${Number(y) - 1.1}" font-size="2.4" fill="#143a5c" font-family="SimSun, serif">${label}</text></g>`;
            })
            .join('\n      ')
        )
        .join('\n      ');
      const c = G.centroid(p.rings[0]);
      const cx = ((c.x - minX) * M_TO_MM).toFixed(3);
      const cy = ((maxY - c.y) * M_TO_MM).toFixed(3);
      return `    <g id="${p.id}">
      ${fill}
      ${pts}
      <text x="${cx}" y="${cy}" text-anchor="middle" font-size="3" font-weight="bold" fill="#0d253f" font-family="SimHei, sans-serif">${p.id} ${seaTypeName(p.seaType)}</text>
      <text x="${cx}" y="${Number(cy) + 4}" text-anchor="middle" font-size="2.4" fill="#0d253f" font-family="SimSun, serif">${G.polygonArea({ rings: p.rings }).toFixed(2)} m²</text>
    </g>`;
    })
    .join('\n');

  const coastPath =
    coastline
      .map((v, i) => `${i === 0 ? 'M' : 'L'}${((v.x - minX) * M_TO_MM).toFixed(3)},${((maxY - v.y) * M_TO_MM).toFixed(3)}`)
      .join(' ');
  const fairPath =
    fairway.centerline
      .map((v, i) => `${i === 0 ? 'M' : 'L'}${((v.x - minX) * M_TO_MM).toFixed(3)},${((maxY - v.y) * M_TO_MM).toFixed(3)}`)
      .join(' ');
  const fairWidthMm = fairway.width * M_TO_MM;

  const today = new Date();
  const stamp = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${widthMm.toFixed(1)}mm" height="${(heightMm + 18).toFixed(1)}mm" viewBox="0 0 ${widthMm.toFixed(2)} ${(heightMm + 18).toFixed(2)}">
  <rect x="0" y="0" width="${widthMm.toFixed(2)}" height="${(heightMm + 18).toFixed(2)}" fill="#f4f8fb"/>
  <g id="basemap">
    <path d="${coastPath}" fill="none" stroke="#6b5a3a" stroke-width="0.5"/>
    <path d="${fairPath}" fill="none" stroke="#2f6fb0" stroke-width="${fairWidthMm.toFixed(2)}" stroke-opacity="0.12"/>
    <path d="${fairPath}" fill="none" stroke="#2f6fb0" stroke-width="0.3" stroke-dasharray="2,1.2"/>
  </g>
  <g id="parcels">
${parcelLayers}
  </g>
  <g id="title-block" font-family="SimSun, serif" fill="#0d253f">
    <rect x="2" y="${(heightMm + 2).toFixed(2)}" width="${(widthMm - 4).toFixed(2)}" height="14" fill="none" stroke="#0d253f" stroke-width="0.3"/>
    <text x="4" y="${(heightMm + 7).toFixed(2)}" font-size="3.6" font-weight="bold" font-family="SimHei, sans-serif">海域使用权宗海图（1:${SCALE_DENOM}）</text>
    <text x="4" y="${(heightMm + 12.5).toFixed(2)}" font-size="2.6">制图单位：县自然资源和规划局　　制图日期：${stamp}　　红色轮廓为面积闭合差超 1 m² 的宗海（共 ${bad.size} 宗）</text>
    <text x="${(widthMm - 6).toFixed(2)}" y="${(heightMm + 12.5).toFixed(2)}" text-anchor="end" font-size="2.6">坐标单位：m　面积单位：m²</text>
  </g>
</svg>`;
  download(`宗海图_1比${SCALE_DENOM}_${stamp}.svg`, svg, 'image/svg+xml');
  return bad.size;
}

// 界址点坐标表 CSV（每宗一个分节）
export function exportCoordinateTable(parcels) {
  const rows = [['宗海编号', '点号', 'X坐标(m)', 'Y坐标(m)', '所属环', '备注']];
  for (const p of parcels) {
    p.rings.forEach((ring, ri) => {
      ring.forEach((v, i) => {
        const code = ri === 0 ? `J${i + 1}` : `K${ri}-${i + 1}`;
        rows.push([
          p.id,
          code,
          v.x.toFixed(3),
          v.y.toFixed(3),
          ri === 0 ? '外轮廓' : `孔洞${ri}`,
          ri === 0 && i === 0 ? '起始界址点' : ''
        ]);
      });
    });
    rows.push([
      p.id,
      '—',
      `净面积 ${G.polygonArea({ rings: p.rings }).toFixed(3)} m²`,
      `外轮廓周长 ${G.ringLength(p.rings[0]).toFixed(3)} m`,
      '',
      seaTypeName(p.seaType)
    ]);
  }
  const csv = '﻿' + rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const today = new Date();
  const stamp = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
  download(`界址点坐标表_${stamp}.csv`, csv, 'text/csv');
}
