import { Menu, Card } from '@discuzq/design';
import React from 'react';

function title(name = '导航') {
  return <span>{name}</span>;
}

export default function Base() {
  return (
    <Card style={{ width: '330px', height: '500px' }} bordered={true}>
      <Menu mode="horizontal" menuTrigger="hover">
        <Menu.Item index="3">全部</Menu.Item>
        <Menu.SubMenu index="1" title={title('精华')}>
          <Menu.Item divided={true} index="1-1">选项1</Menu.Item>
          <Menu.Item index="1-2">选项2</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu index="2" title={title('热门')}>
          <Menu.Item divided={true} index="2-1">选项1</Menu.Item>
          <Menu.Item divided={true} index="2-2">选项2</Menu.Item>
          <Menu.Item index="2-3">选项3</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Card>
  );
}
