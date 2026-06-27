import { baseLayoutFactory } from '../../../extends/baseLayout';

export const AnimationViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').AnimationWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').AnimationMiniLayout;
    }
  },
});
