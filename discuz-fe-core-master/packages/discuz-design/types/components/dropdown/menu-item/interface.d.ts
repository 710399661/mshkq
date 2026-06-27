import { StyledProps } from 'utils/_type/StyledProps';
export interface MenuItemProps extends StyledProps {
    /**
     * 唯一标志
     */
    id: string;
    /**
     * 是否禁用
     * @default false
     */
    disabled?: boolean;
    /**
     * 是否分割线
     * @default true
     */
    divided?: boolean;
}
