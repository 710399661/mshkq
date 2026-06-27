export var __esModule: boolean;
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
export function getRect(ref: any, selector: any): Promise<any>;
