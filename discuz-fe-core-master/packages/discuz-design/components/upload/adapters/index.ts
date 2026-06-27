import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const UploadLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').UploadWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').UploadMiniAdapter;
    }
  },
});
