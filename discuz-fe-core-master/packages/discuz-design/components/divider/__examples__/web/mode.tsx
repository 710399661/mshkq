import { Divider } from '@discuzq/design';
import React from "react";

export default function Base() {
  return (
    <div className="page">
      <div className="divider-section">
        <span>选项1</span>
        <Divider mode="vertical" dashed={true}></Divider>
        <span>选项2</span>
        <Divider mode="vertical">123</Divider>
        <span>选项3</span>
      </div>
    </div>
  );
}
