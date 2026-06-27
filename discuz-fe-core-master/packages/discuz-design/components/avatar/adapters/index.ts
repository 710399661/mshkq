import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const AvatarLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').AvatarWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').AvatarMiniAdapter;
    }
  },
});
