import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { View, Button } from "@tarojs/components";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onClick = (name) => {
    Taro.navigateTo({url: `/pages/scroll-view/${name}/index`})
  }

  render() {
    return (
      <View>
        <Button onClick={() => {this.onClick('normal-list')}}>基本使用</Button>
        <Button onClick={() => {this.onClick('render-bottom')}}>设置底部组件</Button>
        <Button onClick={() => {this.onClick('virtual-list')}}>使用虚拟列表</Button>
      </View>
    );
  }
}
