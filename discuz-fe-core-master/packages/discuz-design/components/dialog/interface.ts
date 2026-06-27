import { StyledProps } from 'utils/_type/StyledProps';
import { AttachNode } from '../../common/web-portal';

/**
 * 基本的按钮属性
 */
export interface DialogProps extends StyledProps {
  /**
   * 是否使用新的结构，这个属性是暂时的 @todo: 待去掉
   */
  isNew?: false,
  /**
   * 弹框类型
   */
  type?: 'info' | 'success' | 'error' | 'warning' | 'confirm';
  /**
   * 弹框标题
   */
  title?: React.ReactNode | string;
  /**
   * 指定挂载的节点，小程序没有，web有
   * 如：() => document.body || 'body'
   */
  attach?: AttachNode | string;
  content?: React.ReactNode | string;
  /**
   * 对话框宽度
   */
  width?: number | string;
  /**
   * 对话框层级
   */
  zIndex?: number;
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
  /**
   * 取消按钮事件
   */
  onCancel?: () => void | Promise<void>;
  /**
   * 确认按钮事件
   */
  onConfirm?: () => void | Promise<void>;
  /**
   * 取消按钮，默认：取消
   */
  cancelBtn?: React.ReactNode | string;
  /**
   * 确认按钮，默认：确认
   */
  confirmBtn?: React.ReactNode | string;
  /**
   * 确认按钮禁用态，默认 false
   */
  confirmDisabled?: boolean;
  /**
   * 确认按钮loading态，默认 false
   */
  confirmLoading?: boolean;
}
