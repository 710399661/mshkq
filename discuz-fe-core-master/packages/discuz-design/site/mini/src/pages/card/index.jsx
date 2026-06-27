import React from 'react';
import { View } from '@tarojs/components';
import Base from '../../../../../components/card/__examples__/mini/base';
import Custom from '../../../../../components/card/__examples__/mini/custom';
import Border from '../../../../../components/card/__examples__/mini/border';
import Image from '../../../../../components/card/__examples__/mini/image';

function Title(props) {
  return <View style={{margin: '20px 0', fontSize:'32px'}}>{props.children}</View>;
}

function Preview() {
  return (
    <View style={{ padding: '20px' }}>
      <Title>基本用法</Title>
      <Base></Base>

      <Title>自定义头尾</Title>
      <Custom></Custom>

      <Title>带边框</Title>
      <Border></Border>

      <Title>图片展示</Title>
      <Image></Image>
    </View>
  );
}

export default Preview;
