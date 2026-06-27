import React, { createElement } from 'react';
import { ScrollView } from '@tarojs/components';

const NormalList = ({
  itemData,
  height,
  itemCount,
  itemSize,
  onScroll,
  width,
  rowRenderer,
  className,
  onScrollToLower,
  onScrollTop,
  renderBottom,
  scrollIntoView,
  ...props
}) => {
  const INSTANCE_ID = props.id || 0;

  return (
    <ScrollView
      style={{ height: `${height}px`, width }}
      className={className}
      scrollY
      onScroll={onScroll}
      onScrollToLower={onScrollToLower}
      onScrollToUpper={onScrollTop}
      scrollIntoView={scrollIntoView}
      {...props}
    >
      {props.children
        && itemData.map((_, index) => createElement(props.children, {
          id: `normal-list-${INSTANCE_ID}-${index}`,
          key: `normal-list-${INSTANCE_ID}-${index}`,
          data: itemData,
          index,
          isScrolling: undefined,
        }))}
      {renderBottom}
    </ScrollView>
  );
};

export default NormalList;
