export const FlexViewAdapter = () => {
  if (process.env.DISCUZ_ENV === 'web') {
    return require('./web').FlexWebLayout;
  }

  if (process.env.DISCUZ_ENV === 'mini') {
    return require('./mini').FlexMiniLayout;
  }
};
