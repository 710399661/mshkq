import Button from '../../index';
import React from 'react';

export default function Loading() {
  return (
    <>
      <Button loading={true}>加载中</Button>
      <Button type="primary" loading={true}>加载中</Button>
    </>
  );
}
