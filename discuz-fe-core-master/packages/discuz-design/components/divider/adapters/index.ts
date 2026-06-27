import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const DividerLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').DividerWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').DividerMiniAdapter;
    }
  },
});
