import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const SwitchLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').SwitchWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').SwitchMiniAdapter;
    }
  },
});
