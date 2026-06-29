const cwd = process.cwd();
const autoprefixer = require(`${cwd}/node_modules/autoprefixer`);
const browserslist = require('../browserslist');
const cssvariables = require(`${cwd}/node_modules/postcss-css-variables`);
const path = require('path');
const fs = require('fs');
const infolog = require('../../../utils/console/infoLog');


const DEFAULT_THEME_PATH = path.resolve(cwd, '../common/styles/theme/default.scss.json');
infolog(`postcss css var降级文件地址：${DEFAULT_THEME_PATH}`);
const cssvariablesOption = {
  preserve: true,
  preserveAtRulesOrder: true,
  preserveInjectedVariables: false,
};
if (fs.existsSync(DEFAULT_THEME_PATH)) {
  cssvariablesOption.variables = require(DEFAULT_THEME_PATH);
}

function findPostcssConfig(startDir) {
  let dir = startDir;
  while (dir) {
    const configPath = path.join(dir, 'postcss.config.js');
    if (fs.existsSync(configPath)) {
      return configPath;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

module.exports = (config) => {
  const postcssConfig = findPostcssConfig(config.context || cwd);

  const postcssLoader = {
    loader: require.resolve('postcss-loader'),
    options: {
      postcssOptions: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: browserslist,
          }),
        ],
      },
    },
  };

  if (postcssConfig) {
    postcssLoader.options.config = postcssConfig;
  }

  return postcssLoader;
};
