import Divider from '../../index';
import React from 'react';
import { View } from '@tarojs/components';

export default function Base() {
  return (
    <>
      <Divider orientation="left">居左</Divider>
      <View>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</View>
      <Divider>居中</Divider>
      <View>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</View>
      <Divider orientation="right">居右</Divider>
    </>
  );
}
