import React from 'react';
import { Radio } from '@discuzq/design';

export default function CheckboxExample() {
  return (
    <div className="page">
      <div>
        <Radio defaultChecked disabled />
        <br />
        <Radio disabled />
      </div>
    </div>
  );
}
