import React from 'react';
import { View } from '@tarojs/components';
import Alert from '../../index';

export default function AlertExample() {
  return (
    <View className="page">
      <View className="header">Alert 提示条</View>
      <View className="header">1. 基本用法</View>
      <Alert type="success">成功提示的文案</Alert>
      <Alert type="warning">警告提示的文案</Alert>
      <Alert type="info">消息提示的文案</Alert>
      <Alert type="error">错误提示的文案</Alert>

      <View className="header">2. 不带图标</View>
      <Alert type="success" hideIcon>成功提示的文案</Alert>
      <Alert type="warning" hideIcon>警告提示的文案</Alert>
      <Alert type="info" hideIcon>消息提示的文案</Alert>
      <Alert type="error" hideIcon>错误提示的文案</Alert>

      <View className="header">3. 可关闭</View>
      <Alert
        type="success"
        closeable
        onClose={() => {
          console.log('close');
        }}
      >
        这个是可关闭的提示条
      </Alert>

      <View className="header">4. 自动关闭</View>
      <Alert type="success" duration={3000}>
      成功提示的文案
      </Alert>
    </View>
  );
}
