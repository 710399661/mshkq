# RichText

## 组件说明

富文本组件，可以在 web端 和 小程序端 安全的解析 html

<!-- ## 小程序示例

### 富文本解析 & 事件回调
[富文本解析 & 事件回调](./__examples__/mini/htmlTemplate.tsx) -->

## web示例

### 基础解析

> 解析基础标签，展示对应的样式

[Example: 富文本解析 & 事件回调](./__examples__/web/htmlTemplate.tsx)

### 图片解析

> 解析图片标签，并添加不同的事件， 解析完成、图片点击、图片加载完成、图片加载失败 等各种状态事件对图片不同情况进行处理

[Example: 富文本解析 & 事件回调](./__examples__/web/htmlImgTemplate.tsx)

### 代码解析

> 对于代码部分，我们进行了代码高亮的处理

[Example: 富文本解析 & 事件回调](./__examples__/web/htmlCodeTemplate.tsx)

### iframe解析

> 解析iframe标签用来显示外站的视频、音频，为了防止安全风险，根据白名单iframeWhiteList进行控制，只对处于名单内的进行解析

[Example: 富文本解析 & 事件回调](./__examples__/web/htmlIframeTemplate.tsx)

## API参数

[Interface: RichTextProps](./interface.ts)

<!-- [Interface: NodeType](./interface.ts) -->


