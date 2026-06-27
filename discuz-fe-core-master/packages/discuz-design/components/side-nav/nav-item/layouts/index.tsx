import { baseLayoutFactory } from '../../../../extends/baseLayout';

export const NavItemViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').NavItemWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').NavItemMiniLayout;
    }
  },
});
