import { Dropdown } from '@discuzq/design';
import React from 'react';

export default function Base() {
  const menu = (
    <Dropdown.Menu>
      <Dropdown.Item id="1">选项1</Dropdown.Item>
      <Dropdown.Item id="2" disabled={true}>选项2</Dropdown.Item>
      <Dropdown.Item id="3">选项3</Dropdown.Item>
      <Dropdown.Item id="4">选项4</Dropdown.Item>
      <Dropdown.Item id="5">选项5</Dropdown.Item>
      <Dropdown.Item id="6">选项6</Dropdown.Item>
      <Dropdown.Item id="7">选项7</Dropdown.Item>
    </Dropdown.Menu>
  )

  const dropStyle = { display: 'inline-block', marginRight: '50px' }

  return (
    <div style={{ height: '300px' }}>
      <Dropdown
        menu={menu}
        trigger="hover"
        style={dropStyle}
      >
        trigger hover
      </Dropdown>

      <Dropdown
        menu={menu}
        trigger="click"
        style={dropStyle}
      >
        trigger click
      </Dropdown>

    </div >
  );
}
