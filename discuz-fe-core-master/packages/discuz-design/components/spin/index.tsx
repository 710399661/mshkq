import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { SpinViewAdapter } from './layouts/index';
import { SpinLogicalAdapter } from './adapters/index';
import { SpinProps } from './interface';
import report from '../../utils/report';

interface SpinState {}

interface SpinLayoutProps {}

interface SpinAdapter {}

export default class Spin extends baseComponentFactory<SpinProps, SpinState, SpinLayoutProps, SpinAdapter>({
  viewAdapter: SpinViewAdapter,
  logicalAdapter: SpinLogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'spin'
    })
  }

  static defaultProps = {
    type: 'circular',
    size: 20,
    vertical: false,
  };

  render() {
    const composeProps = {
      ...this.props,
    };

    const { RenderComponent } = this;
    return <RenderComponent {...composeProps}>{this.props.children}</RenderComponent>;
  }
}
