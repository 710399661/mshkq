import React from 'react';
export interface ComponentContextValue {
}
export interface ComponentProviderProps extends ComponentContextValue {
    /**
     * 子组件
     */
    children?: React.ReactNode;
}
export declare function DialogProvider({ children }: ComponentProviderProps): JSX.Element;
