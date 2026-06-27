import { baseLayoutFactory } from '../../../extends/baseLayout';

export const AvatarViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').AvatarWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').AvatarMiniLayout;
    }
  },
});
