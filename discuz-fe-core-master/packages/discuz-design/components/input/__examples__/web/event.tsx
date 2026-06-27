import { Input } from '@discuzq/design';
import React, { useState } from 'react';

export default function Example1() {
  const [value, setValue] = useState('');

  return (
    <>
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
