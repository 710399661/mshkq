# Discuz-Cli
易用高效的`Discuz! Q`脚手架

## 介绍
`Discuz-Cli` 是`Discuz! Q`的项目初始化工具以及构建集成工具。为用户集成了web端构建以及小程序多端同构的能力。并生成规范的模板，用于二次开发和深度开发使用。

## 依赖

> 请安装对应的依赖版本，依赖版本不同可能导致错误

`Discuz-Cli`是基于 [Taro](https://taro-docs.jd.com/taro/docs/README) 和 [Next](https://nextjs.org/) 进行上层封装，提供了小程序的多端同构能力以及web端构建能力，Next还提供了`SSR`的服务，更有利于`SEO`的优化。

一般情况下，不需要关注`Taro`和`Next`的使用，因为`Discuz-Cli`已经对两个工具进行了上层封装，通过调用`Discuz-Cli`提供的命令即可进行对`Taro`和`Next`的能力的调用。如果需要对`Taro`和`Next`进行自定义的封装，那么可以查看相关文档。

| 依赖库 | 版本 | 
|  ----  | ----  |
| React | 17.0.1 | 
| Next | 10.0.7 | 
| Taro | 3.0.27 | 

## 安装

```bash
npm install @discuzq/cli
```

<!--<ComponentTOC>-->
- 命令
  - [x] [dev](./cli/dev.md) - 开发模式
  - [x] [build](./cli/build.md) - 构建
  - [x] [start](./cli/start.md) - 启动 SSR 服务
  - [x] [update](./cli/update.md) - 更新核心依赖
  - [x] [plugin](./cli/plugin.md) - 插件开发
<!--</ComponentTOC>-->
