import { StyledProps } from 'utils/_type/StyledProps';
import React from 'react';

/**
 * Card 组件支持的属性
 */
export interface CardProps extends StyledProps {
  /**
   * 卡片主体内容
   */
  children?: React.ReactNode;

  /**
   * 卡片头部
   */
  header?: React.ReactNode;

  /**
   * 卡片底部
   */
  footer?: React.ReactNode;

  /**
   * 卡片头部是否铺满，即padding=0
   * @default false
   */
  fullHeader?: boolean;

  /**
   * 卡片内容是否铺满，即padding=0
   * @default false
   */
  fullBody?: boolean;

  /**
   * 卡片底部是否铺满，即padding=0
   * @default false
   */
  fullFooter?: boolean;

  /**
   * 是否显示为带边框样式
   * @default false
   */
  bordered?: boolean;
  /**
   * header自定义类名
   */
  headerClassName?: string;

  /**
   * header自定义样式
   */
  headerStyle?: React.CSSProperties;
  /**
   * body自定义类名
   */
  bodyClassName?: string;

  /**
   * body自定义样式
   */
  bodyStyle?: React.CSSProperties;
  /**
   * footer自定义类名
   */
  footerClassName?: string;

  /**
   * footer自定义样式
   */
  footerStyle?: React.CSSProperties;
}
