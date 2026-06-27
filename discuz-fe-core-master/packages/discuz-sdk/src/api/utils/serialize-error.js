/**
 * JSON.stringify 的 replacer 方法
 * @param {string} key 建
 * @param {any} value 值
 */
function replaceError(key, value) {
  if (value instanceof Error) {
    const error = {};

    Object.getOwnPropertyNames(value).forEach((key) => {
      error[key] = value[key];
    });

    return error;
  }

  return value;
}

/**
 * 序列化error对象
 * @param {object} err error对象
 */
export function serializeError(err) {
  return JSON.stringify(err, replaceError);
}
