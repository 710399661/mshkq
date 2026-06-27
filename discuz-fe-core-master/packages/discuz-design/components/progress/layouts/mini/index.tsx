import React from 'react';
import { ProgressProps } from '../../interface';
import { View } from '@tarojs/components';
import { useConfig } from '../../../../extends/configContext';
import classNames from 'classnames';
import { injectValue } from '../../../../utils/inject-value';
import Circle from './Circle';

export const ProgressMiniLayout = (props: ProgressProps) => {
  const {
    type = 'line',
    percent = 0,
    text = '',
    theme = 'default',
    className,
    style,
    isShowText = true,
  } = props;
  const { clsPrefix } = useConfig();
  // Circle
  if (type === 'circle') {
    return (
      <Circle {...props} />
    );
  }

  return (
    <View
      className={classNames(`${clsPrefix}-progress`, className, {
        [`${clsPrefix}-progress--error`]: theme === 'danger',
        [`${clsPrefix}-progress--succeed`]: theme === 'success',
      })}
      style={style}
    >
      <View
        className={`${clsPrefix}-progress__value`}
        style={{ width: `${percent}%`, transition: 'width .2s' }}
      >
        {isShowText && (
          <span className={`${clsPrefix}-progress__text`}>
            {injectValue(text)(percent)}
          </span>
        )}
      </View>
    </View>
  );
};
