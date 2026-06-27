import React from 'react';
import { View, Text } from '@tarojs/components';
import Table from '../../index';

export default function TagExample() {
  const records = [
    { name: 'Mario', stage: '22数', marriage: 0 },
    { name: 'Luigi', age: 38, stage: 'youth', marriage: 0 },
    { name: 'Koopa', age: 28, stage: 'youth', marriage: 1 },
    { name: 'Yoshi', age: 18, stage: 'youth', marriage: 0 },
    { name: 'Link', age: 8, stage: 'middle-aged', marriage: 2 },
    { name: 'Zelda', age: 58, stage: 'middle-aged', marriage: 1 },
    { name: 'Wario', age: 68, stage: 'elder', marriage: 3 },
    { name: 'Pikachu', age: 78, stage: 'elder', marriage: 4 },
  ];


  const columns1 = [
    {
      key: 'age',
      name: '年龄',
    },
    {
      key: 'name',
      name: '姓名',
    },
    {
      key: 'desc',
      name: '描述',
      render: () => 'Lorem ipsum',
    },
  ];

  const columns2 = [
    {
      key: 'age',
      name: '年龄',
      // width: '90',
    },
    { key: 'name', name: '姓名', width: '80' },
    {
      key: 'stage',
      name: '年龄段',
    },
    {
      key: 'stage',
      name: '性别',
      // width: '150',
    },
    {
      key: 'marriage',
      name: '婚姻状态',
      // width: '33.3%',
    },
    {
      key: 'desc',
      name: '描述',
      // width: 180,
      render: () => 'Lorem ipsum',
    },
  ];


  const columns3 = [
    { key: 'age', name: '年龄', width: '123' },
    { key: 'name', name: '姓名', width: '80', fixed: 'left' },
    {
      key: 'stage',
      name: '年龄段',
      width: '90',
    },
    {
      key: 'stage',
      name: '性别',
      width: '123',
      fixed: 'left',
    },
    {
      key: 'marriage',
      name: '婚姻状态',
      width: '223',
    },
    {
      key: 'desc',
      name: '描述',
      width: 180,
      render: () => 'Lorem ipsum',
    },
  ];

  return (
    <View className="page">
      <Text className="header">Table</Text>
      <View className="section">

        <View className="header" style={{ marginTop: 50 }}>基础使用 </View>
        <View >
          <Table columns={columns1} dataSource={records}></Table>
        </View>

        <View className="header" style={{ marginTop: 50 }}>固定表头 </View>
        <View >
          <Table columns={columns2} dataSource={records} maxScrollHeight={200}></Table>
        </View>

        <View className="header" style={{ marginTop: 50 }}>固定列 </View>
        <View >
          <Table columns={columns3} dataSource={records}></Table>
        </View>
      </View>
    </View>
  );
}
