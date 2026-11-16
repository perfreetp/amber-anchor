import { createSignal, Show } from 'solid-js';
import EditorView from './views/EditorView.jsx';
import AdminView from './views/AdminView.jsx';

export default function App() {
  const [view, setView] = createSignal('editor');
  return (
    <div class="app">
      <header class="topbar">
        <div class="brand">草坪养护 · 三维布置编辑器</div>
        <nav>
          <button classList={{ on: view() === 'editor' }} onClick={() => setView('editor')}>编辑器</button>
          <button classList={{ on: view() === 'admin' }} onClick={() => setView('admin')}>后台管理</button>
        </nav>
      </header>
      <main>
        <Show when={view() === 'editor'}><EditorView /></Show>
        <Show when={view() === 'admin'}><AdminView /></Show>
      </main>
    </div>
  );
}
