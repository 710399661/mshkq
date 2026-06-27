import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const ActionSheetLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').ActionSheetWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').ActionSheetMiniAdapter;
    }
  },
});
