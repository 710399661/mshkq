export function createInnerAudioContext(): InnerAudioContext;
export type InnerAudioContext = {
    /**
     * 音频资源的地址，用于直接播放。2.2.3 开始支持云文件ID
     */
    src: string;
    /**
     * 开始播放的位置（单位：s），默认为 0
     */
    startTime?: number;
    /**
     * 是否自动开始播放，默认为 false
     */
    autoplay?: boolean;
    /**
     * 是否循环播放，默认为 false
     */
    loop?: boolean;
    /**
     * 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。从 2.3.0 版本开始此参数不生效，使用 wx.setInnerAudioOption 接口统一设置。
     */
    obeyMuteSwitch?: boolean;
    /**
     * 音量。范围 0~1。默认为 1
     */
    volume?: number;
    /**
     * 当前音频的长度（单位 s）。只有在当前有合法的 src 时返回（只读）
     */
    duration: number;
    /**
     * 当前音频的播放位置（单位 s）。只有在当前有合法的 src 时返回，时间保留小数点后 6 位（只读）
     */
    currentTime: number;
    /**
     * 当前是是否暂停或停止状态（只读）
     */
    paused: boolean;
    /**
     * 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲（只读）
     */
    buffered: number;
    /**
     * () 播放
     */
    play: () => void;
    /**
     * () 暂停。暂停后的音频再播放会从暂停处开始播放
     */
    pause: () => void;
    /**
     * () 停止。停止后的音频再播放会从头开始播放。
     */
    stop: () => void;
    /**
     * (number position) 跳转到指定位置
     */
    seek: (position: number) => void;
    /**
     * () 销毁当前实例
     */
    destroy: () => void;
    /**
     * (function callback) 取消监听音频进入可以播放状态的事件
     */
    offCanplay: (callback: Function) => void;
    /**
     * (function callback) 取消监听音频自然播放至结束的事件
     */
    offEnded: (callback: Function) => void;
    /**
     * (function callback) 取消监听音频播放错误事件
     */
    offError: (callback: Function) => void;
    /**
     * (function callback) 取消监听音频暂停事件
     */
    offPause: (callback: Function) => void;
    /**
     * (function callback) 取消监听音频播放事件
     */
    offPlay: (callback: Function) => void;
    /**
     * (function callback) 取消监听音频完成跳转操作的事件
     */
    offSeeked: (callback: Function) => void;
    /**
     * (function callback) 取消监听音频进行跳转操作的事件
     */
    offSeeking: (callback: Function) => void;
    /**
     * (function callback) 取消监听音频停止事件
     */
    offStop: (callback: Function) => void;
    /**
     * (function callback) 取消监听音频播放进度更新事件
     */
    offTimeUpdate: (callback: Function) => void;
    /**
     * (function callback) 取消监听音频加载中事件
     */
    offWaiting: (callback: Function) => void;
    /**
     * (function callback) 监听音频进入可以播放状态的事件。但不保证后面可以流畅播放
     */
    onCanplay: (callback: Function) => void;
    /**
     * (function callback) 监听音频自然播放至结束的事件
     */
    onEnded: (callback: Function) => void;
    /**
     * (function callback) 监听音频播放错误事件
     */
    onError: (callback: Function) => void;
    /**
     * (function callback) 监听音频暂停事件
     */
    onPause: (callback: Function) => void;
    /**
     * (function callback) 监听音频播放事件
     */
    onPlay: (callback: Function) => void;
    /**
     * (function callback) 监听音频完成跳转操作的事件
     */
    onSeeked: (callback: Function) => void;
    /**
     * (function callback) 监听音频进行跳转操作的事件
     */
    onSeeking: (callback: Function) => void;
    /**
     * (function callback) 监听音频停止事件
     */
    onStop: (callback: Function) => void;
    /**
     * (function callback) 监听音频播放进度更新事件
     */
    onTimeUpdate: (callback: Function) => void;
    /**
     * (function callback) 监听音频加载中事件。当音频因为数据不足，需要停下来加载时会触发
     */
    onWaiting: (callback: Function) => void;
};
