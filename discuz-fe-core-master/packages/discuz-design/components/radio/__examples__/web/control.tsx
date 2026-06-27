import React, { useState } from 'react';
import { Radio } from '@discuzq/design';

export default function RadioExample() {
  const [items, setItems] = useState('');

  return (
    <div className="page">
      <div>
        <Radio.Group value={items} onChange={items => setItems(items)}>
          <Radio name="1">选项1</Radio>
          <Radio name="2">选项2</Radio>
          <Radio name="3">选项3</Radio>
        </Radio.Group>
      </div>
    </div>
  );
}

