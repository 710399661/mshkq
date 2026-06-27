import React from 'react';
import { View, Text } from '@tarojs/components';
import Tag from '../../index';

export default function TagExample() {
  const onClose = () => {
    console.log('点击关闭');
  };

  const onClick = () => {
    console.log('点击');
  };

  return (
    <View className="page">
      <Text className="header">Tag 标签</Text>
      <View className="section">
        <Tag>标签</Tag>
        <Tag type="primary">标签</Tag>
        <Tag type="success">标签</Tag>
        <Tag type="warning">标签</Tag>
        <Tag type="orange">标签</Tag>
        <Tag type="danger" closeable size="md" onClose={onClose} onClick={onClick}>
          标签
        </Tag>
      </View>
    </View>
  );
}
