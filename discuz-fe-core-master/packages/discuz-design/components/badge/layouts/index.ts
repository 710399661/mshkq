import { baseLayoutFactory } from '../../../extends/baseLayout';

export const BadgeViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').BadgeWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').BadgeMiniLayout;
    }
  },
});
