//状态由N部分组成， 1, 模式，2， 环境， 3，是否登录等
//状态机中的状态名字由这几部分加上_来构成

const USERNAME_MODE = 0, PHONE_MODE = 1, SENSELESS_MODE = 2;
const WX = 0, MINI = 1, H5 = 2;

let mode, env, isLoggedIn
export const states = {
    wx:{
        on: {
            // action: state
            LOGGED_IN: 'wx_mini_loggedin'
        }
    }
}
