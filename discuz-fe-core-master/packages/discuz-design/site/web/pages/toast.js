import React from 'react';
import Base from '../../../components/toast/__examples__/web/base';
import Position from '../../../components/toast/__examples__/web/position';
import Mask from '../../../components/toast/__examples__/web/mask';
import Duration from '../../../components/toast/__examples__/web/duration';

function View(props) {
  return <div>{props.children}</div>;
}

function Title(props) {
  return <h1>{props.children}</h1>;
}


function Preview() {
  return (
    <View>
      <Title>基本用法</Title>
      <Base />
      
      <Title>位置</Title>
      <Position />

      <Title>遮罩层</Title>
      <Mask />

      <Title>延时关闭</Title>
      <Duration />
    </View>
  );
}

export default Preview;
