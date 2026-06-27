import React from 'react';
import { Spin } from '@discuzq/design';

export default function SpinExample() {
  return (
    <div className="page">
      <div><Spin color="#8590A6" vertical>正在加载中</Spin></div>
      <div><Spin type="spinner" color="#8590A6" vertical>正在加载中</Spin></div>
    </div>
  );
}
