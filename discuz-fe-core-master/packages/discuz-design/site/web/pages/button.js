import React from 'react';

import Base from '../../../components/button/__examples__/web/base';
import Disbaled from '../../../components/button/__examples__/web/disabled';
import HtmlType from '../../../components/button/__examples__/web/htmlType';
import Loading from '../../../components/button/__examples__/web/loading';
import Size from '../../../components/button/__examples__/web/size';
import Icon from '../../../components/button/__examples__/web/icon';
import Circle from '../../../components/button/__examples__/web/circle';
import Full from '../../../components/button/__examples__/web/full';
import '../../../components/button/__examples__/web/index.scss';

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
      <Disbaled></Disbaled>

      <Title>不同尺寸</Title>
      <Size></Size>

      <Title>图标按钮</Title>
      <Icon></Icon>

      <Title>圆形按钮</Title>
      <Circle></Circle>

      <Title>加载中</Title>
      <Loading></Loading>

      <Title>htmlType</Title>
      <HtmlType></HtmlType>

      <Title>占满一行</Title>
      <Full></Full>
    </View>
  );
}

export default Preview;
