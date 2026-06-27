import React from 'react';
import { View } from '@tarojs/components'

import Base from '../../../../../components/button/__examples__/mini/base';
import Disbaled from '../../../../../components/button/__examples__/mini/disabled';
import OpenType from '../../../../../components/button/__examples__/mini/openType';
import Loading from '../../../../../components/button/__examples__/mini/loading';
import Size from '../../../../../components/button/__examples__/mini/size';
import Icon from '../../../../../components/button/__examples__/mini/icon';
import Circle from '../../../../../components/button/__examples__/mini/circle';
import Full from '../../../../../components/button/__examples__/mini/full';


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

      <Title>禁用状态</Title>
      <Disbaled></Disbaled>

      <Title>不同尺寸</Title>
      <Size></Size>

      <Title>加载中</Title>
      <Loading></Loading>

      <Title>图标按钮</Title>
      <Icon></Icon>

      <Title>圆形按钮</Title>
      <Circle></Circle>

      <Title>openType</Title>
      <OpenType></OpenType>

      <Title>占满一行</Title>
      <Full></Full>
    </View>
  );
}

export default Preview;
