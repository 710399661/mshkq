import { Button } from '@discuzq/design';
import React from 'react';

export default function HtmlType() {
  return (
    <div>
      <Button htmlType="submit">submit</Button>
      <Button htmlType="button" type="primary">button</Button>
      <Button htmlType="reset">reset</Button>
    </div>
  );
}
