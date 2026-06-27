import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const BackToTopLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').BackToTopWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').BackToTopMiniAdapter;
    }
  },
});
