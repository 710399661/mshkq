import React, { useState, useImperativeHandle, useEffect, forwardRef, useRef } from 'react';
import ReactDOM, { unmountComponentAtNode, createPortal } from 'react-dom';
import classNames from 'classnames';
import Icon from '../../icon';
import { noop } from '../../../utils/noop';
import { getRoot, limit } from '../util';
import { useIsomorphicLayoutEffect } from '../../../utils/use-isomorphic-layout-effect';
import { useConfig } from '../../../extends/configContext';
import { ToastProps, typeIconMap } from '../interface';
import Spin from '../../spin';
import { useReport } from '../../../utils/report';

interface ToastInstance {
  hideToast: Function;
}

const Toast = forwardRef((
  {
    type,
    icon,
    content,
    duration = 1500,
    hasMask = false,
    onClose = noop,
    position = 'center',
    className,
    style = {},
    onMaskClick = noop,
  }: ToastProps,
  ref: React.Ref<ToastInstance>,
) => {
  const { clsPrefix } = useConfig();
  const [visible, setVisible] = useState(false);
  const [fadeClassName, setFadeClassName] = useState(`${clsPrefix}-toast__fadeIn`);

  useReport({
    componentName: 'toast'
  })

  useImperativeHandle(ref, () => ({ hideToast }));

  const timerRef = useRef(null);
  const toastRef = useRef(null);


  const hideToast = () => {
    toastRef?.current?.addEventListener('animationend', () => {
      setVisible(false);
      onClose && onClose();
    });
    setFadeClassName(`${clsPrefix}-toast__fadeOut`);
  };

  // 渲染之后，马上显示
  useEffect(() => {
    setVisible(true);
    return () => clearTimeout(timerRef.current);
  }, []);

  useIsomorphicLayoutEffect(() => {
    clearTimeout(timerRef.current);
    if (visible && duration !== 0) {
      timerRef.current = setTimeout(() => {
        hideToast();
      }, duration);
    }
  }, [duration, visible]);

  let toast = (
    <div
      ref={toastRef}
      className={classNames(`${clsPrefix}-toast`, className, `${clsPrefix}-toast--${position}`, 'is-show', fadeClassName)}
      style={style}
      // FIXME: 这部分可能会导致 toast 一直显示
      // onMouseEnter={() => clearTimeout(timerRef.current)}
      // onMouseLeave={() => {
      //   if (duration !== 0) {
      //     timerRef.current = setTimeout(() => setVisible(false), duration);
      //   }
      // }}
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
      <span className={`${clsPrefix}-toast__text`}>{content}</span>
    </div>
  );

  if (hasMask) {
    toast = (
      <div onClick={onMaskClick} className={`${clsPrefix}-toast--mask`}>
        {toast}
      </div>
    );
  }

  return visible ? createPortal(toast, getRoot('')) : createPortal(null, getRoot(''));
});

/**
 * API 的方式显示通知
 */
function show(type: ToastProps['type'] = 'success', { onClose = noop, ...options } = { content: '' }) {
  const el = document.createElement('div');

  const instanceRef = React.createRef<ToastInstance>();
  ReactDOM.render(
    <Toast
      {...options}
      type={type}
      ref={instanceRef}
      onClose={() => {
        onClose();
        unmountComponentAtNode(el);
      }}
    />,
    el,
  );

  const hide = () => {
    if (instanceRef.current) {
      instanceRef.current.hideToast();
    }
  };

  const handle = {
    hide,
    destroy: hide,
  };

  limit(handle);

  return handle;
}

const toast = {
  info: options => show('info', options),
  success: options => show('success', options),
  warning: options => show('warning', options),
  error: options => show('error', options),
  loading: options => show('loading', options),
};

export const WebLayout = () => toast;
