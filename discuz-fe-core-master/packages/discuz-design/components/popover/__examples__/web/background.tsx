import React from "react";
import { Popover, Button } from '@discuzq/design';

export default function Example() {
  return (
    <div className={"popover-page"}>
      <div className={"popover-container--base"}>
        <Popover
          placement="TL"
          background={"#ec8b5a"}
          content={<div style={{ color: "#fff" }}>content</div>}
        >
          <Button>设置浮层背景</Button>
        </Popover>
        <Popover
          placement="TL"
          background={"#9277f1"}
          content={<div style={{ color: "#fff" }}>content</div>}
        >
          <Button>设置浮层背景</Button>
        </Popover>
        <Popover
          placement="TL"
          background={"#D84176"}
          content={<div style={{ color: "#fff" }}>content</div>}
        >
          <Button>设置浮层背景</Button>
        </Popover>
        <Popover
          placement="TL"
          background={"#AED581"}
          content={<div style={{ color: "#fff" }}>content</div>}
        >
          <Button>设置浮层背景</Button>
        </Popover>
        <Popover
          placement="TL"
          background={"#9C27B0"}
          content={<div style={{ color: "#fff" }}>content</div>}
        >
          <Button>设置浮层背景</Button>
        </Popover>
      </div>
    </div>
  );
}
