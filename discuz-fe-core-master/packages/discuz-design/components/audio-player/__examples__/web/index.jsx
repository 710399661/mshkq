import React, { useState } from 'react';
import { AudioPlayer } from '@discuzq/design';

export default function FlexExample() {
  const [src, setSrc] = useState('../test.mp3');
  const audioRef = React.useRef();

  const onClick = () => {
    setSrc('https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/04/19/19d_dq/01.mp3');
  };

  const onPlay = () => {
    console.log('正在播放');
  };

  // 获取当前播放时间
  const getCurrentTime = () => {
    // @ts-ignore
    const audioState = audioRef.current.getState();
    console.log(audioState.currentTime);
  };

  // mock data
  const fileName = '短信授权委托书短信授权委托书（1）.mp3';
  const fileName2 = '短信授权委托书短信授权委托书（1）短信授权委托书短信授权委托书（1）短信授权委托书短信授权委托书（1）短信授权委托书短信授权委托书（1）短信授权委托书短信授权委托书（1）短信授权委托书短信授权委托书（1）.mp3';
  const fileSize = '12Kb';

  return (
    <div>
      <div onClick={onClick}>点击切换音频</div>
      <AudioPlayer
        fileName={fileName}
        fileSize={fileSize}
        src={src}
        onPlay={onPlay}
        onDelete={() => {console.log('删除');}}
        onLink={() => console.log('链接')}
        onDownload={() => console.log('下载')}
      />
      <br />
      <AudioPlayer
        fileName={fileName2}
        fileSize={fileSize}
        src={src}
        onPlay={onPlay}
        onDelete={() => {console.log('删除');}}
        onLink={() => console.log('链接')}
        onDownload={() => console.log('下载')}
      />
      <br />
      <AudioPlayer fileName={fileName} fileSize={fileSize} src={src} onPlay={onPlay} />
      <br />
      <div onClick={getCurrentTime}>点击获取当前音频播放时间</div>
    </div>
  );
}
