/**
 * 深拷贝
 * @param obj 要拷贝的对象
 * @param options 可以配置ignore数组设置忽略的项目
 * ```js
 *   const a = { a: { b: 1 } };
 *   const c = deepClone(a);
 * ```
 */
declare const deepClone: (obj: any, options?: {
    ignore: string[];
}) => any;
export { deepClone };
