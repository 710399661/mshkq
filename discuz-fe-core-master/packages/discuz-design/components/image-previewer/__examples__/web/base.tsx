import { ImagePreviewer } from '@discuzq/design';
import React, { useEffect } from 'react';

const urls1 = [
  'https://fengyuanchen.github.io/viewerjs/images/thumbnails/tibet-5.jpg',
  'https://fengyuanchen.github.io/viewerjs/images/thumbnails/tibet-6.jpg',
];

export default function Base() {
  const [visible, setVisible] = React.useState(false);
  const [currentUrl, setCurrentUrl] = React.useState('');

  return (
    <>
      <ImagePreviewer
        visible={visible}
        onClose={() => {
          console.log('close');
          setVisible(false);
        }}
        imgUrls={urls1}
        current={currentUrl}
      />

      {
        urls1.map((url, index) => (
        <img
          key={index}
          onClick={() => {
            setCurrentUrl(url);
            setVisible(true);
          }}
          src={url}
          width='100'
          height='100'
          style={{ marginRight: 10, cursor: 'pointer' }}
        />
        ))
      }
    </>
  );
}
