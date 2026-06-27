import Taro from '@tarojs/taro';
import classNames from 'classnames';
import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import Spin from '../../../spin';
import { StateInterface, AudioProps } from '../../interface';
import { ConfigContext } from '../../../../extends/configContext';
import Icon from '../../../../components/icon';
import BgView from './bg-view';
import Progress from '../../../progress';

const createInnerAudioContext = Taro.createInnerAudioContext || wx.createInnerAudioContext;

export class AudioMiniLayout extends Component<AudioProps, StateInterface> {
  static contextType = ConfigContext;

  constructor(props) {
    super(props);

    this.state = {
      audioCtx: createInnerAudioContext(),
      audioImg: 'iconLoading',
      currentTime: 0,
      duration: 0,
      childrenRef: null,
      canPlay: false // 音乐链接初始化，保存到onCanPlay
    };
  }

  componentDidMount() {
    const { audioCtx, audioImg } = this.state;

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

    // 当音频可以播放就将状态从loading变为可播放
    audioCtx.onCanplay(() => {
      if (audioImg === 'iconLoading') {
        !this.state.canPlay && this.setAudioImg('PlayOutlined');
        // 优先定义audioCtx.duration，以便在点击播放前获取时长
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        audioCtx.duration;
        // 获取音频时长
        setTimeout(() => {
          const tempDuration = Math.floor(audioCtx.duration);
          if (this.state.duration !== tempDuration) {
            this.setState({
              duration: tempDuration,
            });
          }
        }, 10);
      }

      this.setState({
        canPlay: true
      });
    });

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

      // throw new Error(e.errMsg);
    });

    this.props.emitter.on('play', this.eventListenerPlayImpl);
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

  componentWillUnmount() {
    this.props.emitter.removeListener('play', this.eventListenerPlayImpl);

    this.state.audioCtx.stop();
    this.state.audioCtx.destroy();
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

  // 获取时长文案
  audioTime = () => {
    const { audioImg, duration = 0 } = this.state;

    if (audioImg === 'iconLoading') {
      return '加载中';
    }
    if (audioImg === 'CloseOutlined') {
      return '加载失败';
    }

    if (duration === 0 || duration === Infinity) {
      return '未知长度';
    }
    if (duration > 60) {
      return `约${Math.floor(duration / 60)}分钟`;
    }
    return `约${duration}秒`;
  };

  // 根据不同状态渲染 audio 的 icon
  renderAudioIcon = () => {
    const { clsPrefix } = this.context;
    const { disabled } = this.props;
    const { audioImg } = this.state;
    // 按钮样式
    const iconClassName = classNames(`${clsPrefix}-audio__wrapper-inner-btn--mini`, {
      'is-disabled': disabled || audioImg === 'CloseOutlined',
    });

    if (disabled) {
      return <Icon name={'CloseOutlined'} className={iconClassName} />;
    }

    if (audioImg === 'iconLoading') {
      return <Spin className={iconClassName} type="spinner" />;
    }

    return (
      <Icon
        onClick={this.playOrStopAudio}
        name={audioImg}
        className={iconClassName}
      />
    );
  };

  renderContent = () => {
    const { clsPrefix } = this.context;
    const { currentTime, duration } = this.state;
    const percent = (currentTime * 100) / duration || 0;

    return (
      <View className={`${clsPrefix}-audio__wrapper ${clsPrefix}-audio__wrapper--mini`}>
        <Progress
          type="circle"
          percent={percent}
          lineWidth={2}
          isShowText={false}
        />
        <View className={`${clsPrefix}-audio__wrapper-inner`}>
          {this.renderAudioIcon()}
        </View>
      </View>
    );
  };

  renderText = () => {
    const { clsPrefix } = this.context;
    const { onDelete } = this.props;
    return (
      <View className={`${clsPrefix}-audio__right`}>
        <Text className={`${clsPrefix}-audio__tip`}>{this.audioTime()}</Text>
        {onDelete && (
          <Icon
            name="DeleteOutlined"
            className={`${clsPrefix}-audio__delete`}
            onClick={() => {
              onDelete();
            }}
          />
        )}
      </View>
    );
  };

  render() {
    const { clsPrefix } = this.context;
    const { audioImg } = this.state;

    return (
      <View className={classNames(`${clsPrefix}-audio`)}>
        <BgView
          leftChildren={this.renderContent()}
          rightChildren={this.renderText()}
          isPlay={audioImg === 'PauseOutlined'}
        />
      </View>
    );
  }
}
