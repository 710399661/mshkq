import React from 'react';
import { View } from '@tarojs/components';
import { useConfig } from '../../../../extends/configContext';
import classNames from 'classnames';

const BgView = ({ leftChildren, rightChildren, bottomChildren }) => {
  const { clsPrefix } = useConfig();

  const renderLeft = () => (
      <View className={`${clsPrefix}-audio-player-bg-view__left ${clsPrefix}-audio-player-bg-view__left--mini`}>
        {leftChildren}
      </View>
  );

  const renderRight = () => (
    <View className={`${clsPrefix}-audio-player-bg-view__right`}>
      <View className={`${clsPrefix}-audio-bg-player-view__right-text`}>
        {rightChildren}
      </View>
    </View>
  );

  const renderBottom = () => (
    <View className={`${clsPrefix}-audio-player-bg-view__bottom`}>
      {bottomChildren}
    </View>
  )

  return (
    <View className={`${clsPrefix}-audio-player-bg-view`}>
      <View className={`${clsPrefix}-audio-player-bg-view-top`}>
        {renderLeft()}
        {renderRight()}
      </View>
      <View className={`${clsPrefix}-audio-player-bg-view-bottom`}>
        {renderBottom()}
      </View>
    </View>
  );
};

export default BgView;
