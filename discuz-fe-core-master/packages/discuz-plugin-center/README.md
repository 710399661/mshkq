# 插件开发

随着Discuz !Q的使用用户越来越广泛，每个站点都会有它一定的特殊性和定制性，为了丰富Discuz !Q的功能以及多样性，Discuz !Q官方提供插件体系，可以让开发者对特定的场景进行深入的定制，满足各种各样的场景和需求。

目前插件只支持本地插件重新编译才能生效，后续会逐步提供以下能力：

- [x]  web端插件热插拔
- [ ]  管理后台插件配置界面
- [x]  标准插件模板生成工具
- [x]  自定义插件目录位置

后续可能会改动的内容：
- 插件文件目录规范

## 环境要求
当前项目依赖必须满足以下条件
- @discuzq/cli版本必须 >= 1.1.6
- @discuzq/discuz-plugin-loader版本必须 >= 1.0.3

## 开发环境
- node版本建议使用14.x的版本
- 系统建议使用win10或mac进行开发

<!--<TextMenu>-->
- 插件组件开发
  - [x] [feStart](./docs/architecture.md) - 插件架构
  - [x] [feMain](./docs/entry.md) - 插件入口文件
  - [x] [feAdapter](./docs/adapter.md) - 多端适配器
  - [x] [store](./docs/store.md) - 插件数据存储
  - [x] [connect](./docs/connect.md) - 插件数据通信
  - [x] [feSample](./docs/sample.md) - 开始做一个插件
  - [x] [pagePlugin](./docs/page_plugin.md) - 页面插件开发
- 插件接口开发
  - [x] [beStart](./docs/be/start.md) - 后端插件介绍
  - [x] [beSample](./docs/be/sample.md) - 开始做一个插件
- 页面标识列表
  - [x] [commonProps](./docs/hooks/common_props.md) - 通用属性
  - [x] [pluginSystemHooks](./docs/hooks/plugin_system_hooks.md) - 全局
  - [x] [pluginGlobalHooks](./docs/hooks/plugin_global_hooks.md) - 公共
  - [x] [pluginIndexHooks](./docs/hooks/plugin_index_hooks.md) - 首页
  - [x] [pluginDetailHooks](./docs/hooks/plugin_detail_hooks.md) - 帖子详情页
  - [x] [pluginPostHooks](./docs/hooks/plugin_post_hooks.md) - 发帖页
  - [x] [pluginUserCenterHooks](./docs/hooks/plugin_user_center_hooks.md) - 个人中心
- 页面标识列表
  - [x] [hooksDevelop](./docs/hooks/hook_develop.md) - 钩子开发
<!--</TextMenu>-->


