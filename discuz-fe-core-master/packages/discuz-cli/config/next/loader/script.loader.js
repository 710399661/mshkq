/* eslint-disable prefer-destructuring */
const cwd = process.cwd();
const path = require('path');
const fs = require('fs');

module.exports = (config, options) => {
  const projectBabelrc = path.join(config.context, '.babelrc');
  const hasProjectBabelrc = fs.existsSync(projectBabelrc) || fs.existsSync(`${projectBabelrc}.js`);
  let presets = [];
  let plugins = [];
  if (hasProjectBabelrc) {
    const babelConfigContent = fs.readFileSync(projectBabelrc, 'utf8');
    const data = JSON.parse(babelConfigContent.toString());
    presets = data.presets;
    plugins = data.plugins;
  }

  return [{
    loader: 'babel-loader',
    options: {
      babelrc: hasProjectBabelrc,
      configFile: false,
      compact: false,
      sourceMaps: false,
      inputSourceMap: false,
      highlightCode: true,
      presets,
      plugins,
    },
  }];
};

