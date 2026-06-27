/// <reference types="react" />
import { StyledProps } from 'utils/_type/StyledProps';
/**
 * Switch 组件支持的属性
 */
export interface SwitchProps extends StyledProps {
    /**
     * 开关选中状态
     */
    checked?: boolean;
    /**
     * 开关默认选中状态
     * @default false
     */
    defaultChecked?: boolean;
    /**
     * 点击回调函数
     */
    onChange?: (checked: boolean, context: any) => void;
    /**
     * 是否为禁用状态
     * @default false
     */
    disabled?: boolean;
    /**
     * 是否为加载状态
     * @default false
     */
    loading?: boolean;
    /**
     * 在表单内提交的标志符
     * @default "28"
     */
    size?: number;
    /**
     * 开关打开时的背景颜色
     * @default "#006EFF"
     */
    color?: string;
    /**
     * 组件自定义类名
     */
    className?: string;
    /**
     * 组件自定义样式
     */
    style?: React.CSSProperties;
}
