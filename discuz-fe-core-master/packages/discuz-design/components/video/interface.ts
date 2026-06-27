import { StyledProps } from '../../utils/_type/StyledProps';
/**
 * Video 组件支持的属性
 */
export interface VideoProps extends StyledProps {
  /**
   * 要播放视频的资源地址
   */
  src: string;
  /**
   * 视频封面图片地址
   */
  poster?: string;
  /**
   * 指定视频时长（仅支持小程序）
   */
  duration?: number;
  /**
   * 是否显示默认播放控件
   */
  controls?: boolean;
  /**
   * 是否自动播放
   */
  autoplay?: boolean;
  /**
   * 是否循环播放
   */
  loop?: boolean;
  /**
   * 是否静音播放
   */
  muted?: boolean;
  /**
   * 指定视频初始播放位置
   */
  initialTime?: number;
  /**
   * 展示的高度
   */
  height?: number | string;
  /**
   * 展示的宽度
   */
  width?: number | string;
  /**
   * 开始
   */
  onReady?: (event) => void;
  /**
   * 开始|继续播放时触发
   */
  onPlay?: (event) => void;
  /**
   * 暂停播放时触发
   */
  onPause?: (event) => void;
  /**
   * 播放结束时触发
   */
  onEnded?: (event) => void;
  /**
   * 播放进度变化时触发
   */
  onTimeUpdate?: (event) => void;
  /**
   * 视频进入和退出全屏时触发
   */
  onFullscreenChange?: (event) => void;
  /**
   * 缓存加载进度变化时触发，返回百分比进度
   */
  onProgress?: (event) => void;
  /**
   * 视频源数据加载完成时触发
   */
  onLoadedMetaData?: (event) => void;
  /**
   * 视频出现缓存时触发
   */
  onWaiting?: (event) => void;
  /**
   * 播放出错时触发
   */
  onError?: (event) => void;
  /**
   * 是否单例，单例模式下，全局播放器互斥
   * @default true
   */
  singleton?: boolean;
}

export interface VideoWebProps extends VideoProps {
  /**
   * 预加载，该枚举属性旨在告诉浏览器作者认为达到最佳的用户体验的方式是什么
   * none：浏览器不进行缓存；metadata：缓存元数据；auto：进行缓存
   * https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video
   */
  preload?: 'auto' | 'metadata' | 'none';
}

export interface VideoState {}
