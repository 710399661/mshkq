# 自定义主题和实现主题切换

## 引言：

不同的业务类型、不同的站点品牌会需要不同的主题以契合实际的运营，需要开发者进行二次开发才能满足。下面我们将通过修改UI组件颜色、全局背景颜色等为例，演练一遍修改主题的方法。

![](https://imgcache.qq.com/operation/dianshi/other/wecom-temp-5fc59a28cb0c23e358e1a7a77ff75c6e.48f1fdc7bb4bf20a95e7d76356376039c485df25.png)

## 一、目前项目中存在的颜色 token

CSS 变量对应值，基础颜色 token 值

```scss
/**
 * 默认主题
 */
$light: (
  // 按钮主色，文本强调主色
  --color-primary: #2469f6,
  --color-primary2: #3977f6,
  --color-primary3: #4f87f7,
  --color-primary4: #6595f8,
  // button disabled
  --color-primary5: #7ba5f9,
  --color-primary6: #91b3fa,
  --color-primary7: #a7c3fb,
  // checkbox 选中的背景颜色
  --color-primary8: #bcd1fc,
  --color-primary9: #d3e1fd,
  --color-primary10: #e8f0fe,

  // h5邀请页面关闭按钮背景
  --color-primary20: #0545c8,

  --color-success: #3ac15f,
  --color-success2: #4dc76e,
  --color-success3: #61cd7f,
  --color-success4: #74d38e,
  --color-success5: #88da9f,
  --color-success6: #9ce0ae,
  --color-success7: #b0e6bf,
  --color-success8: #c3ecce,
  --color-success9: #d7f3df,
  --color-success10: #ebf9ef,

  // TODO: 这里的色系和primary有重复，需要确认问题
  --color-info: #5087f8,
  --color-info2: #739ff9,
  --color-info3: #a7c3fb,
  --color-info4: #cadbfd,
  --color-info5: #edf3fe,

  --color-error: #e02433,
  --color-error2: #e33947,
  --color-error3: #e64f5b,
  --color-error4: #e9656f,
  --color-error5: #ec7b84,
  --color-error6: #ef9198,
  --color-error7: #f3a7ad,
  --color-error8: #f6bcc1,
  --color-error9: #f9d3d6,
  --color-error10: #fce8ea,

  --color-warn: #ffc300,
  --color-warn2: #ffc819,
  --color-warn3: #ffcf33,
  --color-warn4: #ffd54c,
  --color-warn5: #ffdb66,
  --color-warn6: #ffe17f,
  --color-warn7: #ffe799,
  --color-warn8: #ffedb2,
  --color-warn9: #fff3cc,
  --color-warn10: #fff9e5,

  --color-disabled: #c5c6cb,
  --color-disabled2: #d0d1d5,
  --color-disabled3: #dcdde0,
  --color-disabled4: #e8e8ea,
  --color-disabled5: #f4f4f5,
  --color-white: #fff,
  --color-black: #000,

  // 标签里面用到的：悬赏、付费等
  --color-orange: #f66524,
  --color-orange2: #f67439,
  --color-orange3: #f7834f,
  --color-orange4: #f89365,
  --color-orange5: #f9a27b,
  --color-orange6: #fab191,
  --color-orange7: #fbc1a7,
  --color-orange8: #fcd0bc,
  --color-orange9: #fde0d3,
  --color-orange10: #feefe8,

  // 边框颜色
  --border-line-color: #eee,

  // 边框引用颜色
  --border-color-blockquote: #dbdbdb,

  // 阴影颜色
  --shadow-color: #c5c9d5,
  --shadow-color2: #f1f3f4,

  // 正文主色，比如：正文标题、内容
  --color-text-primary: #0b0b37,
  // 二级内容文字颜色
  --color-text-regular: #4f5a70,
  // 次要文字颜色，比如：时间、置顶文字、操作文字（列表中的赞、评论、分享、数字）
  --color-text-secondary: #8590a6,
  // border hover 的颜色还有 loading 文字，copyright 和这个一致
  --color-text-placeholder: #c5c6cb,
  --color-box-placeholder: #f1f3f4,
  // 引用文字颜色
  --color-text-blockquote: #6a737d,

  // pc，移动都是统一这个背景色；另外 // 评论框，评论，附件，语音，模块与模块之间的间距背景色
  --background-color: #f5f7f8,

  --background-color-text: #f9fafb,
  // 灰色标签（编辑器付费、红包设置之后的显示的背景色），灰色按钮背景色
  --background-color-text2: #eff1f3,

  // 遮罩背景统一使用这个
  --mask-background-color: rgba(0, 0, 0, 0.5),
);
```

CSS 变量对应的 项目中使用的 SCSS 变量

```scss
$font-family: "-apple-system",
"BlinkMacSystemFont",
"Segoe UI",
"Roboto",
"Helvetica Neue",
"Arial",
"Noto Sans",
"Liberation Sans",
"sans-serif",
"Apple Color Emoji",
"Segoe UI Emoji",
"Segoe UI Symbol",
"Noto Color Emoji";

// 代码块的字体
$font-family-code: "SFMono-Regular",
"Menlo,Monaco",
"Consolas",
"Liberation Mono",
"Courier New",
"monospace" !important;

$font-size-small: 12px;
$font-size-base: 14px;
$font-size-middle: 16px;
$font-size-middle-extra: 18px;
$font-size-large: 20px;
$font-size-label: $font-size-small;
$font-size-primary: $font-size-base;
$font-size-h1: 26px;
$font-size-h2: 24px;
$font-size-h3: 22px;
$font-size-h4: $font-size-large;
$font-size-h5: $font-size-middle-extra;
$font-size-h6: $font-size-middle;

$font-line-height-xs: 18px;
$font-line-height-small: 22px;
$font-line-height-base: 24px;
$font-line-height-middle: 26px;
$font-line-height-large: 30px;
$font-line-height-primary: $font-line-height-base;

$font-weight-light: 400;
$font-weight-regular: 600;
$font-weight-bold: 800;

// ------ Colors 颜色 ------------
$primary-color: var(--color-primary) !default;
$primary-color2: var(--color-primary2) !default;
$primary-color3: var(--color-primary3) !default;
$primary-disabled-color: var(--color-primary5) !default;
$primary-color6: var(--color-primary6) !default;
$primary-color7: var(--color-primary7) !default;
$primary-color8: var(--color-primary8) !default;
$primary-color9: var(--color-primary9) !default;
$primary-color10: var(--color-primary10) !default;

$primary-color20: var(--color-primary20);

$info-color: var(--color-info) !default;

$success-color: var(--color-success) !default;
$success-color6: var(--color-success6) !default;
$success-color9: var(--color-success9) !default;

$warn-color: var(--color-warn) !default;
$warn-color6: var(--color-warn6) !default;
$warn-color8: var(--color-warn8) !default;
$warn-color9: var(--color-warn9) !default;
$warn-color10: var(--color-warn10) !default;

$error-color: var(--color-error) !default;
$error-color2: var(--color-error2) !default;
$error-color6: var(--color-error6) !default;
$error-color9: var(--color-error9) !default;

$orange-color: var(--color-orange) !default;
$orange-color6: var(--color-orange6) !default;

$disabled-color: var(--color-disabled) !default;
$disabled-color2: var(--color-disabled2) !default;
$disabled-color3: var(--color-disabled3) !default;
$disabled-color4: var(--color-disabled4) !default;
$disabled-color5: var(--color-disabled5) !default;

$black: var(--color-black) !default;
$white: var(--color-white) !default;

// ------ Background Color 背景 -----
// 全局背景色，pc移动端一致，另外评论框，评论，附件，语音，模块与模块之间的间距背景色也是
$body-bg-color: var(--background-color) !default;

// ---- mask color ----
$mask-bg-color: var(--mask-background-color) !default;

// ------ text color -------
$text-color-primary: var(--color-text-primary) !default; // 正文主色
$text-color-regular: var(--color-text-regular) !default; // 二级内容文字颜色
$text-color-secondary: var(--color-text-secondary) !default; // 次要文字颜色

// border hover 的颜色还有 loading 文字和这个一致
$text-color-placeholder: var(--color-text-placeholder) !default;

$text-color-primary-color: $primary-color;
$text-color-error: $error-color;

$text-bg-color: var(--background-color-text) !default;
// 灰色标签（编辑器付费、红包设置之后的显示的背景色），灰色按钮（取消）背景色
$text-bg-color2: var(--background-color-text2) !default;

// 被选中后背景色
$body-bg-select: var(--background-color-text2) !default;
$body-bg-select2: var(--color-primary20) !default;

// ------ icon color ------------
$icon-color-light: $text-color-secondary;
$icon-color: $text-color-regular;
$icon-color-active: $primary-color;
$icon-primary-color: $primary-color;
$icon-success-color: $success-color;

// ----- boder color ----
$border-color: var(--border-line-color) !default;
$border-color-hover: $text-color-placeholder;

// ---- border shadow color ----
$border-shadow-color: var(--shadow-color) !default;
$border-shadow-color2: var(--shadow-color2) !default;

$shadow-color: 0 0 8px $border-shadow-color;
$shadow-color2: 0 0 8px $border-shadow-color2;

$border-shadow-color-8: 0 0 8px 0 $border-shadow-color2;

// ---- loading color ----
$loading-text-color: $text-color-placeholder;

// ---- copyright color ----
$copyright-text-color: $text-color-placeholder;

// ---- tag color： 悬赏、付费 ------
$tag-text-color1: $orange-color;
$tag-text-color2: $warn-color;
$tag-text-color3: $success-color;

$tag-info-bg-color: $text-bg-color2;
$tag-primary-lighter-color: $primary-color10;

// ---- comment color ----
$comment-bg-color: $body-bg-color;

// ---- link color ----
$link-text-color: $primary-color;

// ---- button color ----
$button-info-bg-color: $text-bg-color2;
$button-primary-bg-color: $primary-color;
$button-primary-light-bg-color: $primary-color10;
$button-primary-disabled-bg-color: $primary-disabled-color;

// 关闭按钮背景，小程序顶部胶囊按钮背景
$button-close-bg: $primary-color20;
$button-capsule-bg: $button-close-bg;

// ----- checkbox color -----
$checkbox-checked-bg-color: $primary-color8;

// ------ border ----------
$border-radius-small: 5px;
$border-radius-big: 10px;
$border-radius-circle: 50%;
$border-radius-zero: 0;
$border-radius-8: 8px;

$border-solid-1: 1px solid $border-color;
$border-dotted-1: 1px dashed $border-color;

$border-solid-1-hover: 1px solid $border-color-hover;

// ------ spacer bg color -------
$spacer-bg-color: $body-bg-color;

// ------ spacer： 间距 padding & margin ----------

$padding-base: 4px;
$padding-1n: $padding-base;
$padding-2n: $padding-base * 2;
$padding-3n: $padding-base * 3;
$padding-4n: $padding-base * 4;
$padding-5n: $padding-base * 5;
$padding-6n: $padding-base * 6;
$padding-10n: $padding-base * 10;
$padding-5: 5px;
$padding-10: 10px;
$padding-14: 14px;

$margin-base: 4px;
$margin-1n: $margin-base;
$margin-2n: $margin-base * 2;
$margin-3n: $margin-base * 3;
$margin-4n: $margin-base * 4;
$margin-5n: $margin-base * 5;
$margin-6n: $margin-base * 6;
$margin-5: 5px;
$margin-10: 10px;

// ------- z-index -----------
$zindex-normal: 0;
$zindex-backtotop: 1000;
$zindex-tooltip: 1200;
$zindex-popup: 1400;
$zindex-dialog: 1600;
$zindex-previewer: 1700;
$zindex-toast: 1800;

// ------  paybox ------------
$paybox-pay-text-font-size: 30px;
$paybox-border-line-color: $border-color;

// ------  placeholder ------------
$box-color-placeholder: var(--color-box-placeholder);

// ------ blockquote -----------
$blockquote-border: var(--border-color-blockquote) !default;
$blockquote-text-color: var(--color-text-blockquote) !default;
```

## 二、如何自定义自己的主题颜色

### 1. 前提：已经克隆 [`discuz-fe`](https://gitee.com/Discuz/discuz-fe) 项目，并且安装了相关的依赖，可以进行相关的开发
> 这里做一个简要的说明，后面如果有类似的情况，不在赘述

- 项目运行环境：[https://developer.discuz.chat/#/help/help-envguide.md](https://developer.discuz.chat/#/help/help-envguide.md)
- 环境准备好了，就可以进行项目的编译构建了，请看文档：[https://developer.discuz.chat/#/help/help-buildguide.md](https://developer.discuz.chat/#/help/help-buildguide.md)

```bash
# 克隆项目到本地
$ git clone https://gitee.com/Discuz/discuz-fe.git

# 进入到对应的项目目录
$ cd discuz-fe

# 如果要运行 web 项目，则进行如下命令
$ cd web # 进入到 web 项目目录
$ npm install # 安装依赖
$ npm run dev # 本地开发
```
### 2. 前提：[`discuz-fe`](https://gitee.com/Discuz/discuz-fe) 项目的目录结构介绍

```bash
|-- common              # 公共目录
| |-- styles            # 公共样式目录
| |-- ... ...
|-- docs                # 文档
|-- mini                # 小程序目录
| |-- ... ...
|-- web                 # web 端目录
| |-- ... ...
|-- dzq.config.yaml     # 项目基础配置文件
|-- ... ...
```
### 3. 进入正题：开始修改主题

#### 1）进入项目根目录，在目录 `common/styles` 目录下面新建三个文件

  ![theme](https://main.qcloudimg.com/raw/de71410fff6967f94022d3dfd05ab106.png)

- a）文件 `common/styles/theme/light.scss` 中的内容，直接复制【一、目前项目中存在的颜色 token】中的 token 值到 文件中即可。

```scss
/**
 * common/styles/theme/light.scss
 * 注：这里的不全，请直接复制上面👆的所有 token 代码
 **/
$light: (
  // 按钮主色，文本强调主色
  --color-primary: #2469f6,
  --color-primary2: #3977f6,
  --color-primary3: #4f87f7,
  --color-primary4: #6595f8,
)
```

- b）文件 `common/styles/theme/index.scss` 中的内容

```scss
/**
 * common/styles/theme/index.scss
 * 主题文件
 **/
@import 'light';

// page 是针对小程序的
:root,
page {

  @each $name, $value in $light {
    #{$name}: #{$value};
  }
}
```

- c）文件 `common/styles/theme/init.scss` 中的内容

```scss
/**
 * common/styles/theme/init.scss
 * 入口初始样式
 **/
@import './theme/index.scss'; // 引入自己自定义的主题文件
@import '@discuzq/theme/src/components.scss'; // 所有组件样式
@import '@discuzq/theme/src/animations.scss'; // 所有动画样式
```

#### 2）使用 IDE 的全局搜索替换功能进行文件替换

全局搜索 `@discuzsq/theme/src/index.scs` 替换为 `@common/styles/init.scss`

![替换成自己的主题文件](https://main.qcloudimg.com/raw/a957a2e040f882874e8d56ee044c4179/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_812b2e6e-1eb8-4dbe-904f-dd044c7c4502.png)

#### 3）现在可以根据设计稿来更改修改自己的主题文件：`common/styles/theme/light.scss`

- a) 页面样式

我们的设计稿：

![新的主题设计](https://main.qcloudimg.com/raw/2d9072fe6d7acd9294ad49bc16d5e347.png)

我们当前的项目：

![当前主题](https://main.qcloudimg.com/raw/4fa1cab93e4abd7ce47e1c66f44a7691.png)

- b）颜色调整

设计稿中新的颜色有：

```
body 背景色：#201f23
卡片 背景色：#3d3c45
文字、icon 主色：#fe4d55
边框颜色：#4f4e56
正文主色，比如：正文标题、内容：#fff
二级文字内容：#fff
```

那么对应就需要更改 `common/styles/theme/light.scss` 文件中的 token 值改为如下:

```
--background-color: #201f23,
--color-white: #3d3c45,
--color-primary: #fe4d55,
--border-line-color: #4f4e56,
--color-text-primary: #fff,
--color-text-regular: #fff,
```

- c）调整之后的页面

![修改之后的页面](https://main.qcloudimg.com/raw/48cceff45ffe940090b72f6424abea9a.png)

我们会发现有部分字体颜色也是使用的 `--color-white:` 这个 css 变量，对应的是 `$white` 这个 scss 变量。而这个白色我们不希望更改，

i）那么我们可以在 `common/styles/theme/light.scss` 中新增一个变量值。

```
--color-text-white: #fff,
```

ii) 那么我们可以在 `common/styles/index.scss` 文件中新增一个 SCSS 变量值。

```
$text-color-white: var(--color-text-white);
```

iii) 然后全局进行变量的替换即可：将 `color: $white` 替换为 `color: $text-color-white`。如果遇到有一些是组件里面样式，在项目中无法更改，那么可以直接在 `common/styles/theme/init.scss` 中增加样式强制覆盖样式即可。比如：

```scss
/**
 * common/styles/theme/init.scss
 * 入口初始样式
 **/
@import './theme/index.scss'; // 引入自己自定义的主题文件
@import '@discuzq/theme/src/components.scss'; // 所有组件样式
@import '@discuzq/theme/src/animations.scss'; // 所有动画样式
@import './index.scss';

.normal-badge .badge__circle {
  color: $text-color-white !important;
}
```

最后页面样式修改之后变为：

![成品](https://main.qcloudimg.com/raw/2b196bafcce44c8a0394b47287cc328d.png)


**注：如果修改过程中遇到项目中有些变量更改无效的可以进行反馈，因为有可能是历史原因，某些开发不规范导致项目中存在一些没有正规使用颜色 token 对应的 scss 变量的情况。请多包容和谅解，我们会逐步完善。**

## 三、如何自定义切换主题功能

> 有了上面自定义主题功能的介绍，这里不会再赘述主题修改的步骤讲解了。

### 1. 在 `common/theme` 目录下面新建其它的主题文件，比如 `dark.scss`，里面的颜色 token 和 `light.scss` 文件是一致，只是自己可以像上面👆那样通过变更颜色来自定自己的主题

![dark](https://main.qcloudimg.com/raw/690699def57a83428497d9963338f444.png)

```scss
/**
 * common/styles/theme/dark.scss
 * 注：这里的不全，请直接复制上面👆的所有 token 代码，然后进行修改
 **/
$dark: (
// 按钮主色，文本强调主色
--color-primary: #fe4d55,
--color-primary2: #3977f6,
--color-primary3: #4f87f7,
--color-primary4: #6595f8,
)
```

### 2. 修改 `common/styles/theme/index.scss` 文件，改成如下代码：

```scss
/**
* 如果要实现自身的主题切换的话，需要进行如下改造
* 1. 第一步是修改样式文件
* 2. 第二步是在自己的项目中增加一个切换主题的入口，需要结合 common/store/site 中的 changeTheme 方法进行处理，默认的主题定义的是：APP_THEME.light
*/

/**
* 主题的 mixin 方法，主要是输出不同主题的对应的 css 变量
* themify($themes, $style: 'dzq-theme') // 第一个参数传入定义的主题，第二个参数传入定义的样式类的前缀，可以直接使用默认的，这样就不用更改项目了。
*/
@import '@discuzq/theme/src/mixins/_themify.scss';
/**
* 引入自己自定义或者修改的主题。
* 从 mini 或者 web 目录下面的 node_modules/discuzq/theme/src/theme
*/
// 这个默认主题定义的变量是：$light
@import './light.scss';
// 这个默认主题定义的变量是：$dark
@import './dark.scss';

$themes: (
  light: $light,
  dark: $dark,
);

body,
page {
  @include themify($themes);
}
```

### 3. 在自己的项目中增加一个切换主题的入口，比如说在个人中心增加一个切换主题的按钮。

- 1）需要结合 `common/store/site/action` 中的 `changeTheme` 方法进行处理，默认的主题定义的 `common/store/site/store` 文件中定义主题变量：`@observable theme = APP_THEME.light;`。具体可以到对应的文件中查看即可
- 2）比如 web 项目中所有页面都会用到 `ViewAdapter` 组件，因此可以在 `web/components/view-adapter` 文件增加外层盒子，如下：

```javascript
import React from 'react';
import { inject, observer } from 'mobx-react';
import CustomHead from '@components/custom-head';

@inject('site')
@inject('search')
@observer
class ViewAdapter extends React.Component {
  renderView() {
    const { pc, h5, title = '', keywords = '', description = '', showSiteName = true } = this.props;
    const { site } = this.props;
    const { platform } = site;
    const curr = platform === 'pc' ? (pc || null) : (h5 || null);
    return (
      <div className={`dzq-theme--${this.props.site.theme}`}> {/* 新增这个外层主题样式盒子 */}
        <CustomHead title={title} keywords={keywords} description={description} showSiteName={showSiteName}/>
        {curr}
      </div>
    );
  }

  render() {
    return this.renderView();
  }
}

export default ViewAdapter;
```

- 3）增加切换主题的按钮，给此按钮事件函数如下：

```javascript
import React from 'react';

@inject('site')
@observer
class Page extends React.component {
  handleChangeTheme = () => {
    const { site } = this.props;
    const theme = site.theme === APP_THEME.light ? APP_THEME.dark : APP_THEME.light;
    site.changeTheme(theme);
  };

  render() {
    return <Button onClick={this.handleChangeTheme} type="primary">点我切换主题</Button>;
  }
}
```

- 4）成果。从下图可以看出我们整个切换主题的功能就实现了。通过外层样式进行控制。

![切换前](https://main.qcloudimg.com/raw/faf00fdf9cfeaad8ec8abbcb0d61234c.png)

![切换后](https://main.qcloudimg.com/raw/47bef601e8c6afa02d09320761924a22.png)


**注：在修改过程中，如遇项目中有些变量更改后不生效的情况，请反馈给我们，我们将尽快修正。导致不生效的原因可能是，历史迭代过程，因盲区而无法及时使用最新的规范修正颜色 token 与scss 对应的变量情况。请多包涵。**
