# Discuz-design

DiscuzQ 基础组件库

smart & powerful

## 开发

### 安装依赖
```
npm install
npm install @tarojs/cli@3.2.2 -g
```

### 运行开发
```
npm run dev:web // 开发web组件
npm run dev:mini // 开发小程序组件
```

web 组件访问 http://localhost:3000/{组件名} 访问组件 example

## 安装
```
npm i @discuz/discuz-design -S
```

## 引用

### 全量引用
```js
import { Button } from '@discuz/discuz-design';
// import '@discuz/discuz-design/dist/styles/index.scss';
// 20210805：请看 discuz-theme 项目，组件库里面的样式将会全部移动到 theme 项目中。 不要了

import '@discuzq/theme';
```

### 按需组件引用
```js
import Button from '@discuz/discuz-design/dist/components/button';
// import '@discuz/discuz-design/dist/components/button/styles/index.scss'; 不要了

// 20210805：请看 discuz-theme 项目，组件库里面的样式将会全部移动到 theme 项目中。
import '@discuzq/theme/dist/theme/index.css'; /* 主题文件，必须引用，只用引用一次 */
import '@discuzq/theme/dist/componnets/button.css';
```

### 按需引用

## 新增组件

执行`npm run new <component-name> [中文名] [组件类型]`创建新的组件模块

```sh
# 函数组件
npm run new poster 海报 func

# 类组件
npm run new poster 海报
```

## 组件

<!--<ComponentTOC>-->
- 通用
  - [x] [Button](./components/button) - 按钮
  - [x] [Icon](./components/icon) - 图标
- 布局
  - [x] [Grid](./components/grid) - 栅格
  - [x] [Flex](./components/flex) - flex布局
  - [x] [ScrollView](./components/scroll-view) - 长列表
- 展示
  - [x] [Alert](./components/alert) - 提示消息
  - [x] [Audio](./components/audio) - 音频播放器
  - [x] [AudioPlayer](./components/audio-player) - 附件音乐播放器 
  - [x] [Avatar](./components/avatar) - 头像
  - [x] [Card](./components/card) - 卡片组件
  - [x] [Menu](./components/menu) - 菜单(PC)
  - [x] [RichText](./components/rich-text) - 富文本
  - [x] [Spin](./components/spin) - 加载中
  - [x] [Tabs](./components/tabs) - 选项卡(H5/WX)
  - [x] [Tag](./components/tag) - 标签
  - [x] [Video](./components/video) - 视频播放器
  - [x] [Divider](./components/divider) - 分割线
  - [x] [Progress](./components/progress) - 进度条
  - [x] [Dropdown](./components/dropdown) - 下拉菜单(PC)
- 输入
  - [x] [Check](./components/check) - 选项框
  - [x] [Checkbox](./components/checkbox) - 复选框
  - [x] [Radio](./components/radio) - 单选框
  - [x] [Input](./components/input) - 单行文本输入框
  - [x] [Textarea](./components/textarea) - 多行文本输入框
  - [x] [Switch](./components/switch) - 开关
  - [x] [Upload](./components/upload) - 上传
  - [x] [Slider](./components/slider) - 滑动条
  - [x] [AudioRecorder](./components/audio-record) - 录音
  - [x] [WebPicker](./components/web-picker) - 选择器(H5)
- 交互
  - [x] [Animation](./components/animation) - 动画组件
  - [x] [BackToTop](./components/back-to-top) - 返回顶部
  - [x] [Dialog](./components/dialog) - 对话框
  - [x] [Toast](./components/toast) - 轻提示
  - [] [PullDownRefresh](./components/pull-down-refresh) - 下拉刷新
  - [x] [ImagePreviewer](./components/image-previewer) - 图片预览
  - [x] [Popup](./components/popup) - 弹出层
  - [x] [ActionSheet](./components/action-sheet) - 动作面板
  - [x] [Popover](./components/popover) - 气泡框

<!--</ComponentTOC>-->

## ats-h5插件

### 介绍

有大部分基础组件，mini端和web端的代码相似，组件的逻辑部分代码相同，只有标签不同。为加快这部分组件的开发，降低`频繁复制粘贴以及修改标签名`时的出错率，可以通过ats-h5插件完成`复制粘贴以及修改标签名`这部分的工作。ats-h5插件会将`layouts`文件夹下的`mini`代码，转换成`web`代码，同时也会把`__examples__`文件夹中的mini的示例，转换成web示例。

### 适用范围

mini端和web端的代码`只有标签名不同`的组件，或`只有标签名不同`的示例代码

### 用法

1. 进入插件文件夹下（discuz-design/site/config/plugins/taro-plugin-ats-h5），执行`npm i`；
2. 进入小程序的配置文件（discuz-design/site/config/dev.js），添加插件。
```js
// dev.js
module.exports = {
  ...
  plugins: [
    [
      path.resolve(__dirname, "./plugins/taro-plugin-ats-h5"),
      {
        componentNames: ['component-name'], // 数组中添加你想赋能的组件。eg. componentNames: ['tag']
        onlyExample: false, // 是否只处理示例（__examples__）的转换，不处理组件
      },
    ],
  ],
}
```

|  options   | 类型 | 是否必传  | 默认值 | 说明 |
|  ----  | ---- | ----  | ----  | ---- |
| componentNames | array | Y | [] | 组件名 |
| onlyExample | boolean | N | false | 是否只处理示例 |

### 注意

使用插件时，唯一要注意的是组件的命名规范，最好使用`npm run new <component-name> [中文名] [组件类型]`创建组件。如果不是用模板生成的组件，需满足以下的规范
```
// layouts文件夹目录结构
├── layouts
│   ├── index.ts
│   ├── mini.tsx
│   └── web.tsx

或者

├── layouts
│   ├── index.tsx
│   ├── mini
│   │   ├── index.tsx
│   │   └── xxx.tsx
│   └── web
│       ├── index.tsx
│       └── xxx.tsx

// mini组件导出命名
export function <ComponentName>MiniLayout
```
