import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { View, Button } from "@tarojs/components";
import Inner from "../../../../../components/icon/__examples__/mini/inner";
import ImgSrc from "../../../../../components/icon/__examples__/mini/imgSrc";
import DefaultSize from "../../../../../components/icon/__examples__/mini/defaultSize";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <View>
          <Inner />
        </View>
        <View>
          <ImgSrc />
        </View>
        <View>
          <DefaultSize />
        </View>
      </View>
    );
  }
}
