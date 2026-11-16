import { store } from '../state/store';
import { BaseElement, sharedStyles } from './base';
import { summarizeGrades } from '../core/grading';

export class GradingPanel extends BaseElement {
  private root: ShadowRoot | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.root = this.attachShadow({ mode: 'open' });
    this.root.innerHTML = `<style>${sharedStyles}</style><div id="content"></div>`;
    this.render();
  }

  protected render(): void {
    if (!this.root) return;
    const s = store;
    const isTeacher = s.role === 'teacher';
    const summary = summarizeGrades(s.grades);

    if (!s.grades.length) {
      this.root.querySelector('#content')!.innerHTML = `
        <div class="panel">
          <h3>${isTeacher ? '📊 成绩复核与汇总' : '📊 我的成绩'}</h3>
          <p class="muted">还没有提交记录。学员在左侧参数面板提交方案后，这里会显示自动核对结果${
            isTeacher ? '，教师可在此复核打分' : '与教师评语'
          }。</p>
        </div>`;
      return;
    }

    const summaryHtml = isTeacher
      ? `
      <div class="panel">
        <h3>📈 班级汇总（共 ${summary.count} 份）</h3>
        <div class="hstack" style="margin-bottom:10px">
          <span class="badge info">自动分均值 ${summary.averageAuto}</span>
          ${summary.averageFinal !== null ? `<span class="badge ok">复核分均值 ${summary.averageFinal}</span>` : '<span class="badge warn">待复核</span>'}
        </div>
        <div class="grid2">
          <div>
            <div class="name" style="margin-bottom:6px">分数段分布</div>
            ${summary.scoreBands
              .map(
                (b) => `
              <div class="bar-row">
                <span class="bar-label">${b.band}</span>
                <div class="bar"><i style="width:${summary.count ? (b.count / summary.count) * 100 : 0}%"></i></div>
                <b>${b.count}</b>
              </div>`,
              )
              .join('')}
          </div>
          <div>
            <div class="name" style="margin-bottom:6px">典型错误频次</div>
            ${
              summary.errorFrequency.length
                ? summary.errorFrequency
                    .map(
                      (e) => `
                  <div class="bar-row">
                    <span class="bar-label">${e.tag}</span>
                    <div class="bar danger"><i style="width:${(e.count / summary.count) * 100}%"></i></div>
                    <b>${e.count}</b>
                  </div>`,
                    )
                    .join('')
                : '<p class="muted">暂无错误标签 🎉</p>'
            }
          </div>
        </div>
      </div>`
      : '';

    this.root.querySelector('#content')!.innerHTML = `
      ${summaryHtml}
      <div class="panel">
        <h3>${isTeacher ? '🧑‍🏫 待复核提交' : '📋 提交记录与反馈'}</h3>
        <div class="table-wrap">
        <table>
          <thead><tr>
            <th>学员</th><th>提交时间</th><th>自动分</th><th>复核分</th><th>核对明细 / 错误</th>${isTeacher ? '<th>操作</th>' : ''}
          </tr></thead>
          <tbody>
            ${s.grades
              .map((g) => {
                const date = new Date(g.submittedAt).toLocaleString('zh-CN', { hour12: false });
                return `
                <tr data-id="${g.id}">
                  <td>${g.studentName}</td>
                  <td>${date}</td>
                  <td><span class="badge ${g.autoScore >= 60 ? 'ok' : 'bad'}">${g.autoScore}</span></td>
                  <td>${
                    g.finalScore !== null
                      ? `<span class="badge ${g.finalScore >= 60 ? 'ok' : 'bad'}">${g.finalScore}</span>`
                      : '<span class="badge warn">待复核</span>'
                  }</td>
                  <td class="detail-cell">
                    ${g.checks
                      .map(
                        (c) =>
                          `<div>${c.passed ? '✅' : '❌'} ${c.label} ${c.score}/${c.maxScore} — <span class="muted">${c.detail}</span></div>`,
                      )
                      .join('')}
                    ${g.errorTags.length ? `<div style="margin-top:4px">${g.errorTags.map((t) => `<span class="badge bad" style="margin-right:4px">${t}</span>`).join('')}</div>` : ''}
                    ${g.teacherComment ? `<div class="comment">教师评语：${g.teacherComment}</div>` : ''}
                  </td>
                  ${
                    isTeacher
                      ? `<td>
                          <button class="tiny" data-act="review">${g.finalScore !== null ? '修改复核' : '复核打分'}</button>
                        </td>`
                      : ''
                  }
                </tr>`;
              })
              .join('')}
          </tbody>
        </table>
        </div>
      </div>
      <style>
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        @media (max-width: 900px) { .grid2 { grid-template-columns: 1fr; } }
        .bar-row { display: grid; grid-template-columns: 110px 1fr 28px; align-items: center; gap: 8px; margin-bottom: 6px; font-size: 12.5px; }
        .bar { background: #e8efe9; border-radius: 5px; height: 14px; overflow: hidden; }
        .bar.danger { background: #f6e2de; }
        .bar i { display: block; height: 100%; background: var(--primary); border-radius: 5px; }
        .bar.danger i { background: var(--danger); }
        .table-wrap { overflow-x: auto; }
        .detail-cell { min-width: 280px; font-size: 12px; line-height: 1.7; }
        .comment { margin-top: 4px; padding: 6px 8px; background: #f3f8f4; border-left: 3px solid var(--primary); border-radius: 4px; }
      </style>
    `;

    if (isTeacher) {
      this.root.querySelectorAll<HTMLButtonElement>('button[data-act="review"]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = (btn.closest('tr') as HTMLElement).dataset.id!;
          this.openReview(id);
        });
      });
    }
  }

  private openReview(id: string): void {
    const record = store.grades.find((g) => g.id === id);
    if (!record) return;
    const overlay = document.createElement('div');
    overlay.style.cssText =
      'position:fixed;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;z-index:1000';
    overlay.innerHTML = `
      <div style="background:#fff;border-radius:12px;padding:22px;width:440px;max-width:92vw;box-shadow:0 12px 40px rgba(0,0,0,.25)">
        <h3 style="margin-top:0">复核打分 — ${record.studentName}</h3>
        <p class="muted" style="font-size:13px">自动核对分：<b>${record.autoScore}</b> / 100</p>
        <label style="display:block;margin-bottom:12px">
          <b>最终成绩（0-100）</b>
          <input id="finalScore" type="number" min="0" max="100" value="${record.finalScore ?? record.autoScore}" style="width:100%;padding:8px;margin-top:6px;border:1px solid #ccc;border-radius:6px">
        </label>
        <label style="display:block;margin-bottom:16px">
          <b>教师评语</b>
          <textarea id="comment" style="width:100%;min-height:90px;padding:8px;margin-top:6px;border:1px solid #ccc;border-radius:6px">${record.teacherComment}</textarea>
        </label>
        <div style="display:flex;gap:10px;justify-content:flex-end">
          <button id="cancel" style="background:#fff;color:#333;border:1px solid #ccc;border-radius:7px;padding:8px 16px;cursor:pointer">取消</button>
          <button id="ok" style="background:#2f6f4e;color:#fff;border:none;border-radius:7px;padding:8px 18px;cursor:pointer">保存复核</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#cancel')!.addEventListener('click', () => overlay.remove());
    overlay.querySelector('#ok')!.addEventListener('click', () => {
      const score = Number((overlay.querySelector('#finalScore') as HTMLInputElement).value);
      const comment = (overlay.querySelector('#comment') as HTMLTextAreaElement).value;
      if (Number.isNaN(score) || score < 0 || score > 100) {
        alert('成绩必须在 0~100 之间');
        return;
      }
      store.updateGrade(id, { finalScore: score, teacherComment: comment });
      overlay.remove();
    });
  }
}
