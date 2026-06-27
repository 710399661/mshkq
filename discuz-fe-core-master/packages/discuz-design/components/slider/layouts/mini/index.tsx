import React, { useState, useRef, useEffect } from 'react';
import { View, ITouchEvent } from '@tarojs/components';
import { useReady, useDidShow } from '@tarojs/taro';
import classNames from 'classnames';
import { SliderProps } from '../../interface';
import { useConfig } from '../../../../extends/configContext';
import { useDefaultValue } from '../../../../utils/hooks/useDefault';
import { getRect } from './get-rect';

export const SliderMiniLayout = ({ ...props }) => {
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

  const [startX, setStartX] = useState(null);
  const [startValue, setStartValue] = useState(null);
  const [rect, setRect] = useState(null);

  const sliderRef = useRef(null);

  // 记录 touchMove 发生行为
  const touchEndLockRef = useRef(null);

  const formatNumber = value => Math.round(Math.max(min, Math.min(max, value)) / step) * step;

  const lockTouchEnd = () => {
    if (touchEndLockRef.current) {
      clearTimeout(touchEndLockRef.current);
    }

    touchEndLockRef.current = setTimeout(() => {
      touchEndLockRef.current = false;
    }, 300);
  }

  const onStart = (e: ITouchEvent) => {
    if (disabled) {
      return;
    }

    setStartX(e.touches[0].clientX);
    setStartValue(formatNumber(value));
  };

  const onMove = async (e: ITouchEvent) => {
    if (disabled) {
      return;
    }

    lockTouchEnd();

    const current = e.touches[0].clientX;
    const diff = current - startX;
    let rectInfo = rect;
    if (!rectInfo) {
      rectInfo = await getRectInfo();
    }
    const newValue = formatNumber(startValue + (diff / rectInfo.width) * range);
    onChange(newValue, { event: e });
  };

  const click = async (e: ITouchEvent) => {
    if (disabled) {
      return;
    }

    if (touchEndLockRef.current) {
      return;
    }

    const x = typeof e.changedTouches[0].x !== 'undefined'
      ? e.changedTouches[0].x
      : (e.changedTouches[0] as any).clientX;

    let rectInfo = rect;
    if (!rectInfo) {
      rectInfo = await getRectInfo();
    }
    const newValue = formatNumber(((x - rectInfo.left) / rectInfo.width) * range);
    onChange(newValue, { event: e });
  };

  const getRectInfo = async () => {
    try {
      if (sliderRef.current) {
        const [rectInfo] = await getRect(sliderRef);
        setRect(rectInfo);
        return rectInfo;
      }
    } catch (e) {
      console.error(e)
      return null;
    }
  }

  useReady(() => {
    getRectInfo()
  });

  useDidShow(() => {
    getRectInfo()
  });

  useEffect(() => {
    getRectInfo()
  }, []);

  const text = formatter(value);

  const fixedValue = Math.min(Number(value), 100);

  return (
    <View
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={click}
        className={classNames(`${clsPrefix}-slider`, className)}
        {...restProps}
    >
      <View className={`${clsPrefix}-slider__progress`} ref={sliderRef}>
        <View className={`${clsPrefix}-slider__progress--stick ${clsPrefix}-slider__feature`} />
        <View
          className={`${clsPrefix}-slider__progress__button`}
          style={{
            left: `${(fixedValue / range) * 100}%`,
          }}
          onTouchStart={onStart}
          onTouchMove={onMove}
          catchMove={true}
        />
        <View
          className={classNames(`${clsPrefix}-slider__progress--active`, {
            [`${clsPrefix}-slider__progress--disabled`]: disabled,
          })}
          style={{
            width: `${(fixedValue / range) * 100}%`,
          }}
        />
        <View className={`${clsPrefix}-slider__progress--max`} style={{
          width: `${100 - max}%`,
        }} />
      </View>
      <View className={`${clsPrefix}-slider__feature`} />
      {text && <View className={`${clsPrefix}-slider__value`}>{text}</View>}
    </View>
  );
};
