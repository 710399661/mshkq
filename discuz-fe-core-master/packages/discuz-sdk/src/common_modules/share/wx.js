import wx from 'weixin-js-sdk';

function getUrl() {
    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    let url = window.location.href.split('#')[0];
    if (isiOS && window.entryUrl && !/wechatdevtools/.test(navigator.userAgent)) {
        // iOS下，URL必须设置为整个SPA的入口URL
        url = window.entryUrl;
    }
    return url;
}

//微信分享 taro中，可以只使用taro-share
export const wxShare = function (opts) {
    // 通过config接口注入权限验证配置
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作

    // todo 从forum 接口获取 offiaccount_close 信息，true则直接return

    const url = getUrl();
    const data = null; //todo 从officaccount接口获取appid等数据 await request( 'offiaccount/jssdk?url=${encodeURIComponent(url)')
    const {appId, nonceStr, signature, timestamp} = data;
    wx.config({
        debug: false, // 开启调试模式,开发时可以开启
        appId: appId, // 必填，公众号的唯一标识   由接口返回
        timestamp: timestamp, // 必填，生成签名的时间戳 由接口返回
        nonceStr: nonceStr, // 必填，生成签名的随机串 由接口返回
        signature: signature, // 必填，签名 由接口返回
        jsApiList: ['updateAppMessageShareData',
            'updateTimelineShareData',
            'hideMenuItems',
            'showMenuItems'
        ] // 此处填你所用到的方法
    });
    // 通过ready接口处理成功验证
    wx.ready(() => {
        // 需在用户可能点击分享按钮前就先调用
        const dataInfo = {
            title: opts.title || 'Discuz!Q', // 分享标题
            desc: opts.desc || forums.set_site.site_introduction, // 分享描述
            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: opts.imgUrl || forums.set_site.site_favicon, // 分享图标
        };
        wx.updateAppMessageShareData(dataInfo); // 分享给朋友
        wx.updateTimelineShareData(dataInfo); // 分享到朋友圈
    });
}

// todo 弹出提示页面引导使用微信自带的分享方式（微信浏览器，且是站点分享的时候）
// 这部分设计ui且基本无js逻辑，不放在sdk

export default wxShare;
