import Input from '../../index';
import React, { useState } from 'react';

export default function Example1() {
  return (
    <>
      <Input value="123123" disabled={true} placeholder="禁用" onClick={() => console.log('点击事件')}/>
    </>
  );
}
