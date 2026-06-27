const config = {

};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return Object.assign({}, config, require('./dev'));
  }
  return Object.assign({}, config, require('./prod'));
};
