import React from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import { View, Text, Image } from '@tarojs/components';
import Spin from '../../../spin';
import { StateInterface, AudioPlayerProps } from '../../interface';
import Icon from '../../../../components/icon';
import Progress from '../../../progress';
import BgView from './bg-view';
import Slider from '../../../slider';

import { AudioMiniLayout } from '../../../../components/audio/layouts/mini';
import { transferFileSize } from '../util';
import throttle from '../../../../utils/throttle';

// 基于Audio组件重新定义播放样式
export class AudioPlayerMiniLayout extends AudioMiniLayout<AudioPlayerProps, StateInterface> {
  constructor(props) {
    super(props);
  }


  renderContent = () => {
    const { clsPrefix } = this.context;
    const { fileName, fileSize } = this.props;

    return (
      <View className={`${clsPrefix}-audio-player__wrapper`}>
        <Image src='https://imgcache.qq.com/operation/dianshi/other/audio-outlined.d04f8b9380204fe1b1b671f59145695f56cc222d.png' className={`${clsPrefix}-audio-player__wrapper-icon`} />
        <View className={`${clsPrefix}-audio-player__wrapper-inner`}>
          <View className={`${clsPrefix}-audio-player__wrapper-inner-fileName`}>{ fileName }</View>
          <View className={`${clsPrefix}-audio-player__wrapper-inner-fileSize`}>{ transferFileSize(fileSize) }</View>
        </View>
      </View>
    );
  };

  // 根据不同状态渲染 audio 的 icon
  renderPlayIcon = () => {
    const { clsPrefix } = this.context;
    const { disabled } = this.props;
    const { audioImg } = this.state;

    // 按钮样式
    const iconClassName = classNames(`${clsPrefix}-audio-player__wrapper-inner-btn`, {
      'is-disabled': disabled || audioImg === 'CloseOutlined',
    });

    if (disabled) {
      return <Icon name={'CloseOutlined'} className={iconClassName} size={12} />;
    }

    if (audioImg === 'iconLoading') {
      return <Spin className={iconClassName} type="spinner" size={12} />;
    }

    return <Icon onClick={this.playOrStopAudio} name={audioImg} className={iconClassName} size={12} />;
  };

  renderOperation = () => {
    const { clsPrefix } = this.context;
    const { onDelete, onLink, onDownload, onPlay, disabled } = this.props;
    const { audioImg } = this.state;

    return (
      <View className={`${clsPrefix}-audio-player__right`}>
        {
          this.renderPlayIcon()
        }
        {onLink && (
          <View className={`${clsPrefix}-audio-player__right-link`} onClick={() => onLink()}>
            链接
          </View>
        )}
        {onDownload && (
          <View className={`${clsPrefix}-audio-player__right-download`} onClick={() => onDownload()}>
            下载
          </View>
        )}
        {onDelete && (
          <Icon name="DeleteOutlined" className={`${clsPrefix}-audio-player__right-delete`} onClick={() => {
            onDelete();
          }} />
        )}
      </View>
    );
  };

  // 拖拽进度条
  isPlaying = null;

  progressChange = throttle((percentage) => {
    // 小程序性能优化：在拖拽结束前暂停音乐播放，否则会很卡顿
    if (this.isPlaying === null) {
      this.isPlaying = !this.state.audioCtx.paused;

      if (this.state.audioCtx && this.state.audioCtx.pause) {
        this.state.audioCtx.pause();
      }
    }

    const currentTime = this.state.duration * percentage / 100;

    this.setState({
      currentTime,
    });

    this.seek(currentTime);
  });

  // 小程序性能优化：减少seek事件触发，优化拖拽性能
  seekTimeout = null;

  seek = (currentTime) => {
    clearTimeout(this.seekTimeout);
    this.seekTimeout = setTimeout(() => {
      this.state.audioCtx.seek(currentTime);
      if (this.isPlaying !== null) {
        this.isPlaying && this.state.audioCtx.play();
        this.isPlaying = null;
      }
    }, 100);
  };

  renderProgress = () => {
    const { clsPrefix } = this.context;
    const { currentTime, duration } = this.state;
    const percent = currentTime * 100 / duration || 0;

    return (
      <View className={`${clsPrefix}-audio-player__progress`}>
        <Slider value={percent} step={0.1} formatter={value => null} onChange={this.progressChange}/>
        {/* <Progress percent={percent} lineWidth={3} isShowText={false} />*/}
      </View>
    );
  };

  render() {
    const { clsPrefix } = this.context;
    const { audioImg } = this.state;
    const { style, className } = this.props;

    return (
      <View className={classNames(`${clsPrefix}-audio-player`, className)} style={style}>
        <BgView leftChildren={this.renderContent()} rightChildren={this.renderOperation()} bottomChildren={this.renderProgress()} />
      </View>
    );
  };
}
