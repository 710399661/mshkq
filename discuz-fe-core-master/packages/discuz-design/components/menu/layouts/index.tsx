import { baseLayoutFactory } from '../../../extends/baseLayout';

export const MenuViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').MenuWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').MenuMiniLayout;
    }
  },
});
