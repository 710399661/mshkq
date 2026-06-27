import { Button } from '@discuzq/design';
import React from "react";

export default function Size() {
  return (
    <div>
      <Button type="primary" size="large">
        大型按钮
      </Button>
      <Button type="primary" size="medium">
        正常按钮
      </Button>
      <Button type="primary" size="small">
        中小按钮
      </Button>
      <Button type="primary" size="mini">
        小型按钮
      </Button>
    </div>
  );
}
