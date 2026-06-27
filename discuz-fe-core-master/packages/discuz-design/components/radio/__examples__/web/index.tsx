import React, { useState } from 'react';
import { Radio } from '@discuzq/design';

export default function RadioExample() {
  const [item, setItem] = useState(null);

  return (
    <div className="page">
      <span className="header">Radio 单选框</span>

      <div className="section">
        <div className="header">基本用法</div>
        <Radio defaultChecked>勾选</Radio>
      </div>

      <div className="section">
        <div className="header">单选框组</div>
        <Radio.Group defaultValue='3'>
          <Radio name="1">选项1</Radio>
          <Radio name="2">选项2</Radio>
          <Radio name="3" disabled>
            选项3
          </Radio>
          <Radio name="4" disabled>
            选项4
          </Radio>
        </Radio.Group>
      </div>

      <div className="section">
        <div className="header">受控用法</div>
        <Radio.Group block value={item} onChange={item => setItem(item)}>
          <Radio name="1">选项1</Radio>
          <Radio name="2">选项2</Radio>
          <Radio name="3">选项3</Radio>
        </Radio.Group>
      </div>

      <div className="section">
        <div className="header">按钮模式</div>
        <Radio.Group block defaultValue="2" type="button">
          <Radio name="1">选项1</Radio>
          <Radio name="2">选项2</Radio>
          <Radio name="3">选项3</Radio>
          <Radio name="4">选项4</Radio>
          <Radio name="5">较长的选项5</Radio>
          <Radio name="6">更长一点的选项6</Radio>
        </Radio.Group>
      </div>

      <div className="section">
        <div className="header">按钮模式</div>
        <Radio.Group block defaultValue='2' type="item">
          <Radio name="1" defaultChecked disabled>选项1</Radio>
          <Radio name="2" disabled>选项2</Radio>
          <Radio name="3">选项3</Radio>
          <Radio name="4">选项4</Radio>
          <Radio name="5">较长的选项5</Radio>
          <Radio name="6">更长一点的选项6</Radio>
        </Radio.Group>
      </div>
    </div>
  );
}

