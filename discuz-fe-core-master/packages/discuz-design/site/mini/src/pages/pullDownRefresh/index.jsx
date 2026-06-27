import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import PullDownRefresh from "../../../../../components/pull-down-refresh/__examples__/mini/index";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return <PullDownRefresh></PullDownRefresh>;
  }
}
