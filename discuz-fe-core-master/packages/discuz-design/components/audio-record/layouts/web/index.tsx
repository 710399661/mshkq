import classNames from 'classnames';
import React, { Component } from 'react';
import { StateInterface, PropsInterface } from '../../interface';
import { ConfigContext } from '../../../../extends/configContext';
import Icon from '../../../../components/icon';
import Progress from '../../../progress';
import Toast from '../../../../components/toast';

// 无注释，未考虑边界情况，满足了业务再优化
export class WebLayout extends Component<PropsInterface, StateInterface> {
  static contextType = ConfigContext;
  private nativeRecorder = null;
  private recorder = null;
  private intervalId = null;
  private needToUpload = false;
  private needToCancel = false;
  private isWechat = false;
  constructor(props: PropsInterface) {
    super(props);

    this.state = {
      isRecording: false,
      precent: 0,
      second: 0,
      file: null,
      isIosWechat: false,
    };
  }

  async componentDidMount() {
    const u = navigator.userAgent;
    // this.isWechat = u.match(/MicroMessenger/i) !== null;
    // const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (u.indexOf('MicroMessenger') > -1 && (u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1)) {
      // initJSSdk(['startRecord', 'stopRecord', 'onVoiceRecordEnd']);
      this.setState({
        isIosWechat: true,
      });
      // Toast.info({
      //   content: 'iOS版微信暂不支持录音功能',
      // });
    } else {
      this.nativeRecorder = (await import('recorder-core/recorder.mp3.min')).default;
    }
  }

  async startRecord() {
    const { isRecording, file } = this.state;
    const { onRecordBegan = () => {} } = this.props;
    if (isRecording || file) return;

    // if (this.isWechat) {
    //   wx.ready(() => {
    //     wx.startRecord();
    //     this.onRecordStart();
    //   });
    // } else {
    this.recorder = this.nativeRecorder({
      type: 'mp3',
      sampleRate: 16000,
      bitRate: 16,
      onProcess: () => {
        if (!this.state.isRecording) {
          this.setState({
            isRecording: true,
          });
          this.onRecordStart();
          onRecordBegan();
        }
      },
    });
    this.recorder.open(() => {
      this.recorder.start();
    }, (_msg, isUserNotAllow) => {
      if (isUserNotAllow) {
        Toast.info({
          content: '您禁用了录音权限，如需使用录音请重启浏览器或到网站设置里授权网页使用录音',
          duration: 3000,
        });
      }
    });
    // }
  }

  stopRecord() {
    clearInterval(this.intervalId);
    // if (this.isWechat) {
    //   wx.ready(() => {
    //     wx.stopRecord({
    //       success: (res) => {
    //         const localId = res.localId;
    //         if (this.needToCancel) {
    //           this.resetRecord();
    //           this.needToCancel = false;
    //           return;
    //         }

    //         this.setState({
    //           // file: blob,
    //           isRecording: false,
    //         });
    //         if (this.needToUpload) this.props.onUpload();
    //         this.needToUpload = false;
    //       },
    //     });
    //   });
    // } else {
    this.recorder.stop((blob: any) => {
      const { onRecordCompleted = () => {} } = this.props;
      this.recorder = null;

      if (this.needToCancel) {
        this.resetRecord();
        this.needToCancel = false;
        return;
      }
      onRecordCompleted();


      this.setState({
        file: blob,
        isRecording: false,
      });

      if (this.needToUpload) this.props.onUpload(blob);
      this.needToUpload = false;
    }, () => {});
    // }
  }

  cancelRecord() {
    const { file } = this.state;
    const { onRecordReset = () => {} } = this.props;
    if (this.recorder) this.stopRecord();
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
    // if (this.isWechat) this.stopRecord();
    if (this.recorder) this.stopRecord();
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
    const { isRecording, precent, second, file, isIosWechat } = this.state;
    const clsModule = `${clsPrefix}-audio-record`;
    const hz = Array(9).fill('')
      .map((_item, index) => {
        const defaultClass = `${clsModule}-area-hz-${index + 1}`;
        const animationClass = `${clsModule}-area-hz-${index + 1}--animation`;
        return (
          <div
            key={index}
            className={
              classNames(
                defaultClass,
                {
                  [animationClass]: isRecording,
                },
              )
            }
          >
          </div>
        );
      });

    return isIosWechat ? null : (
      <div className={clsModule}>

        {(isRecording || file) && <span className={`${clsModule}-duration`}>{`${second}S`}</span>}

        <div className={`${clsModule}-area`}>
          <div className={`${clsModule}-area-hz`}>{hz}</div>
          <div className={`${clsModule}-area-btn`} onClick={this.startRecord.bind(this)}>
            <Progress type="circle" percent={precent} lineWidth={3} isShowText={false} className='progress-circle-width'>
              <div className={`${clsModule}-area-btn-status`}>
                {(isRecording || file) ? (
                  <div className={`${clsModule}-area-btn-status-icon`}></div>
                ) : (
                  <Icon name='MicroOutlined' size={20} />
                )}
              </div>
            </Progress>
          </div>
          <div className={`${clsModule}-area-hz`}>{[].concat(hz).reverse()}</div>
        </div>

        <div className={`${clsModule}-toolbar`}>
          {(isRecording || file) ? (
            <>
              <Icon className={`${clsModule}-toolbar-text`} name='ReturnOutlined' size={16} onClick={this.cancelRecord.bind(this)} />
              <span className={`${clsModule}-toolbar-tips`}>{ file ? '录制完成' : '录制中' }</span>
              <Icon className={`${clsModule}-toolbar-text`} name='CheckOutlined' size={16} onClick={this.uploadRecord.bind(this)} />
            </>
          ) : (
            <span className={`${clsModule}-toolbar-tips`}>点击录音</span>
          )}
        </div>
      </div>
    );
  }
}
