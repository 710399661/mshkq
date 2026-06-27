# 小助手工具

## 欢迎使用Discuz! Q 小助手 
Discuz! Q 小助手，帮助你愉快的下载和构建Discuz! Q小程序，不需要再为环境问题，无法正确打包小程序而苦恼。 
### 为什么要使用Discuz! Q 小助手 
- 本地无需任何环境要求 
- 不需要使用任何命令行，全界面化操作 
- 降低站长使用Discuz! Q的学习成本 
### 提供特性 
- [x] 一键下载Discuz! Q 指定版本小程序源码 
- [x] 一键解压小程序源码 
- [x] 小程序构建配置化 
- [x] 一键安装小程序依赖 
- [x] 一键构建小程序 
- [x] 自动调起微信开发者工具 
### 系统支持 
- [x] Mac 
- [x] Mac M1 
- [x] win10 
- [x] win7 

## 如何使用 
第一次打开Discuz! Q小助手需要一些基本的配置，一旦配置后，不需要再进行任何配置操作。 
### 下载配置 
下载配置中需要配置几个选项： 
- 下载到目标目录（之后所有的版本下载都会存放到此目录中） 
- 下载版本，除非你有特殊需求，否则建议每次都使用`latest`，指定版本号可以通过gitee上查看有什么版本可供下载。（下载版本只提供`v3.0.210803`及以上版） 
- 自动解压（推荐打开） 
- 将下载到的目录设置为默认的项目（推荐打开） 
> 需要注意，下载的文件和解压的文件会自动替换本地相同名字的文件，如有需要，可选择关闭自动解压开关，或自行备份好 
### 项目设置 
- 源码地址，如果你使用Discuz! Q 小助手下载Discuz! Q 源码，并且打开了设置下载目录薇默认的项目，那么无需配置，否则请选择discuz-fe目录地址即可（无需设置为mini文件夹） 
- 配置好电脑中安装的微信开发者工具的安装位置，在构建时才能正常自动打开。 
  - Mac系统，微信开发者工具的地址应该为：`/Applications/wechatwebdevtools.app` 
  - windows系统，微信开发者工具的地址应该为：`D:微信web开发者工具（不需要选择.exe文件，选择.exe文件所在的目录地址即可）` 
- appid填写你自己的小程序appid 
- 网站域名使用你站点的域名即可。（如：`https://discuz.chat`） 
### 小程序构建 
如果你已经按照文档中说明，下载好源码及配置好项目设置，那么即可开始构建你的小程序。Discuz! Q 小助手会帮你检查目录，并且安装依赖以及根据你的appid和域名构建属于你的小程序。 
稍作等待，Discuz! Q 小助手将会帮你自动调起微信开发者工具，你可以开始预览你的小程序，并且上传你的小程序。 


## 下载地址 v1.0.3
mac:https://dl.discuz.chat/discuzq-fe/discuzq-helper-app/mac/discuz-helper-app-v1.1.0-mac-x64.dmg

mac_m1:https://dl.discuz.chat/discuzq-fe/discuzq-helper-app/mac_m1/discuz-helper-app-v1.1.0-mac-x64.dmg

win10:https://dl.discuz.chat/discuzq-fe/discuzq-helper-app/win/discuz-helper-app-v1.1.0-win-x64.exe

win7:https://dl.discuz.chat/discuzq-fe/discuzq-helper-app/win7/discuz-helper-app-v1.1.0-win-x64.exe