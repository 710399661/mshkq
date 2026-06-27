import React, { useState } from "react";
import { Popover, Button } from '@discuzq/design';

export default function Example() {
  const [trigger, setTrigger] = useState<"click" | "hover">("click");

  return (
    <div className={"popover-page"}>
      <div className={"popover-title"}>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={() => setTrigger(trigger === "click" ? "hover" : "click")}
        >
          切换按钮
        </Button>
        {` 点击切换trigger方式：${trigger} `}
      </div>

      <div className={"popover-container--position"}>
        <div className={"popover-position-item"}>
          <Popover
            placement="LT"
            trigger={trigger}
            content={<div style={{ height: "200px" }}>LT content</div>}
          >
            <Button>LT</Button>
          </Popover>
          <Popover
            placement="LEFT"
            trigger={trigger}
            content={<div style={{ height: "200px" }}>LEFT content</div>}
          >
            <Button>LEFT</Button>
          </Popover>
          <Popover
            placement="LB"
            trigger={trigger}
            content={<div style={{ height: "200px" }}>LB content</div>}
          >
            <Button>LB</Button>
          </Popover>
        </div>

        <div className={"popover-position-item"}>
          <div className={"popover-position-item__top"}>
            {/* 上*/}
            <Popover
              placement="TL"
              trigger={trigger}
              content={<div>TL content</div>}
              triangleAtCenter={true}
            >
              <Button>TL</Button>
            </Popover>
            <Popover
              modalStyle={{ color: "white" }}
              background={"blue"}
              placement="TOP"
              trigger={trigger}
              content={<div>TOP content</div>}
            >
              <Button>TOP</Button>
            </Popover>
            <Popover
              placement="TR"
              trigger={trigger}
              content={<div>TR content</div>}
            >
              <Button>TR</Button>
            </Popover>
          </div>
          {/* 下 */}
          <div className={"popover-position-item__bottom"}>
            <Popover
              placement="BL"
              trigger={trigger}
              content={<div>BL content</div>}
            >
              <Button>BL</Button>
            </Popover>
            <Popover
              placement="BOTTOM"
              trigger={trigger}
              content={<div>BOTTOM content</div>}
            >
              <Button>BOTTOM</Button>
            </Popover>
            <Popover
              placement="BR"
              trigger={trigger}
              content={<div>BR content</div>}
            >
              <Button>BR</Button>
            </Popover>
          </div>
        </div>

        <div className={"popover-position-item"}>
          <Popover
            placement="RT"
            trigger={trigger}
            content={<div>RT content</div>}
          >
            <Button>RT</Button>
          </Popover>
          <Popover
            placement="RIGHT"
            trigger={trigger}
            content={<div>RIGHT content</div>}
          >
            <Button>RIGHT</Button>
          </Popover>
          <Popover
            placement="RB"
            trigger={trigger}
            content={<div>RB content</div>}
          >
            <Button>RB</Button>
          </Popover>
        </div>
      </div>
    </div>
  );
}
