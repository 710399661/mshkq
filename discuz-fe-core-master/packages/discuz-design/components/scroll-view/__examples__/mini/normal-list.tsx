import React from 'react';
import { View, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import ScrollView from '../../index';
import Parser from 'react-html-parser';
import mock from '../mock';
import './index.scss';
import Item from './item';
import s9e from '../s9e';

const Row = ({ id, index, data, style }) => (
  <View id={id} style={style} key={id}>
    <Item data={data[index]} />
  </View>
);

const initData = (data = mock.slice(0, 10)) => {
  data.map((item) => {
    if (item.firstPost.summary) {
      item.firstPost.summary_component = Parser(s9e.parse(item.firstPost.summary));
    }
  });
  return data;
};

export default class Index extends React.Component {
  state = {
    data: initData(),
    listItemIndex: -1,
  };

  onPullingUp = () => {
    Taro.showLoading();

    return new Promise((resolve) => {
      setTimeout(() => {
        const { data } = this.state;
        this.setState(
          {
            data: data.concat(initData()),
          },
          () => {
            Taro.hideLoading();
          },
        );
        resolve();
      }, 1000);
    });
  };

  onScroll = ({ scrollTop }) => {
    console.log('滑动偏移量', scrollTop);
  };

  onScrollTop = () => {
    console.log('触顶了');
  };

  onScrollBottom = () => {
    console.log('触底了');
  };

  onScrollClick = () => {
    const { listItemIndex } = this.state;
    const tmp = listItemIndex + 1;
    this.setState({
      listItemIndex: tmp,
    });
  };

  render() {
    const { data, listItemIndex } = this.state;
    const dataLen = data.length;
    const itemSize = 100;
    return (
      <View>
        <Button onClick={this.onScrollClick}>点击上滑加1</Button>
        <ScrollView
          className="list"
          height={500}
          rowData={data}
          rowCount={dataLen}
          rowHeight={itemSize}
          width="100%"
          rowRenderer={Row}
          overscanRowCount={3}
          unlimitedSize
          onPullingUp={this.onPullingUp}
          onScrollTop={this.onScrollTop}
          scrollToIndex={listItemIndex}
          onScroll={this.onScroll}
        />
      </View>
    );
  }
}
