
const fs = require('fs');
const infoLog = require('./console/infoLog');
const log = require('./console/log');
const deleteDir = require('./deleteDir');
module.exports = async function importPlugin(pluginPath) {

    return new Promise(async (resolve) => {
    
        infoLog('清除旧插件记录...')
        if (fs.existsSync(pluginPath)) {
            await deleteDir(pluginPath);
        }
        log('清除结束')
        resolve(true)
    })
}
