import { Input } from '@discuzq/design';
import React, { useState } from 'react';

export default function Example1() {
  const [value, setValue] = useState('');

  return (
    <>
      <Input trim={true} focus={true} value={value} placeholder="请输入内容" onChange={e => setValue(e.target.value)} />
    </>
  );
}
