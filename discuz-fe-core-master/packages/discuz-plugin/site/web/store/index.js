import { useStaticRendering } from 'mobx-react';
import SiteStore from './site/action';
import AppStore from './app/action';
const isServer = typeof window === 'undefined';

useStaticRendering(isServer);

let store = null;

export default function initializeStore() {
  if (isServer) {
    return {
      site: new SiteStore(),
      store: new AppStore(),
    };
  }
  if (store === null) {
    store = {
      site: new SiteStore(),
      store: new AppStore(),
    };
  }

  return store;
}
