import React, { useState, useRef } from 'react';
import Parser from 'react-html-parser';
import { ScrollView } from '@discuzq/design';
import mock from '../mock';
import Item from './item';
import s9e from '../s9e';

const initData = (data) => {
  data.map((item) => {
    if (item.firstPost.summary) {
      item.firstPost.summary_component = Parser(s9e.parse(item.firstPost.summary));
    }
    return item;
  });
  return data;
};

const Example1 = () => {
  const [list, setList] = useState([...initData(mock.slice(0, 10))]);
  const [loadData, setLoadData] = useState(false);
  const [scrollToIndex, setScrollToIndex] = useState(-1);
  const ref = useRef();

  const renderListItem = ({ index, data, measure, style, isScrolling }) =>  (
    <h2 key={data[index]}>Item</h2>
  );

  const isRowLoaded = ({ index }) => {
    if (!loadData && list.length - index <= 5) {
      setLoadData(true);
      return false;
    }
    return true;
  };

  const onScroll = ({ scrollTop }) => {
    console.log('滑动偏移量', scrollTop);
  };

  const onScrollTop = () => {
    console.log('触顶了');
  };

  const onScrollBottom = () => {
    alert('触底了');
  };

  const loadMoreRows = ({ startIndex, stopIndex }) => new Promise((resolve) => {
    setLoadData(true);

    setTimeout(() => {
      const newList = [...list, ...list.slice(0, 10)];
      setList(newList);
      setLoadData(false);
      resolve(newList);
    }, 1000);
  });

  const onScrollClick = () => {
    setScrollToIndex(scrollToIndex + 1);
  };

  return (
    <div>
      <div style={{ height: '400px', border: '1px solid #000', width: '200px' }}>
        <ScrollView
          ref={ref}
          className="list"
          height={500}
          rowData={list}
          rowCount={list.length}
          rowHeight={100}
          width="100%"
          isRowLoaded={isRowLoaded}
          onPullingUp={loadMoreRows}
          rowRenderer={renderListItem}
          overscanRowCount={3}
          onScroll={onScroll}
          onScrollTop={onScrollTop}
          onScrollBottom={onScrollBottom}
          scrollToIndex={scrollToIndex}
        />
      </div>
    </div>
  );
};

export default Example1;
