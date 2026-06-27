import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { View, Button } from "@tarojs/components";
import HtmlTemplate from "../../../../../components/rich-text/__examples__/mini/htmlTemplate";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <HtmlTemplate />
      </View>
    );
  }
}
