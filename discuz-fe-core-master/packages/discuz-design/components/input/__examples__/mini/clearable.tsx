import Input from '../../index';
import React, { useState } from 'react';

export default function Example1() {
  const [value, setValue] = useState('');

  return (
    <>
      <Input value={value} placeholder="可清除" clearable={true} onChange={e => setValue(e.target.value)} />
    </>
  );
}
