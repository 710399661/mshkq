import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { ViewAdapter } from './layouts/index';
import { LogicalAdapter } from './adapters/index';
import { WebPickerProps, MiniPickerProps } from './interface';
import report from '../../utils/report';

interface PickerState {}

interface PickerProps extends WebPickerProps, MiniPickerProps {}

export interface PickerLayoutProps {}

interface PickerAdapter {}

class Picker extends baseComponentFactory<PickerProps, PickerState, PickerLayoutProps, PickerAdapter>({
  viewAdapter: ViewAdapter,
  logicalAdapter: LogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'webPicker'
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
export default Picker;
