# Discuz 主题处理统一项目
> 主题样式
## 一、项目构建

```bash
# 将 scss 文件转换为 css 文件
$ npm run build
```

## 二、使用

1. 安装

```bash
$ npm install @discuzq/theme --save
```

2. 一次性引用
- 使用 `Sass` 引用打包之后的 `css` 文件
```css
@import '@discuzq/theme';
```

- 使用 `Sass` 引用打包之前的 `scss` 文件
```scss
@import '@discuzq/theme/src/index.scss';
```

1. 按需引用
- 使用 `Sass` 引用打包之后的 `css` 文件，假如使用了 `tag` 和 `button` 组件
```css
@import '@discuzq/theme/dist/theme/index.css'; /* 主题文件，必须引用，只用引用一次 */
@import '@discuzq/theme/dist/componnets/tag.css';
@import '@discuzq/theme/dist/componnets/button.css';
```

- 使用 `Sass` 引用打包之前的 `scss` 文件，假如使用了 `tag` 和 `button` 组件
```css
@import '@discuzq/theme/src/theme/index.scss'; /* 主题文件，必须引用，只用引用一次 */
@import '@discuzq/theme/src/componnets/tag.scss';
@import '@discuzq/theme/src/componnets/button.scss';
```

## 三、对于二开需要替换模板颜色或者需要切换主题的方法如下
> 因为使用的是 `css` 变量的方法，目前想要更改项目中颜色或者想要实现切换主题的方法参考如下

1. 颜色值请看 `src/theme/_default.scss` 文件，如果想要更改颜色值

- 1）**去掉**本身引入的模板文件代码：`@import '@discuzq/theme/src/index.scss';`
- 2）从 `src/theme/_default.scss` 文件中复制一份到自己的项目中，比如命名为 `light.scss` 文件，然后更改自己想要更改的颜色值
- 3）编写如下代码到自己项目的样式入口文件中：

    ```scss
    // @import '@discuzq/theme/src/theme/index.scss';
    /**
     * 遍历 css 变量的方法
     */
    @import '@discuzq/theme/src/mixins/_traverse-css-var.scss';
    /**
     * 修改主题。
     * 从 mini 或者 web 目录下面的 node_modules/discuzq/theme/src/theme/_default.scss 文件中复制一份到自己的样式文件 light.scss 中，然后在入口文件中引入。
     */
    @import './light.scss';

    /**
     * 最后在页面根元素引入该 css 变量的样式即可，如下所示
     */
    body,
    page {
      @include traverse-css-var($light);
    }
    ```

2. 主题切换实现方法

    具体步骤其实和想要自定义颜色的方法差不多，这个直接给出入口文件需要替换的代码（也有详细的注释说明），如下：

    ```scss
    // @import '@discuzq/theme/src/theme/index.scss';

    /**
    * 如果要实现自身的主题切换的话，需要进行如下改造
    * 1. 第一步是修改样式文件
    * 2. 第二步是在自己的项目中增加一个切换主题的入口，需要结合 common/store/site 中的 changeTheme 方法进行处理，默认的主题定义的是：APP_THEME.light
    */
    // 这个默认主题定义的变量是：$light
    @import '@discuzq/theme/src/theme/_default.scss';
    /**
    * 主题的 mixin 方法，主要是输出不同主题的对应的 css 变量
    * themify($themes, $style: 'dzq-theme') // 第一个参数传入定义的主题，第二个参数传入定义的样式类的前缀，可以直接使用默认的，这样就不用更改项目了。
    */
    @import '@discuzq/theme/src/mixins/_themify.scss';
    /**
    * 引入自己自定义或者修改的主题。
    * 从 mini 或者 web 目录下面的 node_modules/discuzq/theme/src/theme
    */
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

## TODO
- [ ] SCSS 变量混合生成颜色系（mix函数）。这个需要结合编译 + 远程请求新的样式，会涉及到切换主题的方法
- [ ] 更改切换主题的方法


## 参考
1. [css-vars-ponyfill] css变量 IE 兼容处理库





[css-vars-ponyfill]: https://www.npmjs.com/package/css-vars-ponyfill
