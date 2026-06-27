const getServerlessConfigYaml = require('../utils/getServerlessConfigYaml');
const getCurrPath = require('../utils/getCurrPath');
const errorlog = require('../utils/console/errorLog');
const infolog = require('../utils/console/infoLog');
const checkCloudConfig = require('../utils/cloud/checkCloudConfig');
const createServerlessProject = require('../utils/cloud/createServerlessProject');
const cos = require('../utils/cloud/cos');
function sls(options) {
    const { create, zip: _zip, cos: _cos } = options;
    const cwd = getCurrPath();

    return new Promise(async(res) => {

        const dzqServerlessConfig = getServerlessConfigYaml(cwd);

        if ( !dzqServerlessConfig ) {
            errorlog('没有配置腾讯云相关配置！');
            res(false);
            return;
        }

        const isPass = checkCloudConfig(dzqServerlessConfig);

        if ( isPass ) {
            infolog('腾讯云配置校验通过！');
        } else {
            errorlog('腾讯云配置校验不通过！');
            res(false);
            return;
        }

        const createProjectResult = await createServerlessProject(dzqServerlessConfig, create, _zip);
        if ( createProjectResult ) {
            infolog('项目创建完成！');
        } else {
            errorlog('项目创建失败！');
            res(false);
            return;
        }

        if ( _cos ) {
            const cosResult = await cos(dzqServerlessConfig);
            res(cosResult);
        } else {
            res(true);
        }
    });

}

module.exports = sls; 