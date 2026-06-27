import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const SideNavLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').SideNavWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').SideNavMiniAdapter;
    }
  },
});
