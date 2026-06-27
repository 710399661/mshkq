import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const AlertLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').AlertWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').AlertMiniAdapter;
    }
  },
});
