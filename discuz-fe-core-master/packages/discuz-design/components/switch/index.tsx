import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { SwitchViewAdapter } from './layouts/index';
import { SwitchLogicalAdapter } from './adapters/index';
import { SwitchProps } from './interface';
import report from '../../utils/report';

interface SwitchState {}

interface SwitchLayoutProps {}

interface SwitchAdapter {}

export default class Switch extends baseComponentFactory<
  SwitchProps,
  SwitchState,
  SwitchLayoutProps,
  SwitchAdapter
>({
  viewAdapter: SwitchViewAdapter,
  logicalAdapter: SwitchLogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'switch'
    })
  }

  static defaultProps = {
    defaultChecked: false,
    disabled: false,
    loading: false,
    size: 30,
    style: {},
    onChange: () => {},
  };

  render() {
    const { RenderComponent } = this;
    return (
      <RenderComponent {...this.props}>{this.props.children}</RenderComponent>
    );
  }
}
