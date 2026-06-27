/// <reference types="react" />
export declare const DEFAULT_CLASS_PREFIX: string;
export declare const DEFAULT_LOCALE: "en" | "zh" | "ko" | "ja";
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
export declare const ConfigContext: import("react").Context<Config>;
export declare const useConfig: () => {
    clsPrefix: string;
    locale: "en" | "zh" | "ko" | "ja";
};
