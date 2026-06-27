const COS = require('cos-nodejs-sdk-v5');
const errlog= require('../console/errorLog');
const infoLog = require('../console/infoLog');
const getCurrPath = require('../../utils/getCurrPath');
const path = require('path');
const fs = require('fs');

const cwd = getCurrPath();
let cosObject = null;

function _hasBucket(bucket, region, appid) {
    return new Promise((res) => {
        cosObject.headBucket({
            Bucket: `${bucket}-${appid}`, /* 必须 */
            Region: region,     /* 必须 */
        }, (err, data) => {
            if (err) {
                errlog(err.error.message);
                res(err.error.code);
            }
            res(200);
        });
    })
}

function _putBucket(bucket, region, appid) {
    return new Promise((res) => {
        cosObject.putBucket({
            Bucket: `${bucket}-${appid}`, /* 必须 */
            Region: region,     /* 必须 */
            ACL: 'public-read'
        }, (err, data) => {
            if (err) {
                errlog(err.error.message);
                res(null);
            }
            res(data);
        });
    })
}


function cos(config) {

    return new Promise(async(res) => {
        const { appid, secretId, secretKey, cos } = config;
        const { bucket, region, object } = cos;

        const SLS_DIR = path.resolve(cwd, '.sls');
        const ZIP_PATH = path.resolve(SLS_DIR, 'ssr.zip');
        
        cosObject = new COS({
            SecretId: secretId,
            SecretKey: secretKey
        });
    
        const code = await _hasBucket(bucket, region, appid);
        // 存在
        if (code !== 200) {
            infoLog('创建cos存储桶中...');
            const result = await _putBucket(bucket, region, appid);
            if ( !result ) {
                infoLog('创建cos存储桶失败！');
                res(false);
                return;
            } else {
                infoLog('创建cos存储桶成功！');
            }
        }


        infoLog('上传cos中...');
        const code2 = await _hasBucket(bucket, region, appid);
        if (code2 !== 200) {
            infoLog('如果你是刚创建存储桶，可能会出现无法找到存储桶错误，建议稍后再重新执行命令。');
        } else {
            const bufferStream = fs.createReadStream(ZIP_PATH);
            cosObject.putObject({
                Bucket: `${bucket}-${appid}`, /* 必须 */
                Region: region,     /* 必须 */
                Key: object,              /* 必须 */
                Body: bufferStream, /* 必须 */
            }, function(err, data) {
                if (err) {
                    errlog('上传版本压缩文件失败！');
                    errlog(err);
                    res(false);
                }
                infoLog('上传版本压缩文件成功！');
                res(true);
            });        
        }
        
    })
    
}



module.exports = cos;