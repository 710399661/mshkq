import React from 'react';
import { StyledProps } from 'utils/_type/StyledProps';

/**
 * ActionItem 支持的属性
 */
export interface ActionItem extends StyledProps {
    /**
     * 配置项的 key，必填
     */
    key: string

    /**
     * 传入自定义ReactElement节点
     */
    element?: React.DetailedReactHTMLElement<null, HTMLElement>,

    /**
     * 选项的内容
     */
    content?: string,

    /**
     * 选项的文字颜色
     */
    color?: string,

    /**
     * 是否为加载状态
     * @default false
     */
    loading?: boolean

    /**
     * 是否为禁用状态
     * @default false
     */
    disabled?: boolean

    /**
     * 为该item加入自定的class
     */
    itemClassName?: string

    /**
     * item自定义style
     */
    itemStyle?: string

    /**
     * 是否为小程序的分享按钮
     * @default false
     */
    canShare?: boolean

    /**
     * 分享来源
     * @default popup
     */
    shareData?: Object

    /**
     * 上方的图标
     */
    icon?: string

    /**
     * 下方的描述
     */
    description?: string

    /**
     * 设置了分享的回调
     */
    onShare?: () => void

    /**
     * 传入自定义类名
     */
    className?: string

    /**
     * 传入自定义样式
     */
    style?: React.CSSProperties
}

/**
 * ActionSheet 组件支持的属性
 */
export interface ActionSheetProps extends StyledProps {
    /**
     * 控制隐藏与显示
     */
    visible?: boolean
    /**
     * 菜单选项
     */
    actions?: ActionItem[]

    /**
     * 标题
     */
    title?: string

    /**
     * 层级
     * @default 100
     */
    zIndex?: number

    /**
     * 取消的文案
     * @default 取消
     */
    cancelText?: string

    /**
     * 是否显示取消按钮
     * @default true
     */
    cancelButton?: boolean

    /**
     * 是否显示遮罩层
     * @default true
     */
    overlay?: boolean

    /**
     * 是否点击选项后关闭
     * @default true
     */
    closeOnClickAction?: boolean

    /**
     * 点击遮罩是否关闭菜单
     * @default true
     */
    closeOnClickOverlay?: boolean

    /**
     * 是否为苹果预留底部安全距离
     * @default true
     */
    safeAreaInsetBottom?: boolean

    /**
     * 布局方式
     * @default column
     */
    layout?: 'column' | 'row'

    /**
     * 一行排列action的个数，仅当layout为column时生效
     * @default 5
     */
    number?: number

    /**
     * 关闭时回调
     */
    onClose?: () => void

    /**
     * 选中该项时执行的方法
     */
     onSelect?: (e, item: ActionItem) => void

    /**
     * 取消时回调
     */
    onCancel?: () => void

    /**
     * 组件自定义类名
     */
    className?: string

    /**
     * 传入自定义样式
     */
     style?: React.CSSProperties

    /**
     * 取消按钮自定义类名
     */
    buttonClassName?: string

    /**
     * 取消按钮自定义样式
     */
    buttonStyle?: React.CSSProperties
}
