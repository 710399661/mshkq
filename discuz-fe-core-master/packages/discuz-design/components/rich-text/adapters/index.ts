import { noop } from '../../../utils/noop';
import { baseAdapterFactory } from '../../../extends/baseAdapter';

export const RichTextLogicalAdapter = baseAdapterFactory({
  defaultAdapter: {
    transform: noop,
    onWrapperClick: noop,
  },
  adapterImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').RichTextWebAdapter;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').RichTextMiniAdapter;
    }
  },
});
