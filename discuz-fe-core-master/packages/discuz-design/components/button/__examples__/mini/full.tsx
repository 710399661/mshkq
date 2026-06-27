import Button from '../../index';
import React from 'react';

export default function Full() {
  return (
    <>
      <Button size='large' type="primary" full>确定</Button>
      <Button size='large' full>取消</Button>
    </>
  );
}