/// <reference types="react" />
interface MenuContextValue {
    /**
     * submenu的hover index
     */
    hoverSubMenuIndex: string;
    /**
     * 设置hover的index方法
     */
    setHoverSubMenuIndex: (index: string) => void;
    /**
     * 当前激活的submenu index
     */
    currentActiveSubMenuIndex: string;
    /**
     * 设置当前激活的index方法
     */
    setCurrentActiveSubMenuIndex: (index: string) => void;
    /**
     * 当前激活的menu-item index
     */
    currentActiveItemIndex: string;
    /**
     * 设置当前激活的menu-item index
     */
    setCurrentActiveItemIndex: (index: string) => void;
    /**
     * 开启手风琴模式
     */
    uniqueOpened: boolean;
    /**
     * 菜单模式
     */
    mode: 'horizontal' | 'vertical';
    /**
     * 触发方式
     */
    menuTrigger: 'click' | 'hover';
    /**
     * 是否多选
     */
    multiple: boolean;
    /**
     * 多选menu-item index集合Set
     */
    currentActiveItemIndexSet: any;
    /**
     * 设置多选menu-item
     */
    setCurrentActiveItemIndexSet: (index: any) => void;
    /**
     * 多选sub-menu index集合Set
     */
    currentActiveSubMenuIndexSet: any;
    /**
     * 设置多选sub-menu
     */
    setCurrentActiveSubMenuIndexSet: (index: any) => void;
    /**
     * 当前默认打开的 sub-menu 的index的数组
     * @default ''
     */
    defaultOpeneds?: string[];
}
export declare const INITIAL_VALUE = "-1";
export declare const MenuContext: import("react").Context<MenuContextValue>;
interface SubMenuContextValue {
    subMenuIndex: string;
}
export declare const SubMenuContext: import("react").Context<SubMenuContextValue>;
export {};
