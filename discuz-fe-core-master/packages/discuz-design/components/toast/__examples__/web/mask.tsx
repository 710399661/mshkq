import { Toast, Button } from '@discuzq/design';
import React from "react";

export default function Example1() {
  return (
    <>
      <Button
        type="primary"
        onClick={() =>
          Toast.info({
            content: "这是一条信息提示",
            hasMask: true,
          })
        }
      >
        有遮罩层
      </Button>
      <Button
        type="primary"
        onClick={() =>
          Toast.success({
            content: "这是一条成功提示",
            hasMask: false,
          })
        }
      >
        无遮罩层
      </Button>
    </>
  );
}
