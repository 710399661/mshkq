import React from 'react';
import { Alert } from '@discuzq/design';

export default function AlertExample() {
  return (
    <div className="page">
      <Alert type="success">success 成功提示的文案</Alert>
      <Alert type="warning">warning 警告提示的文案</Alert>
      <Alert type="info">info 消息提示的文案</Alert>
      <Alert type="error">error 错误提示的文案</Alert>
      <br />
    </div>
  );
}
