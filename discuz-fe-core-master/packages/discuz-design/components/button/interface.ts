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
   *   - `secondary` 蓝色次级按钮
   *   - `dashed` 虚线按钮
   *   - `text` 文字按钮
   *   - `danger` 危险按钮
   *   - `warn` 警告按钮
   *   - `info` 信息按钮
   *
   */
  type?: 'primary' | 'secondary' | 'dashed' | 'text' | 'danger' | 'warn' | 'info';

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
  onClick?: (event) => void;
}

/**
 * - 小程序端支持的属性
 * - 参考微信小程序文档 https://developers.weixin.qq.com/miniprogram/dev/component/button.html
 */
export interface MiniButtonProps extends BaseButtonProps {
  openType?:
  | 'contact'
  | 'contactShare'
  | 'share'
  | 'getRealnameAuthInfo'
  | 'getAuthorize'
  | 'getPhoneNumber'
  | 'getUserInfo'
  | 'lifestyle'
  | 'launchApp'
  | 'openSetting'
  | 'feedback';

  onGetUserInfo?: (event) => void;

  onContact?: (event) => void;

  onGetPhoneNumber?: (event) => void;

  onError?: (event) => void;

  onOpenSetting?: (event) => void;

  formType?: 'submit' | 'reset';

  // lang?: 'zh_CN' | 'zh_TW' | 'en';

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
