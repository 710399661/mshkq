import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { View } from '@tarojs/components';
import Icon from '../../icon';
import { AlertProps } from '../interface';
import { useConfig } from '../../../extends/configContext';
const iconMap = {
  // success: { name: 'CheckOutlined', color: '#57bd6a' },
  // warning: { name: 'WarnOutlined', color: '#f6c443' },
  // info: { name: 'info', color: '#c5c6cb' },
  // error: { name: 'error', color: '#ff6565' },
  success: { name: 'success', color: '#57bd6a', iconName: 'SuccessOutlined' },
  warning: { name: 'warning', color: '#f6c443', iconName: 'TipsOutlined' },
  info: { name: 'info', color: '#c5c6cb', iconName: 'MyPrivateLetterOutlined' },
  error: { name: 'error', color: '#ff6565', iconName: 'WrongOutlined' },
};
export const AlertMiniLayout: React.FC<AlertProps> = ({
  type = 'info',
  hideIcon,
  icon,
  children,
  closeable = false,
  onClose,
  duration = 0,
  className,
  style,
}) => {
  const [closeAlert, setCloseAlert] = useState(false);
  const { clsPrefix } = useConfig();

  useEffect(() => {
    setCloseAlert(false);
  }, []);

  useEffect(() => {
    if (duration) {
      setTimeout(() => {
        setCloseAlert(true);
      }, duration);
    }
    // 如果用户调整回0时，重新展示
    if (duration === 0) {
      setCloseAlert(false);
    }
  }, [duration]);

  let iconProps = typeof icon === 'string' ? { name: icon } : icon;
  if (!iconProps && iconMap[type]) {
    iconProps = iconMap[type];
  }

  const closeableClassName = `${clsPrefix}-alert--closeable`;
  return (
    <View
      className={classNames(
        `${clsPrefix}-alert`,
        `${clsPrefix}-alert--${type}`,
        className,
        {
          'is-close': closeAlert,
          [closeableClassName]: closeable,
        },
      )}
      style={style}
    >
      {!hideIcon && iconProps ? (
        // <Icon
        //   color={iconMap[type]?.color}
        //   {...iconProps}
        //   className={classNames(
        //     `${clsPrefix}-alert__icon`,
        //     iconProps.className,
        //   )}
        // />
        <View>
          <Icon
          className={classNames(
            `${clsPrefix}-alert__icon`,
            `${clsPrefix}-alert__icon--${type}`,
          )}
          name={iconProps.iconName}
          />
        </View>
      ) : null}
      <View className={`${clsPrefix}-alert__text`}>
        {children}
        <slot />
      </View>
      {closeable && (
        <View
          className={`${clsPrefix}-alert__closewrap`}
          onClick={() => {
            onClose();
            setCloseAlert(true);
          }}
        >
          <Icon
            className={`${clsPrefix}-alert__close`}
            name="CloseOutlined"
            size="12"
            color="#444444"
          />
        </View>
      )}
    </View>
  );
};
