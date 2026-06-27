import React from 'react';
import { Radio } from '@discuzq/design';

export default function RadioExample() {
  return (
    <div className="page">
      <div>
        <Radio.Group defaultValue='3'>
          <Radio name="1">男</Radio>
          <Radio name="2">女</Radio>
          <Radio name="3" disabled>
            未知
          </Radio>
          <Radio name="4" disabled>
            ...
          </Radio>
        </Radio.Group>
      </div>
    </div>
  );
}

