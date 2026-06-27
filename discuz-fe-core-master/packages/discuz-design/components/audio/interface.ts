import { StyledProps } from 'utils/_type/StyledProps';

export interface StateInterface {
  audioCtx: any
  audioImg: string
  currentTime: number
  duration: number
  childrenRef: any
}

export interface AudioProps extends StyledProps {
  /**
   * 音频地址
   */
  src: string,
  /**
   * 是否循环播放
   * @default false
   */
  loop?: boolean,
  /**
   * 音频播放错误回调
   * @default () => {}
   */
  onError?: () => void,
  /**
   * 音频播放前回调
   * @default () => {}
   */
  beforePlay?: () => void,
  /**
   * 音频播放回调
   * @default () => {}
   */
  onPlay?: () => void,
  /**
   * 音频播放暂停回调
   * @default () => {}
   */
  onPause?: () => void,
  /**
   * 音频播放完成回调
   * @default () => {}
   */
  onEnded?: () => void,
  /**
   * 获取音频实例
   */
  ref?: any,
  /**
   * 是否禁止播放
   * @default false
   */
  disabled?: boolean,
  /**
   * 删除音频
   * @default () => {}
   */
  onDelete?: () => void,

  /**
   * 是否单例，单例模式下，全局播放器互斥
   * @default true
   */
  singleton?: boolean,
}
