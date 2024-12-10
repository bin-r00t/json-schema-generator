<script setup>
defineProps({
  allowCopy: {
    type: Boolean,
    default: false,
  },
  code: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="code-preview">
    <div class="toolbar" v-if="allowCopy">
      <button class="toolbar-btn">copy</button>
    </div>
    <pre :style="{ marginTop: allowCopy ? '40px' : '0' }">
        <code>{{ code }}</code>
    </pre>
  </div>
</template>

<style scoped>
.code-preview {
  position: relative;
  flex: 1;
  min-width: 560px;
  background: #891288;
}

.toolbar {
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px;
  width: 100%;
  background: #ccc1;
}

pre {
  padding: 0 20px;
  margin: 0;
  background: #f0f0f0;
  line-height: 20px; /* 行距 */
  height: auto;
}

code {
  display: block;
  background: #cdcdcd;
}
</style>
