import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { TableViewAdapter } from './layouts/index';
import { LogicalAdapter } from './adapters/index';
import { TableProps } from './interface';
import report from '../../utils/report';

interface TableState {}

interface TagLayoutProps {}

interface TableAdapter {}

export default class Tag extends baseComponentFactory<TableProps, TableState, TagLayoutProps, TableAdapter>({
  viewAdapter: TableViewAdapter,
  logicalAdapter: LogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'table'
    })
  }

  static defaultProps = {
    onClick: () => {},
  };

  render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props}>{this.props.children}</RenderComponent>;
  }
}
