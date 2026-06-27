import { baseLayoutFactory } from '../../../extends/baseLayout';

export const DropdownViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').DropdownWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').DropdownMiniLayout;
    }
  },
});
