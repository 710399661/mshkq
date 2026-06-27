import React from 'react';
import { Checkbox } from '@discuzq/design';

export default function CheckboxExample() {
  return (
    <div className="page">
      <div>
        <Checkbox.Group type="square">
          <Checkbox name="1">选项1</Checkbox>
          <Checkbox name="2">选项2</Checkbox>
          <Checkbox name="3" disabled>
            选项3
          </Checkbox>
        </Checkbox.Group>
      </div>
    </div>
  );
}

