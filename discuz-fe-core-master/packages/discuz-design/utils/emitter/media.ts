import EventEmitter from 'eventemitter3';

// audio、audioPlayer、video等音视频多媒体组件通信（诸如排它性播放等）
const eventEmitter = new EventEmitter();

export default eventEmitter;