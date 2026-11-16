import { store } from '../state/store';
import { BaseElement, sharedStyles } from './base';
import { SceneEngine } from '../babylon/SceneEngine';
import type { ToolMode } from '../types';
import { exportScreenshot } from '../core/exporter';

const TOOLS: { mode: ToolMode; label: string; hint: string }[] = [
  { mode: 'draw', label: '✏️ 绘制', hint: '在地面点击添加中心线控制点' },
  { mode: 'navigate', label: '🧭 浏览', hint: '拖拽旋转、滚轮缩放查看场景' },
  { mode: 'move', label: '✋ 挪树', hint: '拖动树木调整位置，松开即自动锁定' },
  { mode: 'select', label: '🔲 框选', hint: '拖拽框选道路段，仅重生成选中区段' },
];

export class Viewport3D extends BaseElement {
  private engine: SceneEngine | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private toastEl: HTMLDivElement | null = null;
  private toastTimer = 0;
  private lastTool = '';
  private lastSeason = '';
  private lastRoadKey = '';
  private lastPlacementKey = '';
  private lastSelectionKey = '';

  connectedCallback(): void {
    super.connectedCallback();
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>
        :host { display: flex; flex-direction: column; height: 100%; min-height: 0; }
        ${sharedStyles}
        .stage { position: relative; flex: 1; min-height: 0; border-radius: 10px; overflow: hidden; border: 1px solid var(--line); background: #dfe8ee; }
        canvas { width: 100%; height: 100%; display: block; outline: none; touch-action: none; }
        .toolbar {
          display: flex; gap: 8px; padding: 10px; flex-wrap: wrap;
          background: var(--panel); border: 1px solid var(--line); border-radius: 10px; margin-bottom: 10px;
        }
        .toolbar button { background: #fff; color: var(--text); border-color: var(--line); }
        .toolbar button.active { background: var(--primary); color: #fff; border-color: var(--primary); }
        .spacer { flex: 1; }
        .hintbar {
          position: absolute; left: 12px; bottom: 12px;
          background: rgba(20, 30, 24, .78); color: #fff;
          padding: 7px 12px; border-radius: 8px; font-size: 12.5px;
          pointer-events: none; max-width: 70%;
        }
        .stats {
          position: absolute; right: 12px; top: 12px;
          background: rgba(255,255,255,.92); border: 1px solid var(--line);
          border-radius: 8px; padding: 8px 12px; font-size: 12.5px; line-height: 1.6;
          pointer-events: none;
        }
        .toast {
          position: absolute; left: 50%; top: 16px; transform: translateX(-50%);
          background: rgba(35, 48, 39, .92); color: #fff; padding: 9px 18px;
          border-radius: 8px; font-size: 13px; opacity: 0; transition: opacity .2s;
          pointer-events: none; z-index: 10;
        }
        .toast.show { opacity: 1; }
      </style>
      <div class="toolbar" id="toolbar"></div>
      <div class="stage">
        <canvas id="scene"></canvas>
        <div class="stats" id="stats"></div>
        <div class="hintbar" id="hint"></div>
        <div class="toast" id="toast"></div>
      </div>
    `;
    this.canvas = root.querySelector('#scene');
    this.toastEl = root.querySelector('#toast');
    this.engine = new SceneEngine(this.canvas!);
    this.engine.setCallbacks({
      onGroundClick: (p) => {
        store.addControlPoint(p);
        this.toast(`已添加控制点 #${store.controlPoints.length}`);
      },
      onPlacementMoved: (id, world) => {
        store.movePlacement(id, world);
        this.toast('树木已锁定，重生成时原地保留');
      },
      onBoxSelect: (segments) => {
        store.setSelectedSegments(segments);
        this.engine?.showSegmentHighlight(segments);
        this.toast(segments.length ? `已框选 ${segments.length} 个区段` : '框选未覆盖任何道路段');
      },
      onSelectionCleared: () => {
        store.setSelectedSegments([]);
        this.engine?.showSegmentHighlight([]);
      },
    });
    this.buildToolbar(root);
    this.render();
  }

