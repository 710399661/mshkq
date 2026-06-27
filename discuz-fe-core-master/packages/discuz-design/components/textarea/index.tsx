import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { ViewAdapter } from './layouts/index';
import { LogicalAdapter } from './adapters/index';
import { WebTextareaProps, MiniTextareaProps } from './interface';
import report from '../../utils/report';

interface TextareaState {}

interface TextareaProps extends WebTextareaProps, MiniTextareaProps {}

export interface TextareaLayoutProps {}

interface TextareaAdapter {}

export default class Textarea extends baseComponentFactory<
  TextareaProps,
  TextareaState,
  TextareaLayoutProps,
  TextareaAdapter
>({
  viewAdapter: ViewAdapter,
  logicalAdapter: LogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'textarea'
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
