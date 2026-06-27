import { baseAdapterFactory } from '../../../../extends/baseAdapter';

export const StepItemLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').StepItemWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').StepItemMiniAdapter;
    }
  },
});
