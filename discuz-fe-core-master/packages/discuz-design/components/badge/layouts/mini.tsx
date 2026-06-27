import React from 'react';
import classNames from 'classnames';
import { View } from '@tarojs/components';
import { BadgeProps } from '../interface';
import { useConfig } from '../../../extends/configContext';

export const BadgeMiniLayout = ({
  children,
  info,
  dot,
  color,
  square,
  className,
  style,
  circle
}: BadgeProps) => {
  const { clsPrefix } = useConfig();

  return (
    <View className={classNames(`${clsPrefix}-badge`, className)} style={style}>
      {children}
      {dot && <View className={`${clsPrefix}-badge__dot`} />}
      {!dot && info && (
        <View
          className={classNames(`${clsPrefix}-badge__info`, {
            [`${clsPrefix}-badge__info--square`]: square,
          })}
          style={{ backgroundColor: color }}
        >
          {info}
        </View>
      )}
      {!dot && circle && info && (
        <View
          className={`${clsPrefix}-badge__circle`}
          style={{ backgroundColor: color }}
        >
          {info}
        </View>
      )}
    </View>
  );
};
