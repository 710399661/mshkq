import React from 'react';
import { baseComponentFactory } from '../../../extends/baseComponent';
import { MenuItemGroupViewAdapter } from './layouts/index';
import { MenuItemGroupLogicalAdapter } from './adapters/index';
import { MenuItemGroupProps } from './interface';

interface MenuItemGroupState {}

interface MenuItemGroupLayoutProps {}

interface MenuItemGroupAdapter {}

export default class MenuItemGroup extends
  baseComponentFactory<MenuItemGroupProps, MenuItemGroupState, MenuItemGroupLayoutProps, MenuItemGroupAdapter>({
    viewAdapter: MenuItemGroupViewAdapter,
    logicalAdapter: MenuItemGroupLogicalAdapter,
  }) {
  public render() {
    const composeProps = {
      ...this.props,
    };

    const { RenderComponent } = this;
    return <RenderComponent {...composeProps}>{this.props.children}</RenderComponent>;
  }
}
