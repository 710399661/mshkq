import React from 'react';
import { Spin } from '@discuzq/design';

export default function SpinExample() {
  return (
    <div className="page">
      <div><Spin color="#B1C5FF">加载中 ...</Spin></div>
      <div><Spin type="spinner" color="#D81C38">加载中 ...</Spin></div>
    </div>
  );
}
