import React, { Component } from "react";
import DZQPluginCenter from "../../../index";
import isFunction from '../../../is-function';

export default class DZQPluginCenterInjection extends Component {
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

  renderPlugin(target, hookName) {
    const {
      site,
      user,
      plugin,
      pluginProps,
      className = "",
      style = {},
      condition = null,
      loading = null
    } = this.props;
    const targetPlugin = DZQPluginCenter.replaceInjection(target, hookName);

    if (targetPlugin) {
      const { render, pluginInfo } = targetPlugin;
      const { path = "", pluginName } = pluginInfo;
      const classn = isFunction(className) ? className(pluginInfo) : className;
      if (!condition || condition(pluginInfo)) {

        // 当插件加载中时，通过loading函数，控制渲染内容
        if ( isFunction(loading) && pluginInfo.Component === 'padding' ) {
          return loading(pluginInfo);
        }

        return (
          <div key={`${pluginName}:${path}`} className={classn} style={style}>
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
                    pluginName,
                    `${fnName}@${path}`,
                    fn
                  );
                },
              },
              userInfo: user.userInfo,
              isLogin: user.isLogin.bind(user),
              pluginInfo,
            })}
          </div>
        );
      }
      return null;
    }
    return null;
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
      loading = null
    } = this.props;
    const targetPluginComponent = DZQPluginCenter.injection(
      target,
      hookName,
      pluginName
    );

    if (targetPluginComponent) {
      const { render, pluginInfo } = targetPluginComponent;
      const { pluginName: name = "", path = "" } = pluginInfo;
      const classn = isFunction(className) ? className(pluginInfo) : className;

      // 当插件加载中时，通过loading函数，控制渲染内容
      if ( isFunction(loading) && pluginInfo.Component === 'padding' ) {
        return loading(pluginInfo);
      }

      return (
        <div key={`${name}:${path}`} className={classn} style={style}>
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
        </div>
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
      return this.renderPlugin(target, hookName, plugin.pluginStore);
    }
  }
}
