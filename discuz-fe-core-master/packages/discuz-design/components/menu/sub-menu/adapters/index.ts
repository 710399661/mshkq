import { baseAdapterFactory } from '../../../../extends/baseAdapter';

export const SubMenuLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').SubMenuWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').SubMenuMiniAdapter;
    }
  },
});
