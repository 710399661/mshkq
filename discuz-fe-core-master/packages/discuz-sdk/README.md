# Discuz-SDK
> 主要是用于 Discuz Q 项目的一些基础类库以及后端 API 的调用
> 后期应该会接入 i18n，monitor 等能力

## 构建
1. 生成文档
```bash
$ npm run docs
```

2. babel 转义
```bash
$ npm run build
```

## API 开发时，初始文件创建方式
> TODO: 说明：后期迁移到 `discuz-cli` 工具中，就可以直接使用 `cli` 命令了

1. `npm script` 的方式
```bash
# 1. npm script
$ npm run dzq-sdk init api
```
![](https://main.qcloudimg.com/raw/62d62c4ac6154f2044087787012baedd.png)

2. `node bin` 的方式
```bash
# node bin
$ npm link
$ dzq-sdk init api
# 如上同样的问答式的创建 api 文件的提示
```

## 本地开发

1. 监听文件变化
```bash
$ npm run watch
# 然后可以进入到对应的 demo 文件夹中运行 demo 的开发命令即可，如：
# taro-demo
$ npm run dev:taro
# uniapp-demo
$ npm run dev:uniapp
# nextjs-demo
$ npm run dev:next
```

2. demo 测试
> 目前可以使用 `npm link` 的方式来模拟真正的引入方式进行本地的测试
1）在项目根目录中运行命令：`npm link`
2）在 `examples` 中的项目中关联引用本地开发的库：`npm link @discuzq/sdk`
3）在代码中进行包引入，例如：

```javascript
// 可以使用 `npm link` 的方式来模拟真正的引入方式进行本地的测试
import { getForum } from '@discuzq/sdk/dist/api/forum/get-forum';
// 也可以直接使用本地路径的方式来引入
// import { getForum } from '../../../src/api'
```

<!--<ComponentTOC>-->
- API
  - [x] [API](./src/api) - 接口
- Storage
  - [x] [LocalStorage](./src/localstorage) - 存储
- Router
  - [x] [Router](./src/router) - 路由
<!--</ComponentTOC>-->

- 如果是 `uniapp` 项目：在 `vue.config.js` 文件中进行相关的 `webpack` 设置
  ```javascript
  const webpack = require('webpack');
  // 定义 discuz 环境变量
  const DISCUZ_ENV = process.env.VUE_APP_PLATFORM === 'h5' ? 'web' : 'uniapp';

  module.exports = {
    configureWebpack: config => {
      config.plugins = [
        ...config.plugins,
        new webpack.DefinePlugin({
          'process.env.DISCUZ_ENV': JSON.stringify(DISCUZ_ENV)
        })
      ]
    },
  };
  ```

- 如果是 `taro` 项目：在 `config/index.js` 中设置：
  ```javascript
  // 定义 discuz 环境变量
  const DISCUZ_ENV = process.env.TARO_ENV === 'h5' ? 'web' : 'mini';

  const config = {
    ... ...,
    defineConstants: {
      'process.env.DISCUZ_ENV': JSON.stringify(process.env.DISCUZ_ENV),
    },
    ... ...,
  }
  ```

- 如果是 `nextjs` 项目：在 `next.config.js` 文件中设置：
  ```javascript
  module.exports = {
    env: {
      DISCUZ_ENV: 'web',
    },
  }
  ```

### 开发时环境判断
1. 统一构建变量（CLI、UI、SDK、Plugin）。利用 `webpack` 的 `definePlugin` 定义的变量。这样在构建的时候只会根据环境变量来进行区别不同的环境依赖情况。
- 1）`process.env.DISCUZ_ENV === 'web'`：只构建 `web` 相关的依赖
- 2）`process.env.DISCUZ_ENV === 'mini'`：只构建小程序相关的依赖
- 3）`process.env.DISCUZ_ENV === 'uniapp'`：只构建 `uniapp` 相关的依赖

2. 如果涉及到不同端使用库的开发，请注意要有入口文件进行不同环境的判断，如：
```javascript
/**
|-- request
| |-- index.js
| |-- adapter
| | |-- taro.js
| | |-- uniapp.js
*/
import axios from 'axios';
import defaultConfig from './defaults';

const request = axios;

// 设置默认配置
request.defaults = { ...request.defaults, ...defaultConfig };

if (process.env.DISCUZ_ENV === 'mini') {
  // taro项目的小程序
  const adapter = require('./adapter/taro.js');
  request.defaults.adapter = adapter.taroAdapter;
}
if (process.env.DISCUZ_ENV === 'uniapp') {
  // 给 uniapp 项目预留的口子，主要是因为要兼容老的项目的使用
  const adapter = require('./adapter/uniapp.js');
  request.defaults.adapter = adapter.uniAdapter;
}

export { request };
export default request;
```

## 目录结构说明
```javascript
|-- .vscode
|-- docs              // 生成的说明文档
|-- examples          // 项目 demo
|-- lib               // babel 编译之后生成的目录
|-- src               // 源代码
| |-- api             // api 接入
| | |-- index.js
| | |-- entry.js      // api 请求入口
| | |-- login         // 登录
| | |-- ... ...
| |-- request         // 请求
| |-- localstorage    // 本地缓存
| |-- utils           // 工具库
| | |-- type.js       // 类型判断
| | |-- index.js
| | |-- ... ...
```

## 依赖
1. [axios](https://github.com/axios/axios)

## TODO
1. - [x] 工具库 `request` 封装（主要是在 `axios` 的基础上增加不同的适配器）
2. - [ ] API 接入
   1. [x] API 入口请求文件
   2. [x] API 增加入参类型校验
   3. [ ] API 配置文件生成
3. - [ ] 工具库 & 工具函数
   1. - [x] 本地缓存
   2. - [x] 类型判断
   3. - [x] 平台 Api 获取（主要是针对小程序的处理）
4. - [ ] 单元测试
5. - [ ] 构建
   1. - [x] babel
   2. - [ ] rollup 【`require` 问题】
   3. - [ ] webpack
6. - [ ] 文档生成
   1. - [x] JSDoc
   2. - [ ] 其它：和 UI | CLI 统一
   3. - [ ] 可交互文档
7. - [ ] 安装使用
   1. - [ ] 包引入【待和 UI | CLI 统一】
   2. - [ ] cdn 【待完善整包构建：rollup 或 webpack】