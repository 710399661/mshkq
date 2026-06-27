import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { SliderProps } from '../../interface';
import { useConfig } from '../../../../extends/configContext';
import { useDefaultValue } from '../../../../utils/hooks/useDefault';
import { getRect } from './get-rect';

export const SliderWebLayout = ({ ...props }) => {
  const { clsPrefix } = useConfig();

  const {
    className,
    value,
    onChange,
    min,
    max,
    step,
    disabled,
    formatter,
    ...restProps
  } = useDefaultValue<number, SliderProps>(props, 0);

  const range = Math.max(100, max);

  const [rect, setRect] = useState(null);

  // PC端兼容
  const mouseDown = useRef(false);


  const sliderRef = useRef(null);

  const setStartXRef = useRef(null);
  const startValueRef = useRef(null);

  const formatNumber = value => Math.round(Math.max(min, Math.min(max, value)) / step) * step;

  const getEvent = (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if ('targetTouches' in event) {
      return event.targetTouches[0];
    }
    return event;
  };

  const onTouchMove = (e) => {
    if (typeof e.cancelable !== 'boolean' || e.cancelable) {
      e.preventDefault();
    }
    onMove(e);
  };

  const onTouchEnd = (e) => {
    if (typeof e.cancelable !== 'boolean' || e.cancelable) {
      e.preventDefault();
    }
    onLeave();
  };

  // 解决微信浏览器无法一直触发 touchmove 的问题
  // TODO: 验证是否成功
  const onTouchStart = (e) => {
    if (typeof e.cancelable !== 'boolean' || e.cancelable) {
      e.preventDefault();
    }
  };

  function addDocumentMouseEvents() {
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('mouseup', onLeave);
    document.addEventListener('touchend', onTouchEnd, { passive: false });
  }

  function removeDocumentEvents() {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('touchstart', onTouchStart);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('mouseup', onLeave);
    document.removeEventListener('touchend', onTouchEnd);
  }

  const onStart = (e: any) => {
    if (typeof e.cancelable !== 'boolean' || e.cancelable) {
      e.preventDefault();
    }

    if (disabled) {
      return;
    }

    mouseDown.current = true;
    const current = getEvent(e).pageX;

    setStartXRef.current = current;
    startValueRef.current = formatNumber(value);

    removeDocumentEvents();
    addDocumentMouseEvents();
  };

  const onMove = (e: any) => {
    if (disabled || !mouseDown.current) {
      return;
    }

    const current = getEvent(e).pageX;

    const diff = current - setStartXRef.current;
    const newValue = formatNumber(startValueRef.current + (diff / rect.width) * range);
    onChange(newValue, { event: e });
  };

  const onLeave = () => {
    removeDocumentEvents();

    mouseDown.current = false;
  };

  const click = (e: any) => {
    removeDocumentEvents();

    if (disabled) {
      return;
    }

    let x;
    if (e.type === 'click') {
      x = e.clientX;
    } else {
      x = typeof e.changedTouches[0].x !== 'undefined'
        ? e.changedTouches[0].x
        : (e.changedTouches[0] as any).clientX;
    }
    const newValue = formatNumber(((x - rect.left) / rect.width) * range);

    onChange(newValue, { event: e });
  };

  useEffect(() => {
    handleReact();

    return () => {
      removeDocumentEvents();
    };
  }, []);

  const handleReact = async () => {
    const [rectInfo] = await getRect(sliderRef);
    setRect(rectInfo);
  };

  const text = formatter(value);

  const fixedValue = Math.min(Number(value), 100);

  return (
    <div
        className={classNames(`${clsPrefix}-slider`, className, {
          [`${clsPrefix}-slider--disabled`]: disabled
        })}
        onClick={click}
        onTouchEnd={click}
        {...restProps} >
      <div className={`${clsPrefix}-slider__progress`} ref={sliderRef}>
        <div className={`${clsPrefix}-slider__progress--stick ${clsPrefix}-slider__feature`} />
        <div
          className={`${clsPrefix}-slider__progress__button`}
          style={{
            left: `${(fixedValue / range) * 100}%`,
          }}
          onTouchStart={onStart}
          onTouchMove={onMove}
          onTouchEnd={onLeave}
          onMouseDown={onStart}
          onMouseMove={onMove}
          onDragStart={e => e.preventDefault()}
          onMouseUp={onLeave}
        />
        <div
          className={classNames(`${clsPrefix}-slider__progress--active`, {
            [`${clsPrefix}-slider__progress--disabled`]: disabled,
          })}
          style={{
            width: `${(fixedValue / range) * 100}%`,
          }}
        />
        <div className={`${clsPrefix}-slider__progress--max`} style={{
          width: `${100 - max}%`,
        }} />
      </div>
      <div className={`${clsPrefix}-slider__feature`} />
      {text && <div className={`${clsPrefix}-slider__value`}>{text}</div>}
    </div>
  );
};
