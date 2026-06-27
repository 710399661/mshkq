# 开发模式

对DZQ进行二次开发，可使用开发模式，在本地进行开发，并实时预览开发效果。

## 使用命令
```
dzq dev -p <platform> -t <typeName> -p <port> -H <hostname>
```

| 参数 | 类型 | 默认值 | 可选值 | 描述 | 是否必填 |
| :- | :- | :- | :- | :- | :- |
| -p, --platform | string | web | web \| mini | 运行web端还是小程序的开发模式 | 是 |
| -t, --type | string | weapp | weapp | 只有-p或--platform为mini时才生效，标识taro构建的小程序类型，暂时只支持weapp | 是 |
| -port, --port | string | 3000 | 1~65535 | 启动开发应用的端口地址 | 是 |
| -H, --hostname | string | 0.0.0.0 | 本机地址 | 绑定开发服务的ip地址，建议使用0.0.0.0，或者当前网卡的ip地址 | 是 |

> 可使用`dzq dev --help`查看参数描述

