import type {
  Assignment,
  CheckItem,
  GradeRecord,
  GreeningParams,
  Placement,
  TreeSpecies,
} from '../types';
import { normalizeRatio, SPECIES, SPECIES_LABEL } from './geometry';

/** 自动核对：参数是否落在题目范围内，按权重给部分分 */
export function checkParams(
  params: GreeningParams,
  assignment: Assignment,
): { checks: CheckItem[]; autoScore: number } {
  const checks: CheckItem[] = [];

  const scalarKeys = [
    'roadWidth',
    'treeSpacing',
    'lampSpacing',
    'flowerBedLength',
  ] as const;

  for (const key of scalarKeys) {
    const rule = assignment.rules[key];
    const value = params[key];
    const passed = value >= rule.min && value <= rule.max;
    // 部分分：范围内满分；范围外按偏离比例线性给分，最低 0
    let score = rule.weight;
    if (!passed) {
      const span = rule.max - rule.min || 1;
      const over = value < rule.min ? rule.min - value : value - rule.max;
      const ratio = Math.min(1, over / span);
      score = Math.round(rule.weight * (1 - ratio) * 10) / 10;
    }
    checks.push({
      key,
      label: rule.label,
      passed,
      score,
      maxScore: rule.weight,
      detail: passed
        ? `${value}${rule.unit ?? ''}，在允许范围 [${rule.min}, ${rule.max}]${rule.unit ?? ''} 内`
        : `${value}${rule.unit ?? ''}，超出允许范围 [${rule.min}, ${rule.max}]${rule.unit ?? ''}`,
    });
  }

  // 树种比例核对（占 20 分，权重之和为 100，比例项单独加分后归一到百分制）
  const ratio = normalizeRatio(params.speciesRatio);
  const tol = assignment.ratioTolerance;
  const deviations = SPECIES.map((k) => Math.abs(ratio[k] - assignment.expectedRatio[k]));
  const maxDev = Math.max(...deviations);
  const ratioPassed = maxDev <= tol;
  const ratioScore = ratioPassed
    ? 20
    : Math.round(Math.max(0, 20 * (1 - (maxDev - tol) / Math.max(tol, 0.01))) * 10) / 10;
  checks.push({
    key: 'speciesRatio',
    label: '树种比例',
    passed: ratioPassed,
    score: ratioScore,
    maxScore: 20,
    detail: `实际 ${SPECIES.map((k) => `${SPECIES_LABEL[k]} ${(ratio[k] * 100).toFixed(0)}%`).join('、')}` +
      `；目标偏差 ≤ ${(tol * 100).toFixed(0)}%，实际最大偏差 ${(maxDev * 100).toFixed(0)}%`,
  });

  // 标量项权重和 100，比例项 20 → 总分折算到 100
  const raw = checks.reduce((sum, c) => sum + c.score, 0);
  const max = checks.reduce((sum, c) => sum + c.maxScore, 0);
  const autoScore = Math.round((raw / max) * 1000) / 10;
  return { checks, autoScore };
}

/** 从核对结果与布置统计中提取典型错误标签 */
export function extractErrorTags(
  checks: CheckItem[],
  params: GreeningParams,
  placements: Placement[],
): string[] {
  const tags: string[] = [];
  for (const c of checks) {
    if (!c.passed) tags.push(`${c.label}超标`);
  }
  const trees = placements.filter((p) => p.kind === 'tree');
  if (trees.length) {
    const lockedRatio = trees.filter((t) => t.locked).length / trees.length;
    if (lockedRatio > 0.2) tags.push('手动挪动树木过多(>20%)');
    const counts = new Map<TreeSpecies, number>();
    for (const t of trees) counts.set(t.species!, (counts.get(t.species!) ?? 0) + 1);
    const dominant = Math.max(...counts.values());
    if (dominant / trees.length > 0.7) tags.push('树种单一化倾向');
  }
  if (params.season === 'winter') tags.push('冬季落叶方案（叶密度降低）');
  return tags;
}

export interface ClassSummary {
  count: number;
  averageAuto: number;
  averageFinal: number | null;
  errorFrequency: { tag: string; count: number }[];
  scoreBands: { band: string; count: number }[];
}

/** 全班成绩与典型错误汇总 */
export function summarizeGrades(grades: GradeRecord[]): ClassSummary {
  const count = grades.length;
  const averageAuto = count
    ? Math.round((grades.reduce((s, g) => s + g.autoScore, 0) / count) * 10) / 10
    : 0;
  const finalized = grades.filter((g) => g.finalScore !== null);
  const averageFinal = finalized.length
    ? Math.round((finalized.reduce((s, g) => s + (g.finalScore ?? 0), 0) / finalized.length) * 10) / 10
    : null;

  const tagCount = new Map<string, number>();
  for (const g of grades) {
    for (const tag of g.errorTags) tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1);
  }
  const errorFrequency = Array.from(tagCount.entries())
    .map(([tag, c]) => ({ tag, count: c }))
    .sort((a, b) => b.count - a.count);

  const bands = [
    { band: '优秀 (90-100)', min: 90, max: 101, count: 0 },
    { band: '良好 (80-89)', min: 80, max: 90, count: 0 },
    { band: '中等 (70-79)', min: 70, max: 80, count: 0 },
    { band: '及格 (60-69)', min: 60, max: 70, count: 0 },
    { band: '不及格 (<60)', min: 0, max: 60, count: 0 },
  ];
  for (const g of grades) {
    const score = g.finalScore ?? g.autoScore;
    for (const b of bands) {
      if (score >= b.min && score < b.max) {
        b.count += 1;
        break;
      }
    }
  }
  return {
    count,
    averageAuto,
    averageFinal,
    errorFrequency,
    scoreBands: bands.map(({ band, count: c }) => ({ band, count: c })),
  };
}
