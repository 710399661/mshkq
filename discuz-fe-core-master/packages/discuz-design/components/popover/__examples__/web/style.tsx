import React from "react";
import { Popover, Button } from '@discuzq/design';

export default function Example() {
  return (
    <div className={"popover-page"}>
      <div className={"popover-container--base"}>
        <Popover
          trigger="click"
          triggerStyle={{ background: 'red' }}
          triggerClassName={'test'}
          content={<div>
            <p>1. 给触发元素外壳设置红色背景</p>
            <p>2. 给触发元素添加test类名</p>
          </div>}>
          <Button>click</Button>
        </Popover>

        <Popover
          trigger="click"
          modalStyle={{ background: 'red' }}
          modalClassName={'test'}
          content={<div>
            <p>1. 给popover外壳设置红色背景</p>
            <p>2. 给popover外壳添加test类名</p>
          </div>}>
          <Button>click</Button>
        </Popover>

        <Popover
          trigger="click"
          innerStyle={{ fontSize: '12px' }}
          innerClassName={'test'}
          content={<div>
            <p>1. 在popover内壳设置字体大小</p>
            <p>2. 在popover内壳添加test类名</p>
          </div>}>
          <Button>click</Button>
        </Popover>
      </div>
    </div>
  );
}
