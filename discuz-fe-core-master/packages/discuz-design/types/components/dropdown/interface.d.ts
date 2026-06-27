import { ReactNode } from 'react';
import { StyledProps } from 'utils/_type/StyledProps';
/**
 * 基本的菜单属性
 */
export interface DropdownProps extends StyledProps {
    /**
     * 触发区域
     */
    children: ReactNode;
    /**
     * 菜单
     */
    menu?: ReactNode;
    /**
     * 触发方式
     * @default 'hover'
     */
    trigger?: 'hover' | 'click';
    /**
     * 改变事件
     */
    onChange?: (key?: string) => void;
    /**
     * 点击后隐藏菜单
     * @default true
     */
    hideOnClick?: boolean;
    /**
     * 菜单弹出区域
     * @default 'center'
     */
    placement?: 'left' | 'center' | 'right';
    /**
     * 是否显示图标
     * @default false
     */
    arrow?: boolean;
    /**
     * 菜单显示/隐藏事件
     */
    onVisibleChange?: (isShow: boolean) => void;
}
