import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const DropdownLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {},
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').DropdownWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').DropdownMiniAdapter;
    }
  },
});
