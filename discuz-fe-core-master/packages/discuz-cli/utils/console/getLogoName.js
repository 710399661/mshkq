const colors = require('colors');
const LOGO = 'DZQ';

module.exports = (type) => {
  switch (type) {
    case 'ok': return colors.bgGreen(` ${LOGO} `.black);
    case 'err': return colors.bgRed(` ${LOGO} `.black);
    case 'warn': return colors.bgYellow(` ${LOGO} `.black);
    case 'info': return colors.bgBlue(` ${LOGO} `.black);
    default: return '';
  }
};
