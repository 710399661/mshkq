import React, { createContext } from "react";

interface StepContextValue {

    /**
     * item的长度
     */
    length: number;

    /**
     * 当前激活的key
     */
    currentKey: number;

    /**
     * 控制步骤条的方向
     */
    direction?: 'horizontal' | 'vertical';

    /**
     * 点击步骤回调
     */
    onChange?: (currentKey: number) => void

    /**
     * item之间连接的自定义节点
     */
    connectNode?: React.ReactNode;
}

export const StepContext = createContext<StepContextValue>({
    length: 0,
    currentKey: 0,
})