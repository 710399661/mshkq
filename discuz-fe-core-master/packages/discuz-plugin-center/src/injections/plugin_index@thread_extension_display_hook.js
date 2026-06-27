import React from 'react';
import PluginCompoent from '../components/PluginComponent';
import dispatchEvent from '../dispatchEvent';
import checkProps from '../checkProps';

export default function plugin_index2thread_extension_display_hook(pluginData) {
    return {
        render: (props) => {
            // 只会提供属于插件自身的数据
            // 必须严格控制可传入到插件的数据

            if ( !checkProps(props) ) {
                console.warn(`${pluginData.pluginName} -> 缺失插件必须提供参数！`);
                return null;
            }

            const { renderData, pluginStore, pluginAction, site, threadData, updateListThreadIndexes, recomputeRowHeights, updateThread, userInfo, isLogin } = props;
            let _renderData = null;
            if ( renderData && renderData[pluginData.pluginName] ) {
                _renderData = renderData[pluginData.pluginName];
            }
            return <PluginCompoent
                renderData={_renderData}
                siteData={site}
                pluginStore={pluginStore}
                pluginAction={pluginAction}
                threadData={threadData || null}
                updateThread={updateThread}
                updateListThreadIndexes={updateListThreadIndexes}
                recomputeRowHeights={recomputeRowHeights}
                userInfo={userInfo}
                isLogin={isLogin}
                _pluginInfo={{...pluginData}}
            />
        },
        pluginInfo: {...pluginData}
    }
}