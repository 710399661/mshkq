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
  };

  loading = false;

  onPullingUp = () => {
    Taro.showLoading();

    this.loading = true;
    return new Promise((resolve) => {
      setTimeout(() => {
        const { data } = this.state;
        this.setState(
          {
            data: data.concat(initData()),
          },
          () => {
            this.loading = false;
            Taro.hideLoading();
          },
        );
        resolve();
      }, 1000);
    });
  };

  ref = React.createRef()

  onClick = () => {
    console.log(this.ref);
  }


  render() {
    const { data } = this.state;
    const dataLen = data.length;
    const itemSize = 100;
    return (
      <View>
        <Button onClick={this.onClick}>点击</Button>
        <ScrollView
        ref={this.ref}
        className="list"
        height={500}
        rowData={data}
        rowCount={dataLen}
        rowHeight={itemSize}
        width="100%"
        rowRenderer={Row}
        unlimitedSize
        onPullingUp={this.onPullingUp}
        isNormal={false}
      />
      </View>

    );
  }
}
