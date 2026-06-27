import React from 'react';
import { useConfig } from '../../../../extends/configContext';
import classNames from 'classnames';

const BgView = ({ leftChildren, rightChildren, isPlay = false }) => {
  const { clsPrefix } = useConfig();

  const renderLeft = () => (
      <div className={`${clsPrefix}-audio-bg-view__left`}>
        {leftChildren}
      </div>
  );

  const renderCenter = () => {
    const hzViewItems = [];
    for (let index = 0; index < 20; index++) {
      hzViewItems.push(<div className={classNames(`${clsPrefix}-audio-bg-view__hz-${index + 1}`, {
        [`${clsPrefix}-audio-bg-view__hz-${index + 1}--animation`]: isPlay,
      })} key={index}></div>);
    }
    return (
      <div className={`${clsPrefix}-audio-bg-view__center`}>
        <div className={`${clsPrefix}-audio-bg-view__hz`}>
          {hzViewItems}
        </div>
      </div>
    );
  };

  const renderRight = () => (
    <div className={`${clsPrefix}-audio-bg-view__right`}>
      <div className={`${clsPrefix}-audio-bg-view__right-text`}>
        {rightChildren}
      </div>
    </div>
  );

  return (
    <div className={`${clsPrefix}-audio-bg-view`}>
      {renderLeft()}
      {renderCenter()}
      {renderRight()}
    </div>
  );
};

export default BgView;
