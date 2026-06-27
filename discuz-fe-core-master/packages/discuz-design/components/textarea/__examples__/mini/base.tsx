import Input from '../../../input';
import React, { useState, useEffect } from 'react';

export default function Example1() {
  const [value, setValue] = useState('');

  const ref = React.createRef();
  useEffect(() => {
    console.log(ref.current);
  }, []);

  return (
    <>
      <Input.Textarea
        placeholderStyle="color:red;"
        autoFocus={true}
        forwardedRef={ref}
        value={value}
        placeholder="基础输入框"
        rows={2}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}
