import React from "react";
import { Popover, Avatar } from '@discuzq/design';

export default function Example() {
  return (
    <div className={"popover-page"}>
      <div className={"popover-container--base"}>
        <Popover
          placement="TL"
          trigger="hover"
          content={<div>avatar1：我的箭头没有对齐中心</div>}
        >
          <Avatar size={"primary"} text={"Z"} circle={true} />
        </Popover>
        <Popover
          placement="TL"
          trigger="hover"
          triangleAtCenter={true}
          content={<div>avatar2：我还是左上对齐，箭头也对齐了</div>}
        >
          <Avatar size={"primary"} text={"Z"} circle={true} />
        </Popover>
      </div>
    </div>
  );
}
