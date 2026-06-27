import { baseLayoutFactory } from '../../../extends/baseLayout';

export const PopupViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').PopupWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').PopupMiniLayout;
    }
  },
});
