import React from 'react';
import { StyledProps } from 'utils/_type/StyledProps';

/**
 * 分割线属性
 */
export interface DividerProps extends StyledProps {
  /**
   * 文字内容,只支持horizontal模式
   */
  children?: React.ReactNode;

  /**
   * 水平还是垂直
   * @default 'horizontal'
   */
  mode?: 'horizontal' | 'vertical';

  /**
   * 分割线标题的位置
   * @default 'center'
   */
  orientation?: 'left' | 'right' | 'center';

  /**
   * 是否虚线
   * @default false
   */
  dashed?: boolean;
}
