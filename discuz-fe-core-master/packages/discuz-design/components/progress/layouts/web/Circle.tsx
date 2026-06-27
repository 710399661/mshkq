import React, { useState, useEffect, useRef } from 'react';
import { ProgressProps } from '../../interface';
import { useConfig } from '../../../../extends/configContext';
import { randomStr, getCanvas, toFixed, getElementRect } from './utils';
import { injectValue } from '../../../../utils/inject-value';

const Circle = ({
  style = {}, // 容器的样式
  percent = 0, // 进度 [0-100]
  theme = 'default',
  lineWidth = 2, // 线宽
  width = 160,
  className = '',
  text = '',
  isShowText = true,
  tips = '',
  children,
  lineCap = 'butt',
}: ProgressProps) => {
  const { clsPrefix } = useConfig();

  const [canvasInfo, setCanvasInfo] = useState({
    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
  });

  // 以随机数，定义视图id，避免id重复
  const canvasId = useRef(null);
  const wrapperId = useRef(null);

  useEffect(() => {
    initCanvas();
  }, []);

  useEffect(() => {
    const { ctx } = canvasInfo;
    if (ctx) {
      drawRound();
    }
  }, [percent, canvasInfo]);

  const initCanvas = async () => {
    const canvas = canvasId.current;
    const ctx = canvasId.current.getContext('2d');
    const { width, height } = wrapperId.current.getBoundingClientRect();

    const dpr = 3;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    setCanvasInfo({
      canvas,
      ctx,
      width,
      height,
    });
  };

  const getCircle = () => {
    const { width, height } = canvasInfo;

    let radius = toFixed(0.5 * Math.min(width, height))
    if (radius > lineWidth) {
      radius -= lineWidth
    }
    const range = 2 * (percent / 100) * Math.PI;
    const offsetRadian = -0.5 * Math.PI;

    return { radius, range, offsetRadian };
  };

  const drawRound = () => {
    const { ctx, height, width } = canvasInfo;
    const { radius, range, offsetRadian } = getCircle();

    // 绘制前先清除，以防被原有图案影响
    ctx.clearRect(0, 0, width, height);

    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;

    ctx.beginPath();
    ctx.strokeStyle = '#F6F7F9';
    ctx.arc(toFixed(width / 2), toFixed(height / 2), radius, 0, 2 * Math.PI);
    ctx.stroke();

    if (range === 0) {
      return;
    }

    ctx.beginPath();
    ctx.strokeStyle = getColor();
    ctx.arc(
      toFixed(width / 2),
      toFixed(height / 2),
      radius,
      offsetRadian,
      range + offsetRadian,
    );
    ctx.stroke();
  };

  const getColor = () => {
    if (theme === 'default') {
      return '#FEC32D';
    } if (theme === 'success') {
      return '#57BD6A';
    } if (theme === 'danger') {
      return '#E54545';
    }
    return '#FEC32D';
  };

  return (
    <div className={`${clsPrefix}-progress-circle`}>
      <div ref={wrapperId} className={`${clsPrefix}-progress-circle__area ${className}`} style={style}>
        <canvas ref={canvasId} className={`${clsPrefix}-progress-circle__canvas`} />
        { !children && isShowText && (
            <div
              className={`${clsPrefix}-progress-circle__current-text`}
              id="progress-num"
            >
              {text ? (
                <span className="text--chinese">
                  {injectValue(text)(percent)}
                </span>
              ) : (
                <>
                  {percent}
                  <span className="text--symbol">%</span>
                </>
              )}
            </div>
        ) }
        {children && (
          <div
          className={`${clsPrefix}-progress-circle__children`}
          >
            {children}
          </div>
        )}
      </div>

      <div className={`${clsPrefix}-progress-circle__tips`}>{tips}</div>
    </div>
  );
};

export default Circle;
