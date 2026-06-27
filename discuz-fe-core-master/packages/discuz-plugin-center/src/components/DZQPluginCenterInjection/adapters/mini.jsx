import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { View, Text } from "@tarojs/components";
import DZQPluginCenter from "../../../index";
import isFunction from '../../../is-function';

@inject("site")
@inject("user")
@inject("plugin")
@observer
export default class MiniDZQPluginCenterInjection extends Component {
  constructor(props) {
    super(props);
  }

  checkProps() {
    const { target, hookName } = this.props;
    if (!target || !hookName) {
      console.error("插件缺少target或hookName");
      return false;
    }
    return true;
  }

  renderPluginArray(target, hookName) {
    const {
      site,
      user,
      plugin,
      pluginProps,
      className = "",
      style = {},
      condition = null,
    } = this.props;

    return DZQPluginCenter.injection(target, hookName).map(
      ({ render, pluginInfo }) => {
        const { path = "", pluginName } = pluginInfo;
        const classn = isFunction(className) ? className(pluginInfo) : className;

        if (!condition || condition(pluginInfo)) {
          return (
            <View key={`${pluginName}:${path}`} className={classn} style={style}>
              {render({
                ...pluginProps,
                site,
                pluginComponent: plugin.pluginComponent,
                pluginStore: plugin.pluginStore[pluginInfo.pluginName] || null,
                pluginAction: {
                  set: plugin.setPluginStore.bind(plugin),
                  get: plugin.getPluginStore.bind(plugin),
                  registerLifecycle: (fnName, fn) => {
                    plugin.registerLifecycle.bind(plugin)(
                      pluginName,
                      `${fnName}:${path}`,
                      fn
                    );
                  },
                },
                userInfo: user.userInfo,
                isLogin: user.isLogin.bind(user),
                pluginInfo,
              })}
            </View>
          );
        }
      }
    );
  }

  renderPluginObject(target, hookName, pluginName) {
    const {
      site,
      user,
      plugin,
      pluginProps,
      className = "",
      style = {},
      condition = null,
    } = this.props;
    const targetPluginComponent = DZQPluginCenter.injection(
      target,
      hookName,
      pluginName
    );
    
    if (targetPluginComponent) {
      const { render, pluginInfo } = targetPluginComponent;
      const { pluginName: name, path = "" } = pluginInfo;
      const classn = isFunction(className) ? className(pluginInfo) : className;

      return (
        <View key={`${name}:${path}`} className={classn}>
          {render({
            ...pluginProps,
            site,
            pluginComponent: plugin.pluginComponent,
            pluginStore: plugin.pluginStore[pluginName] || null,
            pluginAction: {
              set: plugin.setPluginStore.bind(plugin),
              get: plugin.getPluginStore.bind(plugin),
              registerLifecycle: (fnName, fn) => {
                plugin.registerLifecycle.bind(plugin)(
                  name,
                  `${fnName}:${path}`,
                  fn
                );
              },
            },
            userInfo: user.userInfo,
            isLogin: user.isLogin.bind(user),
            pluginInfo,
          })}
        </View>
      );
    }
    return null;
  }

  render() {
    const { target, hookName, pluginName = null, plugin } = this.props;

    if (pluginName) {
      return this.renderPluginObject(
        target,
        hookName,
        pluginName,
        plugin.pluginStore
      );
    } else {
      return this.renderPluginArray(target, hookName, plugin.pluginStore);
    }
  }
}
