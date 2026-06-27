import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const logicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').VideoWebAdapter;
    }
    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').VideoMiniAdapter;
    }
  },
});
