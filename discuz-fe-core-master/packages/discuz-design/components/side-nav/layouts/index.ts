import { baseLayoutFactory } from '../../../extends/baseLayout';

export const SideNavViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').SideNavWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').SideNavMiniLayout;
    }
  },
});
