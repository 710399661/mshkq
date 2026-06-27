import React from 'react';
import classNames from 'classnames';
import { StateInterface, AudioPlayerProps } from '../../interface';
import Icon from '../../../../components/icon';
import Slider from '../../../slider';
import Spin from '../../../spin';
import BgView from './bg-view';
import { AudioWebLayout } from '../../../../components/audio/layouts/web';
import { transferFileSize } from '../util';
import throttle from '../../../../utils/throttle';

// 基于Audio组件重新定义播放样式
export class AudioPlayerWebLayout extends AudioWebLayout<AudioPlayerProps, StateInterface> {
  renderContent = () => {
    const { clsPrefix } = this.context;
    const { fileName, fileSize } = this.props;

    return (
      <div className={`${clsPrefix}-audio-player__wrapper`}>
        <img alt="图片" src='https://imgcache.qq.com/operation/dianshi/other/audio-outlined.d04f8b9380204fe1b1b671f59145695f56cc222d.png' className={`${clsPrefix}-audio-player__wrapper-icon`} />
        <div className={`${clsPrefix}-audio-player__wrapper-inner`}>
          <div className={`${clsPrefix}-audio-player__wrapper-inner-fileName`}>{ fileName }</div>
          <div className={`${clsPrefix}-audio-player__wrapper-inner-fileSize`}>{ transferFileSize(fileSize) }</div>
        </div>
      </div>
    );
  };

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
      <div className={`${clsPrefix}-audio-player__right`}>
        {
          this.renderPlayIcon()
        }
        {onLink && (
          <div className={`${clsPrefix}-audio-player__right-link`} onClick={() => onLink()}>
            链接
          </div>
        )}
        {onDownload && (
          <div className={`${clsPrefix}-audio-player__right-download`} onClick={() => onDownload()}>
            下载
          </div>
        )}
        {onDelete && (
          <Icon name="DeleteOutlined" className={`${clsPrefix}-audio-player__right-delete`} onClick={() => {
            onDelete();
          }} />
        )}
      </div>
    );
  };

  // 拖拽进度条
  progressChange = throttle((percentage) => {
    const currentTime = this.state.duration * percentage / 100;
    this.setState({
      currentTime,
    });

    this.seek(currentTime);
  });

  seekTimeout = null;
  seek = (currentTime) => {
    clearTimeout(this.seekTimeout);
    this.seekTimeout = setTimeout(() => {
      this.state.audioCtx.seek(currentTime);
    }, 100);
  };

  renderProgress = () => {
    const { clsPrefix } = this.context;
    const { currentTime, duration } = this.state;
    const percent = currentTime * 100 / duration || 0;

    return (
      <div className={`${clsPrefix}-audio-player__progress`}>
        <Slider value={percent} step={0.1} formatter={value => null} onChange={this.progressChange}/>
      </div>
    );
  };

  render() {
    const { clsPrefix } = this.context;
    const { audioImg } = this.state;
    const { style, className } = this.props;

    return (
      <div className={classNames(`${clsPrefix}-audio-player`, className)} style={style}>
        <BgView leftChildren={this.renderContent()} rightChildren={this.renderOperation()} bottomChildren={this.renderProgress()} />
      </div>
    );
  };
}
