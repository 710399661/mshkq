import Divider from '../../index';
import React from 'react';
import { View } from '@tarojs/components';

export default function Base() {
  return (
    <>
      <View>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</View>
      <Divider dashed={true}>虚线</Divider>
      <View>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</View>
    </>
  );
}
