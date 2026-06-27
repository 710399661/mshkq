import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const ButtonLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').ButtonWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').ButtonMiniAdapter;
    }
  },
});
