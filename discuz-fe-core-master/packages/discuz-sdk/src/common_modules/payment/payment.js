// 创建订单（函数名createOrder）获取到订单号
// 订单支付（函数名orderPay）
// 多场景区分：
// pc微信支付：支付二维码 wechat_qrcode ，扫码支付
// 小程序微信支付：携带订单支付返回的信息体wechat_js，调用小程序的支付方法
// h5微信支付：跳转到微信支付
// 钱包支付：直接支付成功或者失败


function createOrder(isAnonymous, amount = 0, type, paymentType, payeeId = '') {
    params.payee_id = payeeId;
    //todo thread ID的获取逻辑
    params.thread_id = this.threadId;

    //todo 对接新接口口
    // await payApi(orderNo, paymentType);
    //
}


const mini = '0', wechat_h5 = '1', h5 = '2', pc = '3';
// 订单支付       broswerType: 0是小程序，1是微信浏览器，2是h5，3是pc
// payType 0：微信支付，1：钱包支付
function payOrder(type, value, orderSn, payType, broswerType) {
    // const params = {
    //     order_sn,
    //     payment_type,
    //     pay_password,
    // };
    orderPay(type, value, orderSn, payType, broswerType)
    {
        let params = {};
        if (payType === mini) {
            params = {
                _jv: {
                    type: `trade/pay/order/${orderSn}`,
                },
                payment_type: type,
            };
        } else if (payType === wechat_h5) {
            params = {
                _jv: {
                    type: `trade/pay/order/${orderSn}`,
                },
                payment_type: type,
                pay_password: value,
            };
        }

        // todo 调用付款接口
        const payResult = {}; // await pay
        this.wxRes = res;
        if (payType === mini) {
            if (broswerType === '0') {
                wechatPay(
                    payResult.wechat_js.timeStamp,
                    payResult.wechat_js.nonceStr,
                    payResult.wechat_js.package,
                    payResult.wechat_js.signType,
                    payResult.wechat_js.paySign,
                );
            } else if (broswerType === wechat_h5) {
                if (typeof WeixinJSBridge === 'undefined') {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady(payResult), false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady(payResult));
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(payResult));
                    }
                } else {
                    onBridgeReady(payResult);
                }
            } else if (broswerType === h5) {
                const payResultChecker = setInterval(() => {
                    if (this.payStatus === 1) {
                        clearInterval(payResultChecker);
                        return;
                    }
                    getOrderStatus(orderSn, broswerType);
                }, 3000);
                window.location.href = res.wechat_h5_link;
            } else if (broswerType === pc) {
                if (payResult) {
                    this.codeUrl = payResult.wechat_qrcode;
                    //todo 展示付款二维码 this.qrcodeShow = true;
                    const payResultChecker = setInterval(() => {
                        if (this.payStatus === 1) {
                            clearInterval(payResultChecker);
                            return;
                        }
                        getOrderStatus(this.orderSn, broswerType);
                    }, 3000);
                }
            }
        } else if (payType === wechat_h5) {
            if (payResult.wallet_pay.result === 'success') {
                //todo 展示钱包付款成功信息
            }

        }

        // switch (payWay) {
        //     case 'pc':
        //         //todo调用接口获取  wechat qrcode
        //         break;
        //     case 'mini':
        //
        //         //https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=5
        //         wx.requestPayment(
        //             {
        //                 'timeStamp': '',
        //                 'nonceStr': '',
        //                 'package': '',
        //                 'signType': 'MD5',
        //                 'paySign': '',
        //                 'success': function (res) {
        //                 },
        //                 'fail': function (res) {
        //                 },
        //                 'complete': function (res) {
        //                 }
        //             })
        //         break;
        //     case 'h5_mini':
        //         break;
        //     case 'wallet':
        //         break;
        //
        // }


    }

    //微信h5支付
    function onBridgeReady(data) {
        // const that = this;
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            {
                appId: data.wechat_js.appId, // 公众号名称，由商户传入
                timeStamp: data.wechat_js.timeStamp, // 时间戳，自1970年以来的秒数
                nonceStr: data.wechat_js.nonceStr, // 随机串
                package: data.wechat_js.package,
                signType: 'MD5', // 微信签名方式：
                paySign: data.wechat_js.paySign, // 微信签名
            },
            function (data) {
                // alert('支付唤醒');
                if (data.err_msg == 'get_brand_wcpay_request:ok') {
                    //微信支付成功，进行支付成功处理
                } else if (data.err_msg == 'get_brand_wcpay_request:cancel') {
                    // 取消支付
                    clearInterval(payResultChecker);
                } else if (data.err_msg == 'get_brand_wcpay_request:fail') {
                    // 支付失败
                    clearInterval(payResultChecker);
                }
            },
        );
        const payResultChecker = setInterval(() => {
            if (this.payStatus === 1) {
                clearInterval(payResultChecker);
                return;
            }
            getOrderStatus(orderSn);
        }, 3000);
    }
}

//小程序支付
function wechatPay(timeStamp, nonceStr, packageVal, signType, paySign) {
    // todo 小程序支付
    //         wx.requestPayment(
    //             {
    //                 'timeStamp': '',
    //                 'nonceStr': '',
    //                 'package': '',
    //                 'signType': 'MD5',
    //                 'paySign': '',
    //                 'success': function (res) {
    //                 },
    //                 'fail': function (res) {
    //                 },
    //                 'complete': function (res) {
    //                 }
    //             })

}

// 轮询查询支付状态（微信支付使用，函数名getOrderStatus）
function getOrderStatus() {
    //todo 对接新接口
    // const params = { _jv: { type: `/orders/${this.orderNo}` }, orderNo: this.orderNo };
}
