import React from 'react';
import { Video } from '@discuzq/design';

export default function BaseVideo() {
  return (
    <div>
      <Video
        src="https://mat1.gtimg.com/bbs/qqnewslite/20191024/mp4/pandastar-v.mp4"
        poster="https://main.qcloudimg.com/raw/9c701525249863334dbd86397b49a11d.jpg"
        width={400}
        height={400}
      />
    </div>
  );
}
