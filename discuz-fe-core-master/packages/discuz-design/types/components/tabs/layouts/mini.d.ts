/// <reference types="react" />
/**
 * 兼容 useReady
 */
export declare const useReady: (fn: () => void | Promise<void>) => void;
export declare function useIsReady(): boolean;
export declare const MiniLayout: {
    (props: any): JSX.Element;
    TabPanel: typeof TabPanel;
};
declare function TabPanel(props: any): JSX.Element;
export {};
