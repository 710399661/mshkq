import { baseLayoutFactory } from '../../../extends/baseLayout';

export const CheckViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').CheckWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').CheckMiniLayout;
    }
  },
});
