import React, { useState } from 'react';
import Parser from 'react-html-parser';
import mock from '../mock';
import Item from './item';
import s9e from '../s9e';
import { ScrollView } from '@discuzq/design';

const initData = (data) => {
  data.map((item) => {
    if (item.firstPost.summary) {
      item.firstPost.summary_component = Parser(s9e.parse(item.firstPost.summary));
    }
    return item;
  });
  return data;
};

const Example2 = () => {
  const [list, setList] = useState([...initData(mock.slice(0, 10))]);
  const [loadData, setLoadData] = useState(false);

  const renderListItem = ({ index, data, measure, style, isScrolling }) =>  (
    <h2 key={data[index]}>Item</h2>
  );

  const loadMoreRows = ({ startIndex, stopIndex }) => new Promise((resolve) => {
    setLoadData(true);

    setTimeout(() => {
      const newList = [...list, ...list.slice(0, 10)];
      setList(newList);
      setLoadData(false);
      resolve(newList);
    }, 1000);
  });

  const isRowLoaded = ({ index }) => {
    if (!loadData && list.length - index <= 5) {
      setLoadData(true);
      return false;
    }
    return true;
  };


  const renderBottom = () => <div style={{ padding: 20 }}>触底了，加载更多...</div>;

  return (
    <div>
      <div style={{ height: '400px', border: '1px solid #000', width: '200px' }}>
        <ScrollView
          className="list"
          height={500}
          rowData={list}
          rowCount={list.length}
          rowHeight={100}
          width="100%"
          isRowLoaded={isRowLoaded}
          onPullingUp={loadMoreRows}
          rowRenderer={renderListItem}
          renderBottom={renderBottom()}
        />
      </div>
      <p style={{ padding: '20px 0' }}>通过 renderBottom 属性，可以在触底时，在底部展示自定义内容，可用于表示正在加载等场景</p>
    </div>
  );
};

export default Example2;
