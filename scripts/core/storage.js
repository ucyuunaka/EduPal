/**
 * 本地存储工具类
 * 封装 localStorage 操作，支持对象和数组的自动序列化和反序列化
 */
class Storage {
  /**
   * 设置存储项
   * @param {string} key - 存储键名
   * @param {any} value - 存储值，支持对象和数组
   * @param {number} [expireTime] - 过期时间（毫秒），可选
   */
  static set(key, value, expireTime) {
    const data = {
      value,
      time: Date.now(),
      expire: expireTime ? Date.now() + expireTime : null,
    };
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * 获取存储项
   * @param {string} key - 存储键名
   * @param {any} [defaultValue] - 默认值，当存储项不存在或已过期时返回
   * @returns {any} 存储值或默认值
   */
  static get(key, defaultValue = null) {
    const item = localStorage.getItem(key);
    
    if (!item) {
      return defaultValue;
    }
    
    try {
      const data = JSON.parse(item);
      
      // 检查是否过期
      if (data.expire && data.expire < Date.now()) {
        this.remove(key);
        return defaultValue;
      }
      
      return data.value;
    } catch (error) {
      console.error('Storage parse error:', error);
      return defaultValue;
    }
  }

  /**
   * 移除存储项
   * @param {string} key - 存储键名
   */
  static remove(key) {
    localStorage.removeItem(key);
  }

  /**
   * 检查存储项是否存在且未过期
   * @param {string} key - 存储键名
   * @returns {boolean} 是否存在且未过期
   */
  static has(key) {
    const item = localStorage.getItem(key);
    
    if (!item) {
      return false;
    }
    
    try {
      const data = JSON.parse(item);
      
      // 检查是否过期
      if (data.expire && data.expire < Date.now()) {
        this.remove(key);
        return false;
      }
      
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * 清除所有存储项
   */
  static clear() {
    localStorage.clear();
  }
  
  /**
   * 获取所有存储键
   * @returns {string[]} 所有存储键的数组
   */
  static keys() {
    return Object.keys(localStorage);
  }
  
  /**
   * 获取localStorage的使用情况
   * @returns {Object} 包含已使用和总容量的对象
   */
  static usage() {
    let used = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      used += key.length + value.length;
    }
    
    // 转换为KB
    const usedKB = (used / 1024).toFixed(2);
    // localStorage 通常有5MB大小限制
    const totalKB = 5 * 1024; 
    
    return {
      used: usedKB,
      total: totalKB,
      percentage: ((usedKB / totalKB) * 100).toFixed(2) + '%'
    };
  }
}

export default Storage;
