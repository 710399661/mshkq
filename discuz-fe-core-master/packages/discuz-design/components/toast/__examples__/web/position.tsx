import { Toast, Button } from '@discuzq/design';
import React from "react";

export default function Example1() {
  return (
    <>
      <Button
        type="primary"
        onClick={() =>
          Toast.info({
            content: "这是一条提示信息",
            position: "top",
          })
        }
      >
        top
      </Button>
      <Button
        type="primary"
        onClick={() =>
          Toast.info({
            content: "这是一条提示信息",
            position: "center",
          })
        }
      >
        center
      </Button>
      <Button
        type="primary"
        onClick={() =>
          Toast.info({
            content: "这是一条提示信息",
            position: "bottom",
          })
        }
      >
        bottom
      </Button>
    </>
  );
}
