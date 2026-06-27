import React from 'react';
import { baseComponentFactory } from '../../../extends/baseComponent';
import { MenuItemViewAdapter } from './layouts/index';
import { MenuItemLogicalAdapter } from './adapters/index';
import { MenuItemProps } from './interface';

interface MenuItemState {}

interface MenuItemLayoutProps {}

interface MenuItemAdapter {}

export default class Menu extends
  baseComponentFactory<MenuItemProps, MenuItemState, MenuItemLayoutProps, MenuItemAdapter>({
    viewAdapter: MenuItemViewAdapter,
    logicalAdapter: MenuItemLogicalAdapter,
  }) {
  public render() {
    const composeProps = {
      ...this.props,
    };

    const { RenderComponent } = this;
    return <RenderComponent {...composeProps}>{this.props.children}</RenderComponent>;
  }
}
