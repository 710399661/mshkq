import { View } from '@tarojs/components';
import React from 'react';

export const MiniLayout = function ({ onClick = () => {} }) {
  return <View onClick={onClick}>mini</View>;
};
