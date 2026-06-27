import React from 'react';
import { View, Button } from '@tarojs/components';
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
  };

  onPullingUp = () => Promise.reject();

  // 底部视图
  renderBottom = () => <View>正在加载...</View>;

  render() {
    const { data } = this.state;
    const dataLen = data.length;
    const itemSize = 100;
    return (
      <View>
        <ScrollView
          className="list"
          height={500}
          rowData={data}
          rowCount={dataLen}
          rowHeight={itemSize}
          width="100%"
          rowRenderer={Row}
          unlimitedSize
          onPullingUp={this.onPullingUp}
          renderBottom={this.renderBottom()}
        />
      </View>
    );
  }
}
