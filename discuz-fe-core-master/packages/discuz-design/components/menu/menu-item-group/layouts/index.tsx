import { baseLayoutFactory } from '../../../../extends/baseLayout';

export const MenuItemGroupViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').MenuItemGroupWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').MenuItemGroupMiniLayout;
    }
  },
});
