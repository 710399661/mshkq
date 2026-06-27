import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Switch from '../../index';

export default function SwitchExample() {
  const [checked, onChange] = useState(false);

  return (
    <View className="page">
      <Text className="header">Switch 开关</Text>

      <View>
        基础用法
        <Switch defaultChecked onChange={console.log} />
      </View>

      <View>
        受控用法
        <Switch checked={checked} onChange={onChange} />
      </View>

      <View>
        禁用状态
        <Switch disabled />
      </View>

      <View>
        自定义大小
        <Switch defaultChecked size={18} />
      </View>

      <View>
        自定义大小
        <Switch defaultChecked size={36} />
      </View>

      <View>
        自定义颜色
        <Switch defaultChecked color="#07C160" />
      </View>
    </View>
  );
}
