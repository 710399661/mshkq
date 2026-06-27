import { baseAdapterFactory } from '../../../../extends/baseAdapter';

export const NavItemLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').NavItemWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').NavItemMiniAdapter;
    }
  },
});
