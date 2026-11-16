<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { FanRenderer } from '../renderer/FanRenderer';
import { store } from '../store/editor';
import type { Vec2 } from '../types';

const canvasEl = ref<HTMLCanvasElement | null>(null);
const errorMsg = ref('');
let renderer: FanRenderer | null = null;

interface DragState {
  kind: 'orbit' | 'pan' | 'node' | 'section';
  lastX: number;
  lastY: number;
  reachId?: string;
  nodeIdx?: number;
  sectionStart?: Vec2;
}
let drag: DragState | null = null;

function toCanvasCoords(e: PointerEvent): { x: number; y: number } {
  const rect = canvasEl.value!.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  return { x: (e.clientX - rect.left) * dpr, y: (e.clientY - rect.top) * dpr };
}

async function init() {
  try {
    renderer = await FanRenderer.create(canvasEl.value!);
    if (store.model.value) renderer.setModel(store.model.value);
    renderer.setSections(store.sections.value);
    renderer.setAnnotations(store.annotations.value);
  } catch (e) {
    errorMsg.value = (e as Error).message;
  }
}

function onPointerDown(e: PointerEvent) {
  if (!renderer) return;
  canvasEl.value?.setPointerCapture(e.pointerId);
  const { x, y } = toCanvasCoords(e);
  const mode = store.mode.value;

  if (mode === 'edit') {
    const hit = renderer.pick(x, y);
    if (hit?.kind === 'handle' && hit.reachId) {
      store.selectedReachId.value = hit.reachId;
      renderer.selectedReachId = hit.reachId;
      renderer.refreshChannelsOnly(store.model.value!);
      drag = { kind: 'node', lastX: x, lastY: y, reachId: hit.reachId, nodeIdx: hit.nodeIdx };
      return;
    }
    if (hit?.kind === 'annotation') {
      // 点击批注点：交给审核面板定位（此处仅选中）
      return;
    }
    // 未直接点中手柄时，按渠线拾取整段（支渠/斗渠同样可选中编辑）
    const reachId = renderer.pickReach(x, y);
    if (reachId) {
      store.selectedReachId.value = reachId;
      renderer.selectedReachId = reachId;
      renderer.refreshChannelsOnly(store.model.value!);
    }
  }
  if (mode === 'section') {
    const g = renderer.screenToGround(x, y);
    if (g) {
      drag = { kind: 'section', lastX: x, lastY: y, sectionStart: { x: g.x, y: g.y } };
      store.pendingSection.value = { a: { x: g.x, y: g.y }, b: { x: g.x, y: g.y } };
    }
    return;
  }
  drag = { kind: e.button === 2 || e.shiftKey ? 'pan' : 'orbit', lastX: x, lastY: y };
}

function onPointerMove(e: PointerEvent) {
  if (!renderer || !drag) return;
  const { x, y } = toCanvasCoords(e);
  const dx = x - drag.lastX;
  const dy = y - drag.lastY;
  drag.lastX = x;
  drag.lastY = y;

  if (drag.kind === 'orbit') {
    renderer.camera.rotate(dx, dy);
  } else if (drag.kind === 'pan') {
    renderer.camera.pan(dx, dy);
  } else if (drag.kind === 'node' && drag.reachId !== undefined && drag.nodeIdx !== undefined) {
    const g = renderer.screenToGround(x, y);
    if (g) {
      // 原地拖拽：直接改节点，不触发参数重算、不重排其它段
      store.dragNode(drag.reachId, drag.nodeIdx, { x: g.x, y: g.y });
      renderer.refreshChannelsOnly(store.model.value!);
    }
  } else if (drag.kind === 'section' && drag.sectionStart) {
    const g = renderer.screenToGround(x, y);
    if (g) {
      store.pendingSection.value = { a: drag.sectionStart, b: { x: g.x, y: g.y } };
      renderer.setPendingSection(drag.sectionStart, { x: g.x, y: g.y });
      renderer.setSections(store.sections.value);
    }
  }
}

