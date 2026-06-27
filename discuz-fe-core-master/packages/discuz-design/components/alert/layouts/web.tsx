import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Icon from '../../icon';
import { AlertProps } from '../interface';
import { useConfig } from '../../../extends/configContext';
import { useDefault } from '../../../utils/hooks/useDefault';
const iconMap = {
  success: { name: 'success', color: '#57bd6a', iconName: 'SuccessOutlined' },
  warning: { name: 'warning', color: '#f6c443', iconName: 'TipsOutlined' },
  info: { name: 'info', color: '#c5c6cb', iconName: 'MyPrivateLetterOutlined' },
  error: { name: 'error', color: '#ff6565', iconName: 'WrongOutlined' },
};
export const AlertWebLayout: React.FC<AlertProps> = ({
  type = 'info',
  hideIcon,
  icon,
  children,
  closeable = false,
  onClose,
  duration = 0,
  className,
  style,
  visible,
}) => {
  // FIXME: 修改成为受控组件
  const [closeAlert, setCloseAlert] = useDefault((typeof visible !== 'undefined') ? !visible : visible, false, null);
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

  return (
    <div
      className={classNames(
        `${clsPrefix}-alert`,
        `${clsPrefix}-alert--${type}`,
        className,
        {
          'is-close': closeAlert,
          'dzq-alert--closeable': closeable,
        },
      )}
      style={style}
    >
      {!hideIcon && iconProps ? (
        // <Icon
        //   name={iconProps.className}
        //   color={iconMap[type]?.color}
        //   // {...iconProps}
        //   className={classNames(
        //     `${clsPrefix}-alert__icon`,
        //     iconProps.className,
        //   )}
        // />
        <div>
          <Icon
          //  style={{fontSize:20, color:iconProps.color,marginRight:8}}
          className={classNames(
            `${clsPrefix}-alert__icon`,
            `${clsPrefix}-alert__icon--${type}`,
          )}
           name={iconProps.iconName}
           />
        </div>
      ) : null}
      <div className={`${clsPrefix}-alert__text`}>
        {children}
        <slot />
      </div>
      {closeable && (
        <div
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
        </div>
      )}
    </div>
  );
};
