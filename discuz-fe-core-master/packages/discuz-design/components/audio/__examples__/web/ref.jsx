import React, { useState } from 'react';
import { Audio, Toast, Button } from '@discuzq/design';
import { audioUrl1 } from './constant';

export default function FlexExample() {
  const [src, setSrc] = useState(audioUrl1);
  const audioRef = React.useRef();

  // 获取当前播放时间
  const getCurrentTime = () => {
    // @ts-ignore
    const audioState = audioRef.current.getState();
    Toast.info({
      content: `当前播放${audioState.currentTime}秒`,
    });
  };

  return (
    <div>
      <Audio src={src} ref={audioRef} />
      <Button style={{ margin: '10px 0' }} type='primary' onClick={getCurrentTime}>点击获取当前音频播放时间</Button>
    </div>
  );
}
