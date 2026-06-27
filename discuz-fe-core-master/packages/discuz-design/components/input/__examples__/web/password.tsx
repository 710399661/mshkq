import { Input } from '@discuzq/design';
import React, { useState } from 'react';

export default function Example1() {
  const [value, setValue] = useState('');

  return (
    <>
      <Input value={value} mode="password" placeholder="密码输入" onChange={e => setValue(e.target.value)} />
    </>
  );
}
