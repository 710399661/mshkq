const store = {};
let n = 1;
module.exports = class PluginStore {

    setStore(plugin) {
        const {
            pluginName,
            target,
            hookName,
            path
        } = plugin;

        if (hookName === 'add_page_hook' && !path ) {
            console.error(`${pluginName}:缺失path属性`);
            return;
        }

        // 页面钩子特殊处理
        const currPluginName = hookName === 'add_page_hook' && path ? `${pluginName}:${path}` : pluginName;

        if ( Object.prototype.toString.call(target) === '[object String]' ) {
            if ( !store[target] ) {
                this.createTargetObject(target);
            }

            if ( !store[target][hookName] ) {
                this.createHookObject(target, hookName);
            }

            // 对比版本
            if ( store[target][hookName][currPluginName] ) {
                const old = store[target][hookName][currPluginName].plugin;
                const resultPlugin = this.compareVersion(old, plugin);
                store[target][hookName][currPluginName] = this.createPluginInfo(resultPlugin);
            } else {
                store[target][hookName][currPluginName] = this.createPluginInfo(plugin);

            }
        // 数组
        } else {
            for (let i = 0; i < target.length; i++) {
                if ( !store[target[i]] ) {
                    this.createTargetObject(target[i]);
                }

                if ( !store[target[i]][hookName] ) {
                    this.createHookObject(target[i], hookName)
                }

                // 对比版本
                if ( store[target[i]][hookName][currPluginName] ) {
                    const old = store[target[i]][hookName][currPluginName].plugin;
                    const resultPlugin = this.compareVersion(old, plugin);
                    store[target[i]][hookName][currPluginName] = this.createPluginInfo(resultPlugin);
                } else {
                    store[target[i]][hookName][currPluginName] = this.createPluginInfo(plugin);
                }
            }
        }
    }

    getAll() {
        return store;
    }

    getStore(target, hookName) {
        let list = [];
        if ( store[target] && store[target][hookName] ) {
            for ( let key in store[target][hookName]  ) {

                // 如果是替换型的hook，将基于_n简易权重值得出结果
                if ( this.isReplaceHook(hookName) ) {
                    if (list.length === 0) {
                        list[0] = {...store[target][hookName][key]};
                    } else {
                        list[0] = list[0]._n > store[target][hookName][key]._n ? list[0]._n : {...store[target][hookName][key]._n};
                    }
                } else {
                    list.push({
                        ...store[target][hookName][key]
                    });
                }
            }
        }
        return list;
    }

    // 是否替换型hook
    isReplaceHook(hookName) {
        const reg = /.*replace_hook/;
        return reg.test(hookName);
    }

    // 创建插件记录
    createPluginInfo(plugin) {
        const {
            pluginName,
            componentName,
            version,
            target,
            hookName,
            platform,
            filePath,
            miniPageConfig,
            _private,
            _cwd,
            _originalConfig,
            author,
            type,
            appid,
            path // 页面类型插件的注册地址
        } = plugin;
        return {
            version,
            pluginName: pluginName,
            componentName: componentName,
            target: target,
            hookName: hookName,
            plugin: plugin,
            platform,
            filePath,
            miniPageConfig,
            _private,
            _cwd,
            _originalConfig,
            author,
            type,
            appid,
            _n: n++,
            path
        };
    }

    // 创建命名空间
    createTargetObject(target) {
        store[target] = {}
    }

     // 创建命名空间
    createHookObject(target, hookName) {
        store[target][hookName] = {}
    }


    // 对比版本，只取最新版本
    compareVersion(oldPlugin, currPlugin) {
        const { version: oldVersion } = oldPlugin;
        const { version: currVersion } = currPlugin;
        const oldVersionNum = oldVersion.split('.').join('');
        const currVersionNum = currVersion.split('.').join('');
        return oldVersionNum > currVersionNum ? oldPlugin : currPlugin;
    }
}
