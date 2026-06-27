/// <reference types="react" />
import { StyledProps } from 'utils/_type/StyledProps';
/**
 * Popup 组件支持的属性
 */
export interface WebPopupProps extends StyledProps {
    /**
     * 弹出位置
     * @default "bottom"
     */
    position?: 'bottom' | 'top' | 'center';
    /**
     * 是否显示弹出层
     * @default false
     */
    visible: boolean;
    /**
     * 点击遮罩层是否关闭弹出层
     * @default true
     */
    maskClosable?: boolean;
    /**
     * 遮罩层点击关闭回调
     */
    onClose?: () => void;
    /**
     * 弹出层内容
     */
    children?: React.ReactNode;
    /**
     * 容器className
     */
    containerClassName?: string;
}
export interface MiniPopupProps extends StyledProps {
    /**
     * 弹出位置
     * @default "bottom"
     */
    position?: 'bottom' | 'top' | 'center';
    /**
     * 是否显示弹出层
     * @default false
     */
    visible: boolean;
    /**
     * 点击遮罩层是否关闭弹出层
     * @default true
     */
    maskClosable?: boolean;
    /**
     * 遮罩层点击关闭回调
     */
    onClose?: () => void;
    /**
     * 弹出层内容
     */
    children?: React.ReactNode;
    /**
     * 容器className
     */
    containerClassName?: string;
    customScroll?: boolean;
}
