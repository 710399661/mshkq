import { baseLayoutFactory } from '../../../extends/baseLayout';

export const TableViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').TableWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').TableMiniLayout;
    }
  },
});
