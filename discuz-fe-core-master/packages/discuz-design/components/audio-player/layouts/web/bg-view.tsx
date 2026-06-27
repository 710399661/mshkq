import React from 'react';
import { useConfig } from '../../../../extends/configContext';

const BgView = ({ leftChildren, rightChildren, bottomChildren }) => {
  const { clsPrefix } = useConfig();

  const renderLeft = () => (
      <div className={`${clsPrefix}-audio-player-bg-view__left`}>
        {leftChildren}
      </div>
  );

  const renderRight = () => (
    <div className={`${clsPrefix}-audio-player-bg-view__right`}>
      <div className={`${clsPrefix}-audio-bg-player-view__right-text`}>
        {rightChildren}
      </div>
    </div>
  );

  const renderBottom = () => (
    <div className={`${clsPrefix}-audio-player-bg-view__bottom`}>
      {bottomChildren}
    </div>
  )

  return (
    <div className={`${clsPrefix}-audio-player-bg-view`}>
      <div className={`${clsPrefix}-audio-player-bg-view-top`}>
        {renderLeft()}
        {renderRight()}
      </div>
      <div className={`${clsPrefix}-audio-player-bg-view-bottom`}>
        {renderBottom()}
      </div>
    </div>
  );
};

export default BgView;
