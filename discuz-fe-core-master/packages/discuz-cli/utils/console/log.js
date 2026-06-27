const colors = require('colors');
const getLogo = require('./getLogoName');
const emoji = require('node-emoji');

module.exports = (text) => {
  if (typeof text === 'string') {
    console.log(getLogo('ok'), emoji.get('beer'), '', colors.blue(text), '\n');
  } else if (typeof text === 'object') {
    const { text: _text, emoji: _emoji } = text;
    console.log(getLogo('ok'), emoji.get(_emoji || 'beer'), '', colors.blue(_text), '\n');
  }
};
