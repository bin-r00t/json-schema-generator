/**
 * 数学工具类，提供安全的浮点数运算方法
 */
export class MathUtil {
  /**
   * 将数字转换为指定精度
   * @param {number} num - 需要处理的数字
   * @param {number} precision - 精度（小数位数）
   * @returns {number} 处理后的数字
   */
  static toPrecision(num, precision) {
    // 处理无效输入
    if (typeof num !== 'number' || isNaN(num)) {
      throw new Error('输入必须是有效数字');
    }
    
    // 处理精度
    precision = Math.max(0, parseInt(precision) || 0);
    const multiplier = Math.pow(10, precision);
    return Math.round(num * multiplier) / multiplier;
  }

  /**
   * 安全的加法运算
   * @param {number} a - 第一个操作数
   * @param {number} b - 第二个操作数
   * @param {number} precision - 精度（小数位数）
   * @returns {number} 计算结果
   */
  static sum(a, b, precision = 2) {
    // 将数字转换为字符串，避免科学计数法
    const numA = Number(a);
    const numB = Number(b);

    if (isNaN(numA) || isNaN(numB)) {
      throw new Error('输入必须是有效数字');
    }

    // 获取两个数字的小数位数
    const decimalA = (numA.toString().split('.')[1] || '').length;
    const decimalB = (numB.toString().split('.')[1] || '').length;
    
    // 使用最大的小数位数作为中间计算的精度
    const maxDecimal = Math.max(decimalA, decimalB);
    const multiplier = Math.pow(10, maxDecimal);

    // 将数字转换为整数进行计算，避免浮点数精度问题
    const result = (numA * multiplier + numB * multiplier) / multiplier;
    
    // 应用最终精度
    return MathUtil.toPrecision(result, precision);
  }

  /**
   * 安全的减法运算
   * @param {number} a - 第一个操作数
   * @param {number} b - 第二个操作数
   * @param {number} precision - 精度（小数位数）
   * @returns {number} 计算结果
   */
  static minus(a, b, precision = 2) {
    return MathUtil.sum(a, -b, precision);
  }

  /**
   * 安全的乘法运算
   * @param {number} a - 第一个操作数
   * @param {number} b - 第二个操作数
   * @param {number} precision - 精度（小数位数）
   * @returns {number} 计算结果
   */
  static time(a, b, precision = 2) {
    const numA = Number(a);
    const numB = Number(b);

    if (isNaN(numA) || isNaN(numB)) {
      throw new Error('输入必须是有效数字');
    }

    // 获取两个数字的小数位数
    const decimalA = (numA.toString().split('.')[1] || '').length;
    const decimalB = (numB.toString().split('.')[1] || '').length;
    
    // 将数字转换为整数进行计算
    const multiplierA = Math.pow(10, decimalA);
    const multiplierB = Math.pow(10, decimalB);
    
    const result = (numA * multiplierA * (numB * multiplierB)) / (multiplierA * multiplierB);
    
    // 应用精度
    return MathUtil.toPrecision(result, precision);
  }

  /**
   * 安全的除法运算
   * @param {number} a - 第一个操作数（被除数）
   * @param {number} b - 第二个操作数（除数）
   * @param {number} precision - 精度（小数位数）
   * @returns {number} 计算结果
   */
  static devide(a, b, precision = 2) {
    const numA = Number(a);
    const numB = Number(b);

    if (isNaN(numA) || isNaN(numB)) {
      throw new Error('输入必须是有效数字');
    }

    if (numB === 0) {
      throw new Error('除数不能为零');
    }

    // 先进行除法运算
    const result = numA / numB;
    
    // 应用精度
    return MathUtil.toPrecision(result, precision);
  }
} 