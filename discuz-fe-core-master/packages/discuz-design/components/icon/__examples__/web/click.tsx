import { Icon } from '@discuzq/design';
import React from 'react';

export default function ImgSrc() {
  const onClick = () => {
    alert('图标被点击了');
  };
  return (
    <>
      <Icon name="PlayOutlined" style={{ cursor: 'pointer' }} onClick={onClick} size={30} />
    </>
  );
}
