import { baseLayoutFactory } from '../../../extends/baseLayout';

export const DialogViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').DialogWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').DialogMiniLayout;
    }
  },
});
