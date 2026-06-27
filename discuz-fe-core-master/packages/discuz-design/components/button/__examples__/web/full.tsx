import { Button } from '@discuzq/design';
import React from "react";

export default function Full() {
  return (
    <div>
      <div style={{ marginBottom: "8px" }}>
        <Button size="large" type="primary" full>
          确定
        </Button>
      </div>
      <div>
        <Button size="large" full>
          取消
        </Button>
      </div>
    </div>
  );
}
