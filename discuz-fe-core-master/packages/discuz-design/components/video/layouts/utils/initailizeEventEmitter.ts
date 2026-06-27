const initializeEventEmitter = (player, eventEmitter, props) => {
  const { singleton } = props;

  const eventEmitterPlayImpl = (target) => {
    if (target === player) return;
    if (!singleton) return;

    if (player && player.pause) {
      // FIXME web端点击播放的时候，这句代码报错 「pause null」,不影响业务，暂时屏蔽报错
      try {
        player.pause();
      } catch (error) {
        
      }
    }
  };

  player.on('play', () => {
    eventEmitter.emit('play', player);
  });

  eventEmitter.on('play', eventEmitterPlayImpl);
};

export default initializeEventEmitter;
