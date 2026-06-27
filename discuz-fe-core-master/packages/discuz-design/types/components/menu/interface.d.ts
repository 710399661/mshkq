/// <reference types="react" />
import { StyledProps } from 'utils/_type/StyledProps';
/**
 * Menu 支持的属性
 */
export interface MenuProps extends StyledProps {
    /**
     * 导航内容
     * - Menu.Group 分组
     * - Menu.SubMenu 子菜单
     * - Menu.Item 菜单项
     */
    children?: React.ReactNode;
    /**
     * 模式
     * @default "vertical"
     */
    mode?: 'horizontal' | 'vertical';
    /**
     * 子菜单打开的触发方式(只在 mode 为 horizontal 时有效)
     * @default "hover"
     */
    menuTrigger?: 'hover' | 'click';
    /**
     * 是否只保持一个子菜单的展开
     * @default false
     */
    uniqueOpened?: boolean;
    /**
     * 是否多选
     * @default false
     */
    multiple?: boolean;
    /**
     * 当前默认打开的 sub-menu 的 index 的数组
     * @default ''
     */
    defaultOpeneds?: string[];
    /**
     * 当前默认激活的index菜单
     * @default ''
     */
    defaultActives?: string[];
    /**
     * 当前默认激活submenu的index菜单
     * @default ''
     */
    defaultSubmenuActives?: string[];
}
