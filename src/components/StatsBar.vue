<script setup lang="ts">
import { computed } from 'vue';
import { store } from '../store/editor';

const stats = computed(() => store.stats);
const fmt = (v: number) => v.toLocaleString('zh-CN', { maximumFractionDigits: 1 });
</script>

<template>
  <div class="stats-bar">
    <div class="stat">
      <span>河道总长</span>
      <b>{{ stats ? fmt(stats.riverLength) : '—' }} m</b>
    </div>
    <div class="stat">
      <span>渠系总长</span>
      <b>{{ stats ? fmt(stats.canalLength) : '—' }} m</b>
    </div>
    <div class="stat">
      <span>河渠合计</span>
      <b>{{ stats ? fmt(stats.totalLength) : '—' }} m</b>
    </div>
    <div class="stat">
      <span>渠系密度</span>
      <b>{{ stats ? stats.canalDensity.toFixed(2) : '—' }} km/km²</b>
    </div>
    <div class="stat">
      <span>扇面面积</span>
      <b>{{ stats ? stats.fanArea.toFixed(2) : '—' }} km²</b>
    </div>
    <div class="stat">
      <span>渠段数 / 折线段</span>
      <b>{{ stats ? stats.reachCount : '—' }} / {{ store.model.value?.segmentCount ?? '—' }}</b>
    </div>
  </div>
</template>
