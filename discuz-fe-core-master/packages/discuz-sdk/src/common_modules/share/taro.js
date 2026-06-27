// taro 设置微信和小程序分享
export function setShareInfo(options) {
    this.onShareAppMessage = function (options) {
        const {title, path, imageUrl} = options;
        return {title, path, imageUrl}
    }
}

export function taroShare() {
  // TODO taro share
}

export default taroShare;