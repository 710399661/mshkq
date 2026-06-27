import React, { createContext } from 'react';
import { ITouchEvent } from '@tarojs/components';

interface SideNavItemContext {
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
     * 激活时的自定义类名
     */
    activeClassName?: string

    /**
     * 激活时的自定义样式
     */
    activeStyle?: React.CSSProperties

    /**
     * 导航栏方向
     * @default vertical
     */
    direction?: 'vertical' | 'horizontal'

    /**
     * 点击回调
     */
    onClick?: (e: React.MouseEvent | ITouchEvent,index:number) => void

    /**
     * 连接的自定义节点
     */
    connect?: React.ReactNode
}

export const SideNavItemContext = createContext<SideNavItemContext>({})