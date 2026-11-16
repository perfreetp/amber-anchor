<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TopBar from './components/TopBar.vue';
import ParamPanel from './components/ParamPanel.vue';
import View3D from './components/View3D.vue';
import StatsBar from './components/StatsBar.vue';
import ProfilePanel from './components/ProfilePanel.vue';
import VersionPanel from './components/VersionPanel.vue';
import ReviewPanel from './components/ReviewPanel.vue';
import CompareView from './components/CompareView.vue';
import { store } from './store/editor';

const gpuError = ref('');
const rightTab = ref<'profile' | 'review' | 'version'>('profile');

onMounted(() => {
  try {
    store.init();
  } catch (e) {
    gpuError.value = (e as Error).message;
  }
});
</script>

<template>
  <div v-if="gpuError" class="gpu-fatal">
    <h2>无法启动 WebGPU</h2>
    <p>{{ gpuError }}</p>
    <p>请使用最新版 Chrome / Edge（113+）并确认硬件加速已开启。</p>
  </div>
  <template v-else>
    <TopBar />
    <div class="workspace">
      <ParamPanel />
      <main class="center">
        <StatsBar />
        <div class="canvas-host">
          <View3D />
          <div class="tab-bar">
            <button :class="{ active: rightTab === 'profile' }" @click="rightTab = 'profile'">
              横断面
            </button>
            <button :class="{ active: rightTab === 'review' }" @click="rightTab = 'review'">
              批注 ({{ store.annotations.value.length }})
            </button>
            <button :class="{ active: rightTab === 'version' }" @click="rightTab = 'version'">
              版本 ({{ store.versions.value.length }})
            </button>
          </div>
          <ProfilePanel v-show="rightTab === 'profile'" />
          <ReviewPanel v-show="rightTab === 'review'" />
          <VersionPanel v-show="rightTab === 'version'" />
        </div>
      </main>
    </div>
    <CompareView v-if="store.showCompare.value" />
  </template>
</template>
