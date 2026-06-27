import { StyledProps } from 'utils/_type/StyledProps';

/**
 * 基本的按钮属性
 */
export interface SpinProps extends StyledProps {
   /**
   * 加载图标类型
   * @default "circular"
   */
  type?: 'circular' | 'spinner';

  /**
   * 加载图标颜色
   * @default "#8590a6"
   */
  color?: string;

  /**
   * 加载图标大小
   * @default "20px"
   */
  size?: number | string;

  /**
   * 文字内容
   */
  children?: React.ReactNode;

  /**
   * 是否垂直排列图标和文字内容
   * @default false
   */
  vertical?: boolean;
}
