# ScrollView

## 组件说明

小程序端使用的是 taro 的虚拟组件：[virtual-list](https://taro-docs.jd.com/taro/docs/virtual-list)，是基于微信 ScrollView 开发的。除了左侧参数，所有 ScrollView 组件的参数都可以传入此组件，冲突时优先使用左侧描述的参数。由于 virtual-list 在使用动态高度时，存在缺陷。默认条件下，会切换成 taro 的[ScrollView](https://taro-docs.jd.com/taro/docs/components/viewContainer/scroll-view)组件实现，非虚拟列表。

web 端使用的是第三方组件：[react-virtualized](https://github.com/bvaughn/react-virtualized)。除了左侧参数，所有 react-virtualized 组件的参数都可以传入此组件，冲突时优先使用左侧描述的参数。

## web 示例

### 基本使用
> 通过 `@discuzq/design` 引用 `ScrollView` 组件，通过自定义设置属性，完成列表的实现

[Example: 基本使用](./__examples__/web/base.tsx)

### 设置底部组件

[Example: 设置底部组件](./__examples__/web/renderBottom.tsx)

## API 参数

[Interface: ScrollViewProps](./interface.ts)
