import { Menu, Card } from '@discuzq/design';
import React from 'react';

function title(name = '导航') {
  return <div>
    <span>{name}</span>
    <span style={{ float: 'right' }}>{Math.ceil(Math.random() * 1000)}</span>
  </div>;
}

export default function Base() {
  return (
    <Card style={{ width: '330px', height: '500px', overflow: 'inherit' }} bordered={true}>
      <Menu uniqueOpened={true}>
        <Menu.Item index="6">{title('全部')}</Menu.Item>
        <Menu.SubMenu index="1" title={title('官方动态')}>
          <Menu.Item index="1-1">选项1</Menu.Item>
          <Menu.Item index="1-2">选项2</Menu.Item>
          <Menu.ItemGroup title={title('分组')}>
            <Menu.Item index="1-3">选项3</Menu.Item>
            <Menu.Item index="1-4">选项4</Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.SubMenu index="2" title={title('使用交流')}>
          <Menu.Item index="2-1">选项1</Menu.Item>
          <Menu.Item index="2-2">选项2</Menu.Item>
          <Menu.Item index="2-3">选项3</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu index="3" title={title('美食')}>
          <Menu.Item index="3-1">选项1</Menu.Item>
          <Menu.Item index="3-2">选项2</Menu.Item>
          <Menu.Item index="3-3">选项3</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu index="4" title={title('运动')}>
          <Menu.Item index="4-1">选项1</Menu.Item>
          <Menu.Item index="4-2">选项2</Menu.Item>
          <Menu.Item index="4-3">选项3</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu index="5" title={title('汽车')}>
          <Menu.Item index="5-1">选项1</Menu.Item>
          <Menu.Item index="5-2">选项2</Menu.Item>
          <Menu.Item index="5-3">选项3</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Card>
  );
}
