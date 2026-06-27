/**
 * 设定数据
 * @param target 目标
 * @param path 路径
 * @param value 目标值
 * ```js
 * let obj = {};
 * set(obj, 'a.b.c', 1);
 * // obj.a.b.c -> 1
 * ```
 */
declare const set: (target: any, path: string, value: any) => boolean;
export { set };
