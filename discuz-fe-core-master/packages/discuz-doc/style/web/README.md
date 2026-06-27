# TDesign-web 说明

- 该仓库用于web端（含 Vue 和 React ）的 TDesign 组件库的样式文件和 html 文件
- 使用 less 来管理和编写样式
- 基于PBEM命名，其中 `P` 代表 `Prefix`，`B` 代表 `Block` ，`E` 代表 `Element` ， `M` 代表 `Modifier`。更详细规范及命名推荐，请查看 [CSS 命名规范](https://iwiki.oa.tencent.com/pages/viewpage.action?pageId=144675988)
- [组件名称命名规则](https://iwiki.oa.tencent.com/pages/viewpage.action?pageId=109618546)


### 文件目录说明
```
web
├── dist                        // 编译后的样式文件和图片素材
├── docs                        // 文档示例相关的样式
│   ├── button-docs.less        // 针对单个组件示例补充的样式，开发也会按UI开发提供的示例来排版
│   └── ...
├── components                  // 组件样式
│   ├── button
│   │   ├── _index.less         // 组件的主样式文件，内含 base.less、自己变量/函数 及 相关依赖
|   |   ├── _mixin.less         // 组件的 mixin 文件
|   |   ├── _var.less           // 组件的变量文件
│   │   └── index.html          // 组件的html结构
│   ├── ...
│   └── index.less              // 统一引入各个组件样式的出口文件
├── assets                      // icon/图片素材
│   ├── image
│   │   ├── name.svg            // 各类图标
│   │   └── ...                 // 组件的html结构
├── mixins                      // 可复用
│   ├── _clearfix.less          // 清除浮动
│   ├── ...
│   └── _index.less             // mixin 统一入口
├── utilities                   // 定义可复用的代码片段,且可单独使用
│   ├── _float.less
│   └── index.less              // utilities 统一入口
├── theme                       // UI主题风格样式
│   ├── ...
│   └── index.less              // 覆盖默认主题
├── _reset.less                 // 重置标签默认样式
├── _variables.less             // 全局变量
├── base.less                   // 基础样式（内含 _reset.less 和 _variable.less）
├── docs.less                   // 示例的公共样式
├── index.less                  // 统一引入UI库所有样式的出口文件
└── index.js                    // webpack 入口文件，含各组件的主样式
```

### 开发
#### 浏览器支持
- IE 11以上
- chrome等其他现代浏览器

#### 初始化
`name`为组件名（[命名规则参考]((https://iwiki.oa.tencent.com/pages/viewpage.action?pageId=109618546))）
##### 方式一：脚手架（推荐）

安装
```
# 1. 全局安装 Feflow-CLI
tnpm install @feflow/cli -g

# 2. 安装本脚手架
fef install @tencent/generator-tdesign-ui
```

使用

> 脚手架初始化时选择 tnpm。如果误选，可以通过 `fef config set packageManager tnpm` 进行重置。

```
# 切换到 web 或者 mobile 目录，运行以下命令
fef init

# 选择「TDesign UI 开发」
? 您想要创建哪种类型的工程? TDesign UI 开发

# 输入组件名称（必须）和组件描述（可选）
? 组件名称： <name>
? 组件功能描述： <description>（默认为TDesign <对应的组件名> 组件的基本样式）
```

注：开发者自动读取的git的用户名。
（感谢脚手架提供者：tentenli）

##### 方式二：手动拷贝
复制 `a-template` ，修改为组件名，里面有需要的默认文件（如有同学愿意可帮忙开发一个自动化工具）。
几个关键点：
- `components` 下创建组件文件夹
- 修改 `index.html` 开发者信息及 `title`信息(可在该组件文件夹下搜索`<name>`替换)。
- `components` 下的 `_index.less` 增加组件主样式 （注意依赖顺序关系）
- `index.js` 增加组件样式入口
- 如果有示例样式，添加到 `/docs/<name>.css`，并在`docs.css`里引入


#### 启动
`style/web`目录下，启动项目，主要用于less编译。html可通过本地服务的方式实现热更新（如 VS Code 的 Live Server）
```
npm run start
```

### 如何使用 icon
首先，在组件 index.html 中引入图标样式表，`<link rel="stylesheet" href="http://radosgw.open.oa.com/bkicon-default-9/tdesign-web-0.0.1/fonts/style.css">` 。可参考 button/index.html。(如果使用初始化脚本，该样式表会自动插入 index.html)

而后，便可按照如下方式使用图标：

```html
<!-- i 标签 -->
<i class="t-icon t-icon-prompt_fill"></i>
<!-- 或者 span 标签 -->
<span class="t-icon t-icon-prompt_fill"></span>
```

TDesign-Web 图标库：http://bkicon.oa.com/resource/project/94/detail

### 相关资料
[web 端设计稿](http://design.oa.com/workspace/prototype/197)
[组件各个模块负责人](https://docs.qq.com/sheet/DWmViVlNvU3p2VHZs?tab=l52925&c=A1B0A0)
[UI开发排期](https://docs.qq.com/sheet/DWmViVlNvU3p2VHZs?tab=bvypmx&c=E8A0A0)