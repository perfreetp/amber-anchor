<script setup lang="ts">
import { ref } from 'vue';
import { store } from '../store/editor';
import { downloadText, exportConfigSheet } from '../core/configSheet';

const label = ref('');
const note = ref('');
const showSubmit = ref(false);

function submit() {
  const v = store.submitVersion(label.value, note.value);
  label.value = '';
  note.value = '';
  showSubmit.value = false;
  alert(`已提交新版本：${v.label}`);
}

function exportSheet() {
  if (!store.model.value) return;
  const text = exportConfigSheet(store.model.value.params, {
    precision: store.model.value.precision,
    segmentCount: store.model.value.segmentCount
  });
  downloadText(`fan-config-seed${store.params.seed}.json`, text);
}
</script>

<template>
  <header class="topbar">
    <div class="brand">冲积扇水系渠系过程式编辑器</div>
    <div class="role-switch">
      <button :class="{ active: store.role.value === 'planner' }" @click="store.role.value = 'planner'">
        规划/制作方
      </button>
      <button :class="{ active: store.role.value === 'reviewer' }" @click="store.role.value = 'reviewer'">
        审核人
      </button>
    </div>
    <div class="top-actions">
      <button class="ghost" @click="exportSheet">导出配置单</button>
      <button class="primary" @click="showSubmit = true">提交新版本</button>
    </div>

    <div v-if="showSubmit" class="modal-mask" @click.self="showSubmit = false">
      <div class="modal">
        <h3>提交新版本</h3>
        <label>版本名称</label>
        <input v-model="label" placeholder="如：V2 扇半径收窄方案" />
        <label>说明</label>
        <textarea v-model="note" rows="3" placeholder="本次调整的意图与待审重点"></textarea>
        <div class="modal-actions">
          <button @click="showSubmit = false">取消</button>
          <button class="primary" @click="submit">提交</button>
        </div>
      </div>
    </div>
  </header>
</template>
