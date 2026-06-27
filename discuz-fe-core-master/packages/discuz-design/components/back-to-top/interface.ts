import { StyledProps } from 'utils/_type/StyledProps';

/**
 * BackToTop 组件支持的属性
 */
export interface BackToTopProps extends StyledProps {
  /**
   * 控制其显示位置, 距离页面右边距
   * @default 40
   */
  right?: number;
  /**
   * 控制其显示位置, 距离页面底部距离
   * @default 40
   */
  bottom?: number;
  /**
   * 点击按钮触发的事件
   */
  onClick?: () => any;
  /**
   * 滚动高度达到此参数值才出现
   * @default 400
   */
  visibilityHeight?: number;
}
