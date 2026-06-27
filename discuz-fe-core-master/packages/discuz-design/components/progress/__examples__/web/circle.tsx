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
      <Progress type="circle" lineWidth={20} lineCap='round' percent={percent} tips="正在上传应用，请稍等" />
    </>
  );
}
