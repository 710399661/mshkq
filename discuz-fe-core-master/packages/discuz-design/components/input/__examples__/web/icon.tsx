import { Input } from '@discuzq/design';
import React, { useState } from 'react';

export default function Example1() {
  const [value, setValue] = useState('');

  return (
    <>
      <Input
        value={value}
        icon="SearchOutlined"
        placeholder="自定义图标"
        onChange={e => setValue(e.target.value)}
        onIconClick={e => alert('点击了图标')}
      />
      <br />
      <Input
        value={value}
        prefixIcon="EditOutlined"
        placeholder="自定义图标"
        onChange={e => setValue(e.target.value)}
        onPrefixIconClick={e => alert('点击前置了图标')}
      />
    </>
  );
}
