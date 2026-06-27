import { StyledProps } from 'utils/_type/StyledProps';
import { AudioProps, StateInterface } from '../audio/interface';

export interface AudioPlayerStateInterface extends StateInterface {
}

export interface AudioPlayerProps extends AudioProps {
    /**
     * 文件名
     */
    fileName?: String,

    /**
     * 文件大小
     */
    fileSize?: String,

    /**
     * 点击链接回调
     */
     onLink?: () => void,

    /**
     * 点击下载回调
     */
     onDownload?: () => void,
}
