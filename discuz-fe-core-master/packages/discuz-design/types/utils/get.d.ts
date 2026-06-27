/**
 * 取数方法
 * @param source 源对象
 * @param path 路径
 * @param defaultValue 默认值
 * ```js
 * async() => {
 *  const data = await axios.get('');
 *  const example = get(data, 'data.a.b.c.d.e', 1);
 * // 如果取不到
 * console.log(example) //1
 * // 如果取的到
 * console.log(example) //对应的值
 * }
 * ```
 */
declare const get: (source: any, path: string, defaultValue?: any) => any;
export { get };
