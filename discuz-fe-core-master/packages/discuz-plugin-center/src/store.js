export default class PluginStore {
    store = {}
    webStore = {} // web端所有的插件
    setPluginComponent = () => { };
    initStore(setPluginComponent) {
        if ( setPluginComponent ) {
            this.setPluginComponent = setPluginComponent;
        }
    }

    setStore(plugin, isRefresh) {
        const {
            pluginName,
            target,
            hookName,
            path
        } = plugin;
        // 页面钩子特殊处理
        const currPluginName = hookName === 'add_page_hook' && path ? `${pluginName}:${path}` : pluginName;
        if ( Object.prototype.toString.call(target) === '[object String]' ) {
            if ( !this.store[target] ) {
                this.createTargetObject(target);
            }

            if ( !this.store[target][hookName] ) {
                this.createHookObject(target, hookName);
            }

            // 对比版本
            if ( this.store[target][hookName][currPluginName] ) {
                const old = this.store[target][hookName][currPluginName].plugin;
                const resultPlugin = this.compareVersion(old, plugin);
                this.store[target][hookName][currPluginName] = this.createPluginInfo(resultPlugin);
            } else {
                this.store[target][hookName][currPluginName] = this.createPluginInfo(plugin);

            }
        // 数组
        } else {
            for (let i = 0; i < target.length; i++) {
                if ( !this.store[target[i]] ) {
                    this.createTargetObject(target[i]);
                }

                if ( !this.store[target[i]][hookName] ) {
                    this.createHookObject(target[i], hookName)
                }

                // 对比版本
                if ( this.store[target[i]][hookName][currPluginName] ) {
                    const old = this.store[target[i]][hookName][currPluginName].plugin;
                    const resultPlugin = this.compareVersion(old, plugin);
                    this.store[target[i]][hookName][currPluginName] = this.createPluginInfo(resultPlugin);
                } else {
                    this.store[target[i]][hookName][currPluginName] = this.createPluginInfo(plugin);
                }
            }
        }

        const res = {
            map: this.store,
            pluginName: pluginName // 用于动态创建插件的store命名空间
        }
        // 如果是基于平台重新校验插件，将不主动触发更新，将会一次过更新
        if ( !isRefresh ) {
            this.setPluginComponent(pluginName, this.store);
        }

        return res;

        
    }

    getStore(target, hookName, pluginName = null) {
        if (pluginName) {
            // 如果是页面
            return this.store[target] && this.store[target][hookName] ? this.store[target][hookName][pluginName] : null;
        }

        let list = [];
        if ( this.store[target] && this.store[target][hookName] ) {
            for ( let key in this.store[target][hookName]  ) {
                list.push({
                    ...this.store[target][hookName][key]
                });
            }
        }
        return list;
    }

    removeStore(plugin) {
        const {
            pluginName,
            target,
            hookName,
            path
        } = plugin;

        // 页面钩子特殊处理
        const currPluginName = hookName === 'add_page_hook' && path ? `${pluginName}:${path}` : pluginName;

        if (this.store[target] && this.store[target][hookName] && this.store[target][hookName][currPluginName]) {
            delete this.store[target][hookName][currPluginName]
        }

        if (this.isEmptyObject(this.store[target][hookName])) {
            delete this.store[target][hookName]
        }

        if (this.isEmptyObject(this.store[target])) {
            delete this.store[target]
        }
    }

    // 创建插件记录
    createPluginInfo(plugin) {
        const {
            pluginName,
            version,
            target,
            hookName,
            component,
            platform,
            path,
            author,
            type,
            app_id,
            options = {}
        } = plugin;
        return {
            version,
            pluginName: pluginName,
            target: target,
            hookName: hookName,
            plugin: plugin,
            Component: component,
            author,
            type,
            app_id,
            platform,
            path,
            options
        };
    }

    // 创建命名空间
    createTargetObject(target) {
        this.store[target] = {}
    }

     // 创建命名空间
     createHookObject(target, hookName) {
        this.store[target][hookName] = {}
    }


    // 对比版本，只取最新版本
    compareVersion(oldPlugin, currPlugin) {
        const { version: oldVersion } = oldPlugin;
        const { version: currVersion } = currPlugin;
        const oldVersionNum = oldVersion.split('.').join('');
        const currVersionNum = currVersion.split('.').join('');
        return oldVersionNum > currVersionNum ? oldPlugin : currPlugin;
    }

    isEmptyObject(s) {
        // eslint-disable-next-line no-restricted-syntax
        for (const name in s) {
            return false;
        }
        return true;
    }
}