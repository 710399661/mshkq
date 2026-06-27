import { StyledProps } from 'utils/_type/StyledProps';
export interface ToastProps extends StyledProps {
    /**
     * 内容
     */
    content?: string;
    /**
     * TODO：需支持自定义图标名称
     */
    icon?: string;
    /**
     * 类型
     */
    type?: 'info' | 'success' | 'loading' | 'error' | 'warning';
    /**
     * 显示多少毫秒后自动消失，若为 0 则一直显示
     * @default 1500
     */
    duration?: number;
    /**
     * 展示位置
     * @default 'center'
     */
    position?: 'top' | 'center' | 'bottom';
    /**
     * 是否存在底部遮罩层(无法点击底部的内容区)
     * @default true
     */
    hasMask?: boolean;
    /**
     * 元素被关闭之后触发的事件
     */
    onClose?: () => void;
}
export declare const typeIconMap: {
    success: string;
    error: string;
    loading: string;
    warning: string;
    info: string;
};
