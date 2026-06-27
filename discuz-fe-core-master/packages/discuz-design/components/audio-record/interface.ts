import { StyledProps } from 'utils/_type/StyledProps';

export interface StateInterface {
  isRecording: boolean,
  precent: number,
  second: number,
  file: object
  isIosWechat: boolean
}

export interface PropsInterface extends StyledProps {
  /**
   * 上传函数
   */
  onUpload: (blob: any) => void,
  /**
   * 录音时间，不传则默认60秒
   * @default 60
   */
  duration?: number,
  /**
   * 开始录音后
   */
  onRecordBegan?: () => void,
  /**
   * 录音完成后
   */
  onRecordCompleted?: () => void,
  /**
   * 录音重置/清零后
   */
  onRecordReset?: () => void,
}
