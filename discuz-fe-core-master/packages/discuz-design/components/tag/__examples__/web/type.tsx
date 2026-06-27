import React from 'react';
import { Tag, Divider } from '@discuzq/design';
import './index.scss';

export default function TagExample() {
  return (
    <div className="page">
      <div className="tag-section">
        <Divider orientation="left">
          {' '}
          <span className="tag-divider">Preset</span>{' '}
        </Divider>
        <Tag
          style={{
            marginRight: 10,
          }}
          size="lg"
          type="success"
        >
          success
        </Tag>
        <Tag
          style={{
            marginRight: 16,
          }}
          size="lg"
          type="warning"
        >
          warning
        </Tag>
        <Tag
          style={{
            marginRight: 16,
          }}
          size="lg"
          type="primary"
        >
          primary
        </Tag>
        <Tag
          style={{
            marginRight: 16,
          }}
          size="lg"
          type="danger"
        >
          danger
        </Tag>
        <Tag
          style={{
            marginRight: 16,
          }}
          size="lg"
          type="default"
        >
          default
        </Tag>
        <Tag
          style={{
            marginRight: 16,
          }}
          size="lg"
          type="orange"
        >
          orange
        </Tag>
        <Divider orientation="left">
          {' '}
          <span className="tag-divider">Custom</span>{' '}
        </Divider>
        <Tag
          style={{
            marginRight: 16,
            color: '#fff',
            borderColor: '#f50',
            backgroundColor: 'rgb(255, 85, 0)',
          }}
          size="lg"
        >
          #f50
        </Tag>
        <Tag
          style={{
            marginRight: 16,
            color: '#fff',
            borderColor: '#2db7f5',
            backgroundColor: 'rgb(45, 183, 245)',
          }}
          size="lg"
        >
          #2db7f5
        </Tag>
        <Tag
          style={{
            marginRight: 16,
            color: '#fff',
            borderColor: '#87d068',
            backgroundColor: 'rgb(135, 208, 104)',
          }}
          size="lg"
        >
          #87d068
        </Tag>
        <Tag
          style={{
            marginRight: 16,
            color: '#fff',
            borderColor: '#108ee9',
            backgroundColor: 'rgb(16, 142, 233)',
          }}
          size="lg"
        >
          #108ee9
        </Tag>
      </div>
    </div>
  );
}
