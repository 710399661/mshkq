import React, { useState, useRef } from 'react';
import { Alert, Button } from '@discuzq/design';

export default function AlertExample() {
  const [duration, setDuration] = useState(0);
  const [count, setCount] = useState(3);
  const timer = useRef(null);
  const countRef = useRef(count);

  const onClick = () => {
    setDuration(3000);
    timer.current = setInterval(() => {
      if (countRef.current === 0) {
        reset();
        return;
      }
      countRef.current -= 1;
      setCount(countRef.current);
    }, 1000);
  };

  const reset = () => {
    setDuration(0);
    setCount(3);
    countRef.current = 3;
    clearInterval(timer.current);
  };

  console.log(count);
  return (
    <div className="page">
      <Alert type="success" duration={duration}>
        {count ? `${duration !== 0 ? '' : '点击后，'}等待${count}s自动关闭` : '已关闭'}
      </Alert>
      <br />
      <Button type='primary' disabled={duration !== 0} onClick={onClick}>点击后自动关闭</Button>
      <br />
    </div>
  );
}
