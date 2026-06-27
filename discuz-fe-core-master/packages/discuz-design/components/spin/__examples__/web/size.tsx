import React from 'react';
import { Spin } from '@discuzq/design';

export default function SpinExample() {
  const pageStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '50px',
    height: 200
  }
  return (
    <div className="page" style={pageStyle}>
      <div><Spin size="25px" color="#8590A6"></Spin></div>
      <div><Spin size="30px" type="spinner" color="#8590A6"></Spin></div>
      <div><Spin size="50px" type="spinner" color="#8590A6"></Spin></div>
      <div><Spin size="80px" type="spinner" color="#8590A6"></Spin></div>
      <div><Spin size="90px" type="spinner" color="#8590A6"></Spin></div>
    </div>
  );
}
