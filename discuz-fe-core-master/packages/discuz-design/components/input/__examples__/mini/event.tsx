import Input from '../../index';
import React, { useState } from 'react';
import { View } from '@tarojs/components';

export default function Example1() {
  const [value, setValue] = useState('');

  return (
    <>
      <View>通过 onChange、onFocus、onBlur、onEnter 来监听事件</View>
      <Input
        value={value}
        placeholder="事件监听"
        onChange={e => setValue(e.target.value)}
        onEnter={e => console.log('回车事件', e)}
        onFocus={e => console.log('聚焦事件', e)}
        onBlur={e => console.log('失去焦点事件', e)}
      />
    </>
  );
}
