import React from 'react';
import { StyledProps } from 'utils/_type/StyledProps';

/**
 * Progress 组件支持的属性
 */
// TODO theme属性，后期需要根据业务修改
export interface ProgressProps extends StyledProps {
  /**
   * 进度条类型
   *
   * @default "line"
   */
  type?: 'line' | 'circle';

  /**
   * 百分比，取值 \[0, 100\]
   *
   * @default 0
   */
  percent?: number;

  /**
   * 描述内容
   *
   * **环形进度条中默认展示当前进度百分比**
   *
   * @docType React.ReactNode | ((percent: number) => React.ReactNode);
   */
  text?: React.ReactNode | ((percent: number) => React.ReactNode);

  /**
   * 进度条下提示内容
   *
   * 仅在 `type = "circle"` 时有效
   */
  tips?: React.ReactNode;

  /**
   * 进度条样式
   *
   * **默认将在 `percent` 小于 100 时使用 `default`，等于 100 时使用 `success`**
   */
  theme?: 'default' | 'success' | 'danger';

  /**
   * 环形进度条半径
   * @default 160
   * 仅在 `type = "circle"` 时有效
   */
  width?: number;

  /**
   * 环形进度条线宽
   * @default 2
   * 仅在 `type = "circle"` 时有效
   */
  lineWidth?: number;

  /**
   * 是否展示text文案
   * @default true
   * 仅在 `type = "circle"` 时有效
   */
  isShowText?: boolean;

  /**
   * 自定义视图
   * 仅在 `type = "circle"` 时有效
   */
  children?: React.ReactNode;

  color?: string;
  /**
   * 线条末端线帽的样式
   * @default butt
   * 仅在 `type = "circle"` 时有效
   */
  lineCap?: 'butt' | 'round' | 'square'
}
