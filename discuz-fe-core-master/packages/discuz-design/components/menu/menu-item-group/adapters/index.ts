import { baseAdapterFactory } from '../../../../extends/baseAdapter';

export const MenuItemGroupLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').MenuItemGroupWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').MenuItemGroupMiniAdapter;
    }
  },
});
