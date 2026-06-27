import React, { useState } from 'react';
import { Audio, Toast, Button } from '@discuzq/design';
import { audioUrl1 } from './constant';

const errorUrl = 'https://mp3.9ku.com/hot/2004/07-17/41813.mp3';
export default function FlexExample() {
  const [src, setSrc] = useState(audioUrl1);
  const [isError, serIsError] = useState(false);

  const onClick = () => {
    setSrc(isError ? audioUrl1 : errorUrl);
    serIsError(!isError);
  };

  const onPlay = () => {
    Toast.info({ content: '正在播放' });
  };
  const beforePlay = () => {
    Toast.info({ content: '播放前' });
  };
  const onDelete = () => {
    Toast.info({ content: '点击删除' });
  };
  const onPause = () => {
    Toast.info({ content: '播放暂停' });
  };
  const onEnded = () => {
    Toast.info({ content: '播放结束' });
  };

  return (
    <div>
      <Audio
        src={src}
        onPlay={onPlay}
        beforePlay={beforePlay}
        onPause={onPause}
        onEnded={onEnded}
        onDelete={onDelete}
      />
      <Button style={{ margin: '10px 0' }} type='primary' onClick={onClick}>点击切换音频</Button>
    </div>
  );
}
