import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import EventEmitter from 'eventemitter3';
import { View, Text } from '@tarojs/components';
import Icon from '../../icon';
import { noop } from '../../../utils/noop';
import { useConfig } from '../../../extends/configContext';
import { ToastProps, typeIconMap } from '../interface';
import Spin from '../../spin';

interface ToastMiniProps extends ToastProps {
  visible?: boolean;
}

class ToastEmitter extends EventEmitter { }

const toastEmitter = new ToastEmitter();

function Toast(props: ToastMiniProps) {
  const { clsPrefix } = useConfig();
  const [options, setOptions] = useState<ToastMiniProps>(props);
  const [fadeClassName, setFadeClassName] = useState(`${clsPrefix}-toast__fadeIn`);
  const timerRef = useRef(null);

  const clearToast = () => {
    // 处理现存toast实例的close回调和清除定时器
    if (typeof timerRef.current?.onClose === 'function') {
      timerRef.current.onClose();
    }
    clearTimeout(timerRef.current?.timeoutId);
    timerRef.current = null;
  };

  useEffect(() => {
    // 关闭逻辑
    const onHide = () => {
      setFadeClassName(`${clsPrefix}-toast__fadeOut`);
      clearToast();
    };

    const onShow = (options) => {
      clearToast();
      setFadeClassName(`${clsPrefix}-toast__fadeIn`);
      setOptions(options);
      timerRef.current = {};
      if (typeof options.onClose === 'function') {
        timerRef.current.onClose = options.onClose;
      }
      if (options.duration !== 0) {
        timerRef.current.timeoutId = setTimeout(onHide, options.duration);
      }
    };

    toastEmitter.on('show', onShow);
    toastEmitter.on('hide', onHide);
    return () => {
      clearTimeout(timerRef.current?.timeoutId);
      toastEmitter.removeListener('show', onShow);
      toastEmitter.removeListener('hide', onHide);
    };
  }, []);

  const { visible, icon, type = 'info', content, hasMask = false, position = 'center', className, style = {}, onMaskClick } = options;

  let toast = (
    <View
      className={classNames(`${clsPrefix}-toast`, className, `${clsPrefix}-toast--${position}`, fadeClassName, {
        'is-show': visible,
      })}
      style={style}
      onAnimationEnd={(e) => {
        if (e.detail.animationName === 'fadeOut') {
          setOptions(() => ({ visible: false }));
        }
      }}
    >
      {
        typeIconMap[type] && (
          type === 'loading'
            ? <Spin size={24} type='spinner' className={classNames(`${clsPrefix}-toast__icon`)}></Spin>
            : <Icon className={classNames(`${clsPrefix}-toast__icon`)} size={24} name={typeIconMap[type]} />
        )
      }
      {
        !typeIconMap[type] && icon && (
          <Icon className={classNames(`${clsPrefix}-toast__icon`)} size={24} name={icon} />
        )
      }
      <Text className={`${clsPrefix}-toast__text`}>{content}</Text>
    </View>
  );

  if (hasMask && visible) {
    toast = (
      <View onClick={onMaskClick} className={`${clsPrefix}-toast--mask`}>
        {toast}
      </View>
    );
  }

  return toast;
}

const show = (type: ToastProps['type']) => ({
  content,
  duration = 1500,
  hasMask = false,
  onClose = noop,
  position = 'center',
  className,
  style = {},
  onMaskClick = noop,
}: ToastProps) => toastEmitter.emit('show', {
  visible: true,
  type,
  content,
  duration,
  hasMask,
  onClose,
  position,
  className,
  style,
  onMaskClick,
});

Toast.info = show('info');
Toast.success = show('success');
Toast.warning = show('warning');
Toast.error = show('error');
Toast.loading = show('loading');

Toast.hide = () => toastEmitter.emit('hide');

export const MiniLayout = () => Toast;
