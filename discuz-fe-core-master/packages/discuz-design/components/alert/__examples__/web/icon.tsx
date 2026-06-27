import React from 'react';
import { Alert } from '@discuzq/design';

export default function AlertExample() {
  return (
    <div className="page">
      <Alert type="success" hideIcon>成功提示的文案</Alert>
      <Alert type="warning" hideIcon>警告提示的文案</Alert>
      <Alert type="info" hideIcon>消息提示的文案</Alert>
      <Alert type="error" hideIcon>错误提示的文案</Alert>
      <br />
    </div>
  );
}
