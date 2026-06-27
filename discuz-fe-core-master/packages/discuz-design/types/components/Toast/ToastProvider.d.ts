import React from 'react';
export interface ComponentContextValue {
}
export interface ToastProviderProps extends ComponentContextValue {
    /**
     * 子组件
     */
    children?: React.ReactNode;
}
export declare function ToastProvider({ children }: ToastProviderProps): JSX.Element;
