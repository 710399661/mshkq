import React from 'react';
import PluginCompoent from '../components/PluginComponent';
import dispatchEvent from '../dispatchEvent';
import checkProps from '../checkProps';

export default function plugin_post2post_extension_entry_hook(pluginData) {
    return {
        render: (props) => {
            // 只会提供属于插件自身的数据
            // 必须严格控制可传入到插件的数据

            const { 
                renderData, 
                pluginStore,
                pluginAction,
                site, 
                postData,
                onConfirm = () => {},
                showPluginDialog = () => {},  
                closePluginDialog = () => {}
            } = props;

            if ( !checkProps(props) ) {
                console.warn(`${pluginData.pluginName} -> 缺失插件必须提供参数！`);
                return null;
            }
            
            let _renderData = null;
            if ( renderData && renderData[pluginData.pluginName] ) {
                _renderData = renderData[pluginData.pluginName];
            }
            return <PluginCompoent 
                pluginStore={pluginStore}
                pluginAction={pluginAction}
                onConfirm={dispatchEvent(pluginData, onConfirm)}
                renderData={_renderData}
                siteData={site}
                postData={postData}
                showPluginDialog={dispatchEvent(pluginData, showPluginDialog)}
                closePluginDialog={dispatchEvent(pluginData, closePluginDialog)}
                _pluginInfo={{...pluginData}}
            />
        },
        pluginInfo: {...pluginData}
    }
}