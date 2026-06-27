import React, { useState } from 'react';
import { Input, Button } from '@discuzq/design';

export default function Example1() {
  const [value, setValue] = useState('');
  const [inputRef, setInputRef] = useState(null);

  return (
    <>
      <Input
        value={value}
        placeholder="请输入内容"
        useRef={(instance) => {
          setInputRef(instance);
        }}
        style={{ display: 'inline-block', marginRight: '20px' }}
        onChange={e => setValue(e.target.value)}
      />
      <Button
        onClick={() => {
          inputRef && inputRef.focus();
        }}
      >
        click focus
      </Button>
    </>
  );
}
