import React from 'react';
import { ProgressProps } from '../../interface';
import { useConfig } from '../../../../extends/configContext';
import classNames from 'classnames';
import { injectValue } from '../../../../utils/inject-value';
import Circle from './Circle';


export const ProgressWebLayout = (props: ProgressProps) => {
  const {
    type,
    percent,
    text,
    tips,
    theme,
    className,
    style,
    isShowText,
    lineWidth,
    width,
    children,
  } = props;
  const { clsPrefix } = useConfig();
  // Circle
  if (type === 'circle') {
    return (
      <Circle {...props} />
    );
  }

  return (
    <div
      className={classNames(`${clsPrefix}-progress`, className, {
        [`${clsPrefix}-progress--error`]: theme === 'danger',
        [`${clsPrefix}-progress--succeed`]: theme === 'success',
      })}
      style={style}
    >
      <div
        className={`${clsPrefix}-progress__value`}
        style={{ width: `${percent}%`, transition: 'width .2s' }}
      >
        {text && (
          <span className={`${clsPrefix}-progress__text`}>
            {injectValue(text)(percent)}
          </span>
        )}
      </div>
    </div>
  );
};
