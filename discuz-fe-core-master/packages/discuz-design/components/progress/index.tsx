import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { ProgressViewAdapter } from './layouts/index';
import { ProgressLogicalAdapter } from './adapters/index';
import { ProgressProps } from './interface';
import report from '../../utils/report';

interface ProgressState {}

interface ProgressLayoutProps {}

interface ProgressAdapter {}

export default class Progress extends baseComponentFactory<
  ProgressProps,
  ProgressState,
  ProgressLayoutProps,
  ProgressAdapter
>({
  viewAdapter: ProgressViewAdapter,
  logicalAdapter: ProgressLogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'progress'
    })
  }

  static defaultProps = {
    style: {},
    percent: 0,
    theme: 'default',
    lineWidth: 2,
    width: 160,
    className: '',
    text: '',
    isShowText: true,
  };

  render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props}>{this.props.children}</RenderComponent>;
  }
}
