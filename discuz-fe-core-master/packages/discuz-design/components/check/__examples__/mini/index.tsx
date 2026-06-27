import React from 'react';
import { View, Text } from '@tarojs/components';
import Check from '../../index';

export default function CheckExample() {
  return (
    <View className="page">
      <Text className="header">Check 选项按钮</Text>
      <View className="section">
        <Check>选项按钮</Check>
      </View>

      <View className="section">
        <Check disabled>禁用选项按钮</Check>
      </View>

      <View className="section">
        <Check defaultChecked disabled>禁用选项按钮</Check>
      </View>

      <View className="section">
        <Check radio>radio选项按钮</Check>
      </View>

      <View className="section">
        <Check type="item">选项按钮选项按钮选项按钮选项按钮</Check>
      </View>
    </View>
  );
}
