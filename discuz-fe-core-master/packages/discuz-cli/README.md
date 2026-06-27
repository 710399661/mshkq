<h1 align="center">discuz-cli</h1>
<p align="center">易用高效的Discuz!Q脚手架</p>

## 介绍
dzq-cli是Discuz!Q的项目初始化工具以及构建集成工具。为用户集成了web端构建以及小程序多端同构的能力。并生成规范的模板，用于二次开发和深度开发使用。

## 依赖

dzq-cli是基于[Taro](https://taro-docs.jd.com/taro/docs/README)和[Next](https://nextjs.org/)进行上层封装，提供了小程序的多端同构能力以及web端构建能力，Next还提供了SSR的服务，更有利于SEO的优化。

一般情况下，不需要关注Taro和Next的使用，因为dzq-cli已经对两个工具进行了上层封装，通过调用dzq-cli提供的命令即可进行对Taro和Next的能力的调用。如果需要对Taro和Next进行自定义的封装，那么可以查看相关文档。

| 依赖库 | 版本 | 
|  ----  | ----  |
| React | 17.0.1 | 
| Next | 10.0.7 | 
| Taro | 3.0.27 | 

## 安装

```bash
npm install @discuzq/cli -g
```

## 

<!--<ComponentTOC>-->
<!--</ComponentTOC>-->