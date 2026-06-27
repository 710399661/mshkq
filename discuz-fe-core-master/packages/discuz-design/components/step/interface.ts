import React from 'react';
import { StyledProps } from 'utils/_type/StyledProps';

/**
 * Step 组件支持的属性
 */
export interface StepProps extends StyledProps {
    /**
     * 步骤条内容
     * Step.item
     */
    children?: React.ReactNode;

    /**
     * 控制步骤条的进度
     */
    currentKey: number;

    /**
     * 控制步骤条的方向
     */
    direction?: 'horizontal' | 'vertical';

    /**
     * 仅用做展示的步骤条，没有进度状态区分
     */
    readonly?: boolean;

    /**
     * 点击步骤时的回调
     */
    onChange?: (currentKey: number) => void;

    /**
     * 自定义类名
     */
    className?: string;

    /**
     * 自定义样式
     */
    style?: React.CSSProperties;

    /**
     * item之间连接的自定义节点
     */
    connectNode?: React.ReactNode;
}

export interface StepItemProps extends StyledProps {
    /**
     * 每一项的标识
     */
    index: number;

    /**
     * 传入的标题内容
     */
    children?: React.ReactNode;

    /**
     * 自定义类名
     */
    className?: string;

    /**
     * 自定义样式
     */
    style?: React.CSSProperties;
}
