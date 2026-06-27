### Discuz! Q 3.0技术架构有那些变动？

- 2.x后端基于laravel，后期的版本已慢慢过渡到lumen，2.X前端基于vue、nuxt、uni-app；

- 3.0后端基于lumen，3前端基于react、next、taro，另外3.0前端的H5/PC/小程序的代码都收归到一个仓库

- Next官网：https://www.nextjs.cn/

- Taro官网：https://taro.jd.com/

&emsp;

### 买的服务都吃灰了，还等不到一个稳定的版本？

- 你不开始，永远不会开始；想到就马上去做

&emsp;

### Discuz! Q 3.0的接口地址和数据结构有变化吗？

- 部分接口地址重写，方便二次开发，具体可参考项目根目录`/routes/apiv3.php`；数据结构改动不大，升级会自动执行数据库迁移的脚本
