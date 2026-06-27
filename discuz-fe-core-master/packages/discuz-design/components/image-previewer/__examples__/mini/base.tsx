import ImagePreviewer from '../../index';
import React, { useEffect } from 'react';
import { Button } from '@tarojs/components';

export default function Base() {
  const [visible, setVisible] = React.useState(false);
  const [defaultImg, setDefaultImg] = React.useState('https://fengyuanchen.github.io/viewerjs/images/thumbnails/tibet-6.jpg');

  const ImagePreviewerRef = React.useRef(null);

  useEffect(() => {
    console.log(ImagePreviewerRef.current);
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          ImagePreviewerRef.current.show();
        }}
      >
        打开/关闭
      </Button>
      <Button
        onClick={() => {
          setDefaultImg('');
        }}
      >
        取消设置默认图像
      </Button>
      <Button
        onClick={() => {
          setDefaultImg('https://fengyuanchen.github.io/viewerjs/images/thumbnails/tibet-6.jpg');
        }}
      >
        设置第二幅默认图像
      </Button>
      <ImagePreviewer
        ref={ImagePreviewerRef}
        imgUrls={[
          'https://fengyuanchen.github.io/viewerjs/images/thumbnails/tibet-5.jpg',
          'https://fengyuanchen.github.io/viewerjs/images/thumbnails/tibet-6.jpg',
        ]}
        currentUrl={defaultImg}
      />
    </>
  );
}
