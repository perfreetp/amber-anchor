<script setup lang="ts">
import { computed } from 'vue';
import { store } from '../store/editor';
import { parseConfigSheet, downloadText } from '../core/configSheet';
import { generateModel } from '../core/generator';

interface SliderDef {
  key: keyof typeof store.params;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
}

const sliders: SliderDef[] = [
  { key: 'apexX', label: '扇顶 X', min: -800, max: 800, step: 10, unit: 'm' },
  { key: 'apexY', label: '扇顶 Y', min: -800, max: 800, step: 10, unit: 'm' },
  { key: 'radius', label: '扇半径', min: 600, max: 3600, step: 20, unit: 'm' },
  { key: 'slope', label: '纵向坡度', min: 0.3, max: 8, step: 0.1, unit: '%' },
  { key: 'mainWidth', label: '主河道宽度', min: 12, max: 120, step: 1, unit: 'm' },
  { key: 'branchLevels', label: '分汊级数', min: 0, max: 4, step: 1, unit: '级' }
];

const seedInput = computed({
  get: () => store.params.seed,
  set: (v: number) => {
    store.params.seed = Math.round(v);
    store.scheduleRegenerate();
  }
});

function onSlider() {
  // 滑块实时重算（防抖 120ms），锁定段保留
  store.scheduleRegenerate();
}

function rerollSeed() {
  store.params.seed = Math.floor(Math.random() * 2 ** 31);
  store.scheduleRegenerate();
}

function forceFull() {
  store.setPrecision('full');
}
function forcePreview() {
  store.setPrecision('preview');
}

function onImport(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const sheet = parseConfigSheet(String(reader.result));
      Object.assign(store.params, sheet.params);
      store.regenerate();
      const m = store.model.value!;
      if (m.segmentCount !== sheet.expected.segmentCount) {
        alert(
          `复现警告：当前生成 ${m.segmentCount} 段，配置单记录 ${sheet.expected.segmentCount} 段，请检查版本是否一致。`
        );
      }
    } catch (err) {
      alert('导入失败：' + (err as Error).message);
    }
    input.value = '';
  };
  reader.readAsText(file);
}

function resetParams() {
  if (confirm('放弃全部手改与未提交调整，恢复初始参数？')) {
    store.resetAll();
  }
}

// 供确定性自检：同参数连生两次比较
function determinismCheck() {
  const a = generateModel({ ...store.params }).model;
  const b = generateModel({ ...store.params }).model;
  const same = JSON.stringify(a.reaches.map((r) => r.nodes)) === JSON.stringify(b.reaches.map((r) => r.nodes));
  alert(same ? '确定性自检通过：两次生成几何完全一致' : '确定性自检失败！');
}
</script>

<template>
  <aside class="param-panel">
    <h3>生成参数</h3>
    <div v-for="s in sliders" :key="s.key" class="slider-row">
      <div class="slider-label">
        <span>{{ s.label }}</span>
        <b>{{ store.params[s.key] }} {{ s.unit }}</b>
      </div>
      <input
        type="range"
        :min="s.min"
        :max="s.max"
        :step="s.step"
        :value="store.params[s.key]"
        @input="((store.params as any)[s.key] = Number(($event.target as HTMLInputElement).value)), onSlider()"
      />
    </div>

    <div class="slider-row">
      <div class="slider-label">
        <span>随机种子</span>
        <b>{{ seedInput }}</b>
      </div>
      <div class="seed-line">
        <input type="number" v-model.number="seedInput" class="seed-input" />
        <button class="ghost small" @click="rerollSeed">换一粒</button>
      </div>
    </div>

    <div class="panel-section">
      <div class="slider-label"><span>精度</span></div>
      <div class="btn-row">
        <button
          class="ghost small"
          :class="{ active: store.model.value?.precision === 'full' }"
          @click="forceFull"
        >
          全精度
        </button>
        <button
          class="ghost small"
          :class="{ active: store.model.value?.precision === 'preview' }"
          @click="forcePreview"
        >
          预览精度
        </button>
      </div>
      <p class="muted small">段数超 3000 自动降预览精度，保证滑块交互流畅。</p>
    </div>

    <div class="panel-section" v-if="store.selectedReach.value">
      <h4>选中渠段</h4>
      <p class="mono small">{{ store.selectedReachId.value }}</p>
      <p class="small">
        状态：
        <b :class="store.selectedReach.value.locked ? 'lock-on' : ''">
          {{ store.selectedReach.value.locked ? '已锁定' : '未锁定' }}
        </b>
        {{ store.selectedReach.value.manuallyEdited ? '· 含手改' : '· 纯生成' }}
      </p>
      <div class="btn-row">
        <button class="small" @click="store.toggleLock(store.selectedReachId.value!)">
          {{ store.selectedReach.value.locked ? '解锁' : '锁定该段' }}
        </button>
        <button
          class="ghost small"
          @click="store.discardReachEdits(store.selectedReachId.value!)"
        >
          放弃手改
        </button>
      </div>
      <p class="muted small">
        锁定后改参数重算：该段及其下游已手改渠线原地保留，未锁段按新参数重排。
      </p>
    </div>

    <div class="panel-section">
      <div class="btn-row">
        <button class="ghost small" @click="determinismCheck">确定性自检</button>
        <button class="ghost small" @click="resetParams">清空手改</button>
      </div>
      <label class="import-btn">
        导入配置单复现
        <input type="file" accept=".json,application/json" @change="onImport" hidden />
      </label>
    </div>
  </aside>
</template>
