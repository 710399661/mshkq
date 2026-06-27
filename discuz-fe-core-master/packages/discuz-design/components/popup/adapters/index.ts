import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const PopupLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').PopupWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').PopupMiniAdapter;
    }
  },
});
