import React from "react";
import { Tag } from '@discuzq/design';
import "./index.scss";

export default function TagExample() {
  const onClose = () => {};
  return (
    <div className="page">
      <div className="tag-section">
        <Tag
          style={{
            marginRight: 16,
          }}
          size="md"
        >
          Tag1
        </Tag>
        <Tag
          style={{
            marginRight: 16,
          }}
          size="md"
        >
          Link
        </Tag>
        <Tag
          style={{
            marginRight: 16,
          }}
          size="md"
          closeable={true}
          onClose={onClose}
        >
          Tag2
        </Tag>
        <Tag size="md" closeable={true} onClose={onClose}>
          Link2
        </Tag>
      </div>
    </div>
  );
}
