import React, { useState } from 'react';
import { Audio, Toast, Button } from '@discuzq/design';
import { audioUrl1 } from './constant';

const errorUrl = 'https://demo.dj63.com//2016/串烧舞曲/20150101/佛山DJ宅神[磁性_男声_女声]歌曲连版串烧[专辑1].mp3';
export default function FlexExample() {
  const [src, setSrc] = useState(audioUrl1);
  const [isError, serIsError] = useState(false);
  const onClick = () => {
    setSrc(isError ? audioUrl1 : errorUrl);
    serIsError(!isError);
  };

  const onError = () => {
    Toast.error({
      content: '播放失败',
    });
  };

  return (
    <div>
      <Audio
        src={src}
        onError={onError}
      />
      <Button style={{ margin: '10px 0' }} type='primary' onClick={onClick}>点击切换{isError ? '正确' : '错误'}音频</Button>
    </div>
  );
}
