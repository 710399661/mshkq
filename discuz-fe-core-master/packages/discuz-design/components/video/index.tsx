/**
 * Video 组件入口文件
 * 注意：多视频播放互斥问题
 */
import React from 'react';
import { viewAdapter } from './layouts';
import { logicalAdapter } from './adapters';
import { baseComponentFactory } from '../../extends/baseComponent';
import { VideoWebProps, VideoState } from './interface';
import { noop } from '../../utils/noop';
import report from '../../utils/report';

interface VideoAdapter {}
interface VideoLayoutProps {}

export default class Video extends baseComponentFactory<VideoWebProps, VideoState, VideoLayoutProps, VideoAdapter>({
  viewAdapter,
  logicalAdapter,
}) {
  constructor(props) {
    super(props);
    report({
      componentName: 'video'
    })
  }

  /**
   * 属性默认值
   */
  static defaultProps = {
    controls: true,
    autoplay: false,
    loop: false,
    muted: false,
    initialTime: 0,
    onReady: noop,
    onPlay: noop,
    onPause: noop,
    onEnded: noop,
    onError: noop,
    onTimeUpdate: noop,
    onFullscreenChange: noop,
    onProgress: noop,
    onLoadedMetaData: noop,
    onWaiting: noop,
    singleton: true,
  };

  render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props} />;
  }
}
