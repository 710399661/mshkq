# API 集合

## 安装
> TODO: 目前此包没有上传到任何的包管理平台，暂时没有安装方式

### 使用

如果在项目中使用的话，直接进行相关的引入即可

```jsx
/**
 * 引入的 http 是已经实例化之后的请求方法
 * 引入的 readThreadList 是已经实现的接口请求
 */
import { http, readThreadList } from '@discuz/sdk/lib/api';
```

有两种方法进行请求配置的改造
1. 直接对引入的 `http` 实例进行相关的默认配置，一些配置同 [https://github.com/axios/axios#request-config](https://github.com/axios/axios#request-config)

  ```jsx
  // 对请求实例进行基础 URL 设置
  http.defaults.baseURL = 'http://new.discuz.com';

  // 响应结果进行设置
  http.interceptors.response.use((res) => {
    const { data, status } = res;
    console.log(status);
    // 可以进行一些针对状态的错误处理 handleError(status)
    return data;
  })
  ```

2. 直接在要请求的接口方法传入相关的配置
  ```jsx
  readThreadList({
    baseURL: 'http://new.discuz.com',
    params: {},
  })
  ```

## API 开发说明

### 开发规范

1. 文件名
   - 使用 `全小写短横线连接符` 的命名方式
   - 动名词的形式：动词为数据库增删改查，这样能够明确 `api` 的含义。即为 `read`（读取数据），`create`（创建数据），`update`（更新数据），`delete`（删除数据）。
   - 例如，文件名可为：`read-threaddetail`，`update-theaddetail` 等

2. `api` 方法名
   - 使用 `小写开头的驼峰` 的命名方式
   - 例如，方法名可为：`readThreadDetail`，`updateTheadDetail` 等

3. 代码规范遵循仓库设置的 `eslint` 规范

### 创建 api 初始文件
> 创建 `api` 文件的时候，可以直接使用项目 `README.md` 中关于 `api` 文件初始化的创建命令进行创建，这样可以直接生成一个文件
> TODO: 说明：后期迁移到 `discuz-cli` 工具中，就可以直接使用 `cli` 命令了

1. `npm script` 的方式
```bash
# 1. npm script
$ npm run dzq-sdk init api

> @discuz/sdk@0.0.1 dzq-sdk /Users/angelzou/code/discuzq/discuz-core/packages/discuz-sdk
> node ./script/sdk.cli.js "init" "api"


-------------------------------------------------------
██████╗ ███████╗ ██████╗       ███████╗██████╗ ██╗  ██╗
██╔══██╗╚══███╔╝██╔═══██╗      ██╔════╝██╔══██╗██║ ██╔╝
██║  ██║  ███╔╝ ██║   ██║█████╗███████╗██║  ██║█████╔╝
██║  ██║ ███╔╝  ██║▄▄ ██║╚════╝╚════██║██║  ██║██╔═██╗
██████╔╝███████╗╚██████╔╝      ███████║██████╔╝██║  ██╗
╚═════╝ ╚══════╝ ╚══▀▀═╝       ╚══════╝╚═════╝ ╚═╝  ╚═╝
-------------------------------------------------------
        DZQ-CLI Copyright © 2021 DZQ-FE
-------------------------------------------------------

? 请选择要创建的 API 名称前缀 read（读取数据）
? 请输入要创建的名称，首字母大写（比如：前缀选择的是 read，这里输入的是 Thread，那么最终请求名称为：readThread） ThreadList
? 请选择请求类型 GET
? 请输入 API 的描述信息
? 创建的 API 文件存储目录（./src/api/） ./src/api/
? 继续？ Yes
创建的 API 名称为：read（读取数据）ThreadList
API 的请求方法为：GET
API 的描述信息为：
[00:14:41] [conflict] Creating read-threadlist.js
API 文件创建成功，地址：./src/api/read-threadlist.js
```

2. `node bin` 的方式
```bash
# node bin
$ npm link
$ dzq-sdk init api
# 如上同样的问答式的创建 api 文件的提示
```

## API
* [x] [readThreadList](./interface/read-threadlist)
* [ ] readThreadDetail
