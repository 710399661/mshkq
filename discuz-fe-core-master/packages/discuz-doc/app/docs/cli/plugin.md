# 插件开发

基于Discuz !Q 3.0的插件体系，`cli`提供一系列的构建能力支持插件开发。让开发者专注于插件开发本身，构建相关的能力无需过多关心。

## 使用命令
```
dzq plugin
```

| 参数 | 类型 | 默认值 | 可选值 | 描述 | 是否必填 |
| :- | :- | :- | :- | :- | :- |
| -b, --build | boolean | true | true/false | 以生产模式构建插件 | 否 |
| -p, --publish | boolean | false | true/false | 以生产模式构建插件，并且自动压缩zip包 | 否 |
| -w, --watch | boolean | false | true/false | 以开发模式构建插件，持续监听并自动重新构建 | 否 |
| -s, --server | boolean | false | true/false | 以开发模式构建插件，持续监听并自动重新构建并开启一个本地服务 | 否 |
| -a, --analyzer | boolean | false | true/false | 对插件包体积进行分析 | 否 |
| -i, --init | boolean | false | true/false | 初始化一个标准的插件目录 | 否 |

> 可使用`dzq plugin --help`查看参数描述

