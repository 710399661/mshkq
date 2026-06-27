export const createCallbackManager = () => {
  const callbacks = [];

  /**
   * 添加回调
   * @param {{ callback: function, ctx: any } | function} opt
   */
  const add = (opt) => {
    callbacks.push(opt);
  };

  /**
   * 移除回调
   * @param {{ callback: function, ctx: any } | function} opt
   */
  const remove = (opt) => {
    let pos = -1;
    callbacks.forEach((callback, k) => {
      if (callback === opt) {
        pos = k;
      }
    });
    if (pos > -1) {
      callbacks.splice(pos, 1);
    }
  };

  /**
   * 获取回调函数数量
   * @return {number}
   */
  const count = () => callbacks.length;

  /**
   * 触发回调
   * @param  {...any} args 回调的调用参数
   */
  const trigger = (...args) => {
    callbacks.forEach((opt) => {
      if (typeof opt === 'function') {
        opt(...args);
      } else {
        const { callback, ctx } = opt;
        callback.call(ctx, ...args);
      }
    });
  };

  return {
    add,
    remove,
    count,
    trigger,
  };
};
