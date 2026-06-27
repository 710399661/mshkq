import { StyledProps } from 'utils/_type/StyledProps';
import { IconProps } from '../icon/interface';

/**
 * 基本的按钮属性
 */
export interface AlertProps extends StyledProps {
  /**
   * 是否展示状态
   * @default true
   */
  visible?: boolean;

  /**
   * 通知类型
   * @default "info"
   */
  type?: 'info' | 'success' | 'warning' | 'error';

  /**
   * 隐藏默认图标
   * @default false
   */
  hideIcon?: boolean;

  /**
   * 自定义提示图标
   */
  icon?: string | IconProps;

  /**
   * Alert 是否可关闭
   * @default "false"
   */
  closeable?: boolean;

  /**
   * 自动关闭延时（单位毫秒), 0 为不自动关闭
   * @default 0
   */
  duration?: number;

  /**
   * 关闭时触发的回调函数
   */
  onClose?: () => void;

  /**
   * 提示文字内容
   */
  children: React.ReactNode;
}
