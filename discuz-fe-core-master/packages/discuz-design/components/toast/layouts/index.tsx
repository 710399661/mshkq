const getRenderComponent = () => {
  if (process.env.DISCUZ_ENV === 'web') {
    return require('./web').WebLayout;
  }

  if (process.env.DISCUZ_ENV === 'mini') {
    return require('./mini').MiniLayout;
  }
};

export default getRenderComponent;
