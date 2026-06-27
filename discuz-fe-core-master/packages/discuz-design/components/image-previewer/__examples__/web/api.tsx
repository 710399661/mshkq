import React, { useEffect } from 'react';
import { Button, ImagePreviewer } from '@discuzq/design';

const urls2 = [
  'https://www.hualigs.cn/image/60f68a503f5a8.jpg',
  'https://p9.itc.cn/q_70/images03/20210521/706d2eaf5f614d349c7cbdd6fcf8ab40.jpeg',
  'https://fengyuanchen.github.io/viewerjs/images/thumbnails/tibet-5.jpg',
  'https://fengyuanchen.github.io/viewerjs/images/thumbnails/tibet-6.jpg',
  'https://main.qcloudimg.com/raw/9c701525249863334dbd86397b49a11d.jpg',
];

export default function Base() {
  const [currentUrl, setCurrentUrl] = React.useState('');


  const ImagePreviewerRef2 = React.useRef(null);

  return (
    <>
      <ImagePreviewer
        ref={ImagePreviewerRef2}
        imgUrls={urls2}
        onClose={() => {
          console.log('close');
          ImagePreviewerRef2.current.hide();
        }}
        current={currentUrl}
      />

      <Button
        type='primary'
        onClick={() => {
          ImagePreviewerRef2.current.show();
        }}
      >
        打开相册
      </Button>
      {
        urls2.map((item, index) => (
          <Button
            key={index}
            type='primary'
            onClick={() => {
              ImagePreviewerRef2.current.show();
              setCurrentUrl(item);
            }}
          >
            打开第{index + 1}张图片
          </Button>
        ))
      }
    </>
  );
}
