import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const FlexLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').useWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').useMiniAdapter;
    }
  },
});
