import React, { useState } from 'react';
import { View } from '@tarojs/components';
import Audio from '../../index';

export default function FlexExample() {
  const [src, setSrc] = useState('https://discuz-service-test-1258344699.cos.ap-guangzhou.myqcloud.com/public/attachments/2021/08/18/cb1b3f8b5123fbb8fe5fee2e7da3468b61430286小音乐的副本小音乐的副本小音乐的副本小音乐的副本.mp3?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDCJAnwjKjthEk6HBm6fwzhCLFRRBlsBxG%26q-sign-time%3D1629381180%3B1629467640%26q-key-time%3D1629381180%3B1629467640%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D8a379d290f77708cb5fe9a6a0333f9d9a7f530f8&');
  const audioRef = React.useRef();

  const onClick = () => {
    setSrc('https://discuz-service-test-1258344699.cos.ap-guangzhou.myqcloud.com/public/attachments/2021/08/18/cb1b3f8b5123fbb8fe5fee2e7da3468b61430286小音乐的副本小音乐的副本小音乐的副本小音乐的副本.mp3?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDCJAnwjKjthEk6HBm6fwzhCLFRRBlsBxG%26q-sign-time%3D1629381180%3B1629467640%26q-key-time%3D1629381180%3B1629467640%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D8a379d290f77708cb5fe9a6a0333f9d9a7f530f8&');
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

  return (
    <View>
      <View onClick={onClick}>点击切换音频</View>
      <Audio ref={audioRef} src={src} onPlay={onPlay} onDelete={() => {
        console.log(1111);
      }} />
      <View onClick={getCurrentTime}>点击获取当前音频播放时间</View>
    </View>
  );
}
