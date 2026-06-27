import { StyledProps } from 'utils/_type/StyledProps';
import { ReactNode } from 'react';
/**
 * ScrollView 组件支持的属性
 */
export interface ScrollViewProps extends StyledProps {
    /**
     * 列表的高度。
     */
    height: string | number;
    /**
     * 列表的宽度。
     */
    width: string | number;
    /**
     * 列表的长度
     */
    rowCount: number;
    /**
     * 渲染数据
     */
    rowData: any[];
    /**
     * 列表单项的大小，垂直滚动时为高度，水平滚动时为宽度。
     */
    rowHeight: number;
    /**
     * 底部区域
     */
    renderBottom?: ReactNode;
    /**
     * 列表滚动时调用函数
     */
    onScroll?: (event: any) => void;
    /**
     * 列表滚动时触底函数
     */
    onScrollBottom?: (event: any) => void;
    /**
     * 列表滚动时触顶函数
     */
    onScrollTop?: (event: any) => void;
    /**
     * 在可视区域之外渲染的列表单项数量，值设置得越高，快速滚动时出现白屏的概率就越小，相应地，每次滚动的性能会变得越差。
     */
    overscanRowCount?: number;
    /**
     * 列表子项渲染函数
     */
    rowRenderer: (props: any) => ReactNode;
    /**
     * web: 加载更多row回调，({ startIndex: number, stopIndex: number }): Promise
     * mini: 列表滑动到底部时的回调，(): Promise
     */
    onPullingUp: (event: any) => Promise<any>;
    /**
     * web: 触发onPullingUp时机
     * mini: 距离底部触发onPullingUp/onScrollBottom时机
     */
    lowerThreshold?: number;
    /**
     * 设置竖向滚动条位置
     */
    scrollTop?: number;
    /**
     * 滑动到索引位置，顶部对齐
     */
    scrollToIndex?: number;
    /**
     * 滑动偏移量
     */
    scrollOffset?: number;
    /**
     * web
     * 是否加载列表子项
     */
    isRowLoaded?: ({ index: number }: {
        index: any;
    }) => boolean;
    /**
     * web
     * 列表子项最小高度
     */
    minHeight?: number;
    /**
     * web
     * 列表高度自适应
     */
    autoheight?: boolean;
    /**
     * 支持平台：mini
     * 是否禁止滑动
     */
    enabled?: boolean;
    /**
     * 支持平台：mini
     * 是否使用正常列表
     */
    isNormal?: boolean;
    /**
     * 支持平台：mini
     * 解开高度列表单项大小限制，默认值使用: itemSize (请注意，初始高度与实际高度差异过大会导致隐患)。
     */
    unlimitedSize?: boolean;
}
