import { Dropdown } from '@discuzq/design';
import React from 'react';

function menu() {
  return <Dropdown.Menu>
    <Dropdown.Item id="1">选项1</Dropdown.Item>
    <Dropdown.Item id="2" disabled={true}>选项2</Dropdown.Item>
    <Dropdown.Item id="3">选项3</Dropdown.Item>
    <Dropdown.Item id="4">选项4</Dropdown.Item>
    <Dropdown.Item id="5">选项5</Dropdown.Item>
    <Dropdown.Item id="6">选项6</Dropdown.Item>
    <Dropdown.Item id="7">选项7</Dropdown.Item>
  </Dropdown.Menu>;
}

export default function Base() {
  return (
    <div style={{ height: '300px' }}>
      <Dropdown
        menu={menu()}
        placement="left"
        onChange={key => console.log('点击了', key)}
        onVisibleChange={isShow => console.log('菜单打开：', isShow)}
      >
        触发菜单
      </Dropdown>
    </div>
  );
}
