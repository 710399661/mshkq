import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { StepViewAdapter } from './layouts/index';
import { StepLogicalAdapter } from './adapters/index';
import { StepProps } from './interface';
import StepItem from './step-item'
import report from '../../utils/report';

interface StepState {}

interface StepLayoutProps {}

interface StepAdapter {}

export default class Step extends baseComponentFactory<
  StepProps,
  StepState,
  StepLayoutProps,
  StepAdapter
>({
  viewAdapter: StepViewAdapter,
  logicalAdapter: StepLogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'step'
    })
  }

  static defaultProps = {};
  public static Item = StepItem;
  render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props}>{this.props.children}</RenderComponent>;
  }
}
