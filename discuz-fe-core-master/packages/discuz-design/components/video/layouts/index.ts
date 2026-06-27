import { baseLayoutFactory } from '../../../extends/baseLayout';

export const viewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web/index').WebLayout;
    }
    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini/index').MiniLayout;
    }
  },
});
