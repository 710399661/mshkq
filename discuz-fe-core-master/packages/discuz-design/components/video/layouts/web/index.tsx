/**
 * 基于 Video.js 的封装
 * https://docs.videojs.com/index.html
 *
 * 使用默认样式
 */
import React from 'react';
import { VideoWebProps, VideoState } from '../../interface';
import { ConfigContext } from '../../../../extends/configContext';
import classNames from 'classnames';
import initializePlayer from '../utils/initializePlayer';
import initailizePlayerEvent from '../utils/initailizePlayerEvent';
import EventEmitter from 'eventemitter3';
import initializeEventEmitter from '../utils/initailizeEventEmitter';

class VideoEmitter extends EventEmitter { }

const videoEmitter = new VideoEmitter();

export class WebLayout extends React.Component<VideoWebProps, VideoState> {
  static contextType = ConfigContext;
  player: any;
  videoNode: HTMLVideoElement;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.player = initializePlayer(this.videoNode, this.props);
    initailizePlayerEvent(this.player, this.props);
    this.props.onReady && this.props.onReady(this.player);
    initializeEventEmitter(this.player, videoEmitter, this.props);
  }

  componentWillUnmount() {
    // 清理视频
    if (this.player) this.player.dispose();
  }

  render() {
    const { style, className, autoplay, src } = this.props;
    const { clsPrefix } = this.context;

    return (
      <div style={style} className={classNames(`${clsPrefix}-video`, className)}>
        <div data-vjs-player>
          <video
            src={src}
            ref={node => (this.videoNode = node)}
            x5-video-player-type="h5-page"
            t7-video-player-type="inline"
            webkit-playsinline="isiPhoneShowPlaysinline"
            className="video-js"
            autoPlay={autoplay}
          ></video>
        </div>
      </div>
    );
  }
}
