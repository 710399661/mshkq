// forums.set_reg.register_type 0 1 2 分别代表用户名模式、手机号模式和无感模式
const USERNAME_MODE = 0, PHONE_MODE = 1, SENSELESS_MODE = 2;
const WX = 0, MINI = 1, H5 = 2;

function invitation(env, mode, isLoggedIn) {
    //已登陆逻辑
    if (isLoggedIn) {
        switch (env) {
            case WX:
                if (mode === SENSELESS_MODE) {
                    // todo 跳转首页
                    return
                }
                //其他模式
                // todo 在邀请页面显示提示文案，请退出后重试
                break;
            case MINI:
                // todo 跳转首页
                break;
            case H5:
                // todo 在邀请页面显示提示文案，请退出后重试
                break;
        }

        return;
    }

    //游客逻辑
    switch (env) {
        case WX:
            // todo 带着邀请码自动注册
            break;
        case MINI:
            switch (env) {
                case USERNAME_MODE:
                    // todo 跳转用户名方式注册页
                    break;
                case PHONE_MODE:
                    // todo 跳转手机号方式注册页
                    break;
                case SENSELESS_MODE:
                    // todo 带着邀请码自动注册
                    break;
            }

            break;
        case H5:
            switch (env) {
                case USERNAME_MODE:
                    // todo 跳转用户名方式注册页
                    break;
                case PHONE_MODE:
                    // todo 跳转手机号方式注册页
                    break;
                case SENSELESS_MODE:
                    // forums.qcloud.qcloud_sms true false 是否开启短信服务
                    const isSMSServiceOpened = true// todo 查询是否开启腾讯云短信服务
                    if (isSMSServiceOpened) {
                        // todo 跳转用户名方式注册页
                        return
                    } else {
                        // todo 跳转手机号方式注册页
                    }
                    break;
            }

            break;
    }

}
