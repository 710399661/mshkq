const glob = require('glob');
const path = require('path');
const fs = require('fs');

module.exports = function getEntry() {



    const cwd = process.cwd();
    const srcDir = path.resolve(cwd, './src');
    const files = fs.readdirSync(srcDir);
    const entry = {};

    for ( let i = 0; i < files.length; i++ ) {
        const target = files[i];
        const mainFile = path.resolve(srcDir, target, './main.js');
        if (fs.existsSync(mainFile)) {
            entry[target] = mainFile;
        }
    }
    return entry;

}