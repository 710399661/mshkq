import React from 'react';
import { View } from '@tarojs/components';
import Spin from '../../index';

export default function SpinExample() {
  return (
    <View className="page">
      <View className="header">Spin 加载中</View>
      <View>1. 基本用法</View>
      <View><Spin color="#006eff">加载中 ...</Spin></View>
      <View><Spin type="spinner" color="#006eff">加载中 ...</Spin></View>
      <View>2. 没有文字</View>
      <View><Spin color="#006eff"></Spin></View>
      <View><Spin type="spinner" color="#006eff"></Spin></View>
      <View>3. 文字垂直</View>
      <View><Spin color="#006eff" vertical>加载中 ...</Spin></View>
      <View><Spin type="spinner" color="#006eff" vertical>加载中 ...</Spin></View>
    </View>
  );
}
