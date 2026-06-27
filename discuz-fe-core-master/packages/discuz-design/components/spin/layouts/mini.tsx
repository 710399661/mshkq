import { View } from '@tarojs/components';
import React from 'react';
import { useConfig } from '../../../extends/configContext';
import classNames from 'classnames';
import { SpinProps } from '../interface';
export const SpinMiniLayout: React.FC<SpinProps> = ({
  type = 'circular',
  vertical,
  size,
  color,
  className,
  style = {},
  children,
}) => {
  const { clsPrefix } = useConfig();

  return (
    <View
        className={classNames(`${clsPrefix}-spin`, className, {
          [`${clsPrefix}-spin--vertical`]: vertical,
        })}
        style={{
          color,
          ...style,
        }}
      >
      <View
        className={`${clsPrefix}-spin__icon`}
        style={size ? { width: size, height: size } : {}}
      >
        {type === 'circular' ? (
          <View className={`${clsPrefix}-spin--circular`} />
        ) : (
          <View className={`${clsPrefix}-spin--spinner`}>
            {new Array(12).fill(null)
              .map((_, index) => (
              <View key={index} className={`${clsPrefix}-spin__blade`} />
              ))}
          </View>
        )}
      </View>
      <View className={`${clsPrefix}-spin__text`}>{children}</View>
    </View>
  );
};
