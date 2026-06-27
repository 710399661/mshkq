import { baseLayoutFactory } from '../../../extends/baseLayout';

export const StepViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').StepWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').StepMiniLayout;
    }
  },
});
