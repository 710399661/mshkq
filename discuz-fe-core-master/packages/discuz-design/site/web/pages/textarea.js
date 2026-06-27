import React from 'react';

import Base from '../../../components/textarea/__examples__/web/base';
import Limit from '../../../components/textarea/__examples__/web/limit';
import Disabled from '../../../components/textarea/__examples__/web/disabled';
import Event from '../../../components/textarea/__examples__/web/event';

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
