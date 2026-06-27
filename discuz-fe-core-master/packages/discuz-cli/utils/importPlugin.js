const path = require('path');
const fs = require('fs');
const errorlog = require('./console/errorLog');
const copydir = require('copy-dir');
const getCurrPath = require('./getCurrPath');
const deleteDir = require('./deleteDir');
module.exports = async function importPlugin(pluginPath) {

    return new Promise(async (resolve) => {
        if (!fs.existsSync(pluginPath)) {
            errorlog('私有插件路径无效！');
            return true;
        }
       
        const PROVATE_PLUGIN_PATH = path.resolve(getCurrPath(), './node_modules/.plugin');
        const reg = new RegExp(`/.*\/node_modules\/.*/`);

        if (!fs.existsSync(PROVATE_PLUGIN_PATH)) {
            fs.mkdirSync(PROVATE_PLUGIN_PATH);
        } else {
            await deleteDir(PROVATE_PLUGIN_PATH);
            fs.mkdirSync(PROVATE_PLUGIN_PATH);
        }

        const staticErr = copydir.sync(pluginPath, PROVATE_PLUGIN_PATH, {
            utimes: true,  // keep add time and modify time
            mode: true,    // keep file mode
            cover: true,    // cover file when exists, default is true
            filter: (stat, filepath, filename) => {
                if ( reg.test(filepath) ) {
                    return false;
                } else if ( filename === 'package-lock' ) {
                    return false;
                }
                return true;
            }
        });

        if ( staticErr ) {
            errorlog(staticErr);
            resolve(false);
        } else {
            resolve(true)
        }


    })




}
