const log = require('./log');
const errorlog = require('./errorLog');
module.exports = (type, text) => {
  type === 'ok' ? log({
    text,
    emoji: 'wink',
  }) : errorlog(text);
  // notifier.notify( {
  //     title: 'DZQ-CLI Message',
  //     message: text,
  //     icon: path.join( __dirname, '../../../logo/logo.png' )
  // } );
};
