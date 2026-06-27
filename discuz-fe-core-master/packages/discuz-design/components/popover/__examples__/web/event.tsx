import React, { useState } from "react";
import { Popover, Button } from '@discuzq/design';

export default function Example() {
  const [text, setText] = useState("popover 事件");
  return (
    <div className={"popover-page"}>
      <div className={"popover-container--base"}>
        <Popover
          trigger="hover"
          content={<div>{text}</div>}
          onMouseEnter={() => setText("mouse enter")}
          onMouseLeave={() => setText("mouse leave")}
        >
          <Button style={{ width: "100px" }}>{text}</Button>
        </Popover>

        <Popover
          trigger="click"
          content={<div>show event</div>}
          onTriggerClick={() => alert("trigger click")}
        >
          <Button>popover 事件</Button>
        </Popover>
      </div>
    </div>
  );
}
