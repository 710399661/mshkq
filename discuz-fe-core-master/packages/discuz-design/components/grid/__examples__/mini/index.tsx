import React from 'react';
import { View, Text } from '@tarojs/components';
import Grid from '../../index';

export default function GridExample() {
  const data = [
    {
      icon: '//imgcache.qq.com/open_proj/proj_qcloud_v2/tc-x/tea-ui/assets/image-s.svg',
      title: '标题文字',
      description: '描述文字',
    },
    {
      icon: '//imgcache.qq.com/open_proj/proj_qcloud_v2/tc-x/tea-ui/assets/image-s.svg',
      title: '标题文字',
      description: '描述文字',
    },
    {
      icon: { name: 'success', color: 'pink' },
      title: '标题文字',
      description: '描述文字',
    },
  ];
  return (
    <View className="page">
      <Text className="header">Grid 宫格</Text>

      <Text className="header">基本用法</Text>
      <Grid data={data} onClick={console.log} />

      <Text className="header">指定每列宫格元素数量</Text>
      <Grid
        data={[
          ...data,
          {
            icon: { name: 'success', color: '#ff9c19' },
            title: '标题文字',
            description: '描述文字',
          },
        ]}
        columnNum={4}
        onClick={console.log}
      />

      <Text className="header">正方形宫格</Text>
      <Grid data={data} square onClick={console.log} />

      <Text className="header">指定宫格元素间距</Text>
      <Grid data={data} gutter={10} onClick={console.log} />

      <Text className="header">不显示边框</Text>
      <Grid data={data} bordered={false} onClick={console.log} />
    </View>
  );
}
