import React, { useState } from 'react';
import { Checkbox } from '@discuzq/design';

export default function CheckboxExample() {
  const [items, setItems] = useState([]);

  return (
    <div className="page">
      <span className="header">Checkbox 复选框</span>

      <div className="section">
        <div className="header">基本用法</div>
        <Checkbox defaultChecked>勾选</Checkbox>
      </div>

      <div className="section">
        <div className="header">复选框组</div>
        <Checkbox.Group defaultValue={['3']}>
          <Checkbox name="1">选项1</Checkbox>
          <Checkbox name="2">选项2</Checkbox>
          <Checkbox name="3" disabled>
            选项3
          </Checkbox>
          <Checkbox name="4" disabled>
            选项4
          </Checkbox>
        </Checkbox.Group>
      </div>

      <div className="section">
        <div className="header">受控用法</div>
        <Checkbox.Group value={items} onChange={items => setItems(items)}>
          <Checkbox name="1">选项1</Checkbox>
          <Checkbox name="2">选项2</Checkbox>
          <Checkbox name="3">选项3</Checkbox>
        </Checkbox.Group>
      </div>

      <div className="section">
        <div className="header">方框样式</div>
        <Checkbox.Group type="square">
          <Checkbox name="1">选项1</Checkbox>
          <Checkbox name="2">选项2</Checkbox>
          <Checkbox name="3" disabled>
            选项3
          </Checkbox>
        </Checkbox.Group>
      </div>

      <div className="section">
        <div className="header">block</div>
        <Checkbox.Group block>
          <Checkbox name="1">选项1</Checkbox>
          <Checkbox name="2">选项2</Checkbox>
          <Checkbox name="3">选项3</Checkbox>
        </Checkbox.Group>
      </div>

      <div className="section">
        <div className="header">按钮模式</div>
        <Checkbox.Group block defaultValue={['2']} type="button">
          <Checkbox name="1">选项1</Checkbox>
          <Checkbox name="2">选项2</Checkbox>
          <Checkbox name="3">选项3</Checkbox>
          <Checkbox name="4">选项4</Checkbox>
          <Checkbox name="5">较长的选项5</Checkbox>
          <Checkbox name="6">更长一点的选项6</Checkbox>
        </Checkbox.Group>
      </div>

      <div className="section">
        <div className="header">同意协议条款</div>
        <Checkbox name="agreement" type="agreement" onChange={console.log}>
          Yes, I do.
        </Checkbox>
      </div>

      <div className="section">
        <div className="header">按钮模式</div>
        <Checkbox.Group block defaultValue={['2']} type="item">
          <Checkbox name="1" disabled>选项1</Checkbox>
          <Checkbox name="2" disabled defaultChecked>选项2</Checkbox>
          <Checkbox name="3">选项3</Checkbox>
          <Checkbox name="4">选项4</Checkbox>
          <Checkbox name="5">较长的选项5</Checkbox>
          <Checkbox name="6">更长一点的选项6</Checkbox>
        </Checkbox.Group>
      </div>
    </div>
  );
}

