import React from 'react';
import { StyledProps } from 'utils/_type/StyledProps';

export interface MenuProps extends StyledProps {
  /**
   * 子菜单
   */
  children?: React.ReactNode;
}
