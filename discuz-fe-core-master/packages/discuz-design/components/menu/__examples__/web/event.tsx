import { Menu, Card } from '@discuzq/design';
import React, { useState } from 'react';

function title(name = '导航') {
  return <div>
    <span>{name}</span>
    <span style={{ float: 'right' }}>{Math.ceil(Math.random() * 1000)}</span>
  </div>;
}

export default function Base() {
  const [tips, setTips] = useState('事件监听');

  function onClick(index, subMenuIndex) {
    setTips(`点击了子菜单${index}，父级菜单${subMenuIndex}`);
  }

  function onSubClick(index, isOpen) {
    setTips(`点击了父菜单${index}，展开：${isOpen}`);
  }

  return (
    <Card style={{ width: '330px', height: '500px', overflow: 'inherit' }} header={tips} bordered={true}>
      <Menu>
        <Menu.Item index="3" onClick={onClick}>{title('全部')}</Menu.Item>
        <Menu.SubMenu index="1" title={title('官方动态')} onClick={onSubClick}>
          <Menu.Item index="1-1" onClick={onClick}>选项1</Menu.Item>
          <Menu.Item index="1-2" onClick={onClick}>选项2</Menu.Item>
          <Menu.ItemGroup title={title('分组')}>
            <Menu.Item index="1-3" onClick={onClick}>选项3</Menu.Item>
            <Menu.Item index="1-4" onClick={onClick}>选项4</Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.SubMenu index="2" title={title('使用交流')} onClick={onSubClick}>
          <Menu.Item index="2-1" onClick={onClick}>选项1</Menu.Item>
          <Menu.Item index="2-2" onClick={onClick}>选项2</Menu.Item>
          <Menu.Item index="2-3" onClick={onClick}>选项3</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Card>
  );
}
