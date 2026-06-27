import React, { ReactNode } from 'react';
import { StyledProps } from 'utils/_type/StyledProps';
/**
 * Upload 组件支持的属性
 */
export interface UploadProps extends StyledProps {
    /**
     * 上传触发区域
     */
    children?: React.ReactNode;
    /**
     * 上传的地址
     */
    action?: string;
    /**
     * 上传地址的 http method
     */
    method?: string;
    /**
     * 接受上传的文件类型
     */
    accept?: string;
    /**
     * 上传所需额外参数
     */
    data?: string;
    /**
     * 设置上传的请求头部，IE10 以上有效
     */
    headers?: object;
    /**
     * 发到后台的文件参数名
     */
    name?: string;
    /**
     * 上传的文件列表
     */
    fileList?: Array<UploadFile>;
    /**
     * 上传列表的样式
     */
    listType?: 'list' | 'card';
    /**
     * TODO:是否显示已上传文件列表
     */
    showFileList?: boolean;
    /**
     * 是否支持拖拽
     */
    drag?: boolean;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件
     */
    multiple?: boolean;
    /**
     * 最大允许上传个数，当上传数到达限制后，上传按钮消失。
     */
    limit?: number;
    /**
     * 自定义上传进度条
     * @requires false
     */
    progressRender?: (file: any) => ReactNode;
    /**
     * 上传请求时是否携带 cookie
     */
    /**
     * 通过覆盖默认的上传行为，可以自定义自己的上传实现
     */
    customRequest?: (file: UploadFile, fileList: UploadFile[]) => Promise<any>;
    /**
     * 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
     */
    beforeUpload?: (files: UploadFile | UploadFile[], fileList: UploadFile[]) => Promise<boolean>;
    /**
     * 文件状态改变时的钩子，上传成功或者失败时都会被调用
     */
    onChange?: () => void;
    /**
     * 点击文件的回调
     */
    onPreview?: () => void;
    /**
     * 文件列表移除文件的钩子
     */
    onRemove?: () => void;
}
export interface UploadFile extends File {
    /**
     * 文件唯一id
     */
    uid: string;
    /**
     * 状态
     */
    status: 'error' | 'success' | 'done' | 'uploading' | 'removed';
    /**
     * 上传进度
     */
    percent: number;
    /**
     * 缩略图地址
     */
    thumbUrl: string;
    /**
     * 下载地址
     */
    url: string;
}
