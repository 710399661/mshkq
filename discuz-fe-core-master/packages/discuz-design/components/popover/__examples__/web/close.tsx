import React, { useRef } from "react";
import { Popover, Button } from '@discuzq/design';

export default function Example() {
  const popoverCloseRef = useRef(null);

  return (
    <div className={"popover-page"}>
      <div className={"popover-container--base"}>
        <Popover
          placement="TOP"
          needOutsideClose={false}
          content={
            <div style={{ width: "150px" }}>
              浮层内容不需要组件外关闭，只允许触发器关闭。
            </div>
          }
        >
          <Button>禁止外部关闭</Button>
        </Popover>

        <Popover
          placement="TL"
          trigger="click"
          closeCallback={(callback) => (popoverCloseRef.current = callback)}
          content={
            <div style={{ width: "150px" }}>
              浮层内容不需要组件外关闭，只允许触发器关闭
              <div
                style={{ color: "#C0C8FC", cursor: "pointer" }}
                onClick={() => popoverCloseRef.current?.(false)}
              >
                close
              </div>
            </div>
          }
        >
          <Button>支持 content 内回调关闭</Button>
        </Popover>
      </div>
    </div>
  );
}
