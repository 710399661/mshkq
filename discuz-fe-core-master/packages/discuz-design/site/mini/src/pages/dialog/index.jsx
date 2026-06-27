import React from 'react';
import { View } from '@tarojs/components'
import { DialogProvider } from "../../../../../components/dialog/dialogProvider";
import Base from '../../../../../components/dialog/__examples__/mini/base';
import Api from '../../../../../components/dialog/__examples__/mini/api';

function Title(props) {
  const style = {
    margin: '20px 0',
    fontSize: '32px',
  };
  return <View style={style}>{props.children}</View>;
}

function Preview() {
  return (
    <DialogProvider>
      <Title>基础用法</Title>
      <Base></Base>
      <Title>Api</Title>
      <Api></Api>
    </DialogProvider>
  );
}

export default Preview;
