import React, { useState } from 'react';
import { Video, Button } from '@discuzq/design';

export default function BaseVideo() {
  const [autoplay, setAutoplay] = useState(false);

  const onClick = () => {
    setAutoplay(!autoplay);
  };


  return (
    <div>
      {
        autoplay
          ? <Video
              src="https://mat1.gtimg.com/bbs/qqnewslite/20191024/mp4/pandastar-v.mp4"
              width={400}
              height={400}
              autoplay={autoplay}
              key={1}
            />
          : <Video
              src="https://mat1.gtimg.com/bbs/qqnewslite/20191024/mp4/pandastar-v.mp4"
              width={400}
              height={400}
              key={2}
            />
      }

      <Button type='primary' style={{ marginTop: 10 }} onClick={onClick}>切换{autoplay ? '点击' : '自动'}播放</Button>
    </div>
  );
}
