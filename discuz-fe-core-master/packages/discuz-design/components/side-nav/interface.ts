import React from 'react';
import { StyledProps } from 'utils/_type/StyledProps';
import { ITouchEvent } from '@tarojs/components';

/**
 * SideNav 组件支持的属性
 */
export interface SideNavProps extends StyledProps {
    /**
     * 控制导航栏的激活
     */
    activeIndex?: number

    /**
     * 默认激活选项
     * @default -1
     */
    defaultActiveIndex?: number

    /**
     * 导航栏选项（Nav.item）
     */
    children?: React.ReactNode

    /**
     * 导航栏方向
     * @default vertical
     */
    direction?: 'vertical' | 'horizontal'

    /**
     * 自定义类名
     */
    className?: string

    /**
     * 自定义样式
     */
    style?: React.CSSProperties

    /**
     * 激活时的自定义类名
     */
    activeClassName?: string

    /**
     * 激活时的自定义样式
     */
    activeStyle?: React.CSSProperties

    /**
     * 点击回调
     */
    onClick?: (event: React.MouseEvent | ITouchEvent, index: number) => void

    /**
     * 连接的自定义节点
     */
    connect?: React.ReactNode
}

export interface SideNavItemProps extends StyledProps {
    /**
     * item的自定义内容
     */
    children?: React.ReactNode

    /**
     * 唯一标识
     */
    index?: number

    /**
     * 自定义类名
     */
    className?: string 

    /**
     * 自定义样式
     */
    style?: React.CSSProperties
}
