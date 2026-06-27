/// <reference types="react" />
interface MenuContextValue {
    /**
     * 当前激活item key
     */
    activeItem?: string;
    /**
     * item点击触发回调事件
     */
    onHandlerChange: (key?: string) => void;
}
export declare const MenuContext: import("react").Context<MenuContextValue>;
export {};
