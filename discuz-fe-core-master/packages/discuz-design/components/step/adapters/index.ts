import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const StepLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').StepWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').StepMiniAdapter;
    }
  },
});
