const projectPackage = require('../utils/getProjectPkg')();
const corePackages = require('../utils/getCorePackageList');
const getLogo = require('../utils/getLogo');
module.exports = (yamlConfig) => {
    const map = {};
    let str = `Discuz!Q 3.0\n依赖核心库版本: \n当前版本：${yamlConfig.VERSION}\n`;
    if ( projectPackage ) {
        const { dependencies, devDependencies } = projectPackage;
        for ( let i = 0; i < corePackages.length; i++ ) {
            map[corePackages[i]] = dependencies[corePackages[i]] || devDependencies[corePackages[i]] || 'NULL';
        }
    }
    for ( let key in map ) {
        str += `${key}: ${map[key]}\n`;
    }

    str += `构建时间: ${new Date().toString()}`;
    console.log(str)
    return str;
}