<script>
  import { editor } from '../lib/store.svelte.js';

  let timer;
  $effect(() => {
    if (editor.notice) {
      clearTimeout(timer);
      const id = editor.notice.id;
      timer = setTimeout(() => editor.clearNotice(id), 4200);
    }
  });
</script>

{#if editor.notice}
  <div class="toast {editor.notice.type}" key={editor.notice.id}>
    <span class="ico">
      {editor.notice.type === 'ok' ? '✓' : editor.notice.type === 'warn' ? '!' : '✕'}
    </span>
    <span>{editor.notice.text}</span>
  </div>
{/if}

<style>
  .toast {
    position: fixed;
    top: 64px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 13px;
    box-shadow: 0 6px 22px rgba(10, 30, 50, 0.22);
    animation: drop 0.22s ease;
    max-width: 60vw;
  }
  .toast.ok {
    background: #e7f5e9;
    color: #1b5e20;
    border: 1px solid #97cd9e;
  }
  .toast.warn {
    background: #fff4e0;
    color: #8a4b00;
    border: 1px solid #ecc37f;
  }
  .toast.error {
    background: #fdecea;
    color: #b71c1c;
    border: 1px solid #ef9a9a;
  }
  .ico {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #fff;
    font-weight: 700;
    font-size: 12px;
  }
  .ok .ico {
    background: #2e7d32;
  }
  .warn .ico {
    background: #e65100;
  }
  .error .ico {
    background: #c62828;
  }
  @keyframes drop {
    from {
      opacity: 0;
      transform: translate(-50%, -10px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
</style>
