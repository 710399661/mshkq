import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { ViewAdapter } from './layouts/index';
import { LogicalAdapter } from './adapters/index';
import { WebInputProps, MiniInputProps } from './interface';
import Textarea from '../textarea';
import report from '../../utils/report';

interface InputState {}

interface InputProps extends WebInputProps, MiniInputProps {}

export interface InputLayoutProps {}

interface InputAdapter {}

class Input extends baseComponentFactory<InputProps, InputState, InputLayoutProps, InputAdapter>({
  viewAdapter: ViewAdapter,
  logicalAdapter: LogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'input'
    })
  }

  static Textarea = Textarea

  render() {
    const composeProps = {
      ...this.props,
    };
    const { RenderComponent } = this;
    return <RenderComponent {...composeProps}>{this.props.children}</RenderComponent>;
  }
}
export default Input;
