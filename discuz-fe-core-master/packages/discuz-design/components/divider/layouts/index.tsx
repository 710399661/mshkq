import { baseLayoutFactory } from '../../../extends/baseLayout';

export const DividerViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').DividerWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').DividerMiniLayout;
    }
  },
});
