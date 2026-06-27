/// <reference types="react" />
import { UploadProps } from '../interface';
/**
 * 文件上传组件
 * TODO: 通过ref抛出一些方法
 */
export declare const UploadWebLayout: {
    (props: UploadProps, ref: any): JSX.Element;
    defaultProps: {
        listType: string;
        fileList: any[];
    };
};
