/// <reference types="react" />
import { StyledProps } from 'utils/_type/StyledProps';
export interface ControlledProps<V, C> {
    /**
     * 未提供 `value` 的情况下，提供了 `defaultValue`，则可以当做是非受控组件使用
     */
    defaultValue?: V;
    /**
     * 当前值
     */
    value?: V;
    /**
     * 值发生变更时进行回调
     * - `value` 变更的目标值
     * - `context` 此次变更的更多上下文信息，其中 `context.event` 可以获得导致变更的事件
     */
    onChange?: (value: V, context: C) => void;
}
/**
 * Slider 组件支持的属性
 */
export interface SliderProps extends ControlledProps<number, StyledProps> {
    /**
     * 取值的最小值
     * @default 0
     */
    min?: number;
    /**
     * 取值的最大值
     * @default 100
     */
    max?: number;
    /**
     * 取值步长
     * @default 1
     */
    step?: number;
    /**
     * 是否禁用
     * @default false
     */
    disabled?: boolean;
    /**
     * 自定义描述内容
     * @default value => value
     */
    formatter?: (value: number) => React.ReactNode;
}
