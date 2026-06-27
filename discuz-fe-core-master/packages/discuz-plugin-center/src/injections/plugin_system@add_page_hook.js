import React from 'react';
import PluginPageComponent from '../components/PluginPageComponent';
import dispatchEvent from '../dispatchEvent';
import checkProps from '../checkProps';

export default function plugin_system2add_page_hook(pluginData) {
    return {
        render: (props) => {
            // 只会提供属于插件自身的数据
            // 必须严格控制可传入到插件的数据

            const { pluginStore, pluginAction, site, userInfo, isLogin } = props;

            if ( !checkProps(props) ) {
                console.warn(`${pluginData.pluginName} -> 缺失插件必须提供参数！`);
                return null;
            }

            
            return <PluginPageComponent
                pluginStore={pluginStore}
                pluginAction={pluginAction}
                siteData={site}
                userInfo={userInfo}
                isLogin={isLogin}
                _pluginInfo={{...pluginData}}
            />
        },
        pluginInfo: {...pluginData}
    }
}