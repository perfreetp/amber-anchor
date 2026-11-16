import { store } from '../state/store';

/** 所有自定义元素的基类：自动订阅 store，状态变化时触发重渲染 */
export abstract class BaseElement extends HTMLElement {
  private unsubscribe: (() => void) | null = null;

  connectedCallback(): void {
    this.render();
    this.unsubscribe = store.subscribe(() => this.render());
  }

  disconnectedCallback(): void {
    this.unsubscribe?.();
    this.unsubscribe = null;
  }

  protected abstract render(): void;

  protected h<T extends HTMLElement>(tag: string, className = '', html = ''): T {
    const el = document.createElement(tag) as T;
    if (className) el.className = className;
    if (html) el.innerHTML = html;
    return el;
  }
}

export const sharedStyles = `
  :host {
    --primary: #2f6f4e;
    --primary-dark: #24553c;
    --accent: #d98a2b;
    --danger: #c0392b;
    --bg: #f4f6f4;
    --panel: #ffffff;
    --line: #d9ded8;
    --text: #233027;
    --muted: #6b7870;
    display: block;
    box-sizing: border-box;
    color: var(--text);
    font-size: 14px;
  }
  *, *::before, *::after { box-sizing: border-box; }
  .panel {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 12px;
  }
  .panel h3 {
    margin: 0 0 10px;
    font-size: 15px;
    color: var(--primary-dark);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  button {
    font: inherit;
    border: 1px solid var(--primary);
    background: var(--primary);
    color: #fff;
    border-radius: 7px;
    padding: 7px 14px;
    cursor: pointer;
    transition: filter .15s;
  }
  button:hover { filter: brightness(1.08); }
  button:disabled { opacity: .45; cursor: not-allowed; }
  button.ghost {
    background: #fff;
    color: var(--primary-dark);
  }
  button.warn { border-color: var(--accent); background: var(--accent); }
  button.danger { border-color: var(--danger); background: var(--danger); }
  button.tiny { padding: 3px 9px; font-size: 12px; border-radius: 5px; }
  label.field { display: block; margin-bottom: 10px; }
  label.field .row {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-bottom: 4px;
  }
  label.field .name { font-weight: 600; }
  label.field .val { color: var(--primary); font-variant-numeric: tabular-nums; font-weight: 700; }
  label.field .hint { color: var(--muted); font-size: 12px; margin-top: 2px; }
  label.field.out-of-range .val { color: var(--danger); }
  input[type="range"] { width: 100%; accent-color: var(--primary); }
  input[type="number"], input[type="text"], select, textarea {
    width: 100%;
    padding: 6px 9px;
    border: 1px solid var(--line);
    border-radius: 6px;
    font: inherit;
    background: #fff;
  }
  textarea { resize: vertical; min-height: 80px; }
  .seg { display: flex; gap: 6px; }
  .seg button { flex: 1; background: #fff; color: var(--text); border-color: var(--line); }
  .seg button.active { background: var(--primary); color: #fff; border-color: var(--primary); }
  .badge {
    display: inline-block; padding: 2px 8px; border-radius: 999px;
    font-size: 12px; font-weight: 600;
  }
  .badge.ok { background: #e3f3e8; color: #1d7a3d; }
  .badge.bad { background: #fbe6e3; color: var(--danger); }
  .badge.info { background: #e7f0fa; color: #235a96; }
  .badge.warn { background: #fdf0dc; color: #9a5c12; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th, td { text-align: left; padding: 7px 8px; border-bottom: 1px solid var(--line); }
  th { color: var(--muted); font-weight: 600; background: #f8faf8; position: sticky; top: 0; }
  .muted { color: var(--muted); }
  .ok-text { color: #1d7a3d; font-weight: 600; }
  .bad-text { color: var(--danger); font-weight: 600; }
  .stack { display: flex; flex-direction: column; gap: 8px; }
  .hstack { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
`;
