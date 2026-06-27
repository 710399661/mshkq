import React from "react";
import { View } from "@tarojs/components";
import { ToastProvider } from "../../../../../components/toast/ToastProvider";

import Base from '../../../../../components/toast/__examples__/mini/base';
import Position from '../../../../../components/toast/__examples__/mini/position';
import Mask from '../../../../../components/toast/__examples__/mini/mask';
import Duration from '../../../../../components/toast/__examples__/mini/duration';

function Title(props) {
  const style = {
    margin: '20px 0',
    fontSize: '32px',
  };
  return <View style={style}>{props.children}</View>;
}


function Preview() {
  return (
    <ToastProvider>
      <Title>基本用法</Title>
      <Base />
      
      <Title>位置</Title>
      <Position />

      <Title>遮罩层</Title>
      <Mask />

      <Title>延时关闭</Title>
      <Duration />
    </ToastProvider>
  );
}

export default Preview;

