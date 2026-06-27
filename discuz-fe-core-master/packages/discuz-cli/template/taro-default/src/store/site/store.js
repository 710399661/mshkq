import { observable } from 'mobx';
import { envHost, envVersion } from '@constants/site';

class SiteStore {
  // 环境配置
  envConfig = {
    version: envHost,
    host: envVersion
  };
}

export default SiteStore;
