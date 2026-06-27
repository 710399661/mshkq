import React from 'react';
import { View } from '@tarojs/components'

import Base from '../../../../../components/input/__examples__/mini/base';
import Icon from '../../../../../components/input/__examples__/mini/icon';
import Limit from '../../../../../components/input/__examples__/mini/limit';
import Disabled from '../../../../../components/input/__examples__/mini/disabled';
import Clearable from '../../../../../components/input/__examples__/mini/clearable';
import Event from '../../../../../components/input/__examples__/mini/event';
import Mode from '../../../../../components/input/__examples__/mini/mode';

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

      <Title>自定义图标</Title>
      <Icon></Icon>

      <Title>禁用状态</Title>
      <Disabled></Disabled>

      <Title>限制字数</Title>
      <Limit></Limit>

      <Title>可清除</Title>
      <Clearable></Clearable>

      <Title>事件监听</Title>
      <Event></Event>


      <Title>常见情景模式</Title>
      <Mode></Mode>
    </View>
  );
}

export default Preview;
