import Input from '../../index';
import React, { useState } from 'react';
import { View } from '@tarojs/components';

export default function Example1() {
  const [value, setValue] = useState('');

  return (
    <>
      <View>通过 maxLength 和 showLimit 属性来限制输入字数</View>
      <Input
        value={value}
        maxLength={10}
        showLimit={true}
        placeholder="限制字数"
        onChange={e => setValue(e.target.value)}
      />
    </>
  );
}
