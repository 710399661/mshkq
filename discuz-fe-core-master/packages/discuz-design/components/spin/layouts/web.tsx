import React from 'react';
import { useConfig } from '../../../extends/configContext';
import classNames from 'classnames';
import { SpinProps } from '../interface';

export const SpinWebLayout: React.FC<SpinProps> = ({
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
    <div
      className={classNames(`${clsPrefix}-spin`, className, {
        [`${clsPrefix}-spin--vertical`]: vertical,
      })}
      style={{
        color,
        ...style,
      }}
    >
      <div
        className={`${clsPrefix}-spin__icon`}
        style={size ? { width: size, height: size } : {}}
      >
        {type === 'circular' ? (
          <div className={`${clsPrefix}-spin--circular`} />
        ) : (
          <div className={`${clsPrefix}-spin--spinner`}>
            {new Array(12).fill(null)
              .map((_, index) => (
              <div key={index} className={`${clsPrefix}-spin__blade`} />
              ))}
          </div>
        )}
      </div>
      <div className={`${clsPrefix}-spin__text`}>{children}</div>
    </div>
  );
};
