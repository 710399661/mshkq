import { baseLayoutFactory } from '../../../extends/baseLayout';

export const PullDownRefreshViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').PullDownRefreshWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').PullDownRefreshMiniLayout;
    }
  },
});
