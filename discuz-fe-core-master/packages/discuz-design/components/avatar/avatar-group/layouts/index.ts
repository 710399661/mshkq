import { baseLayoutFactory } from '../../../../extends/baseLayout';

export const AvatarGroupViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').AvatarGroupWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').AvatarGroupMiniLayout;
    }
  },
});
