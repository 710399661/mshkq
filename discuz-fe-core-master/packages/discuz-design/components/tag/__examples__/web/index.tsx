import React from 'react';
import { Tag } from '@discuzq/design';

export default function TagExample() {
  const onClose = () => {
    console.log('点击关闭');
  };

  const onClick = () => {
    console.log('点击');
  };

  return (
    <div className="page">
      <span className="header">Tag 标签</span>
      <div className="section">
        <Tag
          style={{
            marginRight: 10,
          }}
        >
          标签
        </Tag>
        <Tag
          style={{
            marginRight: 10,
          }}
          type="primary"
        >
          标签
        </Tag>
        <Tag
          style={{
            marginRight: 10,
          }}
          type="success"
        >
          标签
        </Tag>
        <Tag
          style={{
            marginRight: 10,
          }}
          type="warning"
        >
          标签
        </Tag>
        <Tag
          type="orange"
          style={{
            marginRight: 10,
          }}
        >
          标签
        </Tag>
        <Tag
          type="danger"
          closeable
          size="md"
          onClose={onClose}
          onClick={onClick}
        >
          标签
        </Tag>

      </div>
    </div>
  );
}
