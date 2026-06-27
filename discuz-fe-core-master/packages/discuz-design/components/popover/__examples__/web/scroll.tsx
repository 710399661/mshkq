import React from "react";
import { Popover, Button } from '@discuzq/design';

export default function Example() {
  return (
    <div className={"popover-page"}>
      <div className={"popover-container--scroll"}>
        <Popover
          placement="RIGHT"
          trigger={"click"}
          followTrigger={true}
          content={<div>容器被滚动时，浮层跟随。click触发时不会立刻消失</div>}
        >
          <Button>click follow</Button>
        </Popover>
        <Popover
          placement="RIGHT"
          trigger={"hover"}
          followTrigger={true}
          content={
            <div style={{ height: "180px" }}>
              容器被滚动时，浮层跟随。hover触发，鼠标不在感应区会消失
            </div>
          }
        >
          <Button>hover follow</Button>
        </Popover>
        <Popover
          placement="RIGHT"
          trigger={"click"}
          content={<div>滚动容器内的默认浮层不跟随</div>}
        >
          <Button>click</Button>
        </Popover>
        <Popover
          placement="RIGHT"
          trigger={"hover"}
          content={<div>滚动容器内的默认浮层不跟随</div>}
        >
          <Button>hover</Button>
        </Popover>
      </div>
    </div>
  );
}
