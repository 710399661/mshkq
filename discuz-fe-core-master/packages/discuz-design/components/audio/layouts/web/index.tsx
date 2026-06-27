import React, { Component } from 'react';
import classNames from 'classnames';
import { createInnerAudioContext } from './web';
import { ConfigContext } from '../../../../extends/configContext';
import { StateInterface, AudioProps } from '../../interface';
import Icon from '../../../../components/icon';
import Progress from '../../../progress';
import Spin from '../../../spin';
import BgView from './bg-view';
import isIOSMobile from '../../../../utils/is-ios-mobile';

export class AudioWebLayout extends Component<AudioProps, StateInterface> {
  static contextType = ConfigContext;

  constructor(props) {
    super(props);

    this.state = {
      audioCtx: null,
      audioImg: 'iconLoading',
      currentTime: 0,
      duration: 0,
      childrenRef: null,
    };

    // ios设备需要点击播放才能触发onLoadedmetadata，因此默认可播放
    if (isIOSMobile()) {
      const timeout = setTimeout(() => {
        this.setAudioImg('PlayOutlined');
        clearTimeout(timeout);
      });
    }
  }

  componentDidMount() {
    const audioCtx = createInnerAudioContext();
    this.audioMount(audioCtx);
    this.setState({ audioCtx });

    this.props.emitter.on('play', this.eventListenerPlayImpl);
  }

