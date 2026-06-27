import { Menu, Card } from '@discuzq/design';
import React from 'react';

function title(name = '导航') {
  return <span>{name}</span>;
}

function onClick(index, subMenuIndex, list) {
  console.log(`点击了子菜单${index}，父级菜单${subMenuIndex}`, list);
}

export default function Base() {
  return (
    <div style={{ display: 'flex' }}>
      <Card
        style={{ width: '330px', height: '500px', overflow: 'scroll' }}
        bordered={true}
        fullBody={true}
        header="横向模式"
      >
        <Menu multiple={true}>
          <Menu.Item index="3">{title('全部')}</Menu.Item>
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
            <Menu.Item index="2-3" disabled={true}>
              选项3
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Card>

      <Card
        style={{
          width: '330px',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
        }}
        fullBody={true}
        bordered={true}
        header="纵向模式"
        bodyStyle={{
          flex: 1,
          overflow: 'scroll',
        }}
      >
        <Menu
          mode="horizontal"
          menuTrigger="hover"
          multiple={true}
          style={{ display: 'flex' }}
        >
          <Menu.Item index="3" onClick={onClick}>
            全部
          </Menu.Item>
          <Menu.Item index="4">热门</Menu.Item>
          <Menu.SubMenu index="1" title={title('类型')}>
            <Menu.Item divided={true} index="1-1">
              选项1
            </Menu.Item>
            <Menu.Item index="1-2">选项2</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu index="2" title={title('排序')}>
            <Menu.Item divided={true} index="2-1">
              选项1
            </Menu.Item>
            <Menu.Item divided={true} index="2-2">
              选项2
            </Menu.Item>
            <Menu.Item index="2-3">选项3</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Card>
    </div>
  );
}
