/**
 * 初始化视频事件
 */
import { VideoWebProps } from '../../interface';

function initailizePlayerEvent(player, props: VideoWebProps): void {
  player.on('play', (event) => {
    props.onPlay && props.onPlay(event);
  });

  player.on('pause', (event) => {
    props.onPause && props.onPause(event);
  });

  player.on('waiting', (event) => {
    props.onWaiting && props.onWaiting(event);
  });

  player.on('timeupdate', (event) => {
    // 当前播放的时间
    const currentTime = player.currentTime();
    // 视频时长。注意：在知道视频时长之前视频必须已经开始加载，而且取决于视频的预加载行为，知道视频开始播放
    const duration = player.duration();
    // detail 和小程序对齐
    props.onTimeUpdate && props.onTimeUpdate({ ...event, detail: { currentTime, duration } });
  });

  player.on('seeking', (event) => {
    player.off('timeupdate', () => {});
    player.one('seeked', () => {});
  });

  player.on('ended', (event) => {
    props.onEnded && props.onEnded(event);
  });

  player.on('error', (event) => {
    props.onError && props.onError(event);
  });

  player.on('loadedmetadata', (event) => {
    props.onLoadedMetaData && props.onLoadedMetaData(event);
  });

  player.on('fullscreenchange', (event) => {
    const isFullscreen = player.isFullscreen();
    props.onFullscreenChange
      && props.onFullscreenChange({
        ...event,
        detail: {
          fullScreen: isFullscreen,
          fullscreen: isFullscreen,
        },
      }); // detail 和小程序对齐
  });

  player.on('progress', (event) => {
    const buffered = player.bufferedPercent();
    props.onProgress && props.onProgress({ ...event, detail: { buffered } });
  });
}

export default initailizePlayerEvent;
