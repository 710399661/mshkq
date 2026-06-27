import React from "react";
import PluginCompoent from "../components/PluginComponent";
import dispatchEvent from "../dispatchEvent";
import checkProps from "../checkProps";

export default function plugin_index2recommend_replace_hook(pluginData) {
  return {
    render: (props) => {
      // 只会提供属于插件自身的数据
      // 必须严格控制可传入到插件的数据

      const { renderData, pluginStore, pluginAction, site, userInfo, isLogin, onGetRecommends } = props;

      if (!checkProps(props)) {
        console.warn(`${pluginData.pluginName} -> 缺失插件必须提供参数！`);
        return null;
      }

      return (
        <PluginCompoent
          renderData={renderData}
          pluginStore={pluginStore}
          pluginAction={pluginAction}
          siteData={site}
          userInfo={userInfo}
          isLogin={isLogin}
          _pluginInfo={{ ...pluginData }}
          onGetRecommends={onGetRecommends}
        />
      );
    },
    pluginInfo: { ...pluginData },
  };
}
