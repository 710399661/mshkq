import { StyledProps } from '../../utils/_type/StyledProps';

/**
 * Avatar 组件支持的属性
 */
export interface AvatarProps extends StyledProps {
  /**
   * 头像大小
   * @default 'primary'
   */
  size?: 'big' | 'large' | 'primary' | 'small';
  /**
   * 头像是否圆形
   * @default false
   */
  circle?: boolean;
  /**
   * 以文字形式展示头像
   */
  text?: string;
  /**
   * 头像图片地址
   */
  image?: string;
  /**
   * 展示剩余数量
   */
  surplus?: number;
  /**
   * 英文字母头像展示大写
   */
  uppercase?: boolean;
  /**
   * 参考微信[开放数据](https://developers.weixin.qq.com/miniprogram/dev/component/open-data.html)
   *
   * **注意：** openData 仅支持 type 为 userAvatarUrl
   */
  openData?: { type: 'userAvatarUrl' };
  /**
   * 鼠标移入事件
   * @default ()=>{}
   * @requires false
   */
  onMouseOver?: (event) => void;
  /**
   * 鼠标移出事件
   * @default ()=>{}
   * @requires false
   */
  onMouseOut?: (event) => void;
  /**
   * 点击事件
   * @default ()=>{}
   * @requires false
   */
  onClick?: (event) => void;
}
