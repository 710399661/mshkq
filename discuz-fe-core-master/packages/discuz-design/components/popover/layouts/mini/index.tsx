import React from 'react';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import { PopoverProps } from '../../interface';
import { useConfig } from '../../../../extends/configContext';

export const MiniLayout = ({ ...props }) => {
  const { clsPrefix } = useConfig();

  return <View>Popover 暂不支持mini端</View>;
};
