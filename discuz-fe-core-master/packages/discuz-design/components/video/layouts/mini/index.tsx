/**
 * 目前全部都是 taro 封装好的小程序的 video
 *
 * 使用默认样式
 */
import React from 'react';
import { View, Video } from '@tarojs/components';
import { VideoProps } from '../../interface';
import { ConfigContext } from '../../../../extends/configContext';
import classNames from 'classnames';
import Taro from '@tarojs/taro';

export class MiniLayout extends React.Component<VideoProps> {
  static contextType = ConfigContext;
  videoNode = null;
  videoId = `dzq-video--${new Date().getTime()}`;
  player = null;

  componentDidMount() {
    this.player = Taro.createVideoContext && Taro.createVideoContext(this.videoId, this);
    this.props.onReady && this.props.onReady(this.player);
  }

  componentWillUnmount() {
    if (this.player) this.player = null;
    if (this.player && this.player.destory) this.player.destory();
  }

  handlePlay = (e) => {
    this.props.onPlay && this.props.onPlay(e);
  };

  handlePause = (e) => {
    this.props.onPause && this.props.onPause(e);
  };

  handleEnded = (e) => {
    this.props.onEnded && this.props.onEnded(e);
  };

  handleError = (e) => {
    this.props.onError && this.props.onError(e);
  };

  handleTimeUpdate = (e) => {
    this.props.onTimeUpdate && this.props.onTimeUpdate(e);
  };

  handleFullscreenChange = (e) => {
    this.props.onFullscreenChange && this.props.onFullscreenChange(e);
  };

  handleProgress = (e) => {
    this.props.onProgress && this.props.onProgress(e);
  };

  handleLoadedMetaData = (e) => {
    this.props.onLoadedMetaData && this.props.onLoadedMetaData(e);
  };

  handleWaiting = (e) => {
    this.props.onWaiting && this.props.onWaiting(e);
  };

  render() {
    const {
      style,
      className,
      src,
      poster,
      duration,
      controls,
      autoplay,
      loop,
      muted,
      initialTime,
      width,
      height,
      ...restProps
    } = this.props;
    const { clsPrefix } = this.context;
    return (
      <View style={style} className={classNames(`${clsPrefix}-video`, className)}>
        <Video
          id={this.videoId}
          ref={node => (this.videoNode = node)}
          style={{ width, height }}
          src={src}
          controls={controls}
          autoplay={autoplay}
          duration={duration}
          loop={loop}
          muted={muted}
          poster={poster}
          initialTime={initialTime}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onEnded={this.handleEnded}
          onTimeUpdate={this.handleTimeUpdate}
          onFullscreenChange={this.handleFullscreenChange}
          onProgress={this.handleProgress}
          onLoadedMetaData={this.handleLoadedMetaData}
          onWaiting={this.handleWaiting}
          onError={this.handleError}
          {...restProps}
        />
      </View>
    );
  }
}
