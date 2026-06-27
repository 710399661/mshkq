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
    <div style={{ display: 'flex' }}>
        <Card style={{ width: '330px', height: '500px', overflow: 'scroll' }} bordered={true} header='单选'>
          <Menu defaultOpeneds={['1', '2']} defaultSubmenuActives={['1']} defaultActives={['1-1']}>
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
              <Menu.Item index="2-3" disabled={true}>选项3</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Card>
        <Card style={{ width: '330px', height: '500px', overflow: 'scroll' }} bordered={true} header='多选'>
          <Menu defaultOpeneds={['1', '2']} defaultSubmenuActives={['1']} defaultActives={['1-1', '1-2']} multiple={true}>
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
              <Menu.Item index="2-3" disabled={true}>选项3</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Card>
    </div>
  );
}
