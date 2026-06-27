import React, { useState, useEffect } from 'react';
import { Progress } from '@discuzq/design';

export default function ProgressExample() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setPercent(percent => (percent % 100) + 10),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Progress percent={percent} text={`运行中${percent} %`} />
      <Progress percent={60} theme="danger" text="运行失败" />
      <Progress percent={90} theme="success" text="运行成功" />
    </>
  );
}
