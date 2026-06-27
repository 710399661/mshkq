import React from 'react';
import classNames from 'classnames';
import { View, Text } from '@tarojs/components';
import Icon from '../../icon';
import { TagProps } from '../interface';
import { useConfig } from '../../../extends/configContext';

export function TagMiniLayout({
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
    <View
      onClick={onClick}
      className={classNames(`${clsPrefix}-tag`, `${clsPrefix}-tag--${type}`, {
        [`size-${size}`]: size,
      })}
      {...props}
    >
      <Text className={`${clsPrefix}-tag-text`}>{children}</Text>
      {closeable && (
        <Icon
          className={`${clsPrefix}-tag-delete`}
          name="CloseOutlined"
          size={8}
          onClick={handleClose}
        />
      )}
    </View>
  );
}
