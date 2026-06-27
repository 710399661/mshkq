# Flex

## 组件说明

> 基于行（row）和列（col）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来
 - 通过 row 在水平方向建立一组 column（简写 col）。

 - 你的内容应当放置于 col 内，并且，只有 col 可以作为 row 的直接元素。

 - 项目中的栅格系统中的列是指 1 到 12 的值来表示其跨越的范围。例如，三个等宽的列可以使用 <Col span={4} /> 来创建。

 - 如果一个 row 中的 col 总和超过 12，那么多余的 col 会作为一个整体另起一行排列。

## 示例

### WEB 示例
### 基本用法

> 列宽均等分布

> 使用单一的一组 Row 和 Col 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 Row 内。

[Example: Base](./__examples__/web/base.tsx)

### 左右偏移 offsets

> 使用 offset 可以将列向右侧偏。例如，offset={4} 将元素向右侧偏移了 4 个列（column）的宽度。

[Example: Base](./__examples__/web/offset.tsx)

### 排版 Gustify

> 布局基础。

> 子元素根据不同的值 start,center,end,space-between,space-around，分别定义其在父节点里面的排版方式。

[Example: Base](./__examples__/web/justify.tsx)

### 对齐 Align

> 子元素垂直对齐

[Example: Base](./__examples__/web/align.tsx)

### 排序

> 通过 order 来改变元素的排序。也可通过 设置 `reverse` 进行倒序排列

[Example: Sort](./__examples__/web/sort.tsx)

### 嵌套栅格

[Example: Nest](./__examples__/web/nest.tsx)


## API 参数

[Interface: RowProps](./interface.ts)

[Interface: ColProps](./interface.ts)
