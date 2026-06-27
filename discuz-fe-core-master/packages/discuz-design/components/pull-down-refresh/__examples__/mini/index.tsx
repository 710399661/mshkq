import React, { useState } from 'react';
import { View, ScrollView } from '@tarojs/components';
import PullToRefresh from '../../index';

export default function PullToRefreshExample() {
  const [refresh, setRefresh] = useState(null);
  const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [isReachTop, setIsReachTop] = useState(true);

  const onScroll = ({ detail: { scrollTop } }) => {
    setIsReachTop(scrollTop <= 0);
  };

  const onRefresh = () => {
    setRefresh(false);
    setTimeout(() => {
      setList([9]);
      setRefresh(true);
    }, 3000);
  };

  const renderChildren = () => list.map((item, index) => (
      <View
        key={index}
        style={{
          height: '100px',
          backgroundColor: index % 2 === 0 ? 'red' : 'black',
        }}
      >
        {item}
      </View>
  ));

  return (
    <View>
      <PullToRefresh onRefresh={onRefresh} isFinished={refresh} height={300}>
        <View>{renderChildren()}</View>
      </PullToRefresh>

      <View style={{ display: 'flex', justifyContent: 'center' }}>
        ---------- 华丽的分割线 ----------
      </View>

      <PullToRefresh
        onRefresh={onRefresh}
        isFinished={refresh}
        height={300}
        isScrollView
        isReachTop={isReachTop}
      >
        <ScrollView scrollY style={{ height: '100%' }} onScroll={onScroll}>
          {renderChildren()}
        </ScrollView>
      </PullToRefresh>
    </View>
  );
}
