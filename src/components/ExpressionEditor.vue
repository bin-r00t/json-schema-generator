<template>
  <div class="expression-editor">
    <div class="toolbar">
      <div class="operators">
        <button v-for="op in operators" :key="op" @click="addOperator(op)" class="operator-btn">
          {{ op }}
        </button>
      </div>
      <div class="expressions">
        <select v-model="selectedExpression" @change="addExpression">
          <option v-for="expr in expressions" :key="expr" :value="expr">{{ expr }}</option>
        </select>
      </div>
    </div>
    <div class="editor-area">
      <textarea v-model="formula" placeholder="在此输入或构建表达式"></textarea>
    </div>
    
    <!-- 更新变量输入区域，只显示表达式中使用的变量 -->
    <div class="variables-input" v-if="usedVariables.length > 0">
      <h3>输入变量值：</h3>
      <div v-for="expr in usedVariables" :key="expr" class="variable-item">
        <label>{{ expr }}:</label>
        <input 
          type="number" 
          v-model="variables[expr]" 
          :placeholder="`请输入${expr}的值`"
        />
      </div>
    </div>

    <div class="actions">
      <button @click="saveFormula" class="save-btn">保存</button>
      <button @click="calculateResult" class="calc-btn">计算</button>
    </div>
    <div v-if="result !== null" class="result">
      计算结果: {{ result }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { ExpressionService } from '../services/expressionService';

const operators = ['+', '-', '*', '/', '(', ')'];
const expressions = ['净收入', '收入', '支出'];
const formula = ref('');
const selectedExpression = ref('');
const result = ref(null);

// 添加变量值存储
const variables = reactive({});

// 计算表达式中实际使用的变量
const usedVariables = computed(() => {
  return expressions.filter(expr => {
    // 使用空格或字符串开始/结束作为边界来匹配完整变量名
    const pattern = `(^|\\s)${expr}($|\\s)`;
    const regex = new RegExp(pattern);
    return regex.test(` ${formula.value} `); // 在公式前后加空格以统一处理边界情况
  });
});

const addOperator = (op) => {
  formula.value += ` ${op} `;
};

const addExpression = () => {
  if (selectedExpression.value) {
    formula.value += ` ${selectedExpression.value}`;
    selectedExpression.value = '';
  }
};

const saveFormula = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/saveSchema', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formula: formula.value
      })
    });
    if (response.ok) {
      alert('公式保存成功！');
    }
  } catch (error) {
    console.error('保存失败:', error);
    alert('保存失败，请重试');
  }
};

const calculateResult = async () => {
  try {
    // 只检查表达式中实际使用的变量
    const missingVariables = usedVariables.value.filter(expr => !variables[expr]);

    if (missingVariables.length > 0) {
      alert(`请输入以下变量的值：${missingVariables.join(', ')}`);
      return;
    }

    // 直接使用新的parseAndEvaluate方法
    result.value = ExpressionService.parseAndEvaluate(formula.value, variables);
  } catch (error) {
    console.error('计算失败:', error);
    alert(error.message || '计算失败，请检查公式和输入值是否正确');
  }
};

// 当表达式变化时，清理不再使用的变量值
watch(formula, () => {
  const currentUsedVars = usedVariables.value;
  Object.keys(variables).forEach(key => {
    if (!currentUsedVars.includes(key)) {
      delete variables[key];
    }
  });
});
</script>

<style scoped>
.expression-editor {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.toolbar {
  margin-bottom: 20px;
}

.operators {
  margin-bottom: 10px;
}

.operator-btn {
  margin-right: 10px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: pointer;
}

.editor-area textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.variables-input {
  margin: 20px 0;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

.variables-input h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
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
  margin-top: 20px;
}

.save-btn, .calc-btn {
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #4CAF50;
  color: white;
  cursor: pointer;
}

.calc-btn {
  background: #2196F3;
}

.result {
  margin-top: 20px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}
</style> 