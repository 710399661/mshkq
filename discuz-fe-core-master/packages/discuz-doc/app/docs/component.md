# Discuz-design

DiscuzQ 基础组件库

smart & powerful

## 安装
```
npm i @discuzq/design -S
```

## 引用

### 全量引用
```
import { Button } from '@discuzq/design';
import '@discuzq/design/dist/styles/index.scss';
```

### 按需组件引用
```
import Button from '@discuzq/design/dist/components/button';
import '@discuzq/design/dist/components/button/styles/index.scss';
```

### babel 按需引用插件支持

需要在项目中安装按需引用 babel 插件

```
npm i @discuzq/discuz-babel-plugin-import --save
```

在 web 项目的 .babelrc 文件中配置如下

```
plugins: [
    [
      "@discuzq/discuz-babel-plugin-import",
      {
        "libraryName": "@discuzq/design",
        "libraryDirectory": "dist/components"
      }
    ]
]
```

在 小程序 项目的 .babelrc 文件中配置如下

```
plugins: [
    [
      "@discuzq/discuz-babel-plugin-import",
      {
        "libraryName": "@discuzq/design",
        "libraryDirectory": "dist-pure/components"
      }
    ]
]
```