  eventListenerPlayImpl = (target) => {
    // 如果派发对象是自己，则无效
    if (target === this) return;

    // 如果不是单例，不生效
    if (!this.props.singleton) return;

    const { audioCtx } = this.state;

    if (audioCtx && audioCtx.pause) {
      audioCtx.pause();

      this.setState({
        audioCtx,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const newSrc = nextProps.src || '';
    if (this.props.src !== newSrc && newSrc !== '') {
      const { audioCtx } = this.state;
      if (!audioCtx.paused) {
        // 如果还在播放中，先进行停止播放操作
        audioCtx.stop();
      }

      audioCtx.src = nextProps.src;

      // 重置当前播放时间和总时长
      this.setState({
        currentTime: 0,
        duration: 0,
      });
    }
  }

  componentWillUnmount() {
    const { audioCtx } = this.state;

    this.props.emitter.removeListener('play', this.eventListenerPlayImpl);

    if (audioCtx) {
      audioCtx.stop();
      audioCtx.destroy();
    } else {
      // 防止setState操作还没结束，已经将组件从DOM中移除
      this.setState = () => {
        return;
      };
    }
  }

  // 设置按钮icon
  setAudioImg(newImg: string) {
    this.setState({
      audioImg: newImg,
    });
  }

  // 播放&暂停
  playOrStopAudio = async () => {
    this.props.emitter.emit('play', this);

    // 增加播放前回调
    const curIcon = this.state.audioImg;
    this.setAudioImg('iconLoading');
    const isPlayable = await this.props.beforePlay();
    if (isPlayable === false) {
      this.setAudioImg(curIcon);
      return;
    }

    const { audioCtx } = this.state;
    if (audioCtx.paused && !this.props.disabled) {
      audioCtx.play();
    } else {
      audioCtx.pause();
    }
  };

  audioMount = (audioCtx) => {
    const { audioImg } = this.state;

    audioCtx.src = this.props.src;
    audioCtx.loop = !!this.props.loop;

    // 当播放的时候通过TimeUpdate的回调去更改当前播放时长和总时长（总时长更新放到onCanplay回调中会出错）
    audioCtx.onTimeUpdate(() => {
      if (audioCtx.currentTime > 0 && audioCtx.currentTime <= 1) {
        this.setState({
          currentTime: 0,
        });
      } else if (audioCtx.currentTime !== Math.floor(audioCtx.currentTime)) {
        this.setState({
          currentTime: Math.floor(audioCtx.currentTime),
        });
      }

      const tempDuration = Math.floor(audioCtx.duration);
      if (this.state.duration !== tempDuration) {
        this.setState({
          duration: tempDuration,
        });
      }
    });

    audioCtx.onLoadedmetadata(() => {
      if (audioImg === 'iconLoading') {
        !isIOSMobile() && this.setAudioImg('PlayOutlined');

        // 获取音频时长
        setTimeout(() => {
          this.setState({
            duration: audioCtx.duration,
          });
        }, 10);
      }
    });

    // 当音频可以播放就将状态从loading变为可播放
    // 在ios中并不会触发onCanplay事件，导致一直loading
    // audioCtx.onCanplay(() => {
    //   if (audioImg === 'iconLoading') {
    //     this.setAudioImg('PlayOutlined');

    //     // 获取音频时长
    //     setTimeout(() => {
    //       this.setState({
    //         duration: audioCtx.duration,
    //       });
    //     }, 10);
    //   }
    // });

    // 当音频在缓冲时改变状态为加载中
    audioCtx.onWaiting(() => {
      if (audioImg !== 'iconLoading') {
        this.setAudioImg('iconLoading');
      }
    });

    // 开始播放后更改图标状态为播放中
    audioCtx.onPlay(() => {
      this.setAudioImg('PauseOutlined');

      this.props.onPlay();
    });

    // 暂停后更改图标状态为暂停
    audioCtx.onPause(() => {
      this.setAudioImg('PlayOutlined');

      const { onPause = () => {} } = this.props;
      onPause();
    });

    // 播放结束后更改图标状态
    audioCtx.onEnded(() => {
      if (audioImg !== 'iconPaused') {
        this.setAudioImg('PlayOutlined');
      }

      this.setState({
        currentTime: 0,
      });

      const { onEnded = () => {} } = this.props;
      onEnded();
    });

    // 音频加载失败时 抛出异常
    audioCtx.onError((e) => {
      if (audioImg !== 'CloseOutlined') {
        this.setAudioImg('CloseOutlined');
      }
      const { onError = () => {} } = this.props;
      onError();

      console.error(e.errMsg);
    });
  };

  // 获取时长文案
  audioTime = () => {
    const { audioImg, duration = 0 } = this.state;
    const { disabled } = this.props;

    if (disabled) {
      return '加载失败';
    }

    if (audioImg === 'iconLoading') {
      return '加载中';
    } if (audioImg === 'CloseOutlined') {
      return '加载失败';
    }

    if (duration === 0 || duration === Infinity) {
      return '未知长度';
    }
    if (duration > 60) {
      return `约${Math.floor(duration / 60)}分钟`;
    }
    return `约${Math.floor(duration)}秒`;
  }

  // 根据不同状态渲染 audio 的 icon
  renderAudioIcon = () => {
    const { clsPrefix } = this.context;
    const { disabled } = this.props;
    const { audioImg } = this.state;
    // 按钮样式
    const iconClassName = classNames(`${clsPrefix}-audio__wrapper-inner-btn`, {
      'is-disabled': disabled || audioImg === 'CloseOutlined',
    });

    if (disabled) {
      return <Icon name={'CloseOutlined'} className={iconClassName} />;
    }

    if (audioImg === 'iconLoading') {
      return <Spin className={iconClassName} type="spinner" />;
    }

    return <Icon onClick={this.playOrStopAudio} name={audioImg} className={iconClassName} />;
  }

  renderContent = () => {
    const { clsPrefix } = this.context;
    const { currentTime, duration } = this.state;
    const percent = currentTime * 100 / duration || 0;

    return (
      <div className={`${clsPrefix}-audio__wrapper`}>
        <Progress type="circle" percent={percent} lineWidth={3} isShowText={false} />
        <div  className={`${clsPrefix}-audio__wrapper-inner`}>
          {this.renderAudioIcon()}
        </div>
      </div>
    );
  }
  
  renderText = () => {
    const { clsPrefix } = this.context;
    const { onDelete } = this.props;
    return (
      <div className={`${clsPrefix}-audio__right`}>
        <span className={`${clsPrefix}-audio__tip`}>{this.audioTime()}</span>
        {onDelete && (
          <Icon
            name="DeleteOutlined"
            className={`${clsPrefix}-audio__delete`}
            onClick={() => {
              onDelete();
            }}
          />
        )}
      </div>
    );
  };

  render() {
    const { clsPrefix } = this.context;
    const { audioImg } = this.state;

    return (
      <div className={classNames(`${clsPrefix}-audio`)}>
        <BgView leftChildren={this.renderContent()} rightChildren={this.renderText()} isPlay={audioImg === 'PauseOutlined'} />
      </div>
    );
  }
}
