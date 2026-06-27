import React from 'react';
import { StyledProps } from 'utils/_type/StyledProps';
/**
 * PullDownRefreshProps 组件支持的属性
 */
export interface PullDownRefreshProps extends StyledProps {
    /**
     * 拉的最大距离
     */
    damping?: number;
    /**
     * 为刷新时的回调函数
     */
    onRefresh: () => void;
    /**
     * 判断当前的刷新动作,是否完成
     */
    isFinished: boolean;
    /**
     * 为该组件包含的内容
     */
    children: React.ReactNode;
    /**
     * 为滚动的区域高度，即超出高度为多少就滚动
     */
    height: number;
    /**
     * 自定义刷新动画组件
     */
    status?: React.ReactNode;
    /**
     * children滑动是否触顶， scrollTop <= 0
     */
    isReachTop?: boolean;
    /**
     * children是否是ScrollView
     */
    isScrollView?: boolean;
}
