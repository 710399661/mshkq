# AudioRecord

## 组件说明

录音组件。

重要：
1、暂时需要在调用此组件的工程中安装recorder-core: npm i recorder-core -S

## 示例

### WEB 示例

### 基础用法

> 通过 `@discuz/discuz-design/dist/components/audio-record` 引用 `AudioRecord` 组件，通过 `onUpload` 属性获取录音完成后的音频文件。

[Example: 基础用法](./__examples__/web/index.jsx)

### 录音时间

> 可以通过 `duration` 属性设置不同的录音时间，限制音频的最大时间。

[Example: 基础用法](./__examples__/web/duration.jsx)

### 回调事件

> 通过 `onRecordBegan`（录音开始）、`onRecordCompleted`（录音完成）、`onRecordReset`（上传文件）属性可以对录音的不同阶段进行回调处理。

> 【注】音频文件只有必传的 `onUpload`（上传）属性才能获取到

[Example: 基础用法](./__examples__/web/event.jsx)

<!-- ### 小程序示例

[基础用法](./__examples__/mini/index.jsx) -->

## API 参数

[Interface: PropsInterface](./interface.ts)