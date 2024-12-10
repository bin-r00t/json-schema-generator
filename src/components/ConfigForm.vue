<script setup></script>

<template>
  <div class="config-form">
    <form action="#" style="height: 100%; display: flex; flex-direction: column">
      <div>
        <button class="btn form-btn">add item</button>
        <button class="btn form-btn" style="float: right">confirm</button>
      </div>
      <section
        class=""
        style="border: 1px solid #ccc; margin-top: 12px; flex: 1"
      >
        <div class="form-item"></div>
      </section>
    </form>
  </div>
</template>

<style scoped>
.config-form {
  background: #ececec;
  flex: 1;
  min-width: 560px;
  padding: 12px;
}

.form-btn {
  padding: 8px 12px;
  border-radius: 6px;
  background: #aaad21;
  color: #fff;
  cursor: pointer;
}
</style>
