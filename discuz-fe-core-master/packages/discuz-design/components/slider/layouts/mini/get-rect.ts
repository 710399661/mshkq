import Taro from '@tarojs/taro';

/**
 * 获取 boundingClientRect
 *
 * @param ref 要获取矩形的 DOM Ref
 * @param selector 要获取矩形的 DOM 的选择器，会从 DOM Ref 下查找，不传则获取 ref 的矩形
 *
 * * @example
 * ```tsx
 * useReady(async () => {
 *    const rect = await getRect(ref);
 * });
 * ```
 */
export function getRect(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.RefObject<any>,
  selector?: string,
): Promise<DOMRect[]> {
  return new Promise((resolve, reject) => {
    if (!ref.current) {
      reject();
      return;
    }
    const query = Taro.createSelectorQuery();
    query
      .selectAll(`#${ref.current.uid}${selector ? ` ${selector}` : ''}`)
      .boundingClientRect(resolve as any)
      .exec();
  });
}
