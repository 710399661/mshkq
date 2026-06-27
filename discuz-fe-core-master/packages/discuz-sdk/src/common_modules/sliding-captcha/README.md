# 腾讯防水墙验证码

###小程序验证码使用文档
https://007.qq.com/applets-access.html

###H5验证码使用文档
https://007.qq.com/web-access.html?ADTAG=acces.cfg
### 其中appid为forum接口的如下字段：
#### forums.qcloud.qcloud_captcha_app_id

以下为Web端快速接入流程，适用于每次都需要进行人机验证的场景（如常见的登陆、注册、下发短信、活动等）。如果需要自定义验证触发逻辑，请参考定制接入。


1、在Head的标签内最后加入以下代码引入验证JS文件（建议直接在html中引入）

<script src="https://ssl.captcha.qq.com/TCaptcha.js"></script>
2、在你想要激活验证码的DOM元素（eg. button、div、span）内加入以下id及属性

<!--点击此元素会自动激活验证码-->
<!--id : 元素的id(必须)-->
<!--data-appid : AppID(必须)-->
<!--data-cbfn : 回调函数名(必须)-->
<!--data-biz-state : 业务自定义透传参数(可选)-->
<button id="TencentCaptcha"
data-appid="appId"
data-cbfn="callback"
type="button"
>验证</button>
3、为验证码创建回调函数，注意函数名要与data-cbfn相同

window.callback = function(res){
console.log(res)
// res（用户主动关闭验证码）= {ret: 2, ticket: null}
// res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
if(res.ret === 0){
alert(res.ticket)   // 票据
}
}
完成以上操作后，点击激活验证码的元素，即可弹出验证码。



