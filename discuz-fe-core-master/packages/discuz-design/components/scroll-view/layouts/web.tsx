import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { List, CellMeasurer, CellMeasurerCache, AutoSizer, InfiniteLoader } from 'react-virtualized';
import { ScrollViewProps } from '../interface';
import throttle from '../../../utils/throttle';

export const WebLayout = forwardRef(({
  rowData,
  height,
  rowCount,
  rowHeight,
  onScroll,
  width,
  rowRenderer,
  className,
  onPullingUp,
  isRowLoaded,
  overscanRowCount = 1,
  lowerThreshold,
  minHeight = 50,
  onScrollTop,
  onScrollBottom,
  renderBottom,
  ...props
}: ScrollViewProps, ref) => {
  // 偏移量
  const offset = useRef(0);

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight,
    show: false,
  });

  const rendererRow = ({ index, key, parent, style, isScrolling }) => (
    <CellMeasurer cache={cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
      {({ measure, registerChild }) => (
        <div ref={registerChild} style={style}>
          {rowRenderer({ index, data: rowData, measure, style, isScrolling })}
          {index === rowData.length - 1 && renderBottom}
        </div>
      )}
    </CellMeasurer>
  );

  useImperativeHandle(
    ref,
    () => ({
      scrollTop: offset,
    }),
  );

  // 处理滑动事件
  const handleScrollEvent = throttle(({ clientHeight, scrollHeight, scrollTop }) => {
    if (typeof onScroll === 'function') {
      onScroll({ clientHeight, scrollHeight, scrollTop });
    }

    if (typeof onScrollTop === 'function' && scrollTop === 0) {
      onScrollTop({ clientHeight, scrollHeight, scrollTop });
    }

    if (typeof onScrollBottom === 'function' && clientHeight + scrollTop === scrollHeight) {
      onScrollBottom({ clientHeight, scrollHeight, scrollTop });
    }

    // 存储偏移量，以供外部访问
    offset.current = scrollTop;
  }, 16);

  return (
    <InfiniteLoader rowCount={rowCount} isRowLoaded={isRowLoaded} loadMoreRows={onPullingUp} threshold={lowerThreshold}>
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer className={className}>
          {({ height, width }) => (
            <List
              className={className}
              ref={registerChild}
              onScroll={handleScrollEvent}
              deferredMeasurementCache={cache}
              height={height}
              overscanRowCount={overscanRowCount}
              onRowsRendered={onRowsRendered}
              rowCount={rowCount}
              rowHeight={cache.rowHeight}
              rowRenderer={rendererRow}
              width={width}
              {...props}
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
});
