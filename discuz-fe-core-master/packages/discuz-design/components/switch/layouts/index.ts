import { baseLayoutFactory } from '../../../extends/baseLayout';

export const SwitchViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').SwitchWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').SwitchMiniLayout;
    }
  },
});
