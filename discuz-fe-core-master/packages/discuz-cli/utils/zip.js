const compressing = require('compressing');
const fs = require('fs');
const path = require('path');
const pipe = require('multipipe');
const errlog = require('./console/errorLog');
const infolog = require('./console/infoLog');
const log = require('./console/log');
async function zipStatic(list, target) {
    return new Promise(async (res) => {
        infolog('开始压缩资源文件，过程可能会比较长，请耐心等待...');
        const zipStream = new compressing.zip.Stream();
        for ( let i = 0; i < list.length; i++ ) {
            zipStream.addEntry(list[i], {ignoreBase:false});
        }
    
        const destStream = fs.createWriteStream(target);
        pipe(zipStream, destStream, (err) => {
            if (err) {
                errlog(err);
                res(false);
            } else {
                log('压缩完成！');
                res(true);
            }
            
        })
       
    })
    

}

module.exports = zipStatic;