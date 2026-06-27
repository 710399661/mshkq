# Popover 组件

## 组件说明

基础 Popover 组件

## 示例

### WEB 示例

### 基础用法

> 基础使用，内置 click、hover 两种触发方式，且预展示空间不足时，会自动显示在对立面

[Example: 基础用法](./__examples__/web/base.tsx)

### 隐藏小三角

> hideTriangle=true 隐藏小三角

[Example: 隐藏小三角](./__examples__/web/hide.tsx)

### 关闭示例

> needOutsideClose = false ，click触发时禁止外部关闭浮层

[Example: 关闭示例](./__examples__/web/close.tsx)

### 位置示例

> popover内置12个方向位置

[Example: 位置示例](./__examples__/web/position.tsx)

### 箭头位置

> triangleAtCenter 属性，强制让小箭头指向中间位置

[Example: 箭头位置](./__examples__/web/arrow.tsx)

### 浮层背景

> 使用background属性设置自己喜欢的背景色，优先级高于innerStyle

[Example: 浮层背景](./__examples__/web/background.tsx)

### popover 自定义样式

> popover 自定义样式

[Example: popover 自定义样式](./__examples__/web/style.tsx)

### 事件示例

> popover 内置触发器鼠标点击、滑入、滑出事件

[Example: 基础用法](./__examples__/web/event.tsx)

### 非 body 滚动容器内使用

> 滚动容器内浮层不跟随移动时，可以使用followTrigger=true改变浮层挂载位置，使其跟随

[Example: 非 body 滚动容器内使用](./__examples__/web/scroll.tsx)

<!-- ### 小程序示例

[Example: 基础用法](./__examples__/mini/index.tsx) -->

## API 参数

[Interface: PopoverProps](./interface.ts)
