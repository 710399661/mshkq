const getAdapterHooks = () => {
  if (process.env.DISCUZ_ENV === 'web') {
    return require('./web').useWebAdapter;
  }

  if (process.env.DISCUZ_ENV === 'mini') {
    return require('./mini').useMiniAdapter;
  }
};

export default getAdapterHooks;
