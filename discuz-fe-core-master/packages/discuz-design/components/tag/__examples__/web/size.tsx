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
          type="primary"
        >
          Middle
        </Tag>
        <Tag
          style={{
            marginRight: 16,
          }}
          size="lg"
          type="success"
        >
          Large
        </Tag>
        <Tag
          style={{
            marginRight: 16,
          }}
          size="md"
          type="primary"
          closeable={true}
        >
          Middle Close
        </Tag>
        <Tag
          style={{
            marginRight: 16,
          }}
          size="lg"
          type="success"
          closeable={true}
        >
          Large Close
        </Tag>
      </div>
    </div>
  );
}
