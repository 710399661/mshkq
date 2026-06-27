import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { ButtonViewAdapter } from './layouts/index';
import { ButtonLogicalAdapter } from './adapters/index';
import { MiniButtonProps, WebButtonProps } from './interface';
import report from '../../utils/report';

interface ButtonProps extends MiniButtonProps, WebButtonProps {}

interface ButtonState {}

interface ButtonLayoutProps {}

interface ButtonAdapter {}

export default class Button extends baseComponentFactory<ButtonProps, ButtonState, ButtonLayoutProps, ButtonAdapter>({
  viewAdapter: ButtonViewAdapter,
  logicalAdapter: ButtonLogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'button'
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
