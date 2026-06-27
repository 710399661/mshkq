import React from 'react';
import { Popover, Button } from '@discuzq/design';

export default function Example() {
  return (
    <div className={'popover-page'}>
      <div className={'popover-container--base'}>
        <Popover content={<div>trigger click</div>}>
          <Button>click</Button>
        </Popover>

        <Popover trigger="hover" content={<div>trigger hover</div>}>
          <Button>hover</Button>
        </Popover>

        <Popover
          placement="TL"
          trigger="hover"
          content={
            <div style={{ height: '220px', width: '80px' }}>
              预展示在按钮左上位置，但是可视区空间不足，就展示在对立面
            </div>
          }
        >
          <Button>空间不足</Button>
        </Popover>
      </div>
    </div>
  );
}
