import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { GridViewAdapter } from './layouts/index';
import { LogicalAdapter } from './adapters/index';
import { GridProps } from './interface';
import report from '../../utils/report';

interface GridState {}

interface GridLayoutProps {}

interface GridAdapter {}

export default class Grid extends baseComponentFactory<GridProps, GridState, GridLayoutProps, GridAdapter>({
  viewAdapter: GridViewAdapter,
  logicalAdapter: LogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'grid'
    })
  }

  render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props}>{this.props.children}</RenderComponent>;
  }
}
