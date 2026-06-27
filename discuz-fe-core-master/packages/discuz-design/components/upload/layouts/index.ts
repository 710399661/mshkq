import { baseLayoutFactory } from '../../../extends/baseLayout';

export const UploadViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').UploadWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').UploadMiniLayout;
    }
  },
});
