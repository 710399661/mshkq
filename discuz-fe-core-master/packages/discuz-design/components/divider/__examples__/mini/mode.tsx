import Divider from '../../index';
import React from 'react';
import { Text } from '@tarojs/components';

export default function Base() {
  return (
    <>
      <Text>选项1</Text>
      <Divider mode='vertical' dashed={true}></Divider>
      <Text>选项2</Text>
      <Divider mode='vertical'>123</Divider>
      <Text>选项3</Text>
    </>
  );
}
