import { Button } from '@discuzq/design';
import React from "react";

export default function Disabled() {
  return (
    <div>
      <Button type="primary" disabled={true}>
        主要按钮
      </Button>
      <Button disabled={true}>默认按钮</Button>
      <Button type="danger" disabled={true}>
        危险按钮
      </Button>
      <Button type="dashed" disabled={true}>
        虚线边框
      </Button>
      <Button type="text" disabled={true}>
        文字按钮
      </Button>
    </div>
  );
}
