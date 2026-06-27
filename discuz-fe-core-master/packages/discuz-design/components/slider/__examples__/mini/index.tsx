import React from 'react';
import { View, Text } from '@tarojs/components';
import Slider from '../../index';

export default function SliderExample() {
  return (
    <View className="page">
      <Text>Slider 滑块</Text>

      <View>
        <Text>基本用法</Text>
        <Slider />
      </View>

      <View>
        <Text>禁用状态</Text>
        <Slider defaultValue={30} disabled />
      </View>

      <View>
        <Text>不展示描述内容</Text>
        <Slider defaultValue={50} formatter={() => null} />
      </View>

      <View>
        <Text>自定义描述内容</Text>
        <Slider defaultValue={40} formatter={value => `${value} 台`} />
      </View>

      <View>
        <Text>自定义取值范围</Text>
        <Slider defaultValue={40} max={50} min={10} />
      </View>

      <View>
        <Text>自定义步长</Text>
        <Slider step={10} />
      </View>
    </View>
  );
}
