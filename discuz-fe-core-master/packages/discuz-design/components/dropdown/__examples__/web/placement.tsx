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
        style={{ display: 'inline-block' }}
        menu={menu()}
        placement="left"
        hideOnClick={true}
        onChange={key => console.log(key)}
      >
        菜单(左)
      </Dropdown>
      <Dropdown menu={menu()} style={{ display: 'inline-block', marginLeft: '50px' }}>
        菜单(中)
      </Dropdown>
      <Dropdown placement="right" menu={menu()} style={{ display: 'inline-block', marginLeft: '50px' }}>
        菜单(右)
      </Dropdown>
    </div>
  );
}
