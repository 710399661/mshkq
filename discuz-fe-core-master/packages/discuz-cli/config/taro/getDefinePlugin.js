const createVersionInfo = require('../../utils/createVersionInfo');
const getProjectConfigYaml = require('../../utils/getProjectConfigYaml');
const infolog = require('../../utils/console/infoLog');

module.exports = function getDefinePlugin() {

    const definePluginCommonConfig = {};

    const yamlConfig = getProjectConfigYaml(process.cwd());
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

    const definePluginMap = {
        'process.env.DISCUZ_ENV': JSON.stringify('mini'),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.DISCUZ_BUILDINFO': JSON.stringify(createVersionInfo(yamlConfig)),
        ...definePluginCommonConfig
    }

    return definePluginMap;
}