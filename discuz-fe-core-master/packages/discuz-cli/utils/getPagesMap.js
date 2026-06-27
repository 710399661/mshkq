//获取项目工程里的图片
const fs = require('fs');//引用文件系统模块
const pathModule = require("path");
const PATH_EXT = ['.js', '.jsx'];

function readFileList(_path, map) {
    var files = fs.readdirSync(_path);
    files.forEach(function (itm, index) {
        const stat = fs.statSync(_path + itm);
        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(_path + itm + "/", map)
        } else {
            const { name: filename, ext } = pathModule.parse(itm);
            if (PATH_EXT.indexOf(ext) != -1) {
                const res = filterPagePath(_path, filename);
                res && saveToCache(res, map);
            }
        }
    });
    return map;
}

function saveToCache(path, map) {
    const pathArr = path.split('/');
    let curr = map;
    for ( let i = 0; i < pathArr.length; i++ ) {
        if ( !pathArr[i] || pathArr[i] === '' ) continue;

        if (!curr[pathArr[i]]) {
            curr[pathArr[i]] = {};
            curr = curr[pathArr[i]];
        } else {
            curr = curr[pathArr[i]];
        }
    }
}

function filterPagePath(pathName, fileName) {
    if ( fileName === '_app' || fileName === '_document' ) {
        return;
    }
    let path = '';
    if ( /\[.*\]/.test(fileName) ) {
        path = pathName + '*';
    } else {
        path = pathName + (fileName === 'index' ? '' : fileName);
    }

    path = path.replace('./pages', '');
    path = path[path.length - 1] === '/' ? path.slice(0, path.length - 1) : path;
    return path;
}

module.exports = (path) => {
    //获取文件夹下的所有文件
    const list = readFileList("./pages/", {});
    return list;
}
