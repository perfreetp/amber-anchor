<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { FanRenderer } from '../renderer/FanRenderer';
import { store } from '../store/editor';
import type { ReachDiff } from '../types';

const leftCanvas = ref<HTMLCanvasElement | null>(null);
const rightCanvas = ref<HTMLCanvasElement | null>(null);
let leftR: FanRenderer | null = null;
let rightR: FanRenderer | null = null;
let syncing = false;
const errorMsg = ref('');

const oldVersion = computed(() =>
  store.versions.value.find((v) => v.id === store.compareVersionId.value)
);

const diffSummary = computed(() => {
  const d = store.diffs.value;
  return {
    added: d.filter((x) => x.status === 'added').length,
    removed: d.filter((x) => x.status === 'removed').length,
    modified: d.filter((x) => x.status === 'modified').length,
    unchanged: d.filter((x) => x.status === 'unchanged').length
  };
});

const statusName: Record<ReachDiff['status'], string> = {
  added: '新增',
  removed: '消失',
  modified: '改动',
  unchanged: '一致'
};

function linkCameras(src: FanRenderer, dst: FanRenderer, el: HTMLCanvasElement) {
  let down = false;
  const sync = () => {
    if (syncing) return;
    syncing = true;
    dst.camera.yaw = src.camera.yaw;
    dst.camera.pitch = src.camera.pitch;
    dst.camera.distance = src.camera.distance;
    dst.camera.target = { ...src.camera.target };
    syncing = false;
  };
  el.addEventListener('pointerdown', () => (down = true));
  window.addEventListener('pointerup', () => (down = false));
  el.addEventListener('pointermove', () => down && sync());
  el.addEventListener('wheel', sync, { passive: true });
}

async function init() {
  try {
    leftR = await FanRenderer.create(leftCanvas.value!);
    rightR = await FanRenderer.create(rightCanvas.value!);
    const oldM = structuredClone(oldVersion.value!.model);
    leftR.setModel(oldM);
    rightR.setModel(structuredClone(store.model.value!));
    // 初始相机对齐
    rightR.camera.target = { ...leftR.camera.target };
    linkCameras(leftR, rightR, leftCanvas.value!);
    linkCameras(rightR, leftR, rightCanvas.value!);
  } catch (e) {
    errorMsg.value = (e as Error).message;
  }
}

function close() {
  store.showCompare.value = false;
  leftR?.dispose();
  rightR?.dispose();
}

onMounted(init);
onBeforeUnmount(() => {
  leftR?.dispose();
  rightR?.dispose();
});
</script>

<template>
  <div class="compare-mask">
    <div class="compare-window">
      <div class="compare-head">
        <h3>版本并排对比</h3>
        <div class="diff-summary">
          <span class="chip added">新增 {{ diffSummary.added }}</span>
          <span class="chip removed">消失 {{ diffSummary.removed }}</span>
          <span class="chip modified">改动 {{ diffSummary.modified }}</span>
          <span class="chip unchanged">一致 {{ diffSummary.unchanged }}</span>
        </div>
        <button class="ghost" @click="close">关闭</button>
      </div>

      <div v-if="errorMsg" class="canvas-error">{{ errorMsg }}</div>
      <div class="compare-body">
        <div class="compare-pane">
          <h4>{{ oldVersion?.label }}（旧版本）</h4>
          <canvas ref="leftCanvas" class="compare-canvas"></canvas>
        </div>
        <div class="compare-pane">
          <h4>当前工作区（新版本）</h4>
          <canvas ref="rightCanvas" class="compare-canvas"></canvas>
        </div>
      </div>
      <p class="muted small compare-hint">两视图相机联动：旋转、平移、缩放任一视图，另一侧同步。</p>

      <div class="diff-table-wrap">
        <table class="diff-table">
          <thead>
            <tr><th>渠段 id</th><th>类型</th><th>状态</th><th>平均偏差 (m)</th></tr>
          </thead>
          <tbody>
            <tr v-for="d in store.diffs.value" :key="d.id" :class="d.status">
              <td class="mono">{{ d.id }}</td>
              <td>{{ { river: '河道', mainCanal: '干渠', subCanal: '支渠', lateral: '斗渠' }[d.kind] }}</td>
              <td><span class="chip" :class="d.status">{{ statusName[d.status] }}</span></td>
              <td>{{ d.status === 'modified' ? d.deviation.toFixed(2) : '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
