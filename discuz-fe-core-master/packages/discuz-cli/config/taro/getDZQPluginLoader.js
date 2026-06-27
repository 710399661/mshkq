const getCurrPath = require('../../utils/getCurrPath');
const getProjectConfigYaml = require('../../utils/getProjectConfigYaml');

const path = require('path');
module.exports = (webpackChain) => {
    const yamlConfig = getProjectConfigYaml(process.cwd());

    const include = [
      path.resolve(getCurrPath(), './src')
    ];

    if ( yamlConfig.PLUGIN ) {
      include.push(yamlConfig.PLUGIN);
    }

    webpackChain.merge({
        module: {
          rule: {
            dzqPluginLoader: {
              test: /\.(js|jsx)$/,
              use: [{
                loader: '@discuzq/discuz-plugin-loader',
                options: {
                  enforce: 'pre',
                  include: [
                    path.resolve(getCurrPath(), './src')
                  ],
                  pluginPath: yamlConfig.PLUGIN || null
                }
              }]
            }
          }
        }
    })
}