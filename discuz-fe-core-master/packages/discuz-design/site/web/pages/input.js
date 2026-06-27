import React from 'react';

import Base from '../../../components/input/__examples__/web/base';
import Icon from '../../../components/input/__examples__/web/icon';
import Limit from '../../../components/input/__examples__/web/limit';
import Disabled from '../../../components/input/__examples__/web/disabled';
import Clearable from '../../../components/input/__examples__/web/clearable';
import Event from '../../../components/input/__examples__/web/event';
// import Mode from '../../../components/input/__examples__/web/mode';

function View(props) {
  return <div>{props.children}</div>;
}

function Title(props) {
  return <h1>{props.children}</h1>;
}

function Preview() {
  return (
    <View>
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


      {/* <Title>常见情景模式</Title>
      <Mode></Mode> */}
    </View>
  );
}

export default Preview;
