## 【运行环境篇】DZQ 前端编译构建指南

### 背景

小程序及web前端仓库&指引：[点击前往](https://gitee.com/Discuz/discuz-fe)

以此为准（[构建编译篇](https://discuz.chat/thread/51316)、[环境运行篇](https://discuz.chat/thread/51306)）

[#安装问题#](https://discuz.chat/topic/topic-detail/191)

最近看到有很多站长、开发者朋友对于 3.0 前端的编译构建存在很多问题，所以在这里总结了一份简单的指南，针对可能出现的常见问题给出一些解决办法，帮助大家更好的使用 3.0 项目

&emsp;

### 项目地址

3.0的前端项目地址（PC、H5、小程序）为以下，管理端暂时未完全开源，待开源后会在这里补充

[discuz-fe](https://gitee.com/Discuz/discuz-fe)

&emsp;

### 打包构建方法

和 2.x 版本不同，3.0的项目采用了基于 React 和 Taro 体系的技术架构，故无法再采用 hbuilder 来进行打包构建工作，以下我将以图文的方式介绍 3.0 的打包构建方法。

&emsp;

### 命令行工具

这里 linux 和 Mac 直接使用系统自带命令行终端即可 （terminal）

![img](https://linuxhint.com/wp-content/uploads/2019/11/1-45.png)

![img](https://z3.ax1x.com/2021/07/04/RWmuWQ.png)

Windows 推荐使用 cmd ，powershell 可能存在兼容性问题

cmd启动方式：Win + R

![以Step 2 88.png为标题的图片](https://www.wikihow.com/images/thumb/1/19/Step-2-88.png/413px-Step-2-88.png.webp)

&emsp;

### Node.js 安装

> FE 项目暂时对 Node 15 和 NPM 7 存在兼容性问题，推荐现阶段使用 14
>
> 基于 M1 芯片的 Mac，需要使用 NVM 安装 14 版本的构建包

[Node](https://nodejs.org/en/)首先进入 Node.js 的官网下载安装包（这里推荐稳定版 14）

![img](https://z3.ax1x.com/2021/07/04/RWZE6I.png)

&emsp;

#### linux 用户：

linux用户 和 Mac用户可以使用 NVM 的方式来安装 Node

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

之后在命令行中执行 nvm install v14 来安装 Node v14.17

![img](https://z3.ax1x.com/2021/07/04/RWedqP.png)


之后使用 nvm use v14 ，来将 node v14 设定为默认的 node 版本

![img](https://z3.ax1x.com/2021/07/04/RWecxs.png)

&emsp;

### 开发者工具下载

#### 微信开发者工具

微信小程序的构建发行，需要依赖于微信的开发者工具，不论是 mac 或是 Windows 都需要安装微信小程序开发者工具（Linux 暂无官方发行版）

如下网址进行下载[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

&emsp;

#### 源码编辑工具

工欲善其事必先利其器，不论你是有基本编辑需求还是进行深层二开需求的站长，我们都推荐您使用 vscode 作为您的编辑器，美观大方好用，下载地址如下 [vscode](https://code.visualstudio.com/)

&emsp;

### 项目下载

如果没有随时跟进最新源码的需求，可以直接通过 Gitee 提供的下载操作来下载最新的源码

![img](https://z3.ax1x.com/2021/07/04/RWuCDI.png)

如果您有需要跟进最新的源码，甚至更高阶的对源码进行二开修改，我们推荐使用 Git 客户端进行下载

Windows 没有自带 git 客户端，可以从以下地址下载 [git](https://git-scm.com/downloads)

执行如下命令进行源码的克隆

```
git clone https://gitee.com/Discuz/discuz-fe
```

![img](https://z3.ax1x.com/2021/07/04/RWuUM9.png)

至此，所有的构建编译前准备工作已经完成
