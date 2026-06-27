import { baseLayoutFactory } from '../../../extends/baseLayout';

export const SliderViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').SliderWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').SliderMiniLayout;
    }
  },
});
