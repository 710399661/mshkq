const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const { SLS_CONFIG_YAML } = require('../constants');
const warnlog = require('./console/warnlog');
module.exports = function getServerlessConfigYaml(cwd) {
    const YAML_PATH = path.resolve(cwd, '../', SLS_CONFIG_YAML);
    if (fs.existsSync(YAML_PATH)) {
        const fileContents = fs.readFileSync(YAML_PATH, 'utf8');
        const data = yaml.safeLoad(fileContents);
        return data;
    } else {
        warnlog(`sls.config.yaml文件，会导致最终无法运行，自动为你创建配置文件, 文件路径为：${YAML_PATH}，请正确填写后再编译！！！`);
        const defaultYamlConfig = {
            secretId: '请填写secretId',
            secretKey: '请填写secretKey',
            appid: '请填写appid',
            cos: {
                bucket: 'discuz-ssr',
                region: 'ap-guangzhou',
                object: '/serverless/ssr.zip',
            },
            serverless: {
                component: 'http',
                name: 'discuz-ssr',
                stage: 'releases',
                inputs: {
                    region: 'ap-guangzhou', 
                    faas: {
                        framework: 'nextjs',
                        runtime: 'Nodejs12.16',
                        name: 'discuz-ssr',
                        timeout: 10,
                        memorySize: 1024,
                    }
                }
            }
        };
        const yamlStr = yaml.safeDump(defaultYamlConfig);
        fs.writeFileSync(YAML_PATH, yamlStr, 'utf8');
        return defaultYamlConfig;
    }

}