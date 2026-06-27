import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Radio from '../../index';

export default function RadioExample() {
  const [item, setItem] = useState(null);

  return (
    <View className="page">
      <Text className="header">Radio 单选框</Text>

      <View className="section">
        <View className="header">基本用法</View>
        <Radio defaultChecked>勾选</Radio>
      </View>

      <View className="section">
        <View className="header">单选框组</View>
        <Radio.Group defaultValue='3'>
          <Radio name="1">选项1</Radio>
          <Radio name="2">选项2</Radio>
          <Radio name="3" disabled>
            选项3
          </Radio>
          <Radio name="4" disabled>
            选项4
          </Radio>
        </Radio.Group>
      </View>

      <View className="section">
        <View className="header">受控用法</View>
        <Radio.Group block value={item} onChange={item => setItem(item)}>
          <Radio name="1">选项1</Radio>
          <Radio name="2">选项2</Radio>
          <Radio name="3">选项3</Radio>
        </Radio.Group>
      </View>

      <View className="section">
        <View className="header">按钮模式</View>
        <Radio.Group block defaultValue="2" type="button">
          <Radio name="1">选项1</Radio>
          <Radio name="2">选项2</Radio>
          <Radio name="3">选项3</Radio>
          <Radio name="4">选项4</Radio>
          <Radio name="5">较长的选项5</Radio>
          <Radio name="6">更长一点的选项6</Radio>
        </Radio.Group>
      </View>

      <View className="section">
        <View className="header">按钮模式</View>
        <Radio.Group block defaultValue='2' type="item">
          <Radio name="1" defaultChecked disabled>选项1</Radio>
          <Radio name="2" disabled>选项2</Radio>
          <Radio name="3">选项3</Radio>
          <Radio name="4">选项4</Radio>
          <Radio name="5">较长的选项5</Radio>
          <Radio name="6">更长一点的选项6</Radio>
        </Radio.Group>
      </View>
    </View>
  );
}
