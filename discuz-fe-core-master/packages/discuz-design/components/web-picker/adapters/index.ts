import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const LogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').WebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').MiniAdapter;
    }
  },
});
