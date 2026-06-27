import { StyledProps } from 'utils/_type/StyledProps';
/**
 * MenuItem 支持的属性
 */
export interface MenuItemProps extends StyledProps {
    /**
     * 唯一标志
     */
    index?: string;
    /**
     * 是否禁用
     * @default false
     */
    disabled?: boolean;
    /**
     * 是否显示分割线
     * @default false
     */
    divided?: boolean;
    /**
     * 点击后的回调
     * @param index 当前菜单的index
     * @param subMenuIndex 父级菜单的index
     * @param currentActiveSubMenuIndexSet 当前已选中的index Set集合
     */
    onClick?: (index: string, subMenuIndex: string, currentActiveSubMenuIndexSet: any) => void;
}
