/**
 * 初始化视频
 */
import videojs from 'video.js';
import { VideoWebProps } from '../../interface';

function initializePlayer(playerRef: HTMLVideoElement | null, playerOptions: VideoWebProps) {
  const { src, poster, initialTime } = playerOptions;
  const player = videojs(playerRef, playerOptions);

  src && player.src(src);
  poster && player.poster(poster);
  // 设置视频播放当前时间
  if (initialTime) player.currentTime(initialTime);

  return player;
}

export default initializePlayer;
