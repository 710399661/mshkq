import isServer from '../is-server';

export default function tj(data) {
    if ( process.env.DISCUZ_ENV === 'web' && process.env.NODE_ENV !== 'development' && !isServer() ) {

        const task = [];
        const base = {
            plugin_platform_mini: data.platform.indexOf('mini') !== -1 ? 1 : 0,
            plugin_platform_pc: data.platform.indexOf('pc') !== -1 ? 1 : 0,
            plugin_platform_h5: data.platform.indexOf('h5') !== -1 ? 1 : 0,
        }
        
        if ( Object.prototype.toString.call(data.target) === '[object Array]' ) {
            for ( let i = 0; i < data.target.length; i++ ) {
                task.push({
                    plugin_name_en: data.pluginName,
                    plugin_target: data.target[i],
                    plugin_hookName: data.hookName,
                    plugin_version: data.version,
                    plugin_app_id: data.appid,
                    plugin_type: data.type,
                    plugin_author_email: data.author.email,
                    plugin_author_name: data.author.name,
                    plugin_path: data.path || '',
                    page_url: window.location.pathname,
                    ...base
                });
            }
        } else {
            task.push({
                plugin_name_en: data.pluginName,
                plugin_target: data.target,
                plugin_hookName: data.hookName,
                plugin_version: data.version,
                plugin_app_id: data.appid,
                plugin_type: data.type,
                plugin_author_email: data.author.email,
                plugin_author_name: data.author.name,
                plugin_path: data.path || '',
                page_url: window.location.pathname,
                ...base
            });
        }

        if (window.beacon) {
            for ( let i = 0; i < task.length; i++ ) {
                window.beacon.onUserAction('plugin_register', {
                    ...task[i]
                });
            }
        } else {
            window.beaconTaskList = window.beaconTaskList ? [...window.beaconTaskList, ...task] : task;
        }
    }
}