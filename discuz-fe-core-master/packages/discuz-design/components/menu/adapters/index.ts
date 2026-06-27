import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const MenuLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').MenuWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').MenuMiniAdapter;
    }
  },
});
