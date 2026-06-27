import { ReactNode, CSSProperties, RefObject } from "react";
import { StyledProps } from "utils/_type/StyledProps";

/**
 * Popover 组件位置属性
 */
export interface PopPlacementProps {
  placement?:
    | "TOP"
    | "RIGHT"
    | "BOTTOM"
    | "LEFT"
    | "TL"
    | "TR"
    | "BL"
    | "BR"
    | "LT"
    | "LB"
    | "RT"
    | "RB";
}

/**
 * Popover 组件支持的属性
 */
export interface PopoverProps
  extends PopPlacementProps,
    Pick<StyledProps, "className"> {
  /**
   * 触发方式，默认 click
   */
  trigger?: "click" | "hover";

  /**
   * 跟随触发器，一般用于气泡触发器位于可滚动容器中时，容器滚动，气泡也需跟随
   */
  followTrigger?: boolean;

  /**
   * 气泡弹框内容
   */
  content?: ReactNode;

  /**
   * 触发内容
   */
  children?: ReactNode;

  /**
   * 层级
   */
  zIndex?: number;

  /**
   * 浮层底色, 优先级高于innerStyle
   */
  background?: string;

  /**
   * 触发元素外壳样式
   */
  triggerStyle?: CSSProperties;

  /**
   * 触发元素外壳class
   */
  triggerClassName?: string;

  /**
   * 弹窗元素外壳样式，一般用不到
   */
  modalStyle?: CSSProperties;

  /**
   * 弹窗元素外壳class
   */
  modalClassName?: string;

  /**
   * 弹窗元素内壳样式
   */
  innerStyle?: CSSProperties;

  /**
   * 弹窗元素内壳class
   */
  innerClassName?: string;

  /**
   * 小三角形样式
   */
  triangleStyle?: CSSProperties;

  /**
   * 小三角形class
   */
  triangleClassName?: CSSProperties;

  /**
   * 箭头是否指向触发器中心，默认false
   */
  triangleAtCenter?: boolean;

  /**
   * 显示小三角, 默认true
   */
  showTriangle?: boolean;

  /**
   * 在modal外关闭元素 默认true，允许关闭
   */
  needOutsideClose?: boolean;

  /**
   * 关闭浮层的回调函数，如果content中有需要点击关闭的，使用此回调参数
   */
  closeCallback?: Function;

  /**
   * 自动刷新
   * */
  autoRefresh?: boolean;

  /**
   * 回调强制刷新函数，用来重新计算位置
   * */
  callback?: (v: Function) => void;

  /**
   * modal的ref回调,一般用于绑定事件
   */
  modalRefCallback?: (v: RefObject<HTMLElement>) => void;

  /**
   * 点击事件
   * */
  onTriggerClick?: () => void;

  /**
   * 鼠标滑入事件
   * */
  onMouseEnter?: () => void;

  /**
   * 鼠标滑出事件
   * */
  onMouseLeave?: () => void;
}
