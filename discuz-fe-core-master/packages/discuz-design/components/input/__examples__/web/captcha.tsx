import { Input } from '@discuzq/design';
import React, { useState } from 'react';

function append() {
  const [showTimer, setShowTimer] = useState(false);
  let [second, setSecond] = useState(0);

  const onClick = () => {
    setShowTimer(true);
    setSecond((second = 60));
    setRest();
  };

  const setRest = () => {
    const interval = setInterval(() => {
      second = second - 1;
      if (second <= 0) {
        clearInterval(interval);
        setShowTimer(false);
        return;
      }
      setSecond(second);
    }, 1000);
  };

  return showTimer ? (
    <div style={{ textAlign: 'right', paddingRight: '6px' }}>
      {second}s后重试
    </div>
  ) : (
    <div
      style={{ textAlign: 'right', paddingRight: '6px', cursor: 'pointer', color: '#2469f6' }}
      onClick={onClick}
    >
      发送验证码
    </div>
  );
}

export default function Example1() {
  const [value, setValue] = useState('');

  return (
    <>
      <Input
        value={value}
        append={append()}
        appendWidth="86px"
        placeholder="验证码输入"
        onChange={e => setValue(e.target.value)}
      />
    </>
  );
}
