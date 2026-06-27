import React, { useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import throttle from '../../../../utils/throttle';
import { ScrollViewProps } from '../../interface';

export const MiniLayout = forwardRef(({
  rowData,
  height,
  rowCount,
  rowHeight,
  width,
  rowRenderer,
  className,
  isNormal = true,
  onPullingUp,
  onScrollBottom,
  overscanRowCount,
  lowerThreshold,
  onScrollTop,
  onScroll,
  enabled = true,
  scrollToIndex = -1,
  ...props
}: ScrollViewProps, ref) => {
  const Com = isNormal ? require('./normal-list') : require('./virtual-list');

  // 是否正在上拉加载，防止重复触发
  const isPullUpLoading = useRef(false);

  // 偏移量
  const offset = useRef(0);

  // 行元素
  const rowRendererNode = React.memo(rowRenderer);

  // 获取rowID
  const INSTANCE_ID = props.id || 0;
  const scrollIntoView = useMemo(
    () => (isNormal ? `normal-list-${INSTANCE_ID}-${scrollToIndex}` : `virtual-list-${INSTANCE_ID}-${scrollToIndex}`),
    [scrollToIndex],
  );

  useImperativeHandle(
    ref,
    () => ({
      scrollTop: offset,
    }),
  );

  // 处理触底事件
  const handleScrollToLowerEvent = (e) => {
    if (onPullingUp && !isPullUpLoading.current) {
      isPullUpLoading.current = true;
      onPullingUp(e)
        .then(() => {
          isPullUpLoading.current = false;
        })
        .catch(() => {
          isPullUpLoading.current = false;
        });
    }

    if (typeof onScrollBottom === 'function') {
      onScrollBottom(e);
    }
  };

  // 处理滑动事件
  const handleScrollEvent = throttle(({ detail }) => {
    if (typeof onScroll === 'function') {
      onScroll({ ...detail, clientHeight: height });
    }
    // 保存偏移量，以供外部访问
    offset.current = detail.scrollTop;
  }, 16);

  return (
    <Com
      className={className}
      itemData={rowData}
      itemCount={rowCount}
      itemSize={rowHeight}
      onScrollToLower={handleScrollToLowerEvent}
      height={height}
      width={width}
      overscanCount={overscanRowCount}
      threshold={lowerThreshold}
      onScrollToUpper={onScrollTop}
      scrollIntoView={scrollIntoView}
      scrollY={enabled}
      onScroll={handleScrollEvent}
      {...props}
    >
      {rowRendererNode}
    </Com>
  );
});
