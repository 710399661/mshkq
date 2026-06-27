import tcaptcha from './tcaptcha';

// 小程序使用
export function toTCaptcha(appId, onSuccess) {
  if (wx && wx.navigateToMiniProgram) {
    return wx.navigateToMiniProgram({
      appId: 'wx5a3a7366fd07e119',
      path: '/pages/captcha/index',
      envVersion: 'develop',
      extraData: {
        appId, // 您申请的验证码的 appId
      },
      success() {
        typeof onSuccess === 'function' && onSuccess();
      },
      fail() {
      },
    });
  }
}

// h5使用
export const { TencentCaptcha } = window;
