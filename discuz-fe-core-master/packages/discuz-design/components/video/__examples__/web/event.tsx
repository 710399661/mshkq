import React, { useState, useRef } from 'react';
import { Video, Button } from '@discuzq/design';

export default function BaseVideo() {
  const [message, setMessage] = useState([]);
  const [isNormal, setIsNormal] = useState(true);

  const messageRef = useRef([]).current;

  const onReady = () => {
    messageRef.push('开始');
    setMessage([...messageRef]);
  };
  const onPlay = () => {
    messageRef.push('开始|继续播放');
    setMessage([...messageRef]);
  };
  const onPause = () => {
    messageRef.push('暂停播放');
    setMessage([...messageRef]);
  };
  const onEnded = () => {
    messageRef.push('播放结束');
    setMessage([...messageRef]);
  };
  const onTimeUpdate = () => {
    if (messageRef[messageRef.length - 1] === '播放中...') {
      return;
    }
    messageRef.push('播放中...');
    setMessage([...messageRef]);
  };
  const onFullscreenChange = () => {
    messageRef.push('视频进入|退出全屏');
    setMessage([...messageRef]);
  };
  const onProgress = (data) => {
    console.log('加载中', data);
    messageRef.push('缓存中...');
    setMessage([...messageRef]);
  };
  const onLoadedMetaData = () => {
    messageRef.push('视频加载完成');
    setMessage([...messageRef]);
  };
  const onWaiting = () => {
    messageRef.push('开始缓存');
    setMessage([...messageRef]);
  };
  const onClear = () => {
    messageRef.length = 0;
    setMessage([]);
  };
  return (
    <div>
      <Video
        src="https://mat1.gtimg.com/bbs/qqnewslite/20191024/mp4/pandastar-v.mp4"
        width={400}
        height={400}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        onFullscreenChange={onFullscreenChange}
        onProgress={onProgress}
        onLoadedMetaData={onLoadedMetaData}
        onWaiting={onWaiting}
      />

      <div style={{ margin: '10px 0' }}>
        {
          message.map((item, index) => <p key={index}>{item}</p>)
        }
      </div>
      <p style={{ margin: '10px 0' }}>
        <Button type='primary' onClick={onClear}>清除信息</Button>
      </p>
    </div>
  );
}
