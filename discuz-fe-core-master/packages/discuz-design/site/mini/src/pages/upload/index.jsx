import React, { Component } from "react";
import { ToastProvider } from "../../../../../components/toast/ToastProvider";
import { View } from "@tarojs/components";
import Base from '../../../../../components/upload/__examples__/mini/base';
import Card from '../../../../../components/upload/__examples__/mini/card';
import Limit from '../../../../../components/upload/__examples__/mini/limit';
import Custom from '../../../../../components/upload/__examples__/mini/custom';

function Title(props) {
  const style = {
    margin: '20px 0',
    fontSize: '32px',
  };
  return <View style={style}>{props.children}</View>;
}


export default class Index extends Component {
  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <ToastProvider style={{ width: '100%', maxWidth: '500px' }}>
        <Title>基本用法</Title>
        <Base></Base>

        <Title>卡片模式</Title>
        <Card></Card>

        <Title>限制数量</Title>
        <Limit></Limit>

        <Title>自定义上传</Title>
        <Custom></Custom>
      </ToastProvider>
    );
  }
}
