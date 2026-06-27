import { observable } from 'mobx';

class SiteStore {
  constructor(props = {}) {
    this.envConfig = props.envConfig;
  }
  envConfig = {}
  @observable isLogin = true;
}

export default SiteStore;
