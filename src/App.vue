<template>
  <div class="app">
    <h1>表达式编辑器系统</h1>
    
    <div class="nav-tabs">
      <button 
        :class="['tab-btn', { active: currentTab === 'editor' }]" 
        @click="currentTab = 'editor'"
      >
        编辑表达式
      </button>
      <button 
        :class="['tab-btn', { active: currentTab === 'saved' }]" 
        @click="currentTab = 'saved'"
      >
        已保存表达式
      </button>
    </div>

    <div class="tab-content">
      <ExpressionEditor v-if="currentTab === 'editor'" />
      <SavedExpressions v-else-if="currentTab === 'saved'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ExpressionEditor from './components/ExpressionEditor.vue';
import SavedExpressions from './components/SavedExpressions.vue';

/** 功能1： */
/** 从服务端地址/api/getSchema获取函数的元数据信息 */
/** 动态解析元数据生成运行时函数 */
/** 根据用户提供的数值，运行时函数计算出结果 */

/** 功能2： */
/** 提供给用户一个页面，该页面包含一个可视化的表达式编辑器 */
/** 用户可以在编辑器上选择 + - * / 等运算符 */
/** 用户可以在编辑器上输入数值与公式 */
/** 用户可以在编辑器上选择表达式列表，如: 净收入， 收入， 支出 等构建出完整的表达式 */
/** 用户点击保存按钮，将该函数元数据保存到服务器 /api/saveSchema */

const currentTab = ref('editor');
</script>

<style>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.nav-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.tab-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 16px;
  color: #666;
}

.tab-btn.active {
  background: #2196F3;
  color: white;
}

.tab-content {
  background: white;
  border-radius: 8px;
  min-height: 400px;
}
</style>
