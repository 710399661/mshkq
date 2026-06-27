/// <reference types="react" />
import { StyledProps } from 'utils/_type/StyledProps';
export interface RowProps extends StyledProps {
    /**
     * 元素间隔
     * @default 20
     */
    gutter?: number;
    /**
     * 元素超出 flex 容器时处理方式
     * @default "wrap"
     */
    flexWrap?: 'wrap' | 'nowrap';
    /**
     * 设置 flex-direction: row-reverse;
     * @default false
     */
    reverse?: boolean;
    /**
     * flex 布局下的垂直排列方式
     * @default "stretch"
     */
    align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
    /**
     * flex 布局下的水平排列方式
     * @default "flex-start"
     */
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
    /**
     * 包括的栅格列，请使用 <Col /> 作为子节点
     */
    children?: ColChild | ColChild[];
}
export interface ColProps extends StyledProps {
    /**
     * flex 布局属性
     */
    flex?: string | number;
    /**
     * Col 向右偏移列的数量
     * @default 0
     */
    offset?: number;
    /**
     * 栅格顺序
     * @default 0
     */
    order?: number;
    /**
     * 栅格占位格数
     */
    span?: number;
    /**
     * 栅格单元中内容
     */
    children?: React.ReactNode;
}
interface ColChild extends React.ReactElement<ColProps> {
}
export {};
