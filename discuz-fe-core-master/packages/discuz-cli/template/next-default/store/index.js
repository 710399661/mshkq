import { useStaticRendering } from 'mobx-react';
import SiteStore from './site/action';
import AppStore from './app/action';
import initEnvConfig from '@config';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

let store = null;
const ENV_CONFIG = initEnvConfig();

export default function initializeStore() {
  if (isServer) {
    return {
      site: new SiteStore({
        envConfig: ENV_CONFIG,
      }),
      store: new AppStore(),
    };
  }
  if (store === null) {
    store = {
      site: new SiteStore({
        envConfig: ENV_CONFIG,
      }),
      store: new AppStore(),
    };
  }

  return store;
}
