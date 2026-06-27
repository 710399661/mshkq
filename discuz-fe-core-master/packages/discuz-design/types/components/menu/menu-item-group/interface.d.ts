/// <reference types="react" />
import { StyledProps } from 'utils/_type/StyledProps';
/**
 * MenuItemGroup 支持的属性
 */
export interface MenuItemGroupProps extends StyledProps {
    /**
     * 分组标题
     */
    title?: string | React.ReactNode;
}
