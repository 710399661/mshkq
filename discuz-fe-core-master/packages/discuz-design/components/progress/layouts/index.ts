import { baseLayoutFactory } from '../../../extends/baseLayout';

export const ProgressViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').ProgressWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').ProgressMiniLayout;
    }
  },
});
