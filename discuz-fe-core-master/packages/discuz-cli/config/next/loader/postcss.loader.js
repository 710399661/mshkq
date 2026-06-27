const cwd = process.cwd();
const autoprefixer = require(`${cwd}/node_modules/autoprefixer`);
const browserslist = require('../browserslist');
const findUp = require('find-up');
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

module.exports = (config) => {
  const postcssConfig = findUp.sync(path.resolve('postcss.config.js'), {
    cwd: config.context,
  });

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      config: postcssConfig || undefined,
      plugins: [
        // cssvariables(cssvariablesOption),
        autoprefixer({
          overrideBrowserslist: browserslist,
        }),
      ],
    },
  };

  return postcssLoader;
};
