import React, { useState } from 'react';
import { Alert, Button } from '@discuzq/design';

export default function AlertExample() {
  const [cut, isCut] = useState(false);
  const onClick = () => {
    isCut(!cut);
  };
  return (
    <div className="page">
      {
        cut
          ? <Alert
              type="success"
              key={1}
              closeable
              onClose={() => {
                console.log('close');
              }}
            >
              这个是可关闭的提示条
            </Alert>
          : <Alert
              type="success"
              key={2}
              closeable
              onClose={() => {
                console.log('close');
              }}
            >
              这个是可关闭的提示条
            </Alert>
      }
      <br />
      <Button type='primary' onClick={onClick}>重置</Button>
    </div>
  );
}
