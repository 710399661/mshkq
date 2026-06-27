import Input from '../../index';
import React, { useState } from 'react';

export default function Example1() {
  const [value, setValue] = useState('');

  return (
    <>
      <Input
        value={value}
        trim
        placeholder="基础输入框"
        focus={true}
        onChange={(e) => {
          console.log(e);
          setValue(e.target.value);
        }}
      />
    </>
  );
}
