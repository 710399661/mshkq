import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { View, Button } from "@tarojs/components";
import AudioRecord from "../../../../../components/audio-record/__examples__/mini/index";

export default class Index extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <AudioRecord></AudioRecord>
    );
  }
}
