## 【构建编译篇】DZQ 前端编译构建指南

### 项目结构

小程序及web前端仓库&指引：[点击前往](https://gitee.com/Discuz/discuz-fe)

以此为准（[构建编译篇](https://discuz.chat/thread/51316)、[环境运行篇](https://discuz.chat/thread/51306)）

[#安装问题#](https://discuz.chat/topic/topic-detail/191)

如下图，fe 项目主体是三个部分

- common包含了公用的配置
- mini包含了小程序项目的主体
- web包含了web项目的主体

![img](https://z3.ax1x.com/2021/07/04/RWrCE6.png)

&emsp;

### 构建编译

### 安装依赖

安装前，我们再次确认下我们的 node 版本和 npm 版本，短时间内，官方仍然推荐使用 v14及以下的 node 版本，最新版本的node，官方将很快适配，npm 推荐使用 6 及以下

![:9c124db6b335ef2b5b5b1896e0b5d895:emoji](https://z3.ax1x.com/2021/07/04/RWDOCF.png)

我们上一步已经成功的安装好了 node 和 npm，但是 npm 自带的官方依赖源在国内网络环境下的访问并不通畅，这里我们选择使用腾讯云的国内源，来加速我们依赖的安装

&emsp;

#### 设置 npm国内腾讯云源站

```
npm config set registry http://mirrors.cloud.tencent.com/npm/
```

分别进入 web 目录和 mini 目录，安装 web 子项目和 mini 子项目的依赖

&emsp;

#### 安装小程序依赖

我们这里进入 discuz-fe/mini 目录下，运行 npm install 来安装小程序的依赖

![:a54d99bfb9ea9acec18381d5f6bc7396:emoji](https://z3.ax1x.com/2021/07/04/RWrpHx.png)

&emsp;

#### 安装web项目依赖

同理，我们这里进入 discuz-fe/web 目录下，运行 npm install 来安装web项目的依赖

![:45d0a1ce590bb**880df29b25e2c5031:emoji](https://z3.ax1x.com/2021/07/04/RWDHEV.png)

> 这里可能遇到由于 node-sass 的二进制包下载不到导致的问题，我们这里同样使用国内源来解决，参见 https://segmentfault.com/a/1190000021129447

&emsp;

### 配置小程序相关配置

小程序相关的配置，都位于 dzq.config.yaml 文件中
修改 TITLE 配置，可以修改站点标题
修改 HOST 配置，配置自己的站点域名，可以配置所有请求至自己的站点
修改 APPID 配置，配置自己的小程序 appid
修改 VERSION 配置，配置自己小程序的展示版本

![img](https://s3.bmp.ovh/imgs/2021/08/95c46ecdf285eb36.png)

&emsp;

#### 小程序开发模式

我们这里可以在 discuz-fe/mini 目录下运行 npm run dev ，进入小程序开发模式

&emsp;

#### 小程序构建模式

同上，我们在同样的目录下，运行 npm run build，进入小程序构建模式

![:ed84e29d67f3e60a7fd164a40764b49a:emoji](https://z3.ax1x.com/2021/07/04/RWrA8e.png)

小程序构建模式下的产物，与小程序开发模式下的产物目录相同，都位于 discuz-fe/mini/dist

不同之处在于，小程序开发模式下，无法上传，因为其中涵盖了很多开发时的辅助信息，包体积大，只有在构建时，才能进行上传

![:727a18c3503a6bf349714b0d206c277e:emoji](https://z3.ax1x.com/2021/07/04/RWDvv9.png)

&emsp;

#### 开发者工具导入

在构建完成后，我们打开小程序开发者工具，导入 discuz-fe/mini/dist 目录，开发者工具可以自动识别对应的 appid

![:bfec0a554b11ded94da7389294a07f9f:emoji](https://z3.ax1x.com/2021/07/04/RWrkCD.png)

![:9eda68821921eb08db9025675e754973:emoji](https://z3.ax1x.com/2021/07/04/RWDX34.png)

&emsp;

#### 进行开发预览/上传

导入完成后，我们选择对应的小程序项目，就可以进入小程序开发者工具中进行开发或是上传，上传时我们需要在右上方的编译设置中进行如下设置

![:472e2d5b558fbf805fcdb52eacf830fc:emoji](https://z3.ax1x.com/2021/07/04/RWDzuR.png)

改变这个配置可能导致上传编译失败，出现如下错误

![:436c62f05837680be83372d448640596:emoji](https://z3.ax1x.com/2021/07/04/RWDjgJ.png)

截至目前，您的小程序就成功的发行到了开发版，后续在小程序后台进行相关发布操作即可~

&emsp;

### web项目开发/构建

以上阐述了小程序项目如何进行开发/构建，下面将继续用图文的方法，阐述web项目如何进行开发/构建

&emsp;

#### 安装依赖

首先我们需要进入 discuz-fe/web 目录下，执行 npm i，进行依赖安装（注意事项参见上方小程序注意事项）

&emsp;

#### 配置设置

web项目和小程序公用了一套后台请求配置，我们参见上方小程序的配置方法

&emsp;

#### 开发模式

我们进入 discuz-fe/web 目录下，运行 npm run dev，即可进入开发模式

![:4190cd4ad5fdae81170af33cb9d3ba11:emoji](https://z3.ax1x.com/2021/07/04/RWrSD1.png)

待到编译执行结束后，我们访问 http://localhost:9527 ，即可进行实时效果更新的开发

&emsp;

#### 构建模式

我们进入 discuz-fe/web 目录下，运行 npm run static，即可执行构建，构建后产物位于 discuz-fe/web/dzq-default-web-static目录下

![:5b189c2536ab24dc82f27419450188cb:emoji](https://z3.ax1x.com/2021/07/04/RWDbNT.png)

![:cf8b0517836a0986ecd6978c3bbdfbbf:emoji](https://z3.ax1x.com/2021/07/04/RWri4O.png)

将构建后的产物，通过 ftp 上传至服务器，即可发布上线
