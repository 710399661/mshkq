import { Input } from '@discuzq/design';
import React, { useState } from 'react';

export default function Example1() {
  const [value, setValue] = useState('');

  return (
    <>
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
