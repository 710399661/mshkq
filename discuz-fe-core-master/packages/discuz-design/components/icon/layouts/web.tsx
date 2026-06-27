import React from 'react';
import classNames from 'classnames';
import { useConfig } from '../../../extends/configContext';

export const WebLayout = function ({
  src,
  name,
  className,
  iconStyle,
  style,
  ...props
}) {
  const { clsPrefix } = useConfig();
  return src ? (
    <div className={classNames(`${clsPrefix}-icon`, className)} {...props}>
      <img alt="图片" src={src} style={{ ...iconStyle, ...style }} />
    </div>
  ) : (
    <div
      className={classNames(
        `${clsPrefix}-icon`,
        `${clsPrefix}-icon-${name}`,
        className,
      )}
      style={{ ...iconStyle, ...style }}
      {...props}
    />
  );
};
