import Taro from '@tarojs/taro';

// 每次在一个音源暂停或者停止播放的时候将全局标识audioPlaying重置为false，用以让后续的音频可以播放

export function afterAudioPlay() {
  try {
    Taro.setStorageSync('audioPlaying', false);
  } catch (e) {}
}

// 在每次播放音频之前检查全局变量audioPlaying是否为true，如果是true，当前音频不能播放，需要之前的音频结束或者手动去暂停或者停止之前的音频播放，如果是false，返回true，并将audioPlaying置为true

export function beforeAudioPlay() {
  let audioPlaying = '';
  try {
    const value = Taro.getStorageSync('audioPlaying');
    if (value) {
      audioPlaying = value;
    }
  } catch (e) {}

  if (audioPlaying) {
    Taro.showToast({
      title: '请先暂停其他音频播放',

      icon: 'none',
    });

    return false;
  }
  try {
    Taro.setStorageSync('audioPlaying', true);
  } catch (e) {}

  return true;
}
