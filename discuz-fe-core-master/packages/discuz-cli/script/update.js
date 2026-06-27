const NpmApi = require('npm-api');
const projectPackage = require('../utils/getProjectPkg')();
const {isEmptyObject} = require('../utils/typeof');
const infolog = require('../utils/console/infoLog');
const log = require('../utils/console/log');
const warnlog = require('../utils/console/warnlog');
const errorlog = require('../utils/console/errorLog');
const runÇommand = require('../utils/runCommand');
const getCurrPath = require('../utils/getCurrPath');
const corePackages = require('../utils/getCorePackageList');

const {
    MS_UPDATE_CHECK_LOCAL_PACKAGE,
    MS_UPDATE_NO_FIND_PACKAGE,
    MS_UPDATE_CHECK_LOCAL_PACKAGE_DONE,
    MS_UPDATE_CHECK_NEW_CORE_VERSION,
    MS_UPDATE_CHECK_NEW_CORE_VERSION_DONE,
    MS_UPDATE_RUN_UPDATE,
    MS_UPDATE_RUN_UPDATE_DONE,
    MS_UPDATE_RUN_UPDATE_FAIL,
    MS_NO_UPDATE
} = require('../constants');


function update() {
    return new Promise(async (resolve, reject) => {
        const CURR_RUN_PATH = getCurrPath();
        const map = {};
        for ( let i = 0; i < corePackages.length; i++ ) {
            map[corePackages[i]] = {
                old: 'NULL',
                new: 'NULL'
            }
        }
        infolog(MS_UPDATE_CHECK_LOCAL_PACKAGE);
        if ( projectPackage ) {
            const { dependencies, devDependencies } = projectPackage;
            for ( let i = 0; i < corePackages.length; i++ ) {
                map[corePackages[i]].old = dependencies[corePackages[i]] || devDependencies[corePackages[i]] || 'NULL';
            }
        } else {
            warnlog(MS_UPDATE_NO_FIND_PACKAGE);
        }
        log(MS_UPDATE_CHECK_LOCAL_PACKAGE_DONE);
        infolog(MS_UPDATE_CHECK_NEW_CORE_VERSION);
        const npm = new NpmApi();
        const promiseList = [];
        for ( let i = 0; i < corePackages.length; i++ ) {
            promiseList.push(npm.repo(corePackages[i]).version('latest'));
        }
        const result = await Promise.all(promiseList);
        for ( let i = 0; i < result.length; i++ ) {

            if ( !isEmptyObject(result[i]) ) {
                const {name, version} = result[i];
                if (!map[name]) continue;
                map[name].new = version;
            }

        }
        log(MS_UPDATE_CHECK_NEW_CORE_VERSION_DONE);

        let resultStr = `版本信息：\n\n`;
        let commandArr = [];
        for ( let key in map ) {
            resultStr += `${key}: ${map[key].old} -> ${map[key].new}\n`;
            if ( map[key].old !== map[key].new && map[key].new !== 'NULL' ) {
                commandArr.push(`${key}@${map[key].new || 'latest'}`);
            }
        }
        log(resultStr);

        if ( commandArr.length === 0 ) {
            infolog(MS_NO_UPDATE);
            resolve(true);
        }

        infolog(MS_UPDATE_RUN_UPDATE);
        const updateResult = runÇommand(CURR_RUN_PATH, 'npm', ['install', ...commandArr, '--save-exact']);
        if (!updateResult) {
            errorlog(MS_UPDATE_RUN_UPDATE_FAIL);
            resolve(false);
            return;
        }
        infolog(MS_UPDATE_RUN_UPDATE_DONE);
        resolve(true);
    });

}

module.exports = update;