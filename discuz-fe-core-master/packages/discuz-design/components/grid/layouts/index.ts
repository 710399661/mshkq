import { baseLayoutFactory } from '../../../extends/baseLayout';

export const GridViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').GridWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').GridMiniLayout;
    }
  },
});
