import React from 'react';
import { baseComponentFactory } from '../../../extends/baseComponent';
import { MenuViewAdapter } from './layouts/index';
import { MenuLogicalAdapter } from './adapters/index';
import { MenuProps } from './interface';

interface MenuState {}

interface MenuLayoutProps {}

interface MenuAdapter {}

export default class Menu extends
  baseComponentFactory<MenuProps, MenuState, MenuLayoutProps, MenuAdapter>({
    viewAdapter: MenuViewAdapter,
    logicalAdapter: MenuLogicalAdapter,
  }) {
  public render() {
    const composeProps = {
      ...this.props,
    };

    const { RenderComponent } = this;
    return <RenderComponent {...composeProps}>{this.props.children}</RenderComponent>;
  }
}
