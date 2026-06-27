# 环境配置常见问题

### Discuz! Q 3.0对服务器配置要求有变动吗？
- 3.0推荐配置和2基本一致，`php7.2 ~ 7.4、MySQL 5.7.9` 版本以上或 `MariaDB 10.2` 以上，服务器环境`linux、windows、docker`，开源应用中心。

&emsp;

### 0624版本安装完之后首页出现服务器内部错误
- 检查下服务器伪静态设置，重启服务器，参考文档https://discuz.com/docs/

&emsp;

### 新安装的站点，打开首页提示“服务器错误 SERVER ERROR”
- 请检查服务器环境的伪静态设置，具体参考文档  [#基于手动配置的环境](https://discuz.com/docs/Linux%20%E4%B8%BB%E6%9C%BA.html#%E5%9F%BA%E4%BA%8E%E6%89%8B%E5%8A%A8%E9%85%8D%E7%BD%AE%E7%9A%84%E7%8E%AF%E5%A2%83)

&emsp;

### 新安装站点之后，管理员登录提示登录次数超出限制
- php版本过高（暂不支持8.0版本），切换`php7.25 ~ 7.4`即可
