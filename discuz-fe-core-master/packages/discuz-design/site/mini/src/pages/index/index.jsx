import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import ComponentsList from "../../componentList.json";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        {Object.keys(ComponentsList.components).map((key) => {
          return (
            <Button
              onClick={() => {
                Taro.navigateTo({
                  url: `../${ComponentsList.components[key].url}/index`,
                });
              }}
            >
              {key}
            </Button>
          );
        })}
      </View>
    );
  }
}
