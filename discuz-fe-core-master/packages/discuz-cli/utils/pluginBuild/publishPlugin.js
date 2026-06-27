const zip = require('../zip');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const errlog = require('../console/errorLog');
const copydir = require('copy-dir');
const deleteDir = require('../deleteDir');
const runCommand = require('../runCommand');
module.exports = function publishPlugin() {
    return new Promise(async (resolve) => {
        const cwd = process.cwd();

        const reg = new RegExp(`/.*\/node_modules\/.*/`);

        const PLGUIN_PATH = path.posix.join(cwd, '../' );
        const pluginName = path.basename(PLGUIN_PATH);
        const ZIP_PATH = path.posix.join(PLGUIN_PATH, '../', `${pluginName}.zip`);

        const COPY_DIR = path.posix.join(PLGUIN_PATH, `../plugin-${pluginName}` );
        // 复制构建代码
        const staticErr = copydir.sync(PLGUIN_PATH, COPY_DIR, {
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

        if (staticErr) {
            errorlog('生成项目代码文件失败！！！');
            errorlog(staticErr);
            resolve(false);
        } else {
            const installResult = await runCommand(path.posix.join(PLGUIN_PATH, `../plugin-${pluginName}/View` ), 'npm', ['install', '--production', '--save-exact']);
            if (!installResult) {
                errlog('安装依赖失败！');
                res(false);
            } else {
                const lockFile = path.posix.resolve(VIEW_PATH, './package-lock.json');
                if (fs.existsSync(lockFile)) {
                    fs.unlinkSync(path.posix.resolve(VIEW_PATH, './package-lock.json'));
                }
            }
        }

        const flisList = glob.sync(COPY_DIR, {
            cwd: PLGUIN_PATH,
            ignore: ['**/node_modules/**', '**/package-lock.json']
        });

        if (fs.existsSync(ZIP_PATH)) {
            errlog('请先删除现有的插件压缩包！');
        } else {
            const zipResult = await zip(flisList, ZIP_PATH);
            await deleteDir(COPY_DIR);
            resolve(zipResult)
        }

    })

}