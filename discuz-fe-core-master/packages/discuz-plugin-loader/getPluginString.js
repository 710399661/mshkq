const path = require('path');

module.exports = (list) => {
    const DZQ_PLUGIN_CENTER_TEMPLATE = `import DZQPluginCenter from '@discuzq/plugin-center'\n`;
    let str = DZQ_PLUGIN_CENTER_TEMPLATE;
    if (list) {
        for ( let i = 0; i < list.length; i++ ) {
            const { _private, _cwd } = list[i];
            const name = `${list[i].pluginName}__${list[i].hookName}__${Date.now()}__${Math.ceil(Math.random() * 100000)}`;
            
            // 外部插件引用路径进行修改
            if ( _private ) {
                str += `import ${name} from '${path.posix.join(`@common/plugin/${list[i].filePath}`)}'\nDZQPluginCenter.register(${name});\n`;
            } else {
                const pluginPath = path.resolve(_cwd, list[i].filePath);
                str += `import ${name} from '${pluginPath}'\nDZQPluginCenter.register(${name});\n`;
            }
          
        }
    }
    return str;
}