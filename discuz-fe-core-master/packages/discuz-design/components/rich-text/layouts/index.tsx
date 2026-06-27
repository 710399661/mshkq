import { baseLayoutFactory } from '../../../extends/baseLayout';

export const RichTextViewAdapter = baseLayoutFactory({
  layoutImplement() {
    if (process.env.DISCUZ_ENV === 'web') {
      return require('./web').RichTextWebLayout;
    }

    if (process.env.DISCUZ_ENV === 'mini') {
      return require('./mini').RichTextMiniLayout;
    }
  },
});
