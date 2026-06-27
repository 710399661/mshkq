/**
 * 判断是否是数组
 * @param obj 目标对象
 * @returns boolean
 * ```js
 * const a = {};
 * isArray(a) // false
 * ```
 */
const isArray = function (obj: any) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};
export { isArray };
