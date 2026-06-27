import React from 'react';
import ReactDOM from 'react-dom';
import PluginStore from './store';
import browser from './browser';
import injection from './injections';
import { PLUGIN_TARGET_LIST } from './const';
import isServer from './is-server';
import initTj from './tj/init';
import tj from './tj';

if (!isServer()) {
    window.React = React;
    window.ReactDOM = ReactDOM;
    initTj();
}

class DZQPluginCenterClass extends PluginStore {
    PLUGIN_TARGET_CONST = PLUGIN_TARGET_LIST;
    DEFAULT_PLATFORM = ['pc', 'h5', 'mini'];

    // 注册
    register(plugin) {
        const isPass = this.validationPlugin(plugin);
        if (!isPass) return null;
        tj(plugin);
        return this.setStore(plugin)
    }

    // 刷新注册，一般pc/h5平台切换时调用
    refreshRegister() {
        const pluginList = Object.values(this.webStore)
        if (pluginList && pluginList.length > 0) {
            const pluginNames = [] 
            pluginList.forEach(plugin => {
                const isPass = this.validationPlugin(plugin);
                if ( isPass ) {
                    const res = this.setStore(plugin, true);
                    pluginNames.push(res.pluginName);
                } else {
                    this.removeStore(plugin)
                }
                
            });
            this.setPluginComponent(pluginNames, this.store);
        }
            
    }

    // 注入插件
    injection(target, hookName, pluginName = null) {

        try {
            // 暂时只有页面插件在小程序中会置顶注入那个插件名，返回将变为对象，而非数组
            if (pluginName) {
                const targetPlugin = this.getStore(target, hookName, pluginName) || null;
                if ( targetPlugin ) {
                    const currInjection = injection(`${target}@${targetPlugin.hookName}`);
                    return currInjection(targetPlugin);
                }
                return null;
            } else {
                const pluginList = this.getStore(target, hookName) || [];
                const injectList = [];
                for ( let i = 0; i < pluginList.length; i++ ) {
                    const currInjection = injection(`${target}@${pluginList[i].hookName}`);
                    if (currInjection) {
                        injectList.push(currInjection(pluginList[i]))
                    }
                }
                return injectList
            }
        } catch(err) {
            console.log(err);
            return [];
        }
    }

    // 替换型注入插件
    replaceInjection(target, hookName, pluginName = null) {
        const res = this.injection(target, hookName, pluginName = null);
        if ( Array.isArray(res) ) {
            return res[0] || null;
        } else {
            return res;
        }
    }

    // 检查插件必要属性
    validationPlugin(plugin) {
        let isPass = true;
        const {
            pluginName = null, // 插件名称
            version = null, // 插件版本
            target = null, // 插件使用目标
            hookName = null, // 挂载钩子
            component = null, // 插件组件
            author,
            type,
            appid,
            platform = [] // 平台
        } = plugin;

        if ( !pluginName || pluginName == '' ) {
            console.warn(`插件名不合法，当前插件名：${pluginName}`);
            isPass = false;
        }
        if ( !version || version == '' || !(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/.test(version)) ) {
            console.warn(`${pluginName} -> 插件版本号不合法，当前插件版本：${version}`);
            isPass = false;
        }
        if ( !target ) {
            console.warn(`${pluginName} -> 插件target标识缺失`);
            isPass = false;
        } else {
            // 字符串
            if ( Object.prototype.toString.call(target) === '[object String]' && target !== '' && this.PLUGIN_TARGET_CONST.indexOf(target) !== -1 ) {
                isPass = true;
            // 数组
            } else if ( Array.isArray(target) && target.length !== 0 ) {

                for (let i = 0; i < target.length; i++) {
                    if ( this.PLUGIN_TARGET_CONST.indexOf(target[i]) === -1 ) {
                        isPass = false;
                        console.warn(`${pluginName} -> 插件目的标识不合法，当前插件目标标识：${target}`);
                        console.warn(`支持插件target标识如下：`);
                        console.warn(`${PLUGIN_TARGET_LIST.join(',')}`);
                        break;


                    }
                }
            } else {
                console.warn(`${pluginName} -> 插件目的标识不合法，当前插件目标标识：${target}`);
                console.warn(`支持插件target标识如下：`);
                console.warn(`${PLUGIN_TARGET_LIST.join(',')}`);
                isPass = false;
            }
        }
        if ( !hookName ) {
            console.warn(`${pluginName} -> 插件钩子名不合法，当前钩子名称：${hookName}`);
            isPass = false;
        }
        if ( hookName == '' ) {
            console.warn(`${pluginName} -> 插件钩子名不合法，当前钩子名称：${hookName}`);
            isPass = false;
        }
        if ( (!component || !React.isValidElement(component)) && component !== 'padding' ) {
            console.warn(`${pluginName} -> 插件组件不合法`);
            isPass = false;
        }
        if ( !author ) {
            console.warn(`${pluginName} -> 插件缺少作者说明`);
            isPass = false;
        }
        if ( !type ) {
            console.warn(`${pluginName} -> 插件缺少type类型`);
            isPass = false;
        }
        if ( !appid ) {
            console.warn(`${pluginName} -> 插件缺少appid`);
            isPass = false;
        }

        if ( !platform || platform.length === 0 ) {
            console.warn(`${pluginName} -> 平台必须至少指定一个，${this.DEFAULT_PLATFORM}`);
            isPass = false;
        } else if ( platform.indexOf('pc') === -1 && platform.indexOf('h5') === -1 && platform.indexOf('mini') === -1 ) {
            console.warn(`${pluginName} -> 平台必须包含以下选中中一个：${this.DEFAULT_PLATFORM}`);
            isPass = false;
        // 根据平台确定是否注册
        } else {
            const currEnv = process.env.DISCUZ_ENV === 'mini' ? 'mini' : browser.env('mobile') ? 'h5' : 'pc';

            // 如果是web端插件且满足其他条件
            if (isPass && (platform.indexOf('h5') !== -1 || platform.indexOf('pc') !== -1)) {
                this.webStore[pluginName] = plugin
            }

            if (platform.indexOf(currEnv) === -1) {
                console.info(`${pluginName} -> 当前平台不能注册此插件，当前插件可以用范围：${platform}`);
                isPass = false;
            }
        }

        return isPass;
    }
}

const DZQPluginCenter = new DZQPluginCenterClass();

export default DZQPluginCenter;