import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const SpinLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').SpinWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').SpinMiniAdapter;
    }
  },
});
