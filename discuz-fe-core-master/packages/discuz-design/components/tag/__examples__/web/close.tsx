import React, { useState } from 'react';
import { Tag, Button } from '@discuzq/design';
import './index.scss';

export default function TagExample() {
  const [visible, setVisible] = useState(true);
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div className="page">
      <div className="tag-section">
        <Button type="primary" onClick={() => setVisible(!visible)}>点击{visible ? '删除' : '添加'}tag</Button>
        {visible && (
          <Tag
            style={{
              marginLeft: 16,
            }}
            size="md"
            closeable={visible}
            onClose={onClose}
            type="warning"
          >
            Tag1
          </Tag>
        )}
      </div>
    </div>
  );
}
