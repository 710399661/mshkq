require('babel-register')({
  presets: ['env'],
});

module.exports = require('./tmp/new.js');
