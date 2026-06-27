import React from 'react';
import classNames from 'classnames';
import Icon from '../../icon';
import { TagProps } from '../interface';
import { useConfig } from '../../../extends/configContext';

export function TagWebLayout({
  type = 'default',
  closeable,
  size,
  onClick,
  onClose,
  children,
  ...props
}: TagProps) {
  const { clsPrefix } = useConfig();

  const handleClose = (event) => {
    onClose();
    event.stopPropagation();
  };

  return (
    <div
      onClick={onClick}
      {...props}
      className={classNames(`${props.className || ''}`, `${clsPrefix}-tag`, `${clsPrefix}-tag--${type}`, {
        [`size-${size}`]: size,
      })}
    >

    <span className={`${clsPrefix}-tag-text`}>{children}</span>

    {closeable && (
      <Icon
        className={`${clsPrefix}-tag-delete`}
        name="CloseOutlined"
        size={8}
        onClick={handleClose}
      />
    )}

    </div>
  );
}

