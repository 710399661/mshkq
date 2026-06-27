import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { ViewAdapter } from './layouts/index';
import { LogicalAdapter } from './adapters/index';
import { CardProps } from './interface';
import report from '../../utils/report';

interface CardState { }

interface CardLayoutProps { }

interface CardAdapter { }

export default class Card extends baseComponentFactory<CardProps, CardState, CardLayoutProps, CardAdapter>({
  viewAdapter: ViewAdapter,
  logicalAdapter: LogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'card'
    })
  }

  public render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props}>{this.props.children}</RenderComponent>;
  }
}
