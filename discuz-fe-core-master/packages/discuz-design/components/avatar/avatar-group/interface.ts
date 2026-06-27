import { StyledProps } from 'utils/_type/StyledProps';

/**
 * AvatarGroup 组件支持的属性
 */
export interface AvatarGroupProps extends StyledProps {
  /**
   * 头像大小
   * @default 'primary'
   */
  size?: 'big' | 'large' | 'primary' | 'small';
  /**
   * 渲染数据,可传入avatar相关参数
   */
  groupData: any[];
  /**
   * 显示的最大头像个数
   */
  maxCount?: number;
  /**
   * 头像是否圆形
   * @default false
   */
  circle?: boolean;
  /**
   * 英文字母头像展示大写
   */
  uppercase?: boolean;
  /**
   * 鼠标移入事件
   * @default ()=>{}
   * @requires false
   */
  onMouseEnter?: (event) => void;
  /**
   * 鼠标移出事件
   * @default ()=>{}
   * @requires false
   */
  onMouseLeave?: (event) => void;
  /**
   * 点击事件
   * @default ()=>{}
   * @requires false
   */
  onClick?: (event) => void;
}

