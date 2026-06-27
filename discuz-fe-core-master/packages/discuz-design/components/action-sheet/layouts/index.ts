import { baseLayoutFactory } from '../../../extends/baseLayout';

export const ActionSheetViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').ActionSheetWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').ActionSheetMiniLayout;
    }
  },
});
