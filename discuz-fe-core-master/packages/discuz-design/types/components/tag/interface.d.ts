/// <reference types="react" />
import { StyledProps } from 'utils/_type/StyledProps';
export interface TagProps extends StyledProps {
    /**
     * 颜色主题
     *
     * @default "default"
     */
    type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'orange';
    /**
     * 标签内容
     */
    children?: React.ReactNode;
    /**
     * 是否可以关闭
     */
    closeable?: boolean;
    /**
     * 关闭回调
     */
    onClose?: () => void;
    /**
     * tag大小
     */
    size?: 'md' | 'lg';
    /**
     * 点击回调
     */
    onClick?: () => void;
}
