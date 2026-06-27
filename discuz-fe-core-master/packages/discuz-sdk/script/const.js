/**
 * api 名称前端，这个主要是根据数据的 CRUD 规则来进行命名的。
 * 这样也能够明确自己新建的 api 请求方法的含义
 */
const requestNamePrefix = {
  read: 'read（读取数据）',
  create: 'create（创建数据）',
  update: 'update（更新数据）',
  delete: 'delete（删除数据）',
  space: '不需要前缀',
};

/**
 * api 所属模块
 */
const apiModules = {
  content: '内容',
  login: '注册登录',
  pay: '支付',
  user: '用户信息',
  notice: '通知',
  other: '其它',
  admin: '管理后台',
  plugin: '插件',
};

/**
 * 请求方法
 */
const requestMethod = {
  // GET方法请求一个指定资源的表示形式. 使用GET的请求应该只被用于获取数据.
  GET: 'GET',
  // HEAD方法请求一个与GET请求的响应相同的响应，但没有响应体.
  HEAD: 'HEAD',
  // POST方法用于将实体提交到指定的资源，通常导致在服务器上的状态变化或副作用.
  POST: 'POST',
  // PUT方法用请求有效载荷替换目标资源的所有当前表示
  PUT: 'PUT',
  // PATCH方法用于对资源应用部分修改
  PATCH: 'PATCH',
  // OPTIONS方法用于描述目标资源的通信选项
  OPTIONS: 'OPTIONS',
  // TRACE方法沿着到目标资源的路径执行一个消息环回测试
  TRACE: 'TRACE',
  // CONNECT方法建立一个到由目标资源标识的服务器的隧道
  CONNECT: 'CONNECT',
  // DELETE方法删除指定的资源
  DELETE: 'DELETE',
};

module.exports = {
  requestNamePrefix,
  requestMethod,
  apiModules,
};
