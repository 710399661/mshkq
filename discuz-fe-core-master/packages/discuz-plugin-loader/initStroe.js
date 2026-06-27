const PluginStore = require('./store');
const glob = require('glob');
const path = require('path');

module.exports = function initStore(assignPath, isGetAll) {
    const store = new PluginStore();

    if ( assignPath && assignPath !== '') {
      // 默认插件位置
      const assignPath_cwd = path.resolve(assignPath);
      const assignPath_pluginFileList = glob.sync('*/config.json', {
        cwd: assignPath_cwd
      });

      if ( assignPath_pluginFileList.length !== 0 ) {

        for ( let i = 0; i < assignPath_pluginFileList.length; i++ ) {
            const pluginConfig = require(path.resolve(assignPath_cwd, assignPath_pluginFileList[i]));
            // 取view字段
            if ( pluginConfig && pluginConfig.view ) {
              for ( let key in pluginConfig.view ){
                const curr = pluginConfig.view[key];
                // 禁止状态忽略
                if ( isGetAll || !curr.disables ) {
                    store.setStore({
                      ...curr,
                      pluginName: pluginConfig.name_en,
                      componentName: key,
                      version: pluginConfig.version,
                      author: pluginConfig.author,
                      type: pluginConfig.type,
                      appid: pluginConfig.app_id,
                      filePath: assignPath_pluginFileList[i].replace('config.json', `View/src/${key}/main.js`),
                      _cwd: assignPath_cwd,
                      _private: true,
                      _originalConfig: {
                        ...pluginConfig,
                        _configPath: path.resolve(assignPath_cwd, assignPath_pluginFileList[i])
                      }
                    });
                }
              }

            }
        }
      }
      return store;
    }


    // 默认插件位置
    const private_cwd = path.resolve(process.cwd(), '../common/plugin');
    const private_pluginFileList = glob.sync('*/config.json', {
      cwd: private_cwd
    });

    if ( private_pluginFileList.length !== 0 ) {

       for ( let i = 0; i < private_pluginFileList.length; i++ ) {
          const pluginConfig = require(path.resolve(private_cwd, private_pluginFileList[i]));
          // 取view字段
          if ( pluginConfig && pluginConfig.view ) {
            for ( let key in pluginConfig.view ){
              const curr = pluginConfig.view[key];
              // 禁止状态忽略
              if ( !curr.disables ) {
                  store.setStore({
                    ...curr,
                    pluginName: pluginConfig.name_en,
                    componentName: key,
                    version: pluginConfig.version,
                    author: pluginConfig.author,
                    type: pluginConfig.type,
                    appid: pluginConfig.app_id,
                    filePath: private_pluginFileList[i].replace('config.json', `View/src/${key}/main.js`),
                    _cwd: private_cwd,
                    _private: true
                  });
              }
            }

          }
      }
    }

    // web 端不支持外挂插件目录
    if ( process.env.DISCUZ_ENV === 'web' ) return store;
    // 自定义插件位置
    const custom_cwd = path.resolve(process.cwd(), './node_modules/.plugin');
    const custom_pluginFileList = glob.sync('*/config.json', {
      cwd: custom_cwd,
      ignore: ['node_modules']
    });

    if ( custom_pluginFileList.length !== 0 ) {

      for ( let i = 0; i < custom_pluginFileList.length; i++ ) {
         const pluginConfig = require(path.resolve(custom_cwd, custom_pluginFileList[i]));
         // 取view字段
         if ( pluginConfig && pluginConfig.view ) {

           for ( let key in pluginConfig.view ){
             const curr = pluginConfig.view[key];

             // 禁止状态忽略
             if ( !curr.disables ) {
                  store.setStore({
                  ...curr,
                  pluginName: pluginConfig.name_en,
                  componentName: key,
                  version: pluginConfig.version,
                  author: pluginConfig.author,
                  type: pluginConfig.type,
                  appid: pluginConfig.app_id,
                  filePath: custom_pluginFileList[i].replace('config.json', `./View/src/${key}/main.js`),
                  _cwd: custom_cwd,
                  _private: false
                 });
             }
           }

         }
     }

   }

    return store;
}
