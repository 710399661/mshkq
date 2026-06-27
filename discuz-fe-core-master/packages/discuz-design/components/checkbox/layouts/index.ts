export const CheckboxViewAdapter = () => {
  if (process.env.DISCUZ_ENV === 'web') {
    return require('./web/index').CheckboxWebLayout;
  }

  if (process.env.DISCUZ_ENV === 'mini') {
    return require('./mini/index').CheckboxMiniLayout;
  }
};
