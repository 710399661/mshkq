import React, { createContext, useContext } from 'react';
import Dialog from './index';

export interface ComponentContextValue {}

const ComponentContext = createContext<ComponentContextValue>(null);

export interface ComponentProviderProps extends ComponentContextValue {
  /**
   * 子组件
   */
  children?: React.ReactNode;
}

export function DialogProvider({ children }: ComponentProviderProps) {
  const parentContext = useContext(ComponentContext);
  return (
    <ComponentContext.Provider value={{}}>
      {children}
      {!parentContext && (
        <>
          {/* 预埋 API 方式使用组件 */}
          <Dialog inContext={true} />
        </>
      )}
    </ComponentContext.Provider>
  );
}
