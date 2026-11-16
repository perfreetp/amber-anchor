import { store } from '../state/store';
import { BaseElement, sharedStyles } from './base';

const STEPS = [
  { n: 1, title: '绘制中心线与路缘', desc: '选「✏️ 绘制」，在地面依次点击至少 2 个控制点；系统自动生成平滑中心线、路面与两侧路缘。' },
  { n: 2, title: '设定布置参数', desc: '调整路宽、树间距、树种比例、花坛长度、路灯间隔与季节。越界参数会实时标红。' },
  { n: 3, title: '生成道路与绿化', desc: '点击「🛣 生成道路」，同一种子下树木、灌木、灯位的位置与树种完全一致、可复现。' },
  { n: 4, title: '手动微调与锁定', desc: '选「✋ 挪树」拖动树木，松开即锁定（金色圆环）。之后重生成时锁定树原地不动。' },
  { n: 5, title: '框选区段重生成', desc: '选「🔲 框选」拖出矩形覆盖若干段，点「🔁 选中段重生成」，只重算受影响区段。' },
  { n: 6, title: '提交、核对与导出', desc: '提交后系统按题目范围自动核对给部分分，教师复核打分；可导出 CSV 清单与俯视截图。' },
];

export class WorkflowGuide extends BaseElement {
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
    const progress = !s.roadBuilt
      ? s.controlPoints.length >= 2
        ? 1
        : 0
      : s.placements.some((p) => p.locked)
        ? 4
        : 3;

    this.root.querySelector('#content')!.innerHTML = `
      <div class="panel">
        <h3>🧭 操作流程</h3>
        <ol class="steps">
          ${STEPS.map((st) => `
            <li class="${st.n - 1 <= progress ? 'done' : ''}">
              <div class="num">${st.n}</div>
              <div>
                <b>${st.title}</b>
                <div class="muted" style="font-size:12.5px;margin-top:2px">${st.desc}</div>
              </div>
            </li>`).join('')}
        </ol>
      </div>
      <div class="panel">
        <h3>🔑 确定性规则说明</h3>
        <ul class="rules">
          <li>每个对象的随机扰动由 <code>种子 + 类型 + 段号 + 局部序号</code> 派生，换参数重生成时，未受影响的对象位置不变。</li>
          <li>手动挪过的树写入 <code>locked</code> 状态，整路或分段重生成都原样保留。</li>
          <li>所有绿化对象使用 Thin Instance 实例化渲染，每类仅 1 个 draw call，300+ 树木无压力。</li>
          <li>数据保存在浏览器 localStorage，刷新页面不丢失。</li>
        </ul>
      </div>
      <style>
        .steps { list-style: none; margin: 0; padding: 0; }
        .steps li { display: flex; gap: 10px; padding: 8px 0; border-bottom: 1px dashed var(--line); }
        .steps li:last-child { border-bottom: none; }
        .num {
          width: 24px; height: 24px; border-radius: 50%; background: #e3e9e4; color: var(--muted);
          display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;
        }
        .steps li.done .num { background: var(--primary); color: #fff; }
        .rules { margin: 0; padding-left: 18px; font-size: 12.5px; line-height: 1.8; color: var(--muted); }
        code { background: #eef2ee; padding: 1px 5px; border-radius: 4px; font-size: 11.5px; }
      </style>
    `;
  }
}
