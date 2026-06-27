import Taro from '@tarojs/taro';
import classNames from 'classnames';
import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import { StateInterface, PropsInterface } from '../../interface';
import { ConfigContext } from '../../../../extends/configContext';
import Icon from '../../../../components/icon';
import Progress from '../../../progress';
import Toast from '../../../../components/toast';

// 无注释，未考虑边界情况，满足了业务再优化
export class MiniLayout extends Component<PropsInterface, StateInterface> {
  static contextType = ConfigContext;
  private recorderManager = null;
  private intervalId = null;
  private needToUpload = false;
  private needToCancel = false;
  constructor(props: PropsInterface) {
    super(props);

    this.state = {
      isRecording: false,
      precent: 0,
      second: 0,
      file: null,
    };
  }

  authorizeRecord() {
    Taro.authorize({
      scope: 'scope.record',
      success: () => {
        this.startRecord();
      },
      fail: (err) => {
        if (err?.errMsg?.indexOf('auth deny') > -1) {
          Toast.info({
            content: '请在小程序页面右上角 - 更多 - 设置里允许小程序使用录音权限',
            duration: 3000,
          });
        }
      },
    });
  }

  startRecord() {
    const { isRecording, file } = this.state;
    const { onRecordBegan = () => {}, onRecordCompleted = () => {} } = this.props;
    if (isRecording || file) return;

    const { duration = 60 } = this.props;
    this.recorderManager = Taro.getRecorderManager();
    this.recorderManager.onStart(() => {
      this.setState({
        isRecording: true,
      });
      this.onRecordStart();
      onRecordBegan();
    });

    this.recorderManager.onStop((res) => {
      if (this.needToCancel) {
        this.resetRecord();
        this.needToCancel = false;
        return;
      }
      onRecordCompleted();


      this.setState({
        file: res,
        isRecording: false,
      });
      if (this.needToUpload) this.props.onUpload(this.state.file);
      this.needToUpload = false;
    });

    this.recorderManager.start({
      duration: duration * 1000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
    });
  }

  stopRecord() {
    this.recorderManager.stop();
    clearInterval(this.intervalId);
  }

  cancelRecord() {
    const { file } = this.state;
    const { onRecordReset = () => {} } = this.props;
    this.stopRecord();
    onRecordReset();
    if (file) {
      this.resetRecord();
    } else {
      this.needToCancel = true;
    }
  }

  resetRecord() {
    this.setState({
      isRecording: false,
      precent: 0,
      second: 0,
      file: null,
    });
  }

  uploadRecord() {
    const { file } = this.state;
    this.stopRecord();
    if (file) this.props.onUpload(file);
    else this.needToUpload = true;
  }

  onRecordStart() {
    let { duration = 60 } = this.props;
    duration = duration * 1000;

    const beginTime = new Date().getTime();
    const endTime = beginTime + duration;
    this.intervalId = setInterval(() => {
      const nowTime = new Date().getTime();
      this.setState({
        precent: Math.floor((nowTime - beginTime) / duration * 100),
        second: Math.floor((nowTime - beginTime) / 1000),
      });

      if (nowTime >= endTime) {
        this.stopRecord();
      }
    }, 500);
  }

  render() {
    const { clsPrefix } = this.context;
    const { isRecording, precent, second, file } = this.state;
    const clsModule = `${clsPrefix}-audio-record`;
    const hz = Array(9).fill('')
      .map((_item, index) => {
        const defaultClass = `${clsModule}-area-hz-${index + 1}`;
        const animationClass = `${clsModule}-area-hz-${index + 1}--animation`;
        return (
          <View
            className={
              classNames(
                defaultClass,
                {
                  [animationClass]: isRecording,
                },
              )
            }
          >
          </View>
        );
      });

    return (
      <View className={clsModule}>

        {(isRecording || file) && <Text className={`${clsModule}-duration`}>{`${second}S`}</Text>}

        <View className={`${clsModule}-area`}>
          <View className={`${clsModule}-area-hz`}>{hz}</View>
          <View className={`${clsModule}-area-btn`} onClick={this.authorizeRecord.bind(this)}>
            <Progress type="circle" percent={precent} lineWidth={3} isShowText={false} className='progress-circle-width'>
              <View className={`${clsModule}-area-btn-status`}>
                {(isRecording || file) ? (
                  <View className={`${clsModule}-area-btn-status-icon`}></View>
                ) : (
                  <Icon name='MicroOutlined' size={20} />
                )}
              </View>
            </Progress>
          </View>
          <View className={`${clsModule}-area-hz`}>{[].concat(hz).reverse()}</View>
        </View>

        <View className={`${clsModule}-toolbar`}>
          {(isRecording || file) ? (
            <>
              <Icon className={`${clsModule}-toolbar-text`} name='ReturnOutlined' size={16} onClick={this.cancelRecord.bind(this)} />
              <Text className={`${clsModule}-toolbar-tips`}>{ file ? '录制完成' : '录制中' }</Text>
              <Icon className={`${clsModule}-toolbar-text`} name='CheckOutlined' size={16} onClick={this.uploadRecord.bind(this)} />
            </>
          ) : (
            <Text className={`${clsModule}-toolbar-tips`}>点击录音</Text>
          )}
        </View>
      </View>
    );
  }
}
