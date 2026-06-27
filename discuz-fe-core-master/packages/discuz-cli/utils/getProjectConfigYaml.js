const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const { DZQ_CONFIG_YAML } = require('../constants');
const warnlog = require('../utils/console/warnlog');
module.exports = function getProjectConfigYaml(cwd) {
    const YAML_PATH = path.resolve(cwd, '../', DZQ_CONFIG_YAML);
    if (fs.existsSync(YAML_PATH)) {
        const fileContents = fs.readFileSync(YAML_PATH, 'utf8');
        const data = yaml.safeLoad(fileContents);
        return data;
    } else {
        warnlog(`没有找到dzq.config.yaml文件，会导致最终无法运行，自动为你创建配置文件, 文件路径为：${YAML_PATH}，请正确填写后再编译！！！`);
        const defaultYamlConfig = {
            TITLE: 'Discuz!Q',
            HOST: '请填写你的域名',
            APPID: '请填写你的小程序appid',
            VERSION: '请查看官方最新版本号填写',
            PLUGIN: '插件所在文件目录'
        };
        const yamlStr = yaml.safeDump(defaultYamlConfig);
        fs.writeFileSync(YAML_PATH, yamlStr, 'utf8');
        return {
            TITLE: 'Discuz!Q',
            HOST: '',
            APPID: '',
            VERSION: '',
            PLUGIN: ''
        };
    }

}