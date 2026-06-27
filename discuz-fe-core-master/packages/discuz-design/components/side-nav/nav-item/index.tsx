import React from 'react';
import { baseComponentFactory } from '../../../extends/baseComponent';
import { NavItemViewAdapter } from './layouts/index';
import { NavItemLogicalAdapter } from './adapters/index';
import { SideNavItemProps } from '../interface';

interface NavItemState {}

interface NavItemLayoutProps {}

interface NavItemAdapter {}

export default class Nav extends
  baseComponentFactory<SideNavItemProps, NavItemState, NavItemLayoutProps, NavItemAdapter>({
    viewAdapter: NavItemViewAdapter,
    logicalAdapter: NavItemLogicalAdapter,
  }) {
  public render() {
    const composeProps = {
      ...this.props,
    };

    const { RenderComponent } = this;
    return <RenderComponent {...composeProps}>{this.props.children}</RenderComponent>;
  }
}
