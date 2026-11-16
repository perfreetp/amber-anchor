import { store } from '../state/store';
import { BaseElement, sharedStyles } from './base';

export class AppShell extends BaseElement {
  private root: ShadowRoot | null = null;
  private tab = 'workspace';

  connectedCallback(): void {
    super.connectedCallback();
    this.root = this.attachShadow({ mode: 'open' });
    this.root.innerHTML = `
      <style>
        ${sharedStyles}
        :host { display: flex; flex-direction: column; height: 100vh; background: var(--bg); }
        header {
          display: flex; align-items: center; gap: 14px;
          padding: 10px 18px; background: var(--primary-dark); color: #fff;
          flex-wrap: wrap;
        }
        header .logo { font-size: 17px; font-weight: 700; letter-spacing: .5px; }
        header .sub { font-size: 12px; opacity: .8; }
        header .spacer { flex: 1; }
        .role-switch { display: flex; border: 1px solid rgba(255,255,255,.4); border-radius: 8px; overflow: hidden; }
        .role-switch button {
          background: transparent; border: none; border-radius: 0; padding: 6px 16px; color: rgba(255,255,255,.85);
        }
        .role-switch button.active { background: #fff; color: var(--primary-dark); font-weight: 700; }
        .assignment-bar {
          background: #fffdf6; border-bottom: 1px solid var(--line);
          padding: 8px 18px; font-size: 13px; display: flex; gap: 18px; flex-wrap: wrap; align-items: center;
        }
        .assignment-bar b { color: var(--primary-dark); }
        .tabs { display: flex; gap: 4px; padding: 0 18px; background: var(--panel); border-bottom: 1px solid var(--line); }
        .tabs button {
          background: none; border: none; border-bottom: 3px solid transparent;
          border-radius: 0; color: var(--muted); padding: 11px 18px;
        }
        .tabs button.active { color: var(--primary-dark); border-bottom-color: var(--primary); font-weight: 700; }
        main { flex: 1; min-height: 0; padding: 14px 18px; }
        .layout { display: grid; grid-template-columns: 320px 1fr 340px; gap: 14px; height: 100%; min-height: 0; }
        .col { overflow-y: auto; min-height: 0; padding-right: 2px; }
        @media (max-width: 1280px) { .layout { grid-template-columns: 280px 1fr; } .col.right { display:none; } }
        .hidden { display: none !important; }
        .reset { background: transparent; border: 1px solid rgba(255,255,255,.5); color: #fff; }
      </style>
      <header>
        <div>
          <div class="logo">🌿 校园主干道绿化过程式布置台</div>
          <div class="sub">原生 TypeScript · Web Components · Babylon.js 实例化渲染</div>
        </div>
        <div class="spacer"></div>
        <div class="role-switch">
          <button data-role="student">学员</button>
          <button data-role="teacher">教师</button>
        </div>
        <button class="reset tiny" id="reset">重置全部数据</button>
      </header>
      <div class="assignment-bar">
        <span>📌 当前题目：<b id="a-title"></b></span>
        <span class="muted" id="a-desc"></span>
        <span>种子：<b id="a-seed"></b></span>
        <span>分段：<b id="a-seg"></b> m/段</span>
      </div>
      <nav class="tabs">
        <button data-tab="workspace" class="active">🛠 布置工作台</button>
        <button data-tab="grading">📊 成绩与汇总</button>
      </nav>
      <main>
        <section id="tab-workspace">
          <div class="layout">
            <div class="col left" id="leftCol"></div>
            <div class="col center"><viewport-3d></viewport-3d></div>
            <div class="col right" id="rightCol"></div>
          </div>
        </section>
        <section id="tab-grading" class="hidden" style="max-width:1100px;margin:0 auto">
          <grading-panel></grading-panel>
        </section>
      </main>
    `;

    this.root.querySelectorAll<HTMLButtonElement>('[data-role]').forEach((btn) => {
      btn.addEventListener('click', () => store.setRole(btn.dataset.role as 'student' | 'teacher'));
    });
    this.root.querySelectorAll<HTMLButtonElement>('[data-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.tab = btn.dataset.tab!;
        this.render();
      });
    });
    this.root.querySelector('#reset')!.addEventListener('click', () => {
      if (confirm('确定清空所有控制点、布置与成绩数据？此操作不可恢复。')) {
        store.resetAll();
      }
    });
    this.render();
  }

  protected render(): void {
    if (!this.root) return;
    const s = store;
    this.root.querySelectorAll<HTMLButtonElement>('[data-role]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.role === s.role);
    });
    (this.root.querySelector('#a-title') as HTMLElement).textContent = s.assignment.title;
    (this.root.querySelector('#a-desc') as HTMLElement).textContent = s.assignment.description;
    (this.root.querySelector('#a-seed') as HTMLElement).textContent = String(s.assignment.seed);
    (this.root.querySelector('#a-seg') as HTMLElement).textContent = String(
      s.assignment.segmentLength,
    );

    this.root.querySelectorAll<HTMLButtonElement>('[data-tab]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === this.tab);
    });
    (this.root.querySelector('#tab-workspace') as HTMLElement).classList.toggle(
      'hidden',
      this.tab !== 'workspace',
    );
    (this.root.querySelector('#tab-grading') as HTMLElement).classList.toggle(
      'hidden',
      this.tab !== 'grading',
    );

    const left = this.root.querySelector('#leftCol')!;
    const right = this.root.querySelector('#rightCol')!;
    left.innerHTML =
      s.role === 'teacher' ? '<teacher-panel></teacher-panel>' : '<param-panel></param-panel>';
    right.innerHTML =
      s.role === 'teacher'
        ? '<param-panel></param-panel><teacher-panel></teacher-panel>'
        : '<teacher-panel style="display:none"></teacher-panel>';
    // 学员侧右栏改为流程指引（教师面板对学员隐藏）
    if (s.role === 'student') {
      right.innerHTML = '<workflow-guide></workflow-guide>';
    }
  }
}
