import Taro from '@tarojs/taro';

// https://taro-docs.jd.com/taro/docs/apis/route/reLaunch
class MiniRouter {
  
  router = Taro;
  push(options = {}) {
    Taro.navigateTo(options);
  }
  replace(options = {}) {
    Taro.redirectTo(options);
  }
  reLaunch(options = {}) {
    Taro.reLaunch(options);
  }
  switchTab(options = {}) {
    Taro.switchTab(options);
  }
  // 小程序不支持
  prefetch() {
    console.warn('小程序不支持prefeatch');
  }
  beforePopState() {
    console.warn('小程序不支持beforePopState');
  }
  back(options) {
    Taro.navigateBack(options);
  }
  redirect(options) {
    Taro.redirectTo(options);
  }
}

export default new MiniRouter();
