import React, { useState } from 'react';
import { Audio, Button } from '@discuzq/design';
import { audioUrl1 } from './constant';

export default function FlexExample() {
  const [src, setSrc] = useState(audioUrl1);
  const [singleton, setSingleton] = useState(true);
  const onClick = () => {
    setSingleton(!singleton);
  };

  return (
    <div>
      <Audio src={src} singleton={singleton} />
      <Audio src={src} singleton={singleton} />
      <Button style={{ margin: '10px 0' }} type='primary' onClick={onClick}>{singleton ? '点击切换多例播放' : '点击切换单例播放'}</Button>
    </div>
  );
}
