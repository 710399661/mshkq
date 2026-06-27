const cwd = process.cwd();

module.exports = {
  PACKAGE_FILE_NAME: 'package.json',
  DEFAULT_BUILD_NEXT_DIR_NAME: 'build',
  DEFAULT_STATIC_BUILD_NEXT_DIR_NAME: 'build-static',
  DEFAULT_STATIC_BUILD_NEXT_DIR_NAME_LAST: 'static',
  DEFAULT_STATIC_BUILD_NEXT_DIR_NAME_SYMBLIC_LINK: '-',

  DEFAULT_COMMON_CONFIG_FILE_PATH: '../common/config/index.js',

  ENV_DEV: 'develop',
  ENV_PROD: 'production',

  ENV_SSR: 'ssr',
  ENV_STATIC: 'static',

  PLATFORM_WEB: 'web',
  PLATFORM_MINI: 'mini',

  DEFAULT_NEXT_PROJECT_TEMPLATE_PATH: '../template/next-default',
  DEFAULT_TARO_PROJECT_TEMPLATE_PATH: '../template/taro-default',

  AVAILABLE_TYPES: ['weapp'],

  // 提示类
  MS_NOT_FIND_NEXT_CONFIG: '没有找到next配置文件',
  MS_NOT_FIND_NEXT_COMMAND: '项目中没有找到Next，请确认是否安装，npm install next --save-dev',

  MS_NOT_FIND_TARO_COMMAND: '项目中没有找到Taro， 请确认是否安装， npm install @tarojs/cli --save-dev',

  MS_BUILD_START: '项目开始编译...',
  MS_BUILD_DONE: '构建完毕！',
  MS_BUILD_SUCCESS: '项目构建成功！',
  MS_BUILD_ERROR: '项目构建失败！',

  MS_STATIC_EXPORT_START: '静态资源开始编译...',
  MS_STATIC_EXPORT_SUCCESS: '输出静态站点资源成功！',
  MS_STATIC_EXPORT_ERROR: '输出静态站点资源失败！',

  MS_INIT_PROJECT: '开始创建项目...',
  MS_INIT_FAIL: '初始化失败!',
  MS_INIT_SUCCESS: '完成项目初始化',
  MS_INSTALL_START: '开始进行项目依赖安装...',
  MS_INSTALL_SUCCESS: '项目依赖完成成功！',
  MS_INSTALL_ERROR: '项目依赖安装失败，可以自行尝试进入项目执行 -> npm install',

  MS_SERVER_START: '启动服务...',
  MS_SERVER_LISTEN_HASTNAME: '服务监听hostname地址:',
  MS_SERVER_LISTEN_PORT: '服务监听ip端口为:',
  MS_SERVER_RUNTIME_ADDRESS: '服务运行地址:',

  MS_DIR_EXIST: '已经存在该目录！',

  // DEBUG
  DZQ_DEBUG_INFO: 'dzq_info',
  DZQ_DEBUG_WARN: 'dzq_warn',
  DZQ_DEBUG_ERROR: 'dzq_error',

  // update
  MS_UPDATE_NO_FIND_PACKAGE: '没有找到项目package.json',
  MS_UPDATE_CHECK_LOCAL_PACKAGE: '检查本地package.json中core版本信息...',
  MS_UPDATE_CHECK_LOCAL_PACKAGE_DONE: '检查本地package.json完成',
  MS_UPDATE_CHECK_NEW_CORE_VERSION: '检查远程core版本信息...',
  MS_UPDATE_CHECK_NEW_CORE_VERSION_DONE: '检查远程core版本信息完成',
  MS_UPDATE_RUN_UPDATE: '开始进行core依赖更新...',
  MS_UPDATE_RUN_UPDATE_DONE: 'core依赖更新成功',
  MS_UPDATE_RUN_UPDATE_FAIL: 'core依赖更新失败',
  MS_NO_UPDATE: 'core已经最新，无需更新',

  DZQ_CONFIG_YAML: 'dzq.config.yaml',
  SLS_CONFIG_YAML: 'sls.config.yaml',
  TARO_PROJECT_CONFIG_FILE_NAME: 'project.config.json',

  MINI_PLUGIN_DIR_NAME: 'pluginPages',
  MINI_PLUGIN_CONFIG_PATH: '.pluginConfig.js',
  MINI_PAGE_CONFIG_FLIE_NAME: 'index.config.js',

  PLUGIN_IMPORT: '开始加载私有插件...',
  PLUGIN_IMPORT_SUCCESS: '加载私有插件成功！',
  PLUGIN_IMPORT_ERROR: '加载私有插件失败！',
  
};
