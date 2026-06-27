import React from 'react';
import { View } from '@tarojs/components'

import Base from '../../../../../components/divider/__examples__/mini/base';
import Text from '../../../../../components/divider/__examples__/mini/text';
import Dashed from '../../../../../components/divider/__examples__/mini/dashed';
import Mode from '../../../../../components/divider/__examples__/mini/mode';

function Title(props) {
  const style = {
    margin: '20px 0',
    fontSize: '32px',
  };
  return <View style={style}>{props.children}</View>;
}

function Preview() {
  return (
    <View style={{padding:"0 16px"}}>
      <Title>基础用法</Title>
      <Base></Base>

      <Title>设置文案</Title>
      <Text></Text>

      <Title>虚线</Title>
      <Dashed></Dashed>

      <Title>垂直分割</Title>
      <Mode></Mode>
    </View>
  );
}

export default Preview;
