import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const SliderLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').SliderWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').SliderMiniAdapter;
    }
  },
});
