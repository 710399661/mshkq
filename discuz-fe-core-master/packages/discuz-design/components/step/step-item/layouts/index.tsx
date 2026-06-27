import { baseLayoutFactory } from '../../../../extends/baseLayout';

export const StepItemViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').StepItemWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').StepItemMiniLayout;
    }
  },
});
