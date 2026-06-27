import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView } from '@tarojs/components';
import classNames from 'classnames';
import { useConfig } from '../../../extends/configContext';
import { PullDownRefreshProps } from '../interface';
import { preventDefault } from './util';

export const PullDownRefreshMiniLayout = ({
  damping = 80,
  onRefresh = () => {},
  isFinished,
  children,
  height,
  status,
  isReachTop,
  isScrollView,
  ...props
}: PullDownRefreshProps) => {
  const { clsPrefix } = useConfig();

  // touch数据
  const [loadingText, setLoadingText] = useState('');
  const [style, setStyle] = useState<any>({
    height: '0',
    overflowY: 'auto',
    overflowX: 'hidden',
  });

  const reachTop = useRef<boolean>(true);
  const loading = useRef<any>();
  const startY = useRef<number>(0);
  const endY = useRef<number>(0);

  useEffect(() => {
    setStyle({
      ...style,
      height: `${parseInt(height)}px`,
      overflowY: 'auto',
      overflowX: 'hidden',
    });
  }, [height]);

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

    // < 0 说明向下移动
    const diff = startY.current - touche.pageY;
    // 判断子元素是否触顶
    const isBool = isScrollView ? isReachTop : reachTop;

    if (diff < 0 && isBool) {
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

  const onTouchEnd = () => {
    let { marginTop } = style;

    // < 0 说明向下移动
    const diff = startY.current - endY.current;
    // 判断子元素是否触顶
    const isBool = isScrollView ? isReachTop : reachTop;

    if (diff <= -40 && isBool) {
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
      setLoadingText('');
      marginTop = 0;
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
      <View
        className={classNames(`${clsPrefix}-pull-refresh__loading`)}
        ref={loading}
      >
        {loadingText}
      </View>
    );
  };

  const onScroll = (e) => {
    const { detail: { scrollTop = 0 } = {} } = e;
    reachTop.current = scrollTop <= 0;
  };

  const List = isScrollView ? View : ScrollView;

  return (
    <View className={classNames(`${clsPrefix}-pull-refresh`)}>
      {renderStatus()}
      <List
        scrollY
        style={style}
        className={classNames(`${clsPrefix}-pull-refresh__list`)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onTouchCancel={onTouchEnd}
        onScroll={onScroll}
        {...props}
      >
        {children}
      </List>
    </View>
  );
};
