import './components/index';
import './styles/global.css';
import { store } from './state/store';

const root = document.getElementById('app');
if (root) {
  root.innerHTML = '<app-shell></app-shell>';
}

// 调试 / 自动化测试钩子
declare global {
  interface Window {
    __store: typeof store;
  }
}
window.__store = store;
