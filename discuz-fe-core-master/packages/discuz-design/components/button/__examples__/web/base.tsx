import { Button } from '@discuzq/design';
import React from 'react';
import './index.scss';

export default function Base() {
  const onClick = (e) => {
    // console.log("click", e);
  };

  return (
    <div>
      <Button type="primary" onClick={onClick}>
        primary主要按钮
      </Button>
      <Button type="secondary" onClick={onClick}>
        次要按钮
      </Button>
      <Button onClick={onClick}>default默认按钮</Button>
      <Button type="danger" onClick={onClick}>
        danger危险按钮
      </Button>
      <Button type="warn" onClick={onClick}>
        warn警告按钮
      </Button>
      <Button type="info" onClick={onClick}>
        信息按钮
      </Button>
      <Button type="dashed">虚线边框</Button>
      <Button type="text" onClick={onClick}>
        text文本按钮
      </Button>
    </div>
  );
}
