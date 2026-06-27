/**
 * 判断是否为对象
 * @param obj 要判断的变量
 * @returns boolean
 * ```js
 * const a = {};
 * isObject(a) // true
 * ```
 */
const isObject = function (obj) {
  return obj === Object(obj);
};
export { isObject };
