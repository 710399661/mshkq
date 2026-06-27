import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { AnimationViewAdapter } from './layouts/index';
import { LogicalAdapter } from './adapters/index';
import { AnimationProps } from './interface';
import report from '../../utils/report';

interface AnimationState {}

interface AnimationLayoutProps {}

interface AnimationAdapter {}

export default class Animation extends baseComponentFactory<
  AnimationProps,
  AnimationState,
  AnimationLayoutProps,
  AnimationAdapter
>({
  viewAdapter: AnimationViewAdapter,
  logicalAdapter: LogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'animation'
    })
  }

  static defaultProps = {
    action: false,
    count: 1,
    reverse: false,
    exist: false,
  };
  render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props}>{this.props.children}</RenderComponent>;
  }
}
