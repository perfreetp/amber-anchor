<script setup lang="ts">
import { computed, ref } from 'vue';
import type { CrossSection, ProfileSample } from '../types';
import { store } from '../store/editor';

const W = 560;
const H = 240;
const PAD = { l: 48, r: 14, t: 16, b: 30 };
const activeId = ref<string | null>(null);

const active = computed<CrossSection | null>(
  () => store.sections.value.find((s) => s.id === activeId.value) ?? store.sections.value[0] ?? null
);

const chart = computed(() => {
  const s = active.value;
  if (!s || s.samples.length < 2) return null;
  const dMax = s.samples[s.samples.length - 1].d;
  const zVals = s.samples.flatMap((p) => [p.ground, p.water ?? p.ground]);
  const zMin = Math.min(...zVals) - 1;
  const zMax = Math.max(...zVals) + 1;
  const x = (d: number) => PAD.l + (d / dMax) * (W - PAD.l - PAD.r);
  const y = (z: number) => H - PAD.b - ((z - zMin) / (zMax - zMin || 1)) * (H - PAD.t - PAD.b);

  const groundPath = s.samples.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.d).toFixed(1)},${y(p.ground).toFixed(1)}`).join(' ');
  // 水面线：遇到无水处抬笔
  let waterPath = '';
  let pen = false;
  for (const p of s.samples) {
    if (p.water !== null) {
      waterPath += `${pen ? 'L' : 'M'}${x(p.d).toFixed(1)},${y(p.water).toFixed(1)} `;
      pen = true;
    } else pen = false;
  }
  // 水面区域淡填充
  let waterArea = '';
  pen = false;
  const waterPts: ProfileSample[] = [];
  for (const p of s.samples) {
    if (p.water !== null) {
      waterPts.push(p);
      pen = true;
    } else if (pen && waterPts.length) {
      const first = waterPts[0];
      const last = waterPts[waterPts.length - 1];
      waterArea += `M${x(first.d)},${y(first.ground)} `;
      waterArea += waterPts.map((q) => `L${x(q.d)},${y(q.water!)}`).join(' ');
      waterArea += `L${x(last.d)},${y(last.ground)} Z `;
      waterPts.length = 0;
      pen = false;
    }
  }
  const ticks = 4;
  const zTicks = Array.from({ length: ticks + 1 }, (_, i) => zMin + ((zMax - zMin) * i) / ticks);
  return { dMax, zMin, zMax, x, y, groundPath, waterPath, waterArea, zTicks };
});

const profileAnnotations = computed(() =>
  store.annotations.value.filter((a) => a.target === 'profile' && a.profileId === active.value?.id)
);

function onChartClick(e: MouseEvent) {
  if (store.role.value !== 'reviewer' || !active.value || !chart.value) return;
  const svg = e.currentTarget as SVGSVGElement;
  const rect = svg.getBoundingClientRect();
  const px = ((e.clientX - rect.left) / rect.width) * W;
  const py = ((e.clientY - rect.top) / rect.height) * H;
  const c = chart.value;
  const d = ((px - PAD.l) / (W - PAD.l - PAD.r)) * c.dMax;
  const z = c.zMin + ((H - PAD.b - py) / (H - PAD.t - PAD.b)) * (c.zMax - c.zMin);
  if (d < 0 || d > c.dMax) return;
  const text = prompt('审核批注内容：');
  if (text) {
    store.addAnnotation({
      target: 'profile',
      x: d,
      y: 0,
      z,
      profileId: active.value.id,
      text
    });
  }
}

const newText = ref('');
function addMapAnnotationHint() {
  alert('审核人在「浏览」模式下双击三维画面即可在该处打点批注。');
}
</script>

<template>
  <div class="side-panel profile-panel">
    <div class="panel-head">
      <h4>横断面剖面</h4>
      <span v-if="store.sections.value.length" class="muted small">
        {{ store.sections.value.length }} 条
      </span>
    </div>

    <div v-if="!active" class="empty-tip">
      在三维视图选择「横断面拉线」工具，沿任意方向拖一条线，即可查看该断面的地面高程与水面线。
    </div>

    <template v-else>
      <select v-model="activeId" class="section-select">
        <option v-for="s in store.sections.value" :key="s.id" :value="s.id">
          断面 {{ s.id.slice(-5) }} · 长度 {{ Math.hypot(s.b.x - s.a.x, s.b.y - s.a.y).toFixed(0) }}m
        </option>
      </select>

      <svg v-if="chart" :viewBox="`0 0 ${W} ${H}`" class="profile-svg" @click="onChartClick">
        <!-- 网格与纵轴刻度 -->
        <g v-for="(z, i) in chart.zTicks" :key="i">
          <line
            :x1="PAD.l"
            :x2="W - PAD.r"
            :y1="chart.y(z)"
            :y2="chart.y(z)"
            stroke="#2a3038"
            stroke-width="1"
          />
          <text :x="PAD.l - 6" :y="chart.y(z) + 3" text-anchor="end" class="axis-text">
            {{ z.toFixed(1) }}
          </text>
        </g>
        <line :x1="PAD.l" :x2="PAD.l" :y1="PAD.t" :y2="H - PAD.b" stroke="#444" />
        <line :x1="PAD.l" :x2="W - PAD.r" :y1="H - PAD.b" :y2="H - PAD.b" stroke="#444" />
        <text :x="W / 2" :y="H - 6" text-anchor="middle" class="axis-text">水平距离 (m)</text>
        <text :x="12" :y="H / 2" text-anchor="middle" class="axis-text" transform="rotate(-90 12 120)">
          高程 (m)
        </text>

        <path :d="chart.waterArea" fill="rgba(41,107,158,0.35)" />
        <path :d="chart.groundPath" fill="none" stroke="#c8a86a" stroke-width="2" />
        <path :d="chart.waterPath" fill="none" stroke="#5fb4e8" stroke-width="2.5" />

        <!-- 剖面批注点 -->
        <g v-for="a in profileAnnotations" :key="a.id">
          <circle
            :cx="chart.x(a.x)"
            :cy="chart.y(a.z)"
            r="6"
            :class="['ann-dot', { resolved: a.resolved }]"
          />
          <text :x="chart.x(a.x) + 9" :y="chart.y(a.z) - 6" class="ann-label">{{ a.text }}</text>
        </g>
      </svg>
      <div class="legend-inline">
        <span><i style="background: #c8a86a"></i>地面线</span>
        <span><i style="background: #5fb4e8"></i>水面线</span>
        <span><i style="background: #eb4852"></i>批注点</span>
      </div>
      <p v-if="store.role.value === 'reviewer'" class="muted small">点击图表任意位置可在该高程处打批注点。</p>
      <button v-else class="ghost small" @click="addMapAnnotationHint">如何在画面打点？</button>
      <button class="ghost small danger" @click="store.removeSection(active.id)">删除该断面</button>
    </template>
  </div>
</template>
