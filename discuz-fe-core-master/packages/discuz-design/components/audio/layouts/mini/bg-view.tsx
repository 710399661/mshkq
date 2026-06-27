import React from 'react';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import { useConfig } from '../../../../extends/configContext';


const BgView = ({ leftChildren, rightChildren, isPlay }) => {
  const { clsPrefix } = useConfig();

  const renderLeft = () => (
      <View className={`${clsPrefix}-audio-bg-view__left ${clsPrefix}-audio-bg-view__left--mini`}>
        {leftChildren}
      </View>
  );

  const renderCenter = () => {
    const hzViewItems = [];
    for (let index = 0; index < 20; index++) {
      hzViewItems.push(<View className={classNames(`${clsPrefix}-audio-bg-view__hz-${index + 1}`, {
        [`${clsPrefix}-audio-bg-view__hz-${index + 1}--animation`]: isPlay,
      })} key={index}></View>);
    }
    return (
      <View className={`${clsPrefix}-audio-bg-view__center`}>
        <View className={`${clsPrefix}-audio-bg-view__hz`}>
          {hzViewItems}
        </View>
      </View>
    );
  };

  const renderRight = () => (
    <View className={`${clsPrefix}-audio-bg-view__right`}>
      <View className={`${clsPrefix}-audio-bg-view__right-text`}>
        {rightChildren}
      </View>
    </View>
  );

  return (
    <View className={`${clsPrefix}-audio-bg-view`}>
      {renderLeft()}
      {renderCenter()}
      {renderRight()}
    </View>
  );
};

export default BgView;
