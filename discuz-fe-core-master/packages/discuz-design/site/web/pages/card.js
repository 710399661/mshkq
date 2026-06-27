import React from 'react';
import Base from '../../../components/card/__examples__/web/base';
import Custom from '../../../components/card/__examples__/web/custom';
import Border from '../../../components/card/__examples__/web/border';
import Image from '../../../components/card/__examples__/web/image';

function Title(props) {
  return <h1>{props.children}</h1>;
}

function Preview() {
  return (
    <div style={{ width: '500px' }}>
      <Title>基本用法</Title>
      <Base></Base>

      <Title>自定义头尾</Title>
      <Custom></Custom>

      <Title>带边框</Title>
      <Border></Border>

      <Title>图片展示</Title>
      <Image></Image>
    </div>
  );
}

export default Preview;
