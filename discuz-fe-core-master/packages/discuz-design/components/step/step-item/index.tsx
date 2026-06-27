import React from 'react';
import { baseComponentFactory } from '../../../extends/baseComponent';
import { StepItemViewAdapter } from './layouts/index';
import { StepItemLogicalAdapter } from './adapters/index';
import { StepItemProps } from '../interface'
interface StepItemState {}

interface StepItemLayoutProps {}

interface StepItemAdapter {}

export default class Step extends
  baseComponentFactory<StepItemProps, StepItemState, StepItemLayoutProps, StepItemAdapter>({
    viewAdapter: StepItemViewAdapter,
    logicalAdapter: StepItemLogicalAdapter,
  }) {
  public render() {
    const composeProps = {
      ...this.props,
    };

    const { RenderComponent } = this;
    return <RenderComponent {...composeProps}>{this.props.children}</RenderComponent>;
  }
}
