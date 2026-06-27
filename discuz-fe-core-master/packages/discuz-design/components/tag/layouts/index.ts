import { baseLayoutFactory } from '../../../extends/baseLayout';

export const TagViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').TagWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').TagMiniLayout;
    }
  },
});
