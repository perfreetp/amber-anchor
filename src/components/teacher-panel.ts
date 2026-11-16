import { store } from '../state/store';
import { BaseElement, sharedStyles } from './base';
import { SPECIES, SPECIES_LABEL } from '../core/geometry';
import type { Assignment, ParamRule } from '../types';

type RuleKey = keyof Assignment['rules'];

export class TeacherPanel extends BaseElement {
  private root: ShadowRoot | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.root = this.attachShadow({ mode: 'open' });
    this.root.innerHTML = `<style>${sharedStyles}</style><div id="content"></div>`;
    this.render();
  }

  private ruleEditor(key: RuleKey, rule: ParamRule): string {
    return `
      <div class="rule-row" data-rule="${key}">
        <div class="rule-name">${rule.label}${rule.unit ? ` (${rule.unit})` : ''} <span class="muted">· ${rule.weight}分</span></div>
        <div class="hstack">
          <label>最小 <input type="number" data-bound="min" value="${rule.min}" step="0.5"></label>
          <label>最大 <input type="number" data-bound="max" value="${rule.max}" step="0.5"></label>
          <label>权重 <input type="number" data-bound="weight" value="${rule.weight}" step="5"></label>
        </div>
      </div>`;
  }

  protected render(): void {
    if (!this.root) return;
    if (store.role !== 'teacher') {
      this.root.querySelector('#content')!.innerHTML =
        '<div class="panel muted">切换到教师角色后可编辑题目。</div>';
      return;
    }
    const a = store.assignment;
    const ruleKeys = Object.keys(a.rules) as RuleKey[];

    this.root.querySelector('#content')!.innerHTML = `
      <div class="panel">
        <h3>📝 题目设置（教师）</h3>
        <label class="field">
          <div class="row"><span class="name">题目名称</span></div>
          <input type="text" id="title" value="${a.title}">
        </label>
        <label class="field">
          <div class="row"><span class="name">题目说明</span></div>
          <textarea id="desc">${a.description}</textarea>
        </label>
        <div class="hstack" style="margin-bottom:10px">
          <label style="flex:1">
            <div class="name" style="margin-bottom:4px">随机种子（同种子布置完全一致）</div>
            <input type="number" id="seed" value="${a.seed}">
          </label>
          <label style="flex:1">
            <div class="name" style="margin-bottom:4px">分段长度 (m)</div>
            <input type="number" id="segLen" value="${a.segmentLength}" min="5" step="1">
          </label>
        </div>
        ${ruleKeys.map((k) => this.ruleEditor(k, a.rules[k])).join('')}
        <div style="margin-top:12px">
          <div class="name" style="margin-bottom:6px">目标树种比例（自动核对基准）</div>
          ${SPECIES.map((k) => `
            <label class="field">
              <div class="row"><span class="name">${SPECIES_LABEL[k]}</span>
                <span class="val">${(a.expectedRatio[k] * 100).toFixed(0)}%</span></div>
              <input type="range" data-expratio="${k}" min="0" max="100" step="10"
                value="${Math.round(a.expectedRatio[k] * 100)}">
            </label>`).join('')}
          <label class="field">
            <div class="row"><span class="name">比例容差 (±%)</span>
              <span class="val">${(a.ratioTolerance * 100).toFixed(0)}%</span></div>
            <input type="range" id="tol" min="5" max="30" step="5"
              value="${Math.round(a.ratioTolerance * 100)}">
          </label>
        </div>
        <button id="apply" class="warn">保存题目并应用</button>
      </div>
      <style>
        .rule-row { border: 1px solid var(--line); border-radius: 8px; padding: 8px 10px; margin-bottom: 8px; }
        .rule-name { font-weight: 600; margin-bottom: 6px; }
        .rule-row label { flex: 1; font-size: 12px; color: var(--muted); }
        .rule-row input { margin-top: 2px; }
      </style>
    `;

    this.root.querySelector('#apply')!.addEventListener('click', () => {
      const r = this.root!;
      const rules = structuredClone(store.assignment.rules);
      r.querySelectorAll<HTMLElement>('.rule-row').forEach((row) => {
        const key = row.dataset.rule as RuleKey;
        const min = Number((row.querySelector('[data-bound="min"]') as HTMLInputElement).value);
        const max = Number((row.querySelector('[data-bound="max"]') as HTMLInputElement).value);
        const weight = Number((row.querySelector('[data-bound="weight"]') as HTMLInputElement).value);
        if (max > min && weight > 0) rules[key] = { ...rules[key], min, max, weight };
      });
      const expectedRatio = { ...store.assignment.expectedRatio };
      r.querySelectorAll<HTMLInputElement>('input[data-expratio]').forEach((input) => {
        expectedRatio[input.dataset.expratio as keyof typeof expectedRatio] =
          Number(input.value) / 100;
      });
      const total = SPECIES.reduce((sum, k) => sum + expectedRatio[k], 0);
      for (const k of SPECIES) expectedRatio[k] /= total || 1;

      const patch: Partial<Assignment> = {
        title: (r.querySelector('#title') as HTMLInputElement).value,
        description: (r.querySelector('#desc') as HTMLTextAreaElement).value,
        seed: Number((r.querySelector('#seed') as HTMLInputElement).value),
        segmentLength: Math.max(5, Number((r.querySelector('#segLen') as HTMLInputElement).value)),
        rules,
        expectedRatio,
        ratioTolerance: Number((r.querySelector('#tol') as HTMLInputElement).value) / 100,
      };
      store.updateAssignment(patch);
      alert('题目已更新。新的参数范围与种子将对后续生成与核对生效。');
    });
  }
}
