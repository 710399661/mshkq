import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { AlertViewAdapter } from './layouts/index';
import { AlertLogicalAdapter } from './adapters/index';
import { AlertProps } from './interface';
import report from '../../utils/report';

interface AlertState {}

interface AlertLayoutProps {}

interface AlertAdapter {}

export default class Alert extends baseComponentFactory<AlertProps, AlertState, AlertLayoutProps, AlertAdapter>({
  viewAdapter: AlertViewAdapter,
  logicalAdapter: AlertLogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'alert'
    })
  }

  render() {
    const composeProps = {
      ...this.props,
    };

    const { RenderComponent } = this;
    return <RenderComponent {...composeProps}>{this.props.children}</RenderComponent>;
  }
}
