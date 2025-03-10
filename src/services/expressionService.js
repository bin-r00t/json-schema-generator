import { MathUtil } from '../utils/MathUtil';
import { precision } from '../config/precision';

export class ExpressionService {
  static async getSchema() {
    const response = await fetch('/api/getSchema');
    return await response.json();
  }

  static async saveSchema(formula) {
    const response = await fetch('/api/saveSchema', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formula })
    });
    return await response.json();
  }

  /**
   * 分词处理
   * @param {string} expression - 表达式字符串
   * @returns {string[]} 分词结果
   */
  static tokenize(expression) {
    // 匹配数字、运算符、括号和变量名
    return expression.trim().match(/\d+\.?\d*|\+|\-|\*|\/|\(|\)|[^\s\+\-\*\/\(\)]+/g) || [];
  }

  /**
   * 替换变量为实际值
   * @param {string[]} tokens - 分词后的表达式
   * @param {Object} variables - 变量值映射
   * @returns {string[]} 替换后的tokens
   */
  static replaceVariables(tokens, variables) {
    return tokens.map(token => {
      // 如果是运算符或括号，直接返回
      if (['+', '-', '*', '/', '(', ')'].includes(token)) {
        return token;
      }
      // 如果是数字，直接返回
      if (!isNaN(token)) {
        return token;
      }
      // 如果是变量，替换为对应的值
      if (variables[token] !== undefined) {
        return variables[token].toString();
      }
      throw new Error(`未找到变量 "${token}" 的值`);
    });
  }

  /**
   * 将中缀表达式转换为后缀表达式（逆波兰表达式）
   * @param {string[]} tokens - 分词后的表达式
   * @returns {string[]} 后缀表达式
   */
  static toPostfix(tokens) {
    const output = [];
    const operators = [];
    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2
    };

    for (const token of tokens) {
      if (!isNaN(token)) {
        // 数字直接输出
        output.push(token);
      } else if (token === '(') {
        // 左括号入栈
        operators.push(token);
      } else if (token === ')') {
        // 处理右括号
        while (operators.length > 0 && operators[operators.length - 1] !== '(') {
          output.push(operators.pop());
        }
        operators.pop(); // 弹出左括号
      } else {
        // 处理运算符
        while (
          operators.length > 0 &&
          operators[operators.length - 1] !== '(' &&
          precedence[operators[operators.length - 1]] >= precedence[token]
        ) {
          output.push(operators.pop());
        }
        operators.push(token);
      }
    }

    // 处理剩余的运算符
    while (operators.length > 0) {
      const op = operators.pop();
      if (op === '(' || op === ')') {
        throw new Error('括号不匹配');
      }
      output.push(op);
    }

    return output;
  }

  /**
   * 计算后缀表达式
   * @param {string[]} postfix - 后缀表达式
   * @returns {number} 计算结果
   */
  static evaluatePostfix(postfix) {
    const stack = [];

    for (const token of postfix) {
      if (!isNaN(token)) {
        // 数字入栈
        stack.push(parseFloat(token));
      } else {
        // 运算符计算
        const b = stack.pop();
        const a = stack.pop();

        if (a === undefined || b === undefined) {
          throw new Error('表达式格式错误');
        }

        switch (token) {
          case '+':
            stack.push(MathUtil.sum(a, b, precision.value));
            break;
          case '-':
            stack.push(MathUtil.minus(a, b, precision.value));
            break;
          case '*':
            stack.push(MathUtil.time(a, b, precision.value));
            break;
          case '/':
            if (b === 0) {
              throw new Error('除数不能为零');
            }
            stack.push(MathUtil.devide(a, b, precision.value));
            break;
          default:
            throw new Error(`不支持的运算符: ${token}`);
        }
      }
    }

    if (stack.length !== 1) {
      throw new Error('表达式格式错误');
    }

    return stack[0];
  }

  static evaluate(expression) {
    try {
      // 1. 分词
      const tokens = this.tokenize(expression);
      if (tokens.length === 0) {
        throw new Error('表达式为空');
      }

      // 2. 检查括号匹配
      let bracketCount = 0;
      for (const token of tokens) {
        if (token === '(') bracketCount++;
        if (token === ')') bracketCount--;
        if (bracketCount < 0) {
          throw new Error('括号不匹配');
        }
      }
      if (bracketCount !== 0) {
        throw new Error('括号不匹配');
      }

      // 3. 转换为后缀表达式并计算
      const postfix = this.toPostfix(tokens);
      return this.evaluatePostfix(postfix);
    } catch (error) {
      console.error('表达式计算错误:', error);
      throw new Error(error.message || '表达式计算失败');
    }
  }

  static parseAndEvaluate(formula, variables) {
    try {
      // 1. 分词
      const tokens = this.tokenize(formula);
      
      // 2. 替换变量
      const replacedTokens = this.replaceVariables(tokens, variables);
      
      // 3. 转换为后缀表达式
      const postfix = this.toPostfix(replacedTokens);
      
      // 4. 计算结果
      return this.evaluatePostfix(postfix);
    } catch (error) {
      console.error('表达式计算错误:', error);
      throw new Error(error.message || '表达式计算失败');
    }
  }
} 