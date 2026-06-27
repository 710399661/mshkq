import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const BadgeLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').BadgeWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').BadgeMiniAdapter;
    }
  },
});
