/**
 *
 * @param obj 要拷贝的对象
 * ```js
 * const a = { a: {b: 1} }
 * const c = shallowClone(a)
 * c.a === a.a // true
 * ```
 */
declare const shallowClone: (obj: any) => any;
export { shallowClone };
