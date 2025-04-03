/**
 * 事件总线工具类
 * 用于实现模块间的解耦通信
 */
class EventBus {
  constructor() {
    // 事件处理程序映射表
    this.eventHandlers = new Map();
    // 一次性事件处理程序映射表
    this.onceEventHandlers = new Map();
  }

  /**
   * 订阅事件
   * @param {string} event - 事件名称
   * @param {Function} handler - 事件处理函数
   * @param {Object} [context] - 处理函数的上下文(this)
   * @returns {Function} 取消订阅的函数
   */
  on(event, handler, context = null) {
    if (typeof handler !== 'function') {
      throw new Error('事件处理程序必须是函数');
    }

    const wrappedHandler = context ? handler.bind(context) : handler;
    
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    
    const handlers = this.eventHandlers.get(event);
    handlers.push({ handler: wrappedHandler, original: handler });

    // 返回取消订阅的函数
    return () => this.off(event, handler);
  }

  /**
   * 订阅事件，但只触发一次
   * @param {string} event - 事件名称
   * @param {Function} handler - 事件处理函数
   * @param {Object} [context] - 处理函数的上下文(this)
   * @returns {Function} 取消订阅的函数
   */
  once(event, handler, context = null) {
    if (typeof handler !== 'function') {
      throw new Error('事件处理程序必须是函数');
    }

    const wrappedHandler = (...args) => {
      // 先移除监听器，再执行处理函数
      this.off(event, handler);
      return context ? handler.apply(context, args) : handler(...args);
    };

    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    
    const handlers = this.eventHandlers.get(event);
    handlers.push({ handler: wrappedHandler, original: handler });

    // 在一次性事件表中记录，便于以后引用
    if (!this.onceEventHandlers.has(event)) {
      this.onceEventHandlers.set(event, new Map());
    }
    this.onceEventHandlers.get(event).set(handler, wrappedHandler);

    // 返回取消订阅的函数
    return () => this.off(event, handler);
  }

  /**
   * 取消订阅事件
   * @param {string} [event] - 事件名称，如果不提供则移除所有事件
   * @param {Function} [handler] - 事件处理函数，如果不提供则移除该事件的所有处理程序
   * @returns {boolean} 是否成功取消订阅
   */
  off(event, handler) {
    // 如果没有提供事件名称，则移除所有事件
    if (event === undefined) {
      this.eventHandlers.clear();
      this.onceEventHandlers.clear();
      return true;
    }

    // 如果该事件不存在
    if (!this.eventHandlers.has(event)) {
      return false;
    }

    const handlers = this.eventHandlers.get(event);
    
    // 如果没有提供处理函数，则移除该事件的所有处理程序
    if (handler === undefined) {
      this.eventHandlers.delete(event);
      if (this.onceEventHandlers.has(event)) {
        this.onceEventHandlers.delete(event);
      }
      return true;
    }

    // 移除特定处理函数
    const initialLength = handlers.length;
    for (let i = handlers.length - 1; i >= 0; i--) {
      if (handlers[i].original === handler) {
        handlers.splice(i, 1);
      }
    }

    // 如果没有剩余的处理程序，则移除该事件
    if (handlers.length === 0) {
      this.eventHandlers.delete(event);
    }

    // 清除一次性事件处理程序的引用
    if (this.onceEventHandlers.has(event) && this.onceEventHandlers.get(event).has(handler)) {
      this.onceEventHandlers.get(event).delete(handler);
      if (this.onceEventHandlers.get(event).size === 0) {
        this.onceEventHandlers.delete(event);
      }
    }

    return initialLength !== handlers.length;
  }

  /**
   * 触发事件
   * @param {string} event - 事件名称
   * @param {...any} args - 传递给事件处理程序的参数
   * @returns {boolean} 是否有处理程序被调用
   */
  emit(event, ...args) {
    if (!this.eventHandlers.has(event)) {
      return false;
    }

    const handlers = this.eventHandlers.get(event);
    let called = false;

    // 为了防止在处理过程中修改handlers数组，这里复制一份
    const handlersToCall = [...handlers];
    
    handlersToCall.forEach(({ handler }) => {
      try {
        handler(...args);
        called = true;
      } catch (error) {
        console.error(`事件 "${event}" 处理程序执行出错:`, error);
      }
    });

    return called;
  }

  /**
   * 异步触发事件
   * @param {string} event - 事件名称
   * @param {...any} args - 传递给事件处理程序的参数
   * @returns {Promise<boolean>} 是否有处理程序被调用的Promise
   */
  async emitAsync(event, ...args) {
    if (!this.eventHandlers.has(event)) {
      return false;
    }

    const handlers = this.eventHandlers.get(event);
    let called = false;
    
    // 为了防止在处理过程中修改handlers数组，这里复制一份
    const handlersToCall = [...handlers];
    
    const promises = handlersToCall.map(({ handler }) => {
      return new Promise((resolve) => {
        try {
          const result = handler(...args);
          if (result instanceof Promise) {
            result.catch(error => {
              console.error(`事件 "${event}" 的异步处理程序执行出错:`, error);
            }).finally(() => resolve());
          } else {
            resolve();
          }
          called = true;
        } catch (error) {
          console.error(`事件 "${event}" 处理程序执行出错:`, error);
          resolve();
        }
      });
    });

    await Promise.all(promises);
    return called;
  }

  /**
   * 获取特定事件的监听器数量
   * @param {string} [event] - 事件名称，如果不提供则返回所有事件的监听器总数
   * @returns {number} 监听器数量
   */
  listenerCount(event) {
    if (event === undefined) {
      let count = 0;
      for (const handlers of this.eventHandlers.values()) {
        count += handlers.length;
      }
      return count;
    }

    if (!this.eventHandlers.has(event)) {
      return 0;
    }
    
    return this.eventHandlers.get(event).length;
  }

  /**
   * 获取所有已注册的事件名称
   * @returns {string[]} 事件名称数组
   */
  eventNames() {
    return Array.from(this.eventHandlers.keys());
  }
}

// 创建单例
const eventBus = new EventBus();

export default eventBus;
