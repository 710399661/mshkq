import React, { useState } from 'react';
import { View, Button } from '@tarojs/components';
import Animation from '../../index';

export default function AnimationExample() {
  const [action, setAction] = useState(true);

  return (
    <View>
      <Animation
        name="bounce"
        action={action}
        duration="2s"
        easing="ease-in-out"
        onEnd={() => {
          console.log('退出');
        }}
      >
        放大缩小
      </Animation>
      <Button style={{ marginTop: '20px' }} onClick={() => setAction(!action)}>
        {action ? '放大再还原' : '放大再缩小'}
      </Button>
    </View>
  );
}
