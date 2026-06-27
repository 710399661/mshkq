import { CommonEventFunction } from '@tarojs/components';
import { StyledProps } from 'utils/_type/StyledProps';
/**
 * Icon 组件支持的属性
 */
export interface IconProps extends StyledProps {
    /**
     * 图标大小，支持传入 字符串和数字 ，可以传入 large 或 small，对应 32px 和 16px
     * @default "small"
     */
    size?: number | string;
    /**
     * 图标名称，支持传入图标名称或图片链接
     */
    name?: string;
    /**
     * 图标颜色，hex 值
     */
    color?: string;
    /**
     * 点击回调函数
     */
    onClick?: CommonEventFunction;
}
