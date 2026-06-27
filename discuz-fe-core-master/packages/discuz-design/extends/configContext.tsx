import { createContext, useContext } from 'react';

declare const DZQ_CLASS_PREFIX: string;
declare const WEBPACK_BUILD_LOCALE: 'zh' | 'en' | 'ko' | 'ja';

// 支持 webpack 注入
export const DEFAULT_CLASS_PREFIX = typeof DZQ_CLASS_PREFIX !== 'undefined' ? DZQ_CLASS_PREFIX : 'dzq';
export const DEFAULT_LOCALE = typeof WEBPACK_BUILD_LOCALE !== 'undefined' ? WEBPACK_BUILD_LOCALE : 'zh';

export interface Config {
  /**
   * 组件类名前缀
   *
   * @default "dzq"
   */
  clsPrefix?: string;

  /**
   * 组件语言版本
   *
   * @default "zh"
   */
  locale?: 'zh' | 'en' | 'ko' | 'ja';
}

export const ConfigContext = createContext<Config>({
  clsPrefix: DEFAULT_CLASS_PREFIX,
  locale: DEFAULT_LOCALE,
});

export const useConfig = () => {
  const context = useContext(ConfigContext) || {};
  return {
    clsPrefix: DEFAULT_CLASS_PREFIX,
    locale: DEFAULT_LOCALE,
    ...context,
  };
};
