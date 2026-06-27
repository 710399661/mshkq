import { baseLayoutFactory } from '../../../extends/baseLayout';

export const ButtonViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').ButtonWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').ButtonMiniLayout;
    }
  },
});
