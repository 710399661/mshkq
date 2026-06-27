# Slider 组件

## 组件说明

基础 Slider 组件

## 示例

### WEB 示例

### 基础用法

> 左边为最小值，右边为最大值。 `defaultValue` 设置默认值

[Example: 基础用法](./__examples__/web/index.tsx)

### 禁用状态

> 当 disabled 为 true 时，滑块处于不可用状态。

[Example: 基础用法](./__examples__/web/disabled.tsx)

### 自定义取值范围

> 修改 `max、min` 属性，自定义取值范围，设置最大 `50`，最小 `10`

[Example: 自定义取值范围](./__examples__/web/scope.tsx)

### 自定义步长

> 修改 `step` 属性，自定义步长，设置步长为`10`

[Example: 自定义取值范围](./__examples__/web/step.tsx)

### 自定义描述内容

> 修改 `formatter` 属性的返回值可以对组件的数量单位进行自定义修改

[Example: 自定义描述内容](./__examples__/web/formatter.tsx)

<!-- ### 小程序示例

[ExampleMini: 基础用法](./__examples__/mini/index.tsx) -->

## API 参数

[Interface: SliderProps](./interface.ts)
