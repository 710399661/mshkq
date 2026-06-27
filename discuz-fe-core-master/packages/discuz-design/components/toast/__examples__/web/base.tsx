import React from "react";
import { Toast, Button } from '@discuzq/design';
import './index.scss';

export default function Example1() {
  return (
    <>
      <Button
        onClick={() =>
          Toast.info({
            content: "这是一段自定义文本提示内容",
            onClose: () => {
              console.log("close");
            },
          })
        }
      >
        Info
      </Button>
      <Button
        type="primary"
        onClick={() =>
          Toast.success({
            content: "这是一条成功提示",
          })
        }
      >
        Success
      </Button>
      <Button
        type="warn"
        onClick={() =>
          Toast.warning({
            content: "这是一条警告提示",
          })
        }
      >
        Warning
      </Button>
      <Button
        type="danger"
        onClick={() =>
          Toast.error({
            content: "这是一条异常提示",
          })
        }
      >
        Error
      </Button>
      <Button
        onClick={() =>
          Toast.loading({
            content: "加载中 ...",
          })
        }
      >
        Loading
      </Button>
    </>
  );
}
