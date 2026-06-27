import React from 'react';
import Video from '../../index';
import { View } from '@tarojs/components';

export default function BaseVideo() {
  let player = null;

  const onReady = (ins) => {
    player = ins;
    console.log(player);
  };

  return (
    <View>
      <Video
        controls={true}
        onReady={onReady}
        onPlay={(e) => {
          console.log('play', e);
        }}
        onPause={(e) => {
          console.log('pause', e);
        }}
        onEnded={(e) => {
          console.log('ended', e);
        }}
        onTimeUpdate={(e) => {
          console.log('timeupdate', e);
          return 1;
        }}
        onFullscreenChange={(e) => {
          console.log('fullscreenchange', e);
        }}
        onProgress={(e) => {
          console.log('progress', e);
        }}
        onLoadedMetaData={(e) => {
          console.log('loadmetadata', e);
        }}
        onWaiting={(e) => {
          console.log('waiting', e);
        }}
        onError={(e) => {
          console.log('error', e);
        }}
        src="https://mat1.gtimg.com/bbs/qqnewslite/20191024/mp4/pandastar-v.mp4"
        initialTime={4}
        width={400}
        height={400}
      />
    </View>
  );
}
