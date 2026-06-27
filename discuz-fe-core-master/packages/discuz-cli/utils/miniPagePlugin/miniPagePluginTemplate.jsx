/* eslint-disable spaced-comment */
/* eslint-disable new-cap */
import React from 'react';
import Page from '@components/page';
import { View } from '@tarojs/components';
import { inject, observer } from 'mobx-react';
import DZQPluginCenterInjection from '@discuzq/plugin-center/dist/components/DZQPluginCenterInjection';

// 插件插槽埋入
/**DZQ->plugin->register<plugin_system@add_page_hook@<@pluginName@>:<@path@>>**/

// 代理所有的页面方法
@inject('site')
@inject('user')
@inject('plugin')
@observer
class PagePlugin extends React.Component {
  constructor(props) {
    super(props);
  }

  getTargetPlugin = () => (
    <DZQPluginCenterInjection
      target="plugin_system"
      hookName="add_page_hook"
      pluginName="<@pluginName@>:<@path@>"
    />
  );

  renderTargetPlugin = () => {
    const targetPlugins = this.getTargetPlugin();
    return targetPlugins;
  };

  onLoad = (options)  => {
    if (this.props.plugin.pluginStore['<@pluginName@>']['onLoad:<@path@>']) {
      this.props.plugin.pluginStore['<@pluginName@>']['onLoad:<@path@>'](options);
    }
  }

  onReady = () => {
    if (this.props.plugin.pluginStore['<@pluginName@>']['onReady:<@path@>']) {
      this.props.plugin.pluginStore['<@pluginName@>']['onReady:<@path@>']();
    }
  }


  componentDidShow = () => {
    if (this.props.plugin.pluginStore['<@pluginName@>']['componentDidShow:<@path@>']) {
      this.props.plugin.pluginStore['<@pluginName@>']['componentDidShow:<@path@>']();
    }
  }

  componentDidHide = () => {
    if (this.props.plugin.pluginStore['<@pluginName@>']['componentDidHide:<@path@>']) {
      this.props.plugin.pluginStore['<@pluginName@>']['componentDidHide:<@path@>']();
    }
  }

  onReachBottom = () => {
    // 如果注册了触底事件，那么触发触底事件
    if (this.props.plugin.pluginStore['<@pluginName@>']['onReachBottom:<@path@>']) {
      this.props.plugin.pluginStore['<@pluginName@>']['onReachBottom:<@path@>']();
    }
  };

  onPullDownRefresh = () => {
    if (this.props.plugin.pluginStore['<@pluginName@>']['onPullDownRefresh:<@path@>']) {
      this.props.plugin.pluginStore['<@pluginName@>']['onPullDownRefresh:<@path@>']();
    }
  }

  onPageScroll = (scrollPosition) => {
    // 如果注册了触底事件，那么触发触底事件
    if (this.props.plugin.pluginStore['<@pluginName@>']['onPageScroll:<@path@>']) {
      this.props.plugin.pluginStore['<@pluginName@>']['onPageScroll:<@path@>'](scrollPosition);
    }
  };

  onAddToFavorites = (favoriteObj) => {
    if (this.props.plugin.pluginStore['<@pluginName@>']['onAddToFavorites:<@path@>']) {
      return this.props.plugin.pluginStore['<@pluginName@>']['onAddToFavorites:<@path@>'](favoriteObj);
    }
    return null;
  };

  onShareAppMessage = (shareObj) => {
    if (this.props.plugin.pluginStore['<@pluginName@>']['onShareAppMessage:<@path@>']) {
      return this.props.plugin.pluginStore['<@pluginName@>']['onShareAppMessage:<@path@>'](shareObj);
    }
    return null;
  };

  onShareTimeline = (shareObj) => {
    if (this.props.plugin.pluginStore['<@pluginName@>']['onShareTimeline:<@path@>']) {
      return this.props.plugin.pluginStore['<@pluginName@>']['onShareTimeline:<@path@>'](shareObj);
    }
    return null;
  };

  onResize = (resizeObj) => {
    if (this.props.plugin.pluginStore['<@pluginName@>']['onResize:<@path@>']) {
      return this.props.plugin.pluginStore['<@pluginName@>']['onResize:<@path@>'](resizeObj);
    }
    return null;
  };

  onTabItemTap = (tabItemTapObj) => {
    if (this.props.plugin.pluginStore['<@pluginName@>']['onTabItemTap:<@path@>']) {
      return this.props.plugin.pluginStore['<@pluginName@>']['onTabItemTap:<@path@>'](tabItemTapObj);
    }
    return null;
  };

  render() {
    return <Page>{this.renderTargetPlugin()}</Page>;
  }
}

export default PagePlugin;
