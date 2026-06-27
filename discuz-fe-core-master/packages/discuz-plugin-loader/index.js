
// 编译前添加
const getPluginString = require('./getPluginString');
const initStore = require('./initStroe');

let store = null;


const reg = /\/\*\*DZQ->plugin->register<.*>\*\*\//;
const catchReg = /.*<([\s\S]*?)>.*/;

module.exports = function(content) {
  const {
    context, // 所在文件目录
    resource, // 文件源地址
    query
  } = this;

  if ( !store ) {
    store = initStore();
  }
  const registerList = [];
  const result = content.match(reg);
  if ( result && result.length != 0 ) {

    const tmp = result[0];
    const conditions = catchReg.exec(tmp);
    if ( conditions && conditions.length > 0 && conditions[1] ) {
      const [target, hookName, pluginName] = conditions[1].split('@');
      if ( target && hookName ) {
        const hookNameList = hookName.split(',');

        if ( hookNameList.length > 1 ) {
          for ( let i = 0; i < hookNameList.length; i++ ) {
            const plugin = store.getStore(target, hookNameList[i]);
            plugin && registerList.push(...plugin);
          }
        } else {
          const plugin = store.getStore(target, hookName);
          registerList.push(...plugin);
        }
      }
      let replaceStr = '';
      // 如果有置顶的pluginName，那么将不会引入其他相同hooks下的插件，适用于页面插件
      if ( pluginName ) {
        // 页面特殊处理 <pluginName:path>
        if ( hookName === 'add_page_hook' ) {
          const [ _pluginName, _path ] = pluginName.split(':');
          const targetPluginList = [];
          for (let i =0; i < registerList.length; i++) {
            if ( registerList[i].pluginName === _pluginName && registerList[i].path === _path ) {
              targetPluginList.push(registerList[i]);
              break;
            }
          }
          replaceStr = getPluginString(targetPluginList);
        } else {
          const targetPluginList = [];
          for (let i =0; i < registerList.length; i++) {
            if ( registerList[i].pluginName === pluginName ) {
              targetPluginList.push(registerList[i]);
              break;
            }
          }
          replaceStr = getPluginString(targetPluginList);
        }
        
      } else {
        replaceStr = getPluginString(registerList);
      }
      content = content.replace(tmp, replaceStr);

    }
  }

  

  return content;
};
