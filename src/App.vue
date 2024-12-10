<script setup>
import { ref } from "vue";
import CodePreview from "./components/CodePreview.vue";
import ConfigForm from "./components/ConfigForm.vue";

const code = ref("");
</script>

<template>
  <div class="json-schema-page">
    <ConfigForm />
    <CodePreview :code="code" allow-copy />
  </div>
</template>

<style scoped>
.json-schema-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: #fcfcfc;
}
</style>
