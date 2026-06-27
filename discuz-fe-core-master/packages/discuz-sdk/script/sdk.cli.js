#! /usr/bin/env node
/**
 * 暂时直接放到 sdk 里面，后期可以移植到 cli 里面
 */
const chalk = require('chalk'); // https://www.npmjs.com/package/chalk
const commander = require('commander'); // https://www.npmjs.com/package/commander
const inquirer = require('inquirer'); // https://www.npmjs.com/package/inquirer
const path = require('path');
const packageJson = require(path.resolve(__dirname, '../package.json'));
const { getKeyByValue } = require('./utils/get-key-by-value');

const logo = require('./utils/logo');
const caseUtil = require('./utils/case');
const { requestNamePrefix, requestMethod, apiModules } = require('./const');

commander
  .version(packageJson.version, '-V, --version')
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log(' $ dzq-sdk init api');
  });

commander
  .command('init api')
  .description('创建 API 初始文件')
  .action(() => {
    console.log(logo);
    inquirer.prompt([
      {
        type: 'list',
        name: 'destDir',
        message: '请选择 API 所属模块',
        choices: [...Object.values(apiModules)],
      },
      {
        type: 'list',
        name: 'requestNamePrefix',
        message: '请选择要创建的 API 名称前缀',
        choices: [...Object.values(requestNamePrefix)],
      },
      {
        type: 'input',
        name: 'requestName',
        message: '请输入要创建的名称，首字母大写',
        validate(requestName) {
          if (requestName && requestName.trim() === '') return '不能为空';
          if (!caseUtil.isUpperCase(requestName.substr(0, 1))) return '首字母必须大写';
          return true;
        },
      },
      {
        type: 'list',
        name: 'requestMethod',
        message: '请选择请求类型',
        choices: [...Object.values(requestMethod)],
      },
      {
        type: 'input',
        name: 'desc',
        message: '请输入 API 的描述信息',
      },
      {
        type: 'confirm',
        name: 'moveon',
        message: '继续？',
      },
    ])
      .then((answers) => {
        if (!answers.moveon) {
          console.log(chalk.red('你取消了此次操作'));
          process.exit(1);
        }
        const name = `${answers.requestNamePrefix}${answers.requestName}`;
        const prefix = getKeyByValue(requestNamePrefix, answers.requestNamePrefix);
        const module = getKeyByValue(apiModules, answers.destDir);

        console.log(chalk.green(`创建的 API 名称为：${name}`));
        console.log(chalk.green(`API 的请求方法为：${answers.requestMethod}`));
        console.log(chalk.green(`API 的描述信息为：${answers.desc}`));
        console.log(chalk.green(`存储地址：./src/api/${module}`));

        const { apiTemplate } = require('./cli/api');
        const options = { ...answers, requestNamePrefix: prefix === 'space' ? '' : prefix, destDir: `./src/api/${module}` };
        apiTemplate(options);
      });
  });

function exit() {
  console.log(logo);
  commander.outputHelp(); // 输出说明
  process.exit(1); // 退出
}

commander.parse(process.argv);

if (process.argv.length < 3) {
  exit();
}
