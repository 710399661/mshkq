export const RadioViewAdapter = () => {
  if (process.env.DISCUZ_ENV === 'web') {
    return require('./web/index').RadioWebLayout;
  }

  if (process.env.DISCUZ_ENV === 'mini') {
    return require('./mini/index').RadioMiniLayout;
  }
};
