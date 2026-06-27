import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { BadgeViewAdapter } from './layouts/index';
import { BadgeLogicalAdapter } from './adapters/index';
import { BadgeProps } from './interface';
import report from '../../utils/report';

interface BadgeState {}

interface BadgeLayoutProps {}

interface BadgeAdapter {}

export default class Badge extends baseComponentFactory<
  BadgeProps,
  BadgeState,
  BadgeLayoutProps,
  BadgeAdapter
>({
  viewAdapter: BadgeViewAdapter,
  logicalAdapter: BadgeLogicalAdapter,
}) {
  constructor(props) {
    super(props);

    report({
      componentName: 'badge'
    })
  }

  static defaultProps = {};

  render() {
    const { RenderComponent } = this;
    return <RenderComponent {...this.props}>{this.props.children}</RenderComponent>;
  }
}
