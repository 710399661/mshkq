import React from 'react';
import { View } from '@tarojs/components'

import Base from '../../../../../components/textarea/__examples__/mini/base';
import Limit from '../../../../../components/textarea/__examples__/mini/limit';
import Disabled from '../../../../../components/textarea/__examples__/mini/disabled';
import Event from '../../../../../components/textarea/__examples__/mini/event';

function Title(props) {
  const style = {
    margin: '20px 0',
    fontSize: '32px',
  };
  return <View style={style}>{props.children}</View>;
}

function Preview() {
  return (
    <View style={{padding: "30px"}}>
      <Title>基础用法</Title>
      <Base></Base>


      <Title>禁用状态</Title>
      <Disabled></Disabled>

      <Title>限制字数</Title>
      <Limit></Limit>

      <Title>事件监听</Title>
      <Event></Event>
    </View>
  );
}

export default Preview;
