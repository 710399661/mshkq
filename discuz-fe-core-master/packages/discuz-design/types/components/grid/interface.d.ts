import { StyledProps } from 'utils/_type/StyledProps';
import { IconProps } from '../icon/interface';
export interface GridItem extends StyledProps {
    /**
     * 图标名称或图片链接，可选值请查阅 Icon 组件
     */
    icon?: string | IconProps;
    /**
     * 标题文字
     */
    title?: string;
    /**
     * 标题下方的描述信息
     */
    description?: string;
    /**
     * 点击回调函数
     */
    onClick?: (item: GridItem, context: {
        event: any;
        index: number;
    }) => void;
    [key: string]: any;
}
export interface GridProps extends StyledProps {
    /**
     * 宫格布局各元素数据
     * @default []
     */
    data?: GridItem[];
    /**
     * 宫格元素之间的间距
     * @default 0
     */
    gutter?: number;
    /**
     * 是否显示边框
     * @default true
     */
    bordered?: boolean;
    /**
     * 每一列有多少个
     * @default 3
     */
    columnNum?: number;
    /**
     * 是否将宫格元素固定为正方形
     * @default false
     */
    square?: boolean;
    /**
     * 图标大小。默认单位为 px，支持自带单位
     * @default "32px"
     */
    iconSize?: number | string;
    /**
     * 点击回调函数
     */
    onClick?: (item: GridItem, context: {
        event: any;
        index: number;
    }) => void;
}
