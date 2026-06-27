const glob = require('glob');
const path = require('path');
const fs = require('fs');
const lodash = require('lodash');
const getTime = require('./utils/getTime')

const SDK_PATH = path.resolve(__dirname, '../../discuz-sdk');

const API_SDK_PATH = path.resolve(SDK_PATH, './src/api');

const API_PATH_REGEXP = /url: ['`"]([a-zA-Z\.\/0-9]+)['`"]/;

const API_METHOD_REGEXP = /method:[\s]?['`"]([a-zA-Z\s]+)['`"]/;

const API_SDK_MAP = {};

const files = glob.sync(API_SDK_PATH + '/**/*.js');

const fileStat = fs.statSync(path.resolve(__dirname, '../app/docs/swagger.json'));

function timeStandard (time = 0) {
    return time > 9 ? time : "0" + time;
}

function getFileLastUpdateTime() {
    if (!fileStat?.mtimeMs) {
        return '';
    }
    return getTime(fileStat?.mtimeMs);
}

files.forEach(file => {
    const fileContent = fs.readFileSync(file, 'utf8');

    if (API_PATH_REGEXP.exec(fileContent)) {
        const { $1: url } = RegExp;

        let parsedUrl = url;

        const result = API_METHOD_REGEXP.exec(fileContent);

        const requestMethod = result && result[1];

        if (!url.startsWith('/')) {
            parsedUrl = '/' + url;
        }

        const fileImportName = lodash.camelCase(path.posix.basename(file, '.js'));

        const importFile = file.replace(SDK_PATH, '@discuzq/sdk');


        API_SDK_MAP[requestMethod.toLowerCase() + ':' + parsedUrl] = {
            file: importFile,
            parsedUrl,
            getReq: `${fileImportName}({
    params: {} // get请求参数写在params中,
    ...axiosOptions // 标准的 axios 参数
});`,
            postReq: `${fileImportName}({
    data: {} // post请求参数写在data中,
    ...axiosOptions // 标准的 axios 参数
});`,
            fileImportName,
            importRule: `import ${ fileImportName } from '${importFile.replace('/src/', '/dist/')}';`,
            method: requestMethod.toLowerCase()
        }
    }
})

API_SDK_MAP.fileMTime = getFileLastUpdateTime();

module.exports = API_SDK_MAP;

