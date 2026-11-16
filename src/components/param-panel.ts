import { store } from '../state/store';
import { BaseElement, sharedStyles } from './base';
import { normalizeRatio, SPECIES, SPECIES_LABEL } from '../core/geometry';
import { exportPlacementCsv, exportPlacementJson } from '../core/exporter';
import { checkParams, extractErrorTags } from '../core/grading';
import type { GradeRecord, GreeningParams, ParamRule, Season, TreeSpecies } from '../types';

export class ParamPanel extends BaseElement {
  private root: ShadowRoot | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.root = this.attachShadow({ mode: 'open' });
    this.root.innerHTML = `<style>${sharedStyles}</style><div id="content"></div>`;
    this.render();
  }

  private slider(
    key: keyof GreeningParams,
    label: string,
    min: number,
    max: number,
    step: number,
    value: number,
    rule?: ParamRule,
    unit = 'm',
  ): string {
    const outOfRange = rule ? value < rule.min || value > rule.max : false;
    const hint = rule
      ? `题目允许：${rule.min} ~ ${rule.max} ${rule.unit ?? unit}`
      : '';
    return `
      <label class="field ${outOfRange ? 'out-of-range' : ''}">
        <div class="row"><span class="name">${label}</span><span class="val">${value} ${unit}</span></div>
        <input type="range" data-key="${key}" min="${min}" max="${max}" step="${step}" value="${value}">
        ${hint ? `<div class="hint">${hint} ${outOfRange ? '· <b style="color:var(--danger)">超出题目范围</b>' : '· <b style="color:#1d7a3d">符合要求</b>'}</div>` : ''}
      </label>`;
  }

  protected render(): void {
    if (!this.root) return;
    const s = store;
    const p = s.params;
    const rules = s.assignment.rules;
    const ratio = normalizeRatio(p.speciesRatio);
    const isTeacher = s.role === 'teacher';

    const ratioRows = (SPECIES as TreeSpecies[]).map((k) => {
      const target = s.assignment.expectedRatio[k];
      const dev = Math.abs(ratio[k] - target);
      const bad = dev > s.assignment.ratioTolerance;
      return `
        <label class="field ${bad ? 'out-of-range' : ''}">
          <div class="row">
            <span class="name">${SPECIES_LABEL[k]}比例</span>
            <span class="val">${(ratio[k] * 100).toFixed(0)}%</span>
          </div>
          <input type="range" data-ratio="${k}" min="0" max="100" step="5"
            value="${Math.round(ratio[k] * 100)}">
          <div class="hint">目标 ${(target * 100).toFixed(0)}%（容差 ±${(s.assignment.ratioTolerance * 100).toFixed(0)}%）
          ${bad ? '· <b style="color:var(--danger)">偏差超标</b>' : '· <b style="color:#1d7a3d">达标</b>'}</div>
        </label>`;
    }).join('');

    this.root.querySelector('#content')!.innerHTML = `
      <div class="panel">
        <h3>📐 布置参数</h3>
        <div id="sliders">
          ${this.slider('roadWidth', '路宽', 6, 24, 0.5, p.roadWidth, rules.roadWidth)}
          ${this.slider('treeSpacing', '行道树间距', 3, 12, 0.5, p.treeSpacing, rules.treeSpacing)}
          ${this.slider('lampSpacing', '路灯间隔', 10, 40, 1, p.lampSpacing, rules.lampSpacing)}
          ${this.slider('flowerBedLength', '花坛长度', 2, 20, 0.5, p.flowerBedLength, rules.flowerBedLength)}
          ${this.slider('flowerBedGap', '花坛间隔', 0, 12, 0.5, p.flowerBedGap, undefined)}
          ${this.slider('shrubSpacing', '灌木间距', 1, 4, 0.2, p.shrubSpacing, undefined)}
        </div>
      </div>

      <div class="panel">
        <h3>🌳 树种比例</h3>
        ${ratioRows}
      </div>

      <div class="panel">
        <h3>🌤 季节（叶色 / 树冠密度）</h3>
        <div class="seg">
          <button data-season="summer" class="${p.season === 'summer' ? 'active' : ''}">☀️ 夏季</button>
          <button data-season="winter" class="${p.season === 'winter' ? 'active' : ''}">❄️ 冬季</button>
        </div>
        <div class="hint muted" style="margin-top:8px">
          冬季：树冠密度降至 62%，叶片转为枯黄/褐绿色，草地与灌木同步换色。
        </div>
      </div>

      <div class="panel">
        <h3>📤 导出与提交</h3>
        <div class="stack">
          <button id="exportCsv" ${s.roadBuilt ? '' : 'disabled'}>导出布置清单 (CSV)</button>
          <button id="exportJson" class="ghost" ${s.roadBuilt ? '' : 'disabled'}>导出布置数据 (JSON)</button>
          ${isTeacher ? '' : `<button id="submit" class="warn" ${s.roadBuilt ? '' : 'disabled'}">提交方案并自动核对</button>`}
        </div>
      </div>
    `;

    const sliders = this.root.querySelector('#sliders')!;
    sliders.querySelectorAll<HTMLInputElement>('input[type="range"][data-key]').forEach((input) => {
      input.addEventListener('input', () => {
        const key = input.dataset.key as keyof GreeningParams;
        s.updateParams({ [key]: Number(input.value) } as Partial<GreeningParams>);
      });
    });
    this.root.querySelectorAll<HTMLInputElement>('input[data-ratio]').forEach((input) => {
      input.addEventListener('input', () => {
        const k = input.dataset.ratio as TreeSpecies;
        s.updateParams({
          speciesRatio: { ...s.params.speciesRatio, [k]: Number(input.value) / 100 },
        });
      });
    });
    this.root.querySelectorAll<HTMLButtonElement>('button[data-season]').forEach((btn) => {
      btn.addEventListener('click', () => s.updateParams({ season: btn.dataset.season as Season }));
    });
    this.root.querySelector('#exportCsv')?.addEventListener('click', () => {
      exportPlacementCsv(s.placements, s.params, s.assignment);
    });
    this.root.querySelector('#exportJson')?.addEventListener('click', () => {
      exportPlacementJson(s.placements, s.params, s.assignment);
    });
    this.root.querySelector('#submit')?.addEventListener('click', () => this.submit());
  }

  private submit(): void {
    const s = store;
    const { checks, autoScore } = checkParams(s.params, s.assignment);
    const errorTags = extractErrorTags(checks, s.params, s.placements);
    const record: GradeRecord = {
      id: `g-${Date.now().toString(36)}`,
      studentName: `学员${(s.grades.length + 1).toString().padStart(2, '0')}`,
      assignmentTitle: s.assignment.title,
      submittedAt: Date.now(),
      autoScore,
      finalScore: null,
      teacherComment: '',
      checks,
      params: structuredClone(s.params),
      errorTags,
    };
    s.addGrade(record);
    alert(
      `提交成功！\n\n自动核对得分：${autoScore} / 100\n` +
        checks.map((c) => `${c.passed ? '✅' : '❌'} ${c.label}：${c.score}/${c.maxScore}`).join('\n') +
        `\n\n等待教师复核打分。`,
    );
  }
}
