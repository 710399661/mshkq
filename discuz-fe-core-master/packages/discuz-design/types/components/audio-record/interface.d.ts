import { StyledProps } from 'utils/_type/StyledProps';
export interface StateInterface {
    isRecording: boolean;
    precent: number;
    second: number;
    file: object;
    isIosWechat: boolean;
}
export interface PropsInterface extends StyledProps {
    /**
     * 上传函数
     */
    onUpload: (blob: any) => void;
    /**
     * 录音时间，不传则默认60秒
     */
    duration: number;
}
