const inquirer = require('inquirer');
const errlog = require('../console/errorLog');
const log = require('../console/log');
const infolog = require('../console/infoLog');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const copydir = require('copy-dir');
const runCommand = require('../../utils/runCommand');

module.exports = async function initPlugin() {
  const cwd = process.cwd();
  const DEFAULT_PLUGIN_CONFIG = {
    name_cn: '',
    name_en: '',
    description: '',
    type: '',
    app_id: '',
    version: '1.0.0',
    status: 1,
    filter_enable: false,
    author: {},
    busi: "",
    view: {
      YourPlugin: {
        target: '请填写使用的target',
        hookName: '请填写使用的hook',
        platform: ['pc', 'h5', 'mini'],
        disables: false,
      },
    },
  };

  const answer = await inquirer.prompt([
    {
      type: 'input',
      message: '请输入开发者名称：',
      name: 'authorName',
      default: '',
      validate: (val) => {
        if (val && val !== '') return true;
        errlog('必须填入开发者名称');
        return false;
      },
    },
    {
      type: 'input',
      message: '请输入开发者邮箱：',
      name: 'authorEmail',
      default: '',
      validate: (val) => {
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (val && val !== '' && reg.test(val)) return true;
        errlog('必须填入合法开发者邮箱');
        return false;
      },
    },
    {
      type: 'input',
      message: '请输入插件中文名字：',
      name: 'name_cn',
      default: '',
      validate: (val) => {
        if (val && val !== '') return true;
        errlog('必须填入插件中文名字');
        return false;
      },
    },
    {
      type: 'input',
      message: '请输入插件英文名字：',
      name: 'name_en',
      default: '',
      validate: (val) => {
        const reg = /[a-zA-Z]+/;
        if (val && val !== '' && reg.test(val)) return true;
        errlog('必须填入插件英文名字');
        return false;
      },
    },
    {
      type: 'list',
      message: '请选择插件类型',
      name: 'type',
      default: '0',
      choices: ['自定义', '新增帖子', '数据导入'],
      filter: (val) => {
        switch (val) {
          case '自定义': return '0';
          case '新增帖子': return '1';
          case '数据导入': return '2';
          default: return '0';
        }
      },
    },
    {
      type: 'input',
      message: '请输入插件描述：',
      name: 'description',
      default: '',
    },
  ])
    .catch((error) => {
      errlog(error);
      return false;
    });

  const data = {
    ...DEFAULT_PLUGIN_CONFIG,
    name_cn: answer.name_cn,
    name_en: answer.name_en,
    description: answer.description,
    type: answer.type,
    author: {
      name: answer.authorName,
      email: answer.authorEmail,
    },
    app_id: crypto.createHash('sha1').update(new Date().getTime() + answer.authorName)
      .digest('hex')
      .slice(0, 13),
  };
  const PROJECT_PATH = path.posix.join(cwd, data.name_en);
  const TEMPLATE_PATH = path.posix.join(__dirname, './pluginTemplate');
  if (!fs.existsSync(PROJECT_PATH)) {
    infolog(`生成插件目录，${PROJECT_PATH}`);
    fs.mkdirSync(PROJECT_PATH);
  }
  infolog('生成插件代码文件...');
  const staticErr = copydir.sync(TEMPLATE_PATH, PROJECT_PATH, {
    utimes: true,  // keep add time and modify time
    mode: true,    // keep file mode
    cover: true,    // cover file when exists, default is true
    // filter: (stat, filepath, filename) => {
    //     if ( reg.test(filepath) ) {
    //         return false;
    //     }
    //     return true;
    // }
  });

  if (staticErr) {
    done = false;
    errorlog('生成插件代码文件失败！！！');
    errorlog(staticErr);
  } else {
    log('生成插件代码文件完成');
  }

  infolog('生成插件配置文件...');
  fs.writeFileSync(path.posix.join(PROJECT_PATH, 'config.json'), JSON.stringify(data, null, '\t'), { encoding: 'utf8' });
  log('生成插件配置文件完成');

  const installResult = await runCommand(path.posix.join(PROJECT_PATH, './View'), 'npm', ['install', '--save-exact']);
  if (!installResult) {
    errorlog('自动安装依赖失败，请稍后手动尝试！！！');
  } else {
    log('依赖安装完成！');
  }

  return true;
};
