import type { Assignment, GreeningParams, Placement } from '../types';
import { SPECIES_LABEL } from './geometry';

function download(filename: string, content: string | Blob, mime: string): void {
  const blob =
    typeof content === 'string' ? new Blob([content], { type: `${mime};charset=utf-8` }) : content;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const KIND_LABEL: Record<Placement['kind'], string> = {
  tree: '行道树',
  shrub: '灌木',
  lamp: '路灯',
  flowerbed: '花坛',
};

function csvEscape(v: string | number): string {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function exportPlacementCsv(
  placements: Placement[],
  params: GreeningParams,
  assignment: Assignment,
): void {
  const header = [
    '编号',
    '类型',
    '树种/规格',
    '侧别',
    '所属段',
    '弧长位置(m)',
    '横向偏移(m)',
    'X坐标',
    'Z坐标',
    '锁定',
  ];
  const rows = placements.map((p, i) => [
    i + 1,
    KIND_LABEL[p.kind],
    p.species ? SPECIES_LABEL[p.species] : p.kind === 'flowerbed' ? `${params.flowerBedLength}m` : '-',
    p.side === 'left' ? '左侧' : '右侧',
    p.segment + 1,
    p.s.toFixed(2),
    p.offset.toFixed(2),
    p.position.x.toFixed(2),
    p.position.z.toFixed(2),
    p.locked ? '是(手动锁定)' : '否',
  ]);

  const summary = [
    ['# 布置清单'],
    ['# 题目', assignment.title],
    ['# 种子', assignment.seed],
    ['# 季节', params.season === 'summer' ? '夏季' : '冬季'],
    ['# 路宽(m)', params.roadWidth],
    ['# 行道树间距(m)', params.treeSpacing],
    ['# 路灯间隔(m)', params.lampSpacing],
    ['# 花坛长度(m)', params.flowerBedLength],
    ['# 统计-行道树', placements.filter((p) => p.kind === 'tree').length],
    ['# 统计-灌木', placements.filter((p) => p.kind === 'shrub').length],
    ['# 统计-路灯', placements.filter((p) => p.kind === 'lamp').length],
    ['# 统计-花坛', placements.filter((p) => p.kind === 'flowerbed').length],
    [],
  ];

  const csv = [
    ...summary.map((r) => r.map(csvEscape).join(',')),
    header.map(csvEscape).join(','),
    ...rows.map((r) => r.map(csvEscape).join(',')),
  ].join('\r\n');
  // BOM 保证 Excel 正确识别 UTF-8 中文
  download(`布置清单_${assignment.seed}.csv`, '﻿' + csv, 'text/csv');
}

export function exportPlacementJson(
  placements: Placement[],
  params: GreeningParams,
  assignment: Assignment,
): void {
  const payload = {
    exportedAt: new Date().toISOString(),
    assignment: { title: assignment.title, seed: assignment.seed, segmentLength: assignment.segmentLength },
    params,
    counts: {
      tree: placements.filter((p) => p.kind === 'tree').length,
      shrub: placements.filter((p) => p.kind === 'shrub').length,
      lamp: placements.filter((p) => p.kind === 'lamp').length,
      flowerbed: placements.filter((p) => p.kind === 'flowerbed').length,
    },
    placements,
  };
  download(`布置清单_${assignment.seed}.json`, JSON.stringify(payload, null, 2), 'application/json');
}

export function exportScreenshot(dataUrl: string, seed: number): void {
  const bin = atob(dataUrl.split(',')[1]);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  download(`俯视截图_${seed}.png`, new Blob([bytes], { type: 'image/png' }), 'image/png');
}
