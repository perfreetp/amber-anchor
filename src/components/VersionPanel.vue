<script setup lang="ts">
import { ref } from 'vue';
import { store } from '../store/editor';
import { downloadText, exportConfigSheet } from '../core/configSheet';

const compareTarget = ref<string | null>(null);

function exportVersion(id: string) {
  const v = store.versions.value.find((x) => x.id === id);
  if (!v) return;
  const text = exportConfigSheet(v.model.params, {
    precision: v.model.precision,
    segmentCount: v.model.segmentCount
  });
  downloadText(`${v.label}-config.json`, text);
}

function remove(id: string) {
  if (confirm('删除该版本快照？')) store.deleteVersion(id);
}
</script>

<template>
  <div class="side-panel">
    <div class="panel-head"><h4>版本记录</h4></div>
    <div v-if="!store.versions.value.length" class="empty-tip">
      还没有提交过版本。调整参数与渠线后，点击右上角「提交新版本」生成可审核快照。
    </div>

    <div v-for="v in store.versions.value" :key="v.id" class="version-card">
      <div class="version-head">
        <b>{{ v.label }}</b>
        <span class="muted small">{{ new Date(v.createdAt).toLocaleString('zh-CN', { hour12: false }) }}</span>
      </div>
      <p class="small">{{ v.note || '（无说明）' }}</p>
      <p class="muted small mono">
        seed={{ v.model.params.seed }} · {{ v.model.segmentCount }} 段 ·
        {{ v.model.precision === 'preview' ? '预览精度' : '全精度' }}
      </p>
      <p class="muted small">
        批注 {{ v.annotations.length }} 条 · 断面 {{ v.sections.length }} 条
      </p>
      <div class="btn-row wrap">
        <button class="small" @click="store.loadVersion(v.id)">载入</button>
        <button class="ghost small" @click="compareTarget = v.id; store.openCompare(v.id)">
          与当前对比
        </button>
        <button class="ghost small" @click="exportVersion(v.id)">配置单</button>
        <button class="ghost small danger" @click="remove(v.id)">删除</button>
      </div>
    </div>
  </div>
</template>
