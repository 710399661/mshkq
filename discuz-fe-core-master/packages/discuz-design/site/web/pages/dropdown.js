import React from 'react';

import Base from '../../../components/dropdown/__examples__/web/base';
import Placement from '../../../components/dropdown/__examples__/web/placement';
import Event from '../../../components/dropdown/__examples__/web/event';

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

      <Title>弹出位置</Title>
      <Placement></Placement>

      <Title>事件监听</Title>
      <Event></Event>
    </View>
  );
}

export default Preview;
