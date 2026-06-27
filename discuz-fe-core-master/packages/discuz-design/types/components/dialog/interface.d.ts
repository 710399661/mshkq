/// <reference types="react" />
import { StyledProps } from 'utils/_type/StyledProps';
/**
 * 基本的按钮属性
 */
export interface DialogProps extends StyledProps {
    /**
     * 是否显示 Dialog
     */
    visible?: boolean;
    /**
     * 在非受控模式下，是否可见
     */
    defaultVisible?: boolean;
    /**
     * 点击遮罩层是否可以关闭Dialog
     */
    maskClosable?: boolean;
    /**
     * 点击遮罩层是否可以关闭Dialog
     */
    onClose?: Function;
    /**
     * Dialog 的 header 部分
     */
    header?: React.ReactNode;
    /**
     * Dialog 的 footer 部分
     */
    footer?: React.ReactNode;
    /**
     * API 调用能力预留，声明为全局 Dialog
     */
    inContext?: boolean;
    /**
     * header 部分的自定义 Style
     */
    headerStyle?: React.CSSProperties;
    /**
     * body 部分的自定义 Style
     */
    bodyStyle?: React.CSSProperties;
    /**
     * footer 部分的自定义 Style
     */
    footerStyle?: React.CSSProperties;
    /**
     * mask 遮罩层的自定义 Style
     */
    maskStyle?: React.CSSProperties;
    /**
     * header 部分的 class name
     */
    headerClassName?: string;
    /**
     * body 部分的 class name
     */
    bodyClassName?: string;
    /**
     * footer 部分的 class name
     */
    footerClassName?: string;
}
