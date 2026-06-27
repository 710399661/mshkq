import React, { useState } from 'react';
import { Button, Animation } from '@discuzq/design';

export default function AnimationExample() {
  const [action, setAction] = useState(true);

  return (
    <div>
      <Animation
        name="bounce"
        action={action}
        duration="2s"
        easing="ease-in-out"
        onEnd={() => {
          console.log('退出');
        }}
      >
        <img width='200' height='200' src="https://main.qcloudimg.com/raw/9c701525249863334dbd86397b49a11d.jpg" alt="图片" />
      </Animation>
      <Button type='primary' style={{ margin: '10px 0' }} onClick={() => setAction(!action)}>
        bounce
      </Button>
    </div>
  );
}
