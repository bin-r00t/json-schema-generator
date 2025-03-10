<template>
  <div class="saved-expressions">
    <h2>已保存的计算表达式</h2>
    
    <!-- 添加精度控制 -->
    <div class="precision-control">
      <label>计算精度（小数位数）：</label>
      <input 
        type="number" 
        v-model="currentPrecision" 
        min="0" 
        max="10"
        @change="updatePrecision"
      />
    </div>
    
    <div v-if="loading" class="loading">
      加载中...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else class="expressions-list">
      <div v-for="(expr, index) in savedExpressions" :key="index" class="expression-card">
        <div class="expression-formula">
          表达式: {{ expr.formula }}
        </div>
        
        <div class="variables-input">
          <div v-for="variable in getUsedVariables(expr.formula)" :key="variable" class="variable-item">
            <label>{{ variable }}:</label>
            <input 
              type="number" 
              v-model="variableValues[index][variable]" 
              :placeholder="`请输入${variable}的值`"
            />
          </div>
        </div>
        
        <div class="actions">
          <button @click="calculateExpression(expr.formula, index)" class="calc-btn">
            计算
          </button>
        </div>
        
        <div v-if="results[index] !== undefined" class="result">
          计算结果: {{ formatResult(results[index]) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ExpressionService } from '../services/expressionService';
import { precision, setPrecision } from '../config/precision';

const loading = ref(true);
const error = ref(null);
const savedExpressions = ref([]);
const variableValues = reactive({});
const results = ref({});
const currentPrecision = ref(precision.value);

// 所有可能的变量名列表
const allVariables = ['净收入', '收入', '支出'];

// 更新精度设置
const updatePrecision = () => {
  setPrecision(currentPrecision.value);
  // 清空之前的计算结果
  results.value = {};
};

// 格式化结果，应用精度
const formatResult = (value) => {
  return Number(value).toFixed(precision.value);
};

// 获取表达式中使用的变量
const getUsedVariables = (formula) => {
  return allVariables.filter(variable => {
    const pattern = `(^|\\s)${variable}($|\\s)`;
    const regex = new RegExp(pattern);
    return regex.test(` ${formula} `);
  });
};

// 计算单个表达式
const calculateExpression = (formula, index) => {
  try {
    const variables = variableValues[index];
    const usedVars = getUsedVariables(formula);
    
    // 检查是否所有需要的变量都已输入
    const missingVariables = usedVars.filter(v => !variables || !variables[v]);
    if (missingVariables.length > 0) {
      alert(`请输入以下变量的值：${missingVariables.join(', ')}`);
      return;
    }

    // 解析和计算表达式
    const parsedExpression = ExpressionService.parseExpression(formula, variables);
    results.value[index] = ExpressionService.evaluate(parsedExpression);
  } catch (error) {
    console.error('计算失败:', error);
    alert('计算失败，请检查输入值是否正确');
  }
};

// 获取保存的表达式
const fetchExpressions = async () => {
  try {
    loading.value = true;
    const response = await fetch('http://localhost:8080/api/getSchema');
    const data = await response.json();
    savedExpressions.value = Array.isArray(data) ? data : [data];
    
    // 初始化每个表达式的变量值对象
    savedExpressions.value.forEach((_, index) => {
      variableValues[index] = {};
    });
  } catch (err) {
    error.value = '加载表达式失败，请刷新页面重试';
    console.error('加载失败:', err);
  } finally {
    loading.value = false;
  }
};

// 组件加载时获取表达式
onMounted(fetchExpressions);
</script>

<style scoped>
.saved-expressions {
  padding: 20px;
}

.precision-control {
  margin-bottom: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.precision-control input {
  width: 60px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  color: #ff4444;
}

.expression-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.expression-formula {
  font-size: 16px;
  margin-bottom: 15px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}

.variables-input {
  margin: 15px 0;
}

.variable-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.variable-item label {
  width: 80px;
  margin-right: 10px;
}

.variable-item input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.actions {
  margin-top: 15px;
}

.calc-btn {
  padding: 8px 16px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.calc-btn:hover {
  background: #1976D2;
}

.result {
  margin-top: 15px;
  padding: 10px;
  background: #e3f2fd;
  border-radius: 4px;
  color: #1565C0;
}
</style> 