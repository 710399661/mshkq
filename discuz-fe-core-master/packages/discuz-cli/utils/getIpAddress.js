const ip = require('ip');

module.exports = (i) => {
  if (i) {
    return i;
  }
  return ip.address();
};
