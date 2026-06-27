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
      <Progress type="circle" percent={percent}>
        <div>
          <span>自定义视图</span>
          <div>描述</div>
        </div>
      </Progress>
    </>
  );
}
