const commander = require('commander');
const pkg = require('./package.json');
const warnlog = require('./utils/console/warnlog');
const commandDone = require('./utils/console/command_done');
const { AVAILABLE_TYPES } = require('./constants');
const init = require('./script/init');
const dev = require('./script/dev');
const sls = require('./script/sls');
const build = require('./script/build');
const start = require('./script/start');
const update = require('./script/update');
const plugin = require('./script/plugin')

const program = new commander.Command();

program
  .version(pkg.version, '-v, --version')
  .usage('[option] | dzq [command]')
  .action(() => {
    // 没有命中任何命令
    warnlog('Your current command does not exist, please read the documentation carefully!');
    warnlog('You can enter the following command：dzq --help');
  });

program
  .command('init <projectName>')
  .option('-p, --platform <platform>', 'init project for platform <web/mini>', 'web')
  .description('Initialize the project for what platform')
  .action(async (name, options) => {
    const result = await init(name, options);
    if (result) {
      commandDone('ok', 'dzq init project task done!');
      process.exit(0);
    } else {
      commandDone('err', 'dzq init project task error!');
      process.exit(1);
    }
  });

program
  .command('update')
  .description('update project discuzq-core')
  .action(async () => {
    const result = await update();
    if (result) {
      commandDone('ok', 'dzq update core success!');
      process.exit(0);
    } else {
      commandDone('err', 'dzq update core error!');
      process.exit(1);
    }
  });

program
  .command('dev')
  .addOption(new commander.Option('-p, --platform <platform>', 'init project for platform <web/mini>')
    .default('web')
    .choices(['web', 'mini']))
  .addOption(new commander.Option('-t, --type <typeName>', `dev type, ${AVAILABLE_TYPES.join(',')}, but project must mini project!`)
    .default(AVAILABLE_TYPES[0])
    .choices(AVAILABLE_TYPES))
  .option('-plugin, --plugin <pluginPath>', 'private plugin dir', '')  
  .option('-port, --port <port>', 'A port number on which to start the application', '3000')
  .option('-H, --hostname <hostname>', 'Hostname on which to start the application (default: 0.0.0.0)', '0.0.0.0')
  .description('develop dzq project')
  .action(async (options) => {
    const result = await dev(options);
    if (result) {
      commandDone('ok', 'dzq develop project task done!');
      process.exit(0);
    } else {
      commandDone('err', 'dzq develop project task error!');
      process.exit(1);
    }
  });

program
  .command('build')
  .addOption(new commander.Option('-p, --platform <platform>', 'init project for platform <web/mini>')
    .default('web')
    .choices(['web', 'mini']))
  .addOption(new commander.Option('-t, --type <typeName>', `dev type, ${AVAILABLE_TYPES.join(',')}, but project must mini project!`)
    .default(AVAILABLE_TYPES[0])
    .choices(AVAILABLE_TYPES))
  .option('-plugin, --plugin <pluginPath>', 'private plugin dir', '') 
  .option('-s, --staticSite', 'export the static site project', false)
  .description('build dzq project')
  .action(async (options) => {
    const result = await build(options);
    if (result) {
      commandDone('ok', 'dzq build project task done!');
      process.exit(0);
    } else {
      commandDone('err', 'dzq build project task error!');
      process.exit(1);
    }
  });

program
  .command('start')
  .option('-port, --port <port>', 'A port number on which to start the application', '3000')
  .option('-H, --hostname <hostname>', 'Hostname on which to start the application (default: 0.0.0.0)', '0.0.0.0')
  .option('--no-ssr', 'use static file run server')
  .description('dzq SSR server start')
  .action(async (options) => {
    const result = await start(options);
    if (result) {
      commandDone('ok', 'dzq server start close!');
      process.exit(0);
    } else {
      commandDone('err', 'dzq server start error!');
      process.exit(1);
    }
  });

  program
    .command('sls')
    .option('--no-create', 'no create serverless project')
    .option('-z, --zip', 'zip serverless project', false)
    .option('-c, --cos', 'upload zip file to cos', false)
    .description('dzq SSR serverless build')
    .action(async (options) => {
      const result = await sls(options);
      if (result) {
        commandDone('ok', 'dzq SSR serverless build success!');
        process.exit(0);
      } else {
        commandDone('err', 'dzq SSR serverless build error!');
        process.exit(1);
      }
    });


  program
    .command('plugin')
    .option('-b, --build', 'build plugin component', true)
    .option('-p, --publish', 'publish plugin component', false)
    .option('-w, --watch', 'watch plugin component', false)
    .option('-s, --server', 'watch plugin component open server', false)
    .option('-a, --analyzer', 'open the analyzer', false)
    .option('-i, --init', 'init your plugin project', false)
    .description('dzq develop plugin command')
    .action(async (options) => {
      const result = await plugin(options);
      if (result) {
        commandDone('ok', 'dzq develop plugin command success!');
        process.exit(0);
      } else {
        commandDone('err', 'dzq develop plugin command error!');
        process.exit(1);
      }
    });



const { argv } = process;
program.parse(argv);
