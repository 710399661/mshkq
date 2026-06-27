import { StyledProps } from 'utils/_type/StyledProps';

interface BaseTextareaProps extends StyledProps {
  /**
   * 输入框当前值，开发者需要通过 onChange 事件来更新 value 值，必填
   * @default ""
   * @requires true
   */
  value: string;

  /**
   * TODO: 默认保留字段
   * @requires false
   */
  type?: string;

  /**
   * 默认展示行数
   */
  rows?: number;

  /**
   * 占位提示符
   * @requires true
   */
  placeholder: string;

  /**
   * 是否禁用
   * @default false
   * @requires false
   */
  disabled?: boolean;

  /**
   * 最大输入长度，设置为 -1 的时候不限制最大长度
   * @default -1
   * @requires false
   */
  maxLength?: number;

  /**
   * 显示字数统计，需配合 maxlength 属性来限制输入长度
   * @default false
   * @requires false
   */
  showLimit?: boolean;

  /**
   * 自动获取焦点
   * @default false
   * @requires false
   */
  focus?: boolean;

  /**
   * 输入框值改变时触发的事件;
   * 触发input事件，event.detail = {value, cursor, keyCode}，处理函数可以直接 return 一个字符串，将替换输入框的内容。
   * @default ()=>{}
   * @requires false
   */
  onChange?: (event) => void;

  /**
   * 焦点事件
   * @default ()=>{}
   * @requires false
   */
  onFocus?: (event) => void;

  /**
   * 失去焦点事件
   * @default ()=>{}
   * @requires false
   */
  onBlur?: (event) => void;

  /**
   * ref
   * @requires false
   */
  forwardedRef?: any;
}

/**
 * Web端 Textarea 支持的属性
 */
export interface WebTextareaProps extends BaseTextareaProps {}

/**
 * 小程序端 Textarea 支持的属性
 */
export interface MiniTextareaProps extends BaseTextareaProps {
  /**
   * 指定 placeholder 的样式
   * @default ""
   * @requires false
   */
  placeholderStyle?: string;

  /**
   * 指定 placeholder 的样式类
   * @default "input-placeholder"
   * @requires false
   */
  placeholderClass?: string;

  /**
   * 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
   * @default 0
   * @requires fasle
   */
  cursorSpacing?: number;

  /**
   * 自动聚焦，拉起键盘
   * @default false
   * @requires false
   */
  autoFocus?: boolean;

  /**
   * 是否自动增高，设置 autoHeight 时，style.height不生效
   * @default false
   */
  autoHeight?: boolean;

  /**
   * 如果 Textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
   * @default false
   */
  fixed?: boolean;

  /**
   * 点击键盘右下角按钮时是否保持键盘不收起
   * @default false
   * @requires false
   */
  confirmHold?: boolean;

  /**
   * 指定focus时的光标位置
   * @requires false
   */
  cursor?: number;

  /**
   * 光标起始位置，自动聚集时有效，需与selection-end搭配使用
   * @default -1
   * @requires false
   */
  selectionStart?: number;

  /**
   * 光标结束位置，自动聚集时有效，需与selection-start搭配使用
   * @default -1
   * @requires false
   */
  selectionEnd?: number;

  /**
   * 键盘弹起时，是否自动上推页面
   * @default true
   * @requires false
   */
  adjustPosition?: boolean;

  /**
   * focus 时，点击页面的时候不收起键盘
   * @default false
   * @requires false
   */
  holdKeyboard?: boolean;

  /**
   * 点击完成按钮时触发 event.detail = {value: value}
   * @default ()=>{}
   * @requires false
   */
  onConfirm?: (event) => void;

  /**
   * 键盘高度发生变化的时候触发此事件event.detail = {height: height, duration: duration}
   * @default ()=>{}
   * @requires false
   */
  onKeyboardHeightChange?: (value, event) => void;

  /**
   * 输入框行数变化时调用，event.detail = {height: 0, heightRpx: 0, lineCount: 0}
   * @default ()=>{}
   * @requires false
   */
  onLineChange?: (value, event) => void;
}
