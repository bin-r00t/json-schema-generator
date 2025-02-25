<script setup>
import { ref, computed } from "vue";

const base = ref(20000);
const saved = ref(6500);
const target = ref(0);
const months = ref(12);
const winRate = ref(0.03);

class DatePoint {
  constructor(year, month) {
    this.year = year + Math.floor(month / 12);
    this.month = (month % 12) + 1;
    this.day = 20;
  }

  get str() {
    return `${this.year}-${this.month.toString().padStart(2, "0")}-${this.day}`;
  }
}
</script>

<template>
  <div class="app-page grid place-content-center">
    <div class="border p-5 flex flex-col gap-3">
      <div class="form flex flex-col gap-3">
        <label for="winRate">年化收益率</label>
        <input
          type="text"
          id="winRate"
          v-model="winRate"
          class="bg-gray-100 w-96 rounded p-1 px-4 appearance-none outline-none"
        />
      </div>
      <div class="form flex flex-col gap-3">
        <label for="base">Base</label>
        <input
          type="text"
          id="base"
          v-model="base"
          class="bg-gray-100 rounded p-1 px-4 appearance-none outline-none"
        />
      </div>
      <div class="form flex flex-col gap-3">
        <label for="months">Months</label>
        <input
          type="text"
          id="months"
          v-model="months"
          class="bg-gray-100 rounded p-1 px-4 appearance-none outline-none"
        />
      </div>
      <div class="form flex flex-col gap-3">
        <label for="saved">Saved per month</label>
        <input
          type="text"
          id="saved"
          v-model="saved"
          class="bg-gray-100 rounded p-1 px-4 appearance-none outline-none"
        />
      </div>
      <br />
      <br />
      <div
        class="flex flex-col divide-y max-h-96 overflow-y-auto overflow-x-hidden"
        v-if="+months > 0"
      >
        <div v-for="n in +months" :key="n" class="flex items-center gap-3">
          <span class="w-18">第 {{ n }} 月: </span>
          <span class="flex-1">{{ +base + n * +saved }}</span>
          <!-- <span class="flex-1">{{
            ((+base + n * +saved) * (1 + winRate)).toFixed(2)
          }}</span> -->
          <span class="w-24">{{ new DatePoint(2025, 1 + n).str }}</span>
        </div>
      </div>
      <div v-else>- 无 -</div>
    </div>
  </div>
</template>

<style scoped>
.app-page {
  height: 100vh;
  /* background: linear-gradient(to bottom right, #b52603, rgb(216, 104, 6)); */
}
</style>

<style>
::-webkit-scrollbar {
  display: none;
}
</style>
