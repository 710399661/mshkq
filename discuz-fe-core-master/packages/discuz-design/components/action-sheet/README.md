# ActionSheet 组件

## 组件说明

基础 ActionSheet 组件

## 示例

### WEB 示例

### 基础用法

> 基础使用，默认 column 布局，一般用于移动端。

> color 属性：定义子项文本颜色

> disabled 属性：设置子项禁止被点击

> loading 属性：设置子项为加载状态

[Example: 基础用法](./__examples__/web/base.tsx)

### row 布局

> layout = row ，只有 row 布局会进行 icon 渲染

> title 可以设置头部标题

[Example: row 布局](./__examples__/web/row.tsx)

### 事件

> onSelect：回调点击选中事件，对选中项进行操作

> onClose：关闭事件

> onCancel：取消事件

[Example: 事件](./__examples__/web/event.tsx)

### 禁用关闭

> closeOnClickAction = false，点击选项后不会关闭弹层

> closeOnClickOverlay = false，点击遮罩之后不会关闭弹窗

[Example: 禁用关闭](./__examples__/web/close.tsx)

### 小程序示例

<!-- [ExampleMini: 基础用法](./__examples__/mini/index.tsx) -->

## API 参数

[Interface: ActionSheetProps](./interface.ts)
