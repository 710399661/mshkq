import React from 'react';
import Base from '../../../components/menu/__examples__/web/base';
import UniqueOpened from '../../../components/menu/__examples__/web/uniqueOpened';
import Mode from '../../../components/menu/__examples__/web/mode';
import Event from '../../../components/menu/__examples__/web/event';
import Multiple from '../../../components/menu/__examples__/web/multiple';
import DefaultOpeneds from '../../../components/menu/__examples__/web/defaultOptions';

function Title(props) {
  return <h1>{props.children}</h1>;
}

function Preview() {
  return (
    <div>
      <Title>基本用法</Title>
      <Base></Base>

      <Title>横向模式</Title>
      <Mode></Mode>

      <Title>手风琴模式</Title>
      <UniqueOpened></UniqueOpened>

      <Title>支持多选</Title>
      <Multiple></Multiple>

      <Title>默认展开选中</Title>
      <DefaultOpeneds></DefaultOpeneds>

      <Title>事件监听</Title>
      <Event></Event>
    </div>
  );
}

export default Preview;