  private buildToolbar(root: ShadowRoot): void {
    const bar = root.querySelector('#toolbar')!;
    for (const t of TOOLS) {
      const btn = document.createElement('button');
      btn.dataset.mode = t.mode;
      btn.textContent = t.label;
      btn.addEventListener('click', () => store.setTool(t.mode));
      bar.appendChild(btn);
    }
    const spacer = document.createElement('div');
    spacer.className = 'spacer';
    bar.appendChild(spacer);

    const undoBtn = document.createElement('button');
    undoBtn.textContent = '↩ 撤销点';
    undoBtn.addEventListener('click', () => store.undoControlPoint());
    bar.appendChild(undoBtn);

    const buildBtn = document.createElement('button');
    buildBtn.dataset.act = 'build';
    buildBtn.textContent = '🛣 生成道路';
    buildBtn.addEventListener('click', () => {
      if (store.controlPoints.length < 2) {
        this.toast('至少需要 2 个控制点');
        return;
      }
      store.buildRoad();
      this.engine?.frameRoad();
      this.toast('道路与绿化布置已生成');
    });
    bar.appendChild(buildBtn);

    const regenBtn = document.createElement('button');
    regenBtn.dataset.act = 'regen';
    regenBtn.textContent = '🔄 整路重生成';
    regenBtn.addEventListener('click', () => {
      store.regenerate([]);
      this.toast('整路已按新参数重生成（锁定树木保留）');
    });
    bar.appendChild(regenBtn);

    const regenSelBtn = document.createElement('button');
    regenSelBtn.dataset.act = 'regenSel';
    regenSelBtn.textContent = '🔁 选中段重生成';
    regenSelBtn.addEventListener('click', () => {
      if (!store.selectedSegments.length) {
        this.toast('请先用框选工具选择区段');
        return;
      }
      store.regenerate(store.selectedSegments);
      this.engine?.showSegmentHighlight([]);
      this.toast('选中区段已重生成（锁定树木保留）');
    });
    bar.appendChild(regenSelBtn);

    const shotBtn = document.createElement('button');
    shotBtn.textContent = '📷 俯视截图';
    shotBtn.addEventListener('click', () => this.takeShot());
    bar.appendChild(shotBtn);
  }

  private async takeShot(): Promise<void> {
    if (!this.engine) return;
    try {
      const url = await this.engine.topDownScreenshot();
      exportScreenshot(url, store.assignment.seed);
      this.toast('俯视截图已导出 PNG');
    } catch (e) {
      this.toast(`截图失败：${(e as Error).message}`);
    }
  }

  private toast(msg: string): void {
    if (!this.toastEl) return;
    this.toastEl.textContent = msg;
    this.toastEl.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => this.toastEl?.classList.remove('show'), 2200);
  }

  protected render(): void {
    const root = this.shadowRoot;
    if (!root || !this.engine) return;
    const s = store;

    // 工具切换
    if (this.lastTool !== s.tool) {
      this.lastTool = s.tool;
      this.engine.setTool(s.tool);
      root.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((b) => {
        b.classList.toggle('active', b.dataset.mode === s.tool);
      });
      const hint = TOOLS.find((t) => t.mode === s.tool)?.hint ?? '';
      (root.querySelector('#hint') as HTMLElement).textContent = hint;
    }

    // 道路几何：控制点数量、路宽或道路派生版本变化时刷新
    const roadKey = `${s.controlPoints.length}|${s.roadBuilt}|${s.params.roadWidth}|${s.assignment.segmentLength}`;
    if (this.lastRoadKey !== roadKey) {
      this.lastRoadKey = roadKey;
      if (s.samples.length) {
        this.engine.refreshRoad(s.samples, s.params, s.controlPoints, s.assignment.segmentLength);
      }
    }

    // 季节
    if (this.lastSeason !== s.params.season) {
      this.lastSeason = s.params.season;
      this.engine.setSeason(s.params.season);
    }

    // 布置：数量 + 锁定数 + 参数签名，保证“只改参数”也触发重绘
    const locked = s.placements.filter((p) => p.locked).length;
    const placementKey =
      `${s.placements.length}|${locked}|${s.params.treeSpacing}|${s.params.lampSpacing}|` +
      `${s.params.flowerBedLength}|${s.params.flowerBedGap}|${s.params.shrubSpacing}|` +
      `${s.params.roadWidth}|${JSON.stringify(s.params.speciesRatio)}|${s.params.season}`;
    if (this.lastPlacementKey !== placementKey) {
      this.lastPlacementKey = placementKey;
      this.engine.refreshPlacements(s.placements, s.params);
    }

    // 外部清空选择时同步高亮
    const selKey = s.selectedSegments.join(',');
    if (this.lastSelectionKey !== selKey) {
      this.lastSelectionKey = selKey;
      this.engine.showSegmentHighlight(s.selectedSegments);
    }

    // 按钮可用性
    (root.querySelector('[data-act="regen"]') as HTMLButtonElement).disabled = !s.roadBuilt;
    (root.querySelector('[data-act="regenSel"]') as HTMLButtonElement).disabled =
      !s.roadBuilt || s.selectedSegments.length === 0;

    // 统计
    const count = (kind: string) => s.placements.filter((p) => p.kind === kind).length;
    (root.querySelector('#stats') as HTMLElement).innerHTML = `
      道路长度：<b>${s.roadTotalLength.toFixed(1)} m</b><br>
      行道树：<b>${count('tree')}</b> 棵（锁定 ${locked}）<br>
      灌木：<b>${count('shrub')}</b> 丛 · 路灯：<b>${count('lamp')}</b> 盏<br>
      花坛：<b>${count('flowerbed')}</b> 个 · 种子：<b>${s.assignment.seed}</b>
    `;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.engine?.dispose();
    this.engine = null;
  }
}
