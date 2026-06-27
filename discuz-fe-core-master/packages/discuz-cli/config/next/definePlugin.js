const getCommonConfig = require('../../utils/getCommonConfig');
const path = require('path');
const getPagesMap = require('../../utils/getPagesMap');
const {isObject, isEmptyObject} = require('../../utils/typeof');
const createVersionInfo = require('../../utils/createVersionInfo');
const getProjectConfigYaml = require('../../utils/getProjectConfigYaml');
const infolog = require('../../utils/console/infoLog');
module.exports = (config, cwd) => {
  // const commonConfig = getCommonConfig();
  const PATH_PATH = path.resolve(cwd, './pages');
  const pagesMap = getPagesMap(PATH_PATH);
  const definePluginCommonConfig = {};

  // 废弃
  // Object.keys(commonConfig).forEach(element => {
  //     definePluginCommonConfig[`${element}`] = JSON.stringify(commonConfig[element]);
  // });

  let routerMap = {};
  if ( isObject(pagesMap) && !isEmptyObject(pagesMap) ) {
    routerMap = JSON.stringify(pagesMap);
  }

  const yamlConfig = getProjectConfigYaml(cwd);
  if ( yamlConfig ) {
    Object.keys(yamlConfig).forEach(element => {
      definePluginCommonConfig[`DISCUZ_CONFIG_${element}`] = JSON.stringify(yamlConfig[element]);
    });
  }

  // 当命令行传入host或者appid时，优先级更高。
  if ( process.env.DISCUZ_CONFIG_HOST ) {
    definePluginCommonConfig[`DISCUZ_CONFIG_HOST`] = JSON.stringify(process.env.DISCUZ_CONFIG_HOST);
  }

  infolog(`当前编译host为：${definePluginCommonConfig[`DISCUZ_CONFIG_HOST`]}`);
  
  const webpack = require(`${cwd}/node_modules/webpack`);
  config.plugins.push(new webpack.DefinePlugin({
    'process.env.ROUTER_MAP': routerMap,
    'process.env.DISCUZ_ENV': JSON.stringify('web'),
    'process.env.DISCUZ_RUN': JSON.stringify(process.env.DISCUZ_RUN),
    'process.env.DISCUZ_BUILDINFO': JSON.stringify(createVersionInfo(yamlConfig)),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    ...definePluginCommonConfig
  }));

  return config;
};
