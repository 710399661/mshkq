const errorlog = require('../../utils/console/errorLog');
const infolog = require('../../utils/console/infoLog');
const log = require('../../utils/console/log');
const getCurrPath = require('../../utils/getCurrPath');
const getProjectPkg = require('../getProjectPkg');
const fs = require('fs');
const path = require('path');
const copydir = require('copy-dir');
const rmDirWideSync = require('../deleteDir');
const yaml = require('js-yaml');
const zip = require('../zip.js');
const runCommand = require('../../utils/runCommand');

function createServerlessProject(cloudConfig, create, isZip) {

    return new Promise(async (res) => {
        const { appid, serverless, cos } = cloudConfig;
        const cwd = getCurrPath();
        const dzqProjectName = getProjectPkg().name;
        const reg = new RegExp(`/.*\/${dzqProjectName}\/cache\/.*/`);
        let done = true;
    
        const SLS_DIR = path.resolve(cwd, '.sls');
        const FE_SLS_STATIC = path.resolve(SLS_DIR, 'web');
        const SERVERLESS_YMAL = path.resolve(SLS_DIR, 'serverless.yml');
        const SRC_SCF_BOOTSTRAP = path.resolve(__dirname, 'scf_bootstrap');
        const SRC_SCF_ENV_CONFIG = path.resolve(__dirname, 'env.json');
        const SCF_BOOTSTRAP = path.resolve(SLS_DIR, 'scf_bootstrap');
        const SCF_ENV_CONFIG = path.resolve(SLS_DIR, 'env.json');
        const SRC_STATIC_PATH = path.resolve(cwd, dzqProjectName);
        const DIST_STATIC_PATH = path.resolve(FE_SLS_STATIC, dzqProjectName);
        const SRC_NODE_MODULES_PATH = path.resolve(cwd, 'node_modules');
        const DIST_NODE_MODULES_PATH = path.resolve(FE_SLS_STATIC, 'node_modules');

        const SRC_PUBLIC_PATH = path.resolve(cwd, 'public');
        const DIST_PUBLIC_PATH = path.resolve(FE_SLS_STATIC, 'public');

        const SRC_PACKAGE_PATH = path.resolve(cwd, 'package.json');
        const DIST_PACKAGE_PATH = path.resolve(FE_SLS_STATIC, 'package.json');
        const SRC_NEXTCONFIG_PATH = path.resolve(cwd, 'next.config.js');
        const DIST_NEXTCONFIG_PATH = path.resolve(FE_SLS_STATIC, 'next.config.js');
        const ZIP_PATH = path.resolve(SLS_DIR, 'ssr.zip');

        if ( create ) {
            // 复制相关代码到临时文件   
            if (!fs.existsSync(SLS_DIR)) {
                infolog(`生成.sls目录，${SLS_DIR}`);
                fs.mkdirSync(SLS_DIR);
            } else {
                // infolog(`删除旧数据中，时间可能较长，请耐心等待，或手动删除以下文件：${SLS_DIR}`);
                // rmDirWideSync(SLS_DIR);
                // fs.mkdirSync(SLS_DIR);
            }
        
            if (!fs.existsSync(FE_SLS_STATIC)) {
                infolog(`生成web目录，${FE_SLS_STATIC}`);
                fs.mkdirSync(FE_SLS_STATIC);
            }
        
            infolog('生成serverless基础项目，时间可能较长，请耐心等候...');
            infolog('生成项目代码文件...');
            // 复制构建代码
            const staticErr = copydir.sync(SRC_STATIC_PATH, DIST_STATIC_PATH, {
                utimes: true,  // keep add time and modify time
                mode: true,    // keep file mode
                cover: true,    // cover file when exists, default is true
                filter: (stat, filepath, filename) => {
                    if ( reg.test(filepath) ) {
                        return false;
                    }
                    return true;
                }
            });
        
            if (staticErr) {
                done = false;
                errorlog('生成项目代码文件失败！！！');
                errorlog(staticErr);
            } else {
                log('生成项目代码文件完成');
            }

            infolog('生成静态资源文件...');
            // 复制构建代码
            const publicErr = copydir.sync(SRC_PUBLIC_PATH, DIST_PUBLIC_PATH, {
                utimes: true,  // keep add time and modify time
                mode: true,    // keep file mode
                cover: true,    // cover file when exists, default is true
            });
        
            if (publicErr) {
                done = false;
                errorlog('生成静态资源文件失败！！！');
                errorlog(publicErr);
            } else {
                log('生成静态资源文件');
            }
        
            // infolog('生成项目依赖文件...');
            // const nodeModluesErr = copydir.sync(SRC_NODE_MODULES_PATH, DIST_NODE_MODULES_PATH, {
            //     utimes: true,  // keep add time and modify time
            //     mode: true,    // keep file mode
            //     cover: true,    // cover file when exists, default is true
            //     filter: (stat, filepath, filename) => {
            //         if ( stat === 'symbolicLink' ) {
            //             return false;
            //         }
            //         return true;
            //     }
            // });
            // if (nodeModluesErr) {
            //     done = false;
            //     errorlog('生成项目依赖文件失败！！！');
            //     errorlog(nodeModluesErr);
            // } else {
            //     log('生成项目依赖文件完成');
            // }
        
            infolog('生成next启动文件...');
            const nextConfigErr = fs.copyFileSync(SRC_NEXTCONFIG_PATH, DIST_NEXTCONFIG_PATH);
            if (nextConfigErr) {
                done = false;
                errorlog('生成next启动文件失败！！！');
                errorlog(nextConfigErr);
            } else {
                log('生成next启动文件完成');
            }
        
            infolog('生成package.json文件...');
            const packageErr = fs.copyFileSync(SRC_PACKAGE_PATH, DIST_PACKAGE_PATH);
            if (packageErr) {
                done = false;
                errorlog('生成package.json文件失败！！！');
                errorlog(packageErr);
            } else {
                log('生成package.json文件完成');
            }
        
            infolog('生成serverless配置文件...');
            const serverlessYML = {
                ...serverless,
            };
            serverlessYML.inputs = {
                ...serverlessYML.inputs,
                src: {
                    bucket: `${cos.bucket}-${appid}`,
                    object: 'serverless/ssr.zip'
                }
            }
            const yamlStr = yaml.safeDump(serverlessYML);
            fs.writeFileSync(SERVERLESS_YMAL, yamlStr, 'utf8');
            log('生成serverless配置文件完成');
        
            infolog('生成serverless启动脚本...');
            const runScriptStr = fs.readFileSync(SRC_SCF_BOOTSTRAP, {encoding: 'utf8'})
            fs.writeFileSync(SCF_BOOTSTRAP, runScriptStr, 'utf8');
            log('生成serverless启动脚本完成');

            infolog('生成serverless环境文件...');
            const envStr = fs.readFileSync(SRC_SCF_ENV_CONFIG, {encoding: 'utf8'})
            fs.writeFileSync(SCF_ENV_CONFIG, envStr, 'utf8');
            log('生成serverless环境文件完成');


            const installResult = await runCommand(FE_SLS_STATIC, 'npm', ['install', '--save-exact']);
            if (!installResult) {
                res(false);
            }
        }

        if ( isZip ) {
            const zipResult = await zip([
                SRC_SCF_BOOTSTRAP,
                SERVERLESS_YMAL,
                FE_SLS_STATIC,
                SCF_ENV_CONFIG
            ], ZIP_PATH);
    
            done = zipResult;
        }
    
        res(done);
    })
    

}

module.exports = createServerlessProject;