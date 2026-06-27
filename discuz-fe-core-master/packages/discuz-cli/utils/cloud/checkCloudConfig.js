
const errorlog = require('../console/errorLog');
const infolog = require('../console/infoLog');
const warnlog = require('../console/warnlog');
function checkCloudConfig(config) {

    warnlog('以下信息请勿截图发给任何人，secretId、secretKey等信息是敏感信息，泄漏可能会产生财产损失！！！')

    let isPass = true;

    const { appid, secretId, secretKey, cos } = config;

    // 校验云api秘钥
    if (appid) {
        infolog(`appid校验通过，appid：${appid}`)
    } else {
        isPass = false;
        errorlog(`appid校验失败，appid：${appid}`)
    }

    if (secretId) {
        infolog(`secretId校验通过，secretId：${secretId}`)
    } else {
        isPass = false;
        errorlog(`secretId校验失败，secretId：${secretId}`)
    }

    if (secretKey) {
        infolog(`secretKey校验通过，secretKey：${secretKey}`)
    } else {
        isPass = false;
        errorlog(`secretKey校验失败，secretKey：${secretKey}`)
    }

 
    // 校验cos
    if ( cos ) {
        const { bucket, region } = cos;

        if (bucket) {
            infolog(`bucket校验通过，bucket：${bucket}`)
        } else {
            isPass = false;
            errorlog(`bucket校验失败，bucket：${bucket}`);
        }

        if (region) {
            infolog(`region校验通过，region：${region}`)
        } else {
            isPass = false;
            errorlog(`region校验失败，region：${region}`)
        }

    } else {
        errorlog(`缺失cos配置！`);
    }
    
    return isPass;
}

module.exports = checkCloudConfig;