import { Toast, Button } from '@discuzq/design';
import React from "react";

export default function Example1() {
  return (
    <>
      <Button
        onClick={() =>
          Toast.info({
            content: "给你点个赞",
            icon: "LikeOutlined",
          })
        }
      >
        custom icon
      </Button>
      <Button
        onClick={() =>
          Toast.info({
            content: "一封书信",
            icon: "MailOutlined",
          })
        }
      >
        custom icon
      </Button>
    </>
  );
}
