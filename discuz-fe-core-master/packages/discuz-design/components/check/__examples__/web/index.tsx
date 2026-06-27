import React from 'react';
import { Check } from '@discuzq/design';

export default function CheckExample() {
  return (
    <div className="page">
      <div className="section">
        <Check>选项按钮</Check>
      </div>

      <div className="section">
        <Check disabled>禁用选项按钮</Check>
      </div>

      <div className="section">
        <Check defaultChecked disabled>禁用选项按钮</Check>
      </div>

      <div className="section">
        <Check radio>radio选项按钮</Check>
      </div>

      <div className="section">
        <Check type="item">选项按钮选项按钮选项按钮选项按钮</Check>
      </div>
    </div>
  );
}
