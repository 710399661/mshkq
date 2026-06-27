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


    /**
     * popup 的挂载点，仅在 web 下生效，默认为 body
     */
    popupContainer?: any;


    /**
     * 是否显示关闭 icon
     */
    withCloseIcon?: boolean;

    /**
     * 是否显示底部 取消/确认 按钮
     */
    withFooter?: boolean;

    /**
     * 点击取消按钮的回调
     */
    onCancel?: () => void;

    /**
     * 点击确认按钮的回调
     */
    onSubmit?: () => void;
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

    /**
     * 自定义滚动
     **/
    customScroll?: boolean

    /**
     * 是否显示关闭 icon
     */
    withCloseIcon?: boolean;

    /**
     * 是否显示底部 取消/确认 按钮
     */
     withFooter?: boolean;

     /**
      * 点击取消按钮的回调
      */
     onCancel?: () => void;

     /**
      * 点击确认按钮的回调
      */
     onSubmit?: () => void;
  }

