import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { CheckViewAdapter } from './layouts/index';
import { LogicalAdapter } from './adapters/index';
import { CheckProps } from './interface';
import report from '../../utils/report';

interface CheckState {}

interface CheckLayoutProps {}

interface CheckAdapter {}

export default class Check extends baseComponentFactory<CheckProps, CheckState, CheckLayoutProps, CheckAdapter>({
  viewAdapter: CheckViewAdapter,
  logicalAdapter: LogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'check'
    })
  }

  render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props}>{this.props.children}</RenderComponent>;
  }
}
