export interface ImagePreviewerProps {
    /**
     * 图片的 url 列表
     */
    imgUrls: string[];
    /**
     * 是否正在预览图片
     */
    visible: boolean;
    /**
     * 当前被预览图片的 url
     * @default ''
     */
    current: string;
    /**
     * 图片预览接口调用成功回调
     */
    onSuccess: (res: any) => void;
    /**
     * 图片预览接口调用失败回调
     */
    onFail: (res: any) => void;
    /**
     * 图片预览接口调用完成回调
     */
    onComplete: (res: any) => void;
    /**
     * 图片预览关闭时的回调
     * web端接口
     */
    onClose: () => void;
}
export interface ImagePreviewerRef {
    /**
     * 展示图片预览方法
     */
    show: () => void;
    /**
     * 隐藏图片预览，web 端独有
     */
    hide?: () => void;
}
