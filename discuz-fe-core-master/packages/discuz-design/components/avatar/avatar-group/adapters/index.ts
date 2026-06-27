import { baseAdapterFactory } from '../../../../extends/baseAdapter';

export const AvatarGroupLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').AvatarGroupWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').AvatarGroupMiniAdapter;
    }
  },
});
