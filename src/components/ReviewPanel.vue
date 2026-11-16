<script setup lang="ts">
import { computed, ref } from 'vue';
import { store } from '../store/editor';

const filter = ref<'all' | 'open' | 'resolved'>('all');
const replyDrafts = ref<Record<string, string>>({});

const list = computed(() => {
  return store.annotations.value
    .filter((a) => (filter.value === 'all' ? true : filter.value === 'open' ? !a.resolved : a.resolved))
    .slice()
    .sort((a, b) => Number(a.resolved) - Number(b.resolved));
});

function reply(id: string) {
  const text = replyDrafts.value[id];
  if (!text?.trim()) return;
  store.replyAnnotation(id, text);
  replyDrafts.value[id] = '';
}

const kindName: Record<string, string> = {
  map: '画面批注',
  profile: '剖面批注'
};
</script>

<template>
  <div class="side-panel">
    <div class="panel-head">
      <h4>审核批注</h4>
      <div class="filter-row">
        <button :class="{ active: filter === 'all' }" @click="filter = 'all'">全部</button>
        <button :class="{ active: filter === 'open' }" @click="filter = 'open'">待处理</button>
        <button :class="{ active: filter === 'resolved' }" @click="filter = 'resolved'">已闭环</button>
      </div>
    </div>

    <div v-if="!list.length" class="empty-tip">
      <template v-if="store.role.value === 'reviewer'">
        双击三维画面打点，或在断面图上点击，即可添加批注。
      </template>
      <template v-else>暂无批注。审核人打点后，制作方可在此逐条回复。</template>
    </div>

    <div v-for="a in list" :key="a.id" class="ann-card" :class="{ resolved: a.resolved }">
      <div class="ann-meta">
        <span class="tag">{{ kindName[a.target] }}</span>
        <b>{{ a.author }}</b>
        <span class="muted">{{ new Date(a.createdAt).toLocaleString('zh-CN', { hour12: false }) }}</span>
      </div>
      <p class="ann-text">{{ a.text }}</p>
      <p v-if="a.target === 'profile'" class="muted small">
        位置：距起点 {{ a.x.toFixed(1) }}m，高程 {{ a.z.toFixed(2) }}m
      </p>
      <p v-else class="muted small">坐标：({{ a.x.toFixed(0) }}, {{ a.y.toFixed(0) }})</p>

      <div v-for="(r, i) in a.replies" :key="i" class="reply-item">
        <b>{{ r.author }}：</b>{{ r.text }}
        <span class="muted small">{{ new Date(r.at).toLocaleString('zh-CN', { hour12: false }) }}</span>
      </div>

      <div class="reply-line">
        <input
          v-model="replyDrafts[a.id]"
          :placeholder="store.role.value === 'reviewer' ? '补充意见…' : '制作方逐条回复…'"
          @keyup.enter="reply(a.id)"
        />
        <button class="small" @click="reply(a.id)">回复</button>
        <button
          class="ghost small"
          :title="a.resolved ? '重新打开' : '标记闭环'"
          @click="store.toggleResolved(a.id)"
        >
          {{ a.resolved ? '重开' : '闭环' }}
        </button>
      </div>
    </div>
  </div>
</template>
