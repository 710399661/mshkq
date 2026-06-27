# 打包构建

当我们对于Discuz !Q开发完成后，可使用`build`命令将代码构建出静态资源，供小程序或web端（静态或SSR）使用。

## 使用命令
```
dzq build -p <platform> -t <typeName> 
```

| 参数 | 类型 | 默认值 | 可选值 | 描述 | 是否必填 |
| :- | :- | :- | :- | :- | :- |
| -p, --platform | string | web | web \| mini | 运行web端还是小程序的开发模式 | 是 |
| -t, --type | string | weapp | weapp | 只有-p或--platform为mini时才生效，标识taro构建的小程序类型，暂时只支持weapp | 是 |
| -s, --staticSite | string | 无 | 无 | 如我们需要构建出一个静态服务，需要添加此参数，构建出静态资源才能正常供静态资源服务器使用 | 否 |

> 可使用`dzq dev --help`查看参数描述

默认`build`命令构建出来的资源，是为SSR服务提供资源服务的，如果您的服务器不考虑SSR服务，那么需要在构建添加`-s`参数，`cli`会为您构建出一份静态资源的代码供`nginx`等进行静态资源服务。`目前Discuz !Q官方也是使用此方式进行构建！`.

