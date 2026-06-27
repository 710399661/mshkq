# Toast

全局轻提示。

## 组件说明

常用的操作按钮。

## 示例

### WEB 示例

### 基础示例

> Toast 提供了以下 5 种提示类型，点击按钮查看效果。

[Example: 基础示例](./__examples__/web/base.tsx)

### 位置

> 控制 Toast 组件展示的位置

[Example: 位置](./__examples__/web/position.tsx)

### 遮罩层

> hasMask: 控制 toast 的透明遮罩是否存在，默认不存在。(存在遮罩时无法点击底部的内容区)

[Example: 遮罩层](./__examples__/web/mask.tsx)

### 延时关闭

> duration：设置 toast 的存在时间，默认 1500ms。

> 特别的，duration 等于 0 时 toast 永远存在，但是可以调用 toast 实例的 destroy()方法关闭。

[Example: 延时关闭](./__examples__/web/duration.tsx)

### 自定义 ICON

> Toast.info() 模式下支持使用内置自定义 icon。

[Example: 自定义 ICON](./__examples__/web/icon.tsx)

### 小程序示例

注意：小程序需用`ToastProvider`包裹根组件.

## API 参数

[Interface: ToastProps](./interface.ts)
