import { StyledProps } from 'utils/_type/StyledProps';
/**
 * Button 组件支持的属性
 */
export interface BaseButtonProps extends StyledProps {
    /**
     * 按钮类型
     *
     *   - `large` 大尺寸
     *   - `medium` 中尺寸
     *   - `small` 中小尺寸
     *   - `mini` 小尺寸
     *
     * @default "medium"
     */
    size?: 'large' | 'medium' | 'small' | 'mini';
    /**
     * 按钮类型
     *   -  默认白色按钮
     *   - `primary` 蓝色主要按钮
     *   - `dashed` 虚线按钮
     *   - `text` 文字按钮
     *   - `danger` 危险按钮
     *   - `warn` 警告按钮
     *
     */
    type?: 'primary' | 'dashed' | 'text' | 'danger' | 'warn';
    /**
     * 设置按钮为禁用状态
     *
     * 禁用状态下，不会响应 `onClick` 回调
     * @default false
     * */
    disabled?: boolean;
    /**
     * 设置按钮为圆形
     * @default false
     **/
    circle?: boolean;
    /**
     * 设置按钮为占满
     * @default false
     **/
    full?: boolean;
    /**
     * 设置按钮为加载状态
     * @default false
     */
    loading?: boolean;
    /**
     * 点击回调函数
     */
    onClick?: (event: any) => void;
}
/**
 * - 小程序端支持的属性
 * - 参考微信小程序文档 https://developers.weixin.qq.com/miniprogram/dev/component/button.html
 */
export interface MiniButtonProps extends BaseButtonProps {
    openType?: 'contact' | 'contactShare' | 'share' | 'getRealnameAuthInfo' | 'getAuthorize' | 'getPhoneNumber' | 'getUserInfo' | 'lifestyle' | 'launchApp' | 'openSetting' | 'feedback';
    onGetUserInfo?: (event: any) => void;
    onContact?: (event: any) => void;
    onGetPhoneNumber?: (event: any) => void;
    onError?: (event: any) => void;
    onOpenSetting?: (event: any) => void;
    formType?: 'submit' | 'reset';
    sessionFrom?: string;
    sendMessageTitle?: string;
    sendMessagePath?: string;
    sendMessageImg?: string;
    showMessageCard?: boolean;
    appParameter?: string;
}
/**
 * web端专有属性
 */
export interface WebButtonProps extends BaseButtonProps {
    /**
     * 原生 `<button>` 标签的 `type` 属性
     */
    htmlType?: 'button' | 'submit' | 'reset';
}
