import { View, Image } from '@tarojs/components';
import classNames from 'classnames';
import { useConfig } from '../../../extends/configContext';
import React from 'react';

export const MiniLayout = function ({
  name,
  src,
  iconStyle,
  className,
  ...props
}) {
  const { clsPrefix } = useConfig();
  return src ? (
    <View className={classNames(`${clsPrefix}-icon`, className)} {...props}>
      <Image src={src} style={iconStyle} mode="aspectFit" />
    </View>
  ) : (
    <View
      className={classNames(`${clsPrefix}-icon`, `${clsPrefix}-icon-${name}`, className)}
      style={iconStyle}
      {...props}
    />
  );
};
