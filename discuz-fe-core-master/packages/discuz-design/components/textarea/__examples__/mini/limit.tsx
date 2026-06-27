import Input from '../../../input';
import React, { useState } from 'react';

export default function Example1() {
  const [value, setValue] = useState('');

  return (
    <>
      <p>通过 maxLength 和 showLimit 属性来限制输入字数</p>
      <Input.Textarea
        value={value}
        maxLength={100}
        rows={2}
        showLimit={true}
        placeholder="限制字数"
        onChange={e => setValue(e.target.value)}
      />
    </>
  );
}
