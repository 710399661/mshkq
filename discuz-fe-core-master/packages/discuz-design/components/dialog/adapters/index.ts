import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const DialogLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').DialogWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').DialogMiniAdapter;
    }
  },
});
