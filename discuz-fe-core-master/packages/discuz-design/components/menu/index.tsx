import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { MenuViewAdapter } from './layouts/index';
import { MenuLogicalAdapter } from './adapters/index';
import { MenuProps } from './interface';
import MenuItem from './menu-item';
import MenuItemGroup from './menu-item-group';
import SubMenu from './sub-menu';
import report from '../../utils/report';

interface MenuState { }

interface MenuLayoutProps { }

interface MenuAdapter { }

export default class Menu extends baseComponentFactory<MenuProps, MenuState, MenuLayoutProps, MenuAdapter>({
  viewAdapter: MenuViewAdapter,
  logicalAdapter: MenuLogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'menu'
    })
  }

  public static Item = MenuItem;

  public static ItemGroup = MenuItemGroup;

  public static SubMenu = SubMenu;


  public render() {
    const composeProps = {
      ...this.props,
    };

    const { RenderComponent } = this;
    return <RenderComponent {...composeProps}>{this.props.children}</RenderComponent>;
  }
}
