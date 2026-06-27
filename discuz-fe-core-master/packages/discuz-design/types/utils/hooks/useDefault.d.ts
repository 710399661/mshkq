export interface ChangeHandler<T, P extends any[]> {
    (value: T, ...args: P): any;
}
export declare function useDefault<T, P extends any[]>(value: T, defaultValue: T, onChange: ChangeHandler<T, P>): [T, ChangeHandler<T, P>];
/**
 * 可直接接管 props 中 `value`，`defaultValue` 及 `onChange` 受控属性
 */
export declare function useDefaultValue<T, P>(props: P, defaultDefaultValue?: T): Pick<P, Exclude<keyof P, "defaultValue">>;
