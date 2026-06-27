import React, { createContext, useContext } from 'react';
import Toast from '../toast';

export interface ComponentContextValue {}

const ComponentContext = createContext<ComponentContextValue>(null);

export interface ToastProviderProps extends ComponentContextValue {
  /**
   * 子组件
   */
  children?: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const parentContext = useContext(ComponentContext);
  return (
    <ComponentContext.Provider value={{}}>
      {children}
      {!parentContext && (
        <>
          {/* 预埋 API 方式使用组件 */}
          <Toast />
        </>
      )}
    </ComponentContext.Provider>
  );
}
