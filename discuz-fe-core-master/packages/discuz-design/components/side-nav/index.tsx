import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { SideNavViewAdapter } from './layouts/index';
import { SideNavLogicalAdapter } from './adapters/index';
import { SideNavProps } from './interface';
import sideNavItem from './nav-item'
import report from '../../utils/report';

interface SideNavState {}

interface SideNavLayoutProps {}

interface SideNavAdapter {}

export default class SideNav extends baseComponentFactory<
  SideNavProps,
  SideNavState,
  SideNavLayoutProps,
  SideNavAdapter
>({
  viewAdapter: SideNavViewAdapter,
  logicalAdapter: SideNavLogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'sideNav'
    })
  }

  static defaultProps = {};
  static Item = sideNavItem

  render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props}>{this.props.children}</RenderComponent>;
  }
}
