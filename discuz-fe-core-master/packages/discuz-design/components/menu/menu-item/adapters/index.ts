import { baseAdapterFactory } from '../../../../extends/baseAdapter';

export const MenuItemLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').MenuItemWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').MenuItemMiniAdapter;
    }
  },
});
