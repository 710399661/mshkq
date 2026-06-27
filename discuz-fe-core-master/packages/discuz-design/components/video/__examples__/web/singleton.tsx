import React from 'react';
import { Video } from '@discuzq/design';

export default function BaseVideo() {
  return (
    <div>
      <Video
        src="https://mat1.gtimg.com/bbs/qqnewslite/20191024/mp4/pandastar-v.mp4"
        width={400}
        height={400}
      />
      <p style={{ margin: '10px 0' }}>通过 @discuzq/design/dist/components/video 引用 Video 组件，使用 src 属性设置视频的资源地址</p>
    </div>
  );
}
