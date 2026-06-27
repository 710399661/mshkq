import { observable, computed, action } from 'mobx';
class PluginStore {
  constructor(props = {}) {

  }

  @observable pluginComponent = {};
  @observable pluginStore = {};

  @action
  setPluginComponent(pluginName, store) {
    if ( Object.prototype.toString.call(pluginName) === '[object Array]') {
      // 暂时不对pc和h5切换插件注册不一样时，去除pluginStore记录
      for ( let i = 0; i < pluginName.length; i++ ) {
        this.pluginStore[pluginName[i]] = this.pluginStore[pluginName[i]] ? this.pluginStore[pluginName[i]] : observable({});
      }
    } else {
      this.pluginStore[pluginName] = this.pluginStore[pluginName] ? this.pluginStore[pluginName] : observable({});
    }
    this.pluginComponent = store;
  }

  @action
  getPluginStore(pluginName) {
    return this.pluginStore[pluginName] || null;
  }

  @action
  setPluginStore(pluginName, data) {
    if (this.pluginStore[pluginName]) {
      this.pluginStore[pluginName] = { 
        ...this.pluginStore[pluginName], 
        ...data 
      };

      this.pluginStore = {...this.pluginStore};
    }
  }

  @action 
  registerLifecycle(pluginName, eventName, fn) {
    this.pluginStore[pluginName][eventName] = fn;
    this.pluginStore = { ...this.pluginStore };
  }

}

export default PluginStore;