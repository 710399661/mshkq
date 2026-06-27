import React from 'react';
import { View } from '@tarojs/components'

import Base from '../../../../../components/back-to-top/__examples__/mini/base';

function Title(props) {
  const style = {
    margin: '20px 0',
    fontSize: '32px',
  };
  return <View style={style}>{props.children}</View>;
}

function Preview() {
  return (
    <View>
      <Title>基础用法</Title>
      <Base></Base>
    </View>
  );
}

export default Preview;
