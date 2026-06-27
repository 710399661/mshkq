import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const ProgressLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').ProgressWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').ProgressMiniAdapter;
    }
  },
});
