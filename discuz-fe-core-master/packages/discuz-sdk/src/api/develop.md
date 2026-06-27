
## api 说明

## 规范
> 创建 `api` 文件的时候，可以直接使用项目 `README.md` 中关于 `api` 文件初始化的创建命令进行创建，这样可以直接生成一个文件

1. 目前分为 6 个模块： `内容（content）`，`注册登录（login）`、`用户信息（user）`、`订单支付（pay）`、`通知（notice）`、`其它（other）`

2. 文件名
- 使用 `全小写短横线连接符` 的命名方式
- 动名词的形式：动词为数据库增删改查，这样能够明确 `api` 的含义。即为 `read`（读取数据），`create`（创建数据），`update`（更新数据），`delete`（删除数据）。
- 例如，文件名可为：`read-threaddetail`，`update-theaddetail` 等

3. `api` 方法名
- 使用 `小写开头的驼峰` 的命名方式
- 例如，方法名可为：`readThreadDetail`，`updateTheadDetail` 等

4. 代码规范遵循仓库设置的 `eslint` 规范

## 开发说明

1. 安装依赖
  ```
  $ npm install
  ```

2. `API` 接入开发

1）创建基础文件。注：这里开发哪个类别的接口就选择对应的类别即可
- `npm script` 的方式
 ```
 $ npm run dzq-sdk init api        # 运行这个命令可以可以自动生成要开发的 api 初始文件
 ```

- `node bin` 的方式
 ```bash
 # node bin
 $ npm link
 $ dzq-sdk init api
 ```

![](https://main.qcloudimg.com/raw/62d62c4ac6154f2044087787012baedd.png)

2）根据接口文档进行规则校验
- 接口文档：https://docs.qq.com/doc/DZUxReXVlRmNoUXRq
- 如上`创建基础文件`里面，新增了一个 `createThread` 创建文章的接口。文件地址：`./src/api/content/create-thread.js`。内容如下。其中 `validateRules` 变量和请求参数中的 `url` 变量需要根据接口文档进行更新。

```javascript
/**
 * 描述：创建帖子
 */
/**
 * 入参验证规则，具体配置请看：https://github.com/yiminghe/async-validator
 *
 * @example
 *  const validateRules = {
 *    name: {
 *      type: 'number',
 *      required: true,
 *    },
 *  };
 */
const validateRules = {};

/**
 * 描述：创建帖子
 * 请求方式：POST
 * @param {axios config} opt 请求配置信息
 * @returns {promise}
 */
export async function createThread(opt = {}) {
  try {
    const { params = {}, data = {}, ...others } = opt;
    const options = {
      url: '', // 请求地址
      method: 'POST',
      params,
      data,
      ...others,
      validateRules,
    };
    const result = await request.dispatcher(options);
    return result;
  } catch (error) {
    return error;
  }
};
```

3）在入口文件中引入接入号的 API
- 管理后台的接口，统一的入口文件是：`./admin.js`
- 除管理后台的接口，统一的入口文件是 `./index.js`

4）测试
- 开启代码文件变动监听
```
$ npm run watch
```

- 运行demo项目
```
$ npm run dev:next        # 运行此命令会开启 examples/next-demo 项目
```
在 demo 里面运行 api，查看数据是否返回成功

5）验收
- 基于 master 分支新开分支，分支命名：`feature/\[你的名字\]/\[api名称\]`，比如 `feature/angelzou/readThreadList`
- 完成一个功能就提交一个 PR。PR 要求：
  1）标题：实现 *** 的接入，比如：实现读取帖子列表的接入
  2）内容：附上请求截图（请求 + 响应结果）
