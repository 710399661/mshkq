/// <reference types="react" />
import { StyledProps } from 'utils/_type/StyledProps';
/**
 * Badge 组件支持的属性
 */
export interface BadgeProps extends StyledProps {
    /** 要显示徽章的元素
     *
     * @example
     ```js
        <Badge info="99+">
          <Button>未读消息</Button>
        </Badge>
     ```
     */
    children?: React.ReactNode;
    /**
     * 徽章内容
     */
    info?: React.ReactNode;
    /**
     * 不展示文字，只有一个小红点
     * @default false
     */
    dot?: boolean;
    /**
     * 支持自定义 Badeg 背景颜色
     * @default false
     */
    color?: string;
    /**
     * 支持方形 Badeg 样式
     * @default false
     */
    square?: boolean;
    /**
     * 支持圆形 Badeg 样式
     * @default false
     */
    circle?: boolean;
    /**
     * 组件自定义类名
     */
    className?: string;
}
