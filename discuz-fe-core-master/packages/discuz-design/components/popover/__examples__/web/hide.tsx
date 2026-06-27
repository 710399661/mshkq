import React from "react";
import { Popover, Button } from '@discuzq/design';

export default function Example() {
  return (
    <div className={"popover-page"}>
      <div className={"popover-container--base"}>
        <Popover showTriangle={false} content={<div>trigger click</div>}>
          <Button>click</Button>
        </Popover>

        <Popover trigger="hover" showTriangle={false} content={<div>trigger hover</div>}>
          <Button>hover</Button>
        </Popover>
      </div>
    </div>
  );
}
