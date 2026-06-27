import React, { useState } from 'react';
import { AudioPlayer, Toast } from '@discuzq/design';

export default function FlexExample() {
  const onPlay = () => {
    Toast.success({
      content: '开始播放',
    });
  };
  const onPause = () => {
    Toast.success({
      content: '暂停播放',
    });
  };

  return (
    <div>
      <AudioPlayer
        src={'https://mp3.9ku.com/hot/2004/07-17/41813.mp3'}
        fileName="晴天"
        onPlay={onPlay}
        fileSize="1.8kb"
        onPause={onPause}
      />
    </div>
  );
}
