import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useConfig } from '../../../extends/configContext';
import { PullDownRefreshProps } from '../interface';
import { preventDefault } from './util';

export const PullDownRefreshWebLayout = ({
  damping = 80,
  onRefresh = () => {},
  isFinished,
  children,
  height,
  status,
}: PullDownRefreshProps) => {
  const { clsPrefix } = useConfig();

  // touch数据
  const [loadingText, setLoadingText] = useState('');
  const [style, setStyle] = useState<any>({
    height: '0',
    overflowY: 'auto',
    overflowX: 'hidden',
  });

  const list = useRef<any>();
  const loading = useRef<any>();
  const startY = useRef<number>(0);
  const endY = useRef<number>(0);

  useEffect(() => {
    if (list.current) {
      list.current.style.height = `${parseInt(height)}px`;
      setStyle({
        ...style,
        height: `${parseInt(height)}px`,
        overflowY: 'auto',
        overflowX: 'hidden',
      });
    }
  }, [height, list]);

  useEffect(() => {
    if (isFinished) {
      setLoadingText('');
      endY.current = 0;
      setStyle({
        ...style,
        marginTop: 0,
        transition: 'all 0.3s',
      });
    }
  }, [isFinished]);

  const onTouchStart = (e) => {
    const { touches: [touche = {}, _] = [] } = e;
    startY.current = touche.pageY;
  };
  const onTouchMove = (e) => {
    const { touches: [touche = {}, _] = [] } = e;

    endY.current = touche.pageY;
    const diff = startY.current - touche.pageY; // < 0 说明向下移动

    if (diff < 0 && list.current.scrollTop <= 0) {
      preventDefault(e);
      Math.abs(diff) > 40
        ? setLoadingText('松手立即刷新')
        : setLoadingText('下拉可以刷新');

      const marginTop =        Math.abs(diff) > damping
        ? `${damping / 2}px`
        : `${Math.abs(diff) / 2}px`;

      setStyle({
        ...style,
        marginTop,
        transition: 'all 0.3s',
      });
    }
  };

  const onTouchEnd = (e) => {
    const diff = startY.current - endY.current;
    let { marginTop } = style;
    if (diff <= -40 && list.current.scrollTop <= 0) {
      // 只有向下才可以刷新
      if (Math.abs(diff) < damping) {
        marginTop = `${Math.abs(diff) / 2}px`;
      } else {
        marginTop = `${damping / 2}px`;
      }
      setLoadingText('正在刷新');
      onRefresh();
    } else if (0 > diff && diff > -40) {
      // 下拉幅度不够，没有触发下拉刷新
      marginTop = 0;
      setLoadingText('');
    } else {
      setLoadingText('');
    }

    setStyle({
      ...style,
      marginTop,
    });
  };

  const renderStatus = () => {
    if (status) {
      return status;
    }
    return (
      <div
        className={classNames(`${clsPrefix}-pull-refresh__loading`)}
        ref={loading}
      >
        {loadingText}
      </div>
    );
  };

  return (
    <div className={classNames(`${clsPrefix}-pull-refresh`)}>
      {renderStatus()}
      <div
        id="list"
        ref={list}
        style={style}
        className={classNames(`${clsPrefix}-pull-refresh__list`)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onTouchCancel={onTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};
