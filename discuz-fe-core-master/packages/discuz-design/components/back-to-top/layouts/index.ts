import { baseLayoutFactory } from '../../../extends/baseLayout';

export const BackToTopViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').BackToTopWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').BackToTopMiniLayout;
    }
  },
});
