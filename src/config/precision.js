import { ref } from 'vue';

// 默认精度为2位小数
export const precision = ref(2);

// 更新精度的方法
export const setPrecision = (value) => {
  precision.value = parseInt(value) || 2;
}; 