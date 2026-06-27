import { baseLayoutFactory } from '../../../extends/baseLayout';

export const AlertViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').AlertWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').AlertMiniLayout;
    }
  },
});
