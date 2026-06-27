import { baseLayoutFactory } from '../../../../extends/baseLayout';

export const MenuItemViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').MenuItemWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').MenuItemMiniLayout;
    }
  },
});
