import React from 'react';
import { StyledProps } from 'utils/_type/StyledProps';

/**
 * SubMenu 支持的属性
 */
export interface SubMenuProps extends StyledProps {
  /**
   * 自定义标题
   */
  title?: React.ReactNode;

  /**
   * 唯一标志
   */
  index?: string;

  /**
   * 点击了菜单的回调
   * @param {index} string 菜单的index
   * @param {isOpen} boolean 是否展开
   * @param currentActiveItemIndexSet 当前已选中的index Set集合
   */
  onClick?: (index: string, isOpen: boolean, currentActiveSubMenuIndexSet: any) => void;
}
