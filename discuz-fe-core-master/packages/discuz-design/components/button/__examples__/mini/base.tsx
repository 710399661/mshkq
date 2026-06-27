import Button from '../../index';
import React from 'react';

export default function Base() {
  const onClick = (e) => {
    console.log('click', e);
  };

  return (
    <>
      <Button onClick={onClick}>默认按钮</Button>
      <Button type="primary" onClick={onClick}>
        主要按钮
      </Button>
      <Button type="secondary" onClick={onClick}>
        次要按钮
      </Button>
      <Button type="danger" onClick={onClick}>
        危险按钮
      </Button>
      <Button type="warn" onClick={onClick}>
        警告按钮
      </Button>
      <Button type="info" onClick={onClick}>
        信息按钮
      </Button>
      <Button type="dashed">虚线边框</Button>
      <Button type="text" onClick={onClick}>
        文字按钮
      </Button>
    </>
  );
}
