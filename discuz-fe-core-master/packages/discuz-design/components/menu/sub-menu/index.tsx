import React from 'react';
import { baseComponentFactory } from '../../../extends/baseComponent';
import { SubMenuViewAdapter } from './layouts/index';
import { SubMenuLogicalAdapter } from './adapters/index';
import { SubMenuProps } from './interface';

interface SubMenuState {}

interface SubMenuLayoutProps {}

interface SubMenuAdapter {}

export default class SubMenu extends
  baseComponentFactory<SubMenuProps, SubMenuState, SubMenuLayoutProps, SubMenuAdapter>({
    viewAdapter: SubMenuViewAdapter,
    logicalAdapter: SubMenuLogicalAdapter,
  }) {
  public render() {
    const composeProps = {
      ...this.props,
    };

    const { RenderComponent } = this;
    return <RenderComponent {...composeProps}>{this.props.children}</RenderComponent>;
  }
}