function onPointerUp() {
  if (!renderer || !drag) return;
  if (drag.kind === 'node') {
    store.endDrag();
    // 拖拽结束后完整重建一次（地形下切同步）
    if (store.model.value) renderer.setModel(store.model.value);
    renderer.setSections(store.sections.value);
  } else if (drag.kind === 'section' && drag.sectionStart && store.pendingSection.value) {
    const sec = store.addSection(drag.sectionStart, store.pendingSection.value.b);
    renderer.setPendingSection(null, null);
    store.pendingSection.value = null;
    if (sec) renderer.setSections(store.sections.value);
  }
  drag = null;
}

function onDblClick(e: MouseEvent) {
  if (!renderer || store.role.value !== 'reviewer') return;
  const rect = canvasEl.value!.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const x = (e.clientX - rect.left) * dpr;
  const y = (e.clientY - rect.top) * dpr;
  const g = renderer.screenToGround(x, y);
  if (!g) return;
  const text = prompt('审核批注内容：');
  if (!text) return;
  store.addAnnotation({
    target: 'map',
    x: g.x,
    y: g.y,
    z: renderer.groundZ(g.x, g.y),
    text
  });
  renderer.setAnnotations(store.annotations.value);
}

function onWheel(e: WheelEvent) {
  e.preventDefault();
  renderer?.camera.zoom(e.deltaY);
}

function onContextMenu(e: MouseEvent) {
  e.preventDefault();
}

// 模型变更（参数重算/版本载入）→ 整体重建
watch(
  () => store.model.value,
  (m) => {
    if (renderer && m) {
      renderer.setModel(m);
      renderer.setSections(store.sections.value);
      renderer.setAnnotations(store.annotations.value);
    }
  }
);
watch(
  () => store.sections.value,
  (s) => renderer?.setSections(s),
  { deep: false }
);
watch(
  () => store.annotations.value,
  (a) => renderer?.setAnnotations(a),
  { deep: true }
);
watch(
  () => store.selectedReachId.value,
  (id) => {
    if (renderer) {
      renderer.selectedReachId = id;
      if (store.model.value) renderer.refreshChannelsOnly(store.model.value);
    }
  }
);

onMounted(init);
onBeforeUnmount(() => renderer?.dispose());
</script>

<template>
  <div class="view3d">
    <canvas
      ref="canvasEl"
      class="gpu-canvas"
      :class="{ crosshair: store.mode.value === 'section' }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @dblclick="onDblClick"
      @wheel="onWheel"
      @contextmenu="onContextMenu"
    ></canvas>
    <div v-if="errorMsg" class="canvas-error">{{ errorMsg }}</div>

    <div class="mode-toolbar">
      <button :class="{ active: store.mode.value === 'orbit' }" @click="store.mode.value = 'orbit'">
        浏览
      </button>
      <button :class="{ active: store.mode.value === 'edit' }" @click="store.mode.value = 'edit'">
        节点编辑
      </button>
      <button
        :class="{ active: store.mode.value === 'section' }"
        @click="store.mode.value = 'section'"
      >
        横断面拉线
      </button>
    </div>

    <div class="legend">
      <div><i class="sw" style="background: rgb(41,107,158)"></i>河道</div>
      <div><i class="sw" style="background: rgb(31,148,168)"></i>干渠</div>
      <div><i class="sw" style="background: rgb(66,168,115)"></i>支渠</div>
      <div><i class="sw" style="background: rgb(140,173,77)"></i>斗渠</div>
      <div><i class="sw" style="background: rgb(242,140,31)"></i>锁定段</div>
    </div>

    <div v-if="store.previewDegraded.value" class="precision-badge">
      段数超 3000，已自动降为预览精度（{{ store.model.value?.segmentCount }} 段）
    </div>
    <div class="hint">
      左键旋转 · Shift/右键平移 · 滚轮缩放 ·
      {{ store.mode.value === 'edit' ? '拖拽黄色节点改线，橙色为已锁定' : '切到编辑模式可拖拽节点' }}
    </div>
  </div>
</template>
