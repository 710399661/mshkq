import React from 'react';
import classNames from 'classnames';
import { BadgeProps } from '../interface';
import { useConfig } from '../../../extends/configContext';

export const BadgeWebLayout = ({
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
    <div className={classNames(`${clsPrefix}-badge`, className)} style={style}>
      {children}
      {dot && <div className={`${clsPrefix}-badge__dot`} />}
      {!dot && square && info && (
        <div
          className={classNames(`${clsPrefix}-badge__info`, {
            [`${clsPrefix}-badge__info--square`]: square,
          })}
          style={{ backgroundColor: color }}
        >
          {info}
        </div>
      )}
      {!dot && circle && info && (
        <div
          className={`${clsPrefix}-badge__circle`}
          style={{ backgroundColor: color }}
        >
          {info}
        </div>
      )}
    </div>
  );
};